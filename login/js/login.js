document.querySelector(".login-btn").addEventListener("click", async function () {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Default Admin Login
    if (username === "admin" && password === "admin") {
        window.location.href = "../superadmin/admin.html";
        return;
    }

    // Supabase Login Check
    const { data, error } = await supabase
        .from("users") // apni table ka naam
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
