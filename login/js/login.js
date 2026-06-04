document.querySelector(".login-btn").addEventListener("click", async function () {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Default Admin Login
    if (username === "admin" && password === "admin") {
        window.location.href = "../superadmin/admin.html";
        return;
    }

    const SUPABASE_URL =
        "https://hjxqtfykngkwmiejeyei.supabase.co";

    const SUPABASE_KEY =
        "YOUR_ANON_KEY";

    const supabaseClient = supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

    const { data, error } = await supabaseClient
        .from("users")
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single();

    if (data) {

        window.location.href = "../superadmin/admin.html";

    } else {

        alert("Invalid Username or Password");
        console.log(error);

    }

});
