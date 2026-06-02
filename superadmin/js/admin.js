function logout(){

    alert("Logout Successfully");

    window.location.href = "../login/login.html";

}

const SUPABASE_URL =
"https://hjxqtfykngkwmiejeyei.supabase.co";

const SUPABASE_KEY =
"Aapki Publishable Key Yahan";

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
        return;
    }

    console.log(data);
}

loadUsers();
