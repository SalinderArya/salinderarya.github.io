document.addEventListener("DOMContentLoaded", () => {

```
document
.getElementById("loginBtn")
.addEventListener("click", () => {

    const username =
    document.getElementById("username")
    .value.trim();

    const password =
    document.getElementById("password")
    .value.trim();

    if(
        username === "admin" &&
        password === "admin"
    ){

        alert("Super Admin Login");

        window.location.href =
        "../superadmin/admin.html";

    }
    else{

        alert("Invalid Login");

    }

});
```

});
