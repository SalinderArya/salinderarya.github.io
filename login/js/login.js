document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Empty validation
    if (username === "" || password === "") {
        Swal.fire({
            icon: "warning",
            title: "Missing Fields",
            text: "Please enter Username and Password!"
        });
        return;
    }

    // Login validation
    if (username === "admin" && password === "admin") {

        Swal.fire({
            icon: "success",
            title: "Login Successful!",
            text: "Welcome Admin",
            timer: 1500,
            showConfirmButton: false
        }).then(() => {

            // Dashboard redirect
            window.location.href = "../superadmin/dashboard.html";

        });

    } else {

        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Invalid Username or Password!"
        });

    }
});
