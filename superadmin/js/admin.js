const SUPABASE_URL =
"https://hjxqtfykngkwmiejeyei.supabase.co";

const SUPABASE_KEY =
"sb_publishable_cspfS5CyrtJGlp9DdAq5Pw_DQJoevoG";

const supabaseClient =
supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function loadUsers(){

    const { data, error } =
    await supabaseClient
    .from("users")
    .select("*")
    .order("id", { ascending:false });

    if(error){

        console.log(error);

        Swal.fire(
            "Error",
            error.message,
            "error"
        );

        return;
    }

    let html = "";

    data.forEach(user => {

        html += `
        <tr>
            <td>${user.id || ""}</td>
            <td>${user.name || ""}</td>
            <td>${user.mobile || ""}</td>
            <td>${user.ko_code || ""}</td>
            <td>${user.username || ""}</td>
            <td>${user.user_type || ""}</td>
            <td>${user.status || ""}</td>

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

            </td>

        </tr>
        `;
    });

    const tableBody =
    document.getElementById("userTableBody");

    if(tableBody){
        tableBody.innerHTML = html;
    }

}

loadUsers();
function logout(){

    window.location.href =
    "../login/login.html";

}

async function approveUser(id){

    const { data, error } =
    await supabaseClient
    .from("users")
    .update({
        status: "approved"
    })
    .eq("id", Number(id))
        .select();

    console.log("APPROVE DATA:", data);
    console.log("APPROVE ERROR:", error);

    if(error){

        Swal.fire(
            "Error",
            error.message,
            "error"
        );

        return;
    }

    Swal.fire(
        "Success",
        "User Approved Successfully",
        "success"
    );

    loadUsers();
}

async function rejectUser(id){

    const { error } =
    await supabaseClient
    .from("users")
    .update({
        status: "rejected"
    })
    .eq("id", id);

    if(error){

        Swal.fire(
            "Error",
            error.message,
            "error"
        );

        return;
    }

    Swal.fire(
        "Rejected",
        "User Rejected Successfully",
        "warning"
    );

    loadUsers();

}
