const SUPABASE_URL =
"https://hjxqtfykngkwmiejeyei.supabase.co";

const SUPABASE_KEY =
"sb_publishable_cspfS5CyrtJGlp9DdAq5Pw_DQJoevoG";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

let currentStatus = "pending";

window.onload = () => {
    loadUsers("pending");
};

// ======================
// LOAD USERS
// ======================

async function loadUsers(status = null) {

    currentStatus = status;

    let query = supabaseClient
        .from("users")
        .select("*")
        .order("id", { ascending: false });

    if (status) {
        query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
        console.log(error);
        return;
    }

    renderUsers(data);
}

// ======================
// RENDER TABLE
// ======================

function renderUsers(users) {

    const tbody =
        document.getElementById("userTableBody");

    tbody.innerHTML = "";

    users.forEach(user => {

        tbody.innerHTML += `
        <tr>

            <td>${user.id}</td>
            <td>${user.name ?? ""}</td>
            <td>${user.mobile ?? ""}</td>
            <td>${user.ko_code ?? ""}</td>
            <td>${user.username ?? ""}</td>
            <td>${user.user_type ?? ""}</td>
            <td>${user.status ?? ""}</td>

            <td>

                <button
                class="approve-btn"
                onclick="approveUser(${user.id})">
                Approve
                </button>

                <button
                class="reject-btn"
                onclick="rejectUser(${user.id})">
                Reject
                </button>

                <button
                class="delete-btn"
                onclick="deleteUser(${user.id})">
                Delete
                </button>

            </td>

        </tr>
        `;
    });
}

// ======================
// APPROVE
// ======================

async function approveUser(id) {

    const result = await Swal.fire({
        title: "Approve User ?",
        icon: "question",
        showCancelButton: true
    });

    if (!result.isConfirmed) return;

    const { error } = await supabaseClient
        .from("users")
        .update({
            status: "approved"
        })
        .eq("id", id);

    if (error) {

        Swal.fire(
            "Error",
            error.message,
            "error"
        );

        return;
    }

    Swal.fire(
        "Success",
        "User Approved",
        "success"
    );

    loadUsers(currentStatus);
}

// ======================
// REJECT
// ======================

async function rejectUser(id) {

    const result = await Swal.fire({
        title: "Reject User ?",
        icon: "warning",
        showCancelButton: true
    });

    if (!result.isConfirmed) return;

    const { error } = await supabaseClient
        .from("users")
        .update({
            status: "rejected"
        })
        .eq("id", id);

    if (error) {

        Swal.fire(
            "Error",
            error.message,
            "error"
        );

        return;
    }

    Swal.fire(
        "Rejected",
        "User Rejected",
        "success"
    );

    loadUsers(currentStatus);
}

// ======================
// DELETE
// ======================

async function deleteUser(id) {

    const result = await Swal.fire({
        title: "Delete User ?",
        text: "Permanent Delete",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33"
    });

    if (!result.isConfirmed) return;

    const { error } = await supabaseClient
        .from("users")
        .delete()
        .eq("id", id);

    if (error) {

        Swal.fire(
            "Error",
            error.message,
            "error"
        );

        return;
    }

    Swal.fire(
        "Deleted",
        "User Deleted",
        "success"
    );

    loadUsers(currentStatus);
}

// ======================
// FILTERS
// ======================

function showPendingUsers() {
    loadUsers("pending");
}

function showApprovedUsers() {
    loadUsers("approved");
}

function showRejectedUsers() {
    loadUsers("rejected");
}

function showAllUsers() {
    loadUsers(null);
}

// ======================
// SEARCH
// ======================

async function searchUsers() {

    const keyword =
        document.getElementById("searchInput")
        .value
        .trim();

    if (keyword === "") {
        loadUsers(currentStatus);
        return;
    }

    const { data, error } =
    await supabaseClient
        .from("users")
        .select("*")
        .or(
            `name.ilike.%${keyword}%,
             mobile.ilike.%${keyword}%,
             username.ilike.%${keyword}%`
        );

    if (error) {
        console.log(error);
        return;
    }

    renderUsers(data);
}

// ======================
// LOGOUT
// ======================

async function logout() {

    const result = await Swal.fire({
        title: "Logout?",
        text: "Are you sure you want to logout?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Logout"
    });

    if (!result.isConfirmed) return;

    await supabaseClient.auth.signOut();

    await Swal.fire({
        title: "Logged Out",
        text: "You have been logged out successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
    });

    window.location.replace(
        "https://salinderarya.github.io/PrinceComputers/login/login.html"
    );
}
