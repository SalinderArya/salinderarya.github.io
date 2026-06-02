function logout(){

    alert("Logout Successfully");

    window.location.href = "../login/login.html";

}

const SUPABASE_URL =
"https://hjxqtfykngkwmiejeyei.supabase.co";

const SUPABASE_KEY =
"YAHAN_APNI_PUBLISHABLE_KEY_DALO";

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
    .order("id",{ascending:false});

    if(error){
        console.log(error);
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
                <button class="approve-btn">
                    Approve
                </button>

                <button class="reject-btn">
                    Reject
                </button>
            </td>
        </tr>
        `;
    });

    document.getElementById(
        "userTableBody"
    ).innerHTML = html;
}

loadUsers();

