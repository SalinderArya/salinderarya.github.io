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
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.mobile}</td>
    <td>${user.ko_code}</td>
    <td>${user.username}</td>
    <td>${user.user_type}</td>
    <td>${user.status}</td>

    <td>
        <button
            class="approve-btn"
            data-id="${user.id}"
            onclick="approveUser(this)">
            Approve
        </button>

        <button
            class="reject-btn"
            data-id="${user.id}"
            onclick="rejectUser(this)">
            Reject
        </button>
    </td>
</tr>
`;

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

async function approveUser(btn){

    const id = Number(btn.dataset.id);

    console.log("Approve ID:", id);

    const { data, error } =
    await supabaseClient
    .from("users")
    .update({
        status: "approved"
    })
    .eq("id", id)
    .select();

    console.log(data, error);

    if(error){
        Swal.fire("Error", error.message, "error");
        return;
    }

    Swal.fire(
        "Success",
        `User ID ${id} Approved`,
        "success"
    );

    await loadUsers();
}

async function rejectUser(btn){

    const id = Number(btn.dataset.id);

    console.log("Reject ID:", id);

    const { data, error } =
    await supabaseClient
    .from("users")
    .update({
        status: "rejected"
    })
    .eq("id", id)
    .select();

    console.log(data, error);

    if(error){
        Swal.fire("Error", error.message, "error");
        return;
    }

    Swal.fire(
        "Rejected",
        `User ID ${id} Rejected`,
        "warning"
    );

    await loadUsers();
}
