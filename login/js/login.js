const SUPABASE_URL =
"https://hjxqtfykngkwmiejeyei.supabase.co";

const SUPABASE_KEY =
"sb_publishable_cspfS5CyrtJGlp9DdAq5Pw_DQJoevoG";

const supabaseClient =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

document
.querySelector(".login-btn")
.addEventListener("click", loginUser);

async function loginUser(){

```
const username =
document.getElementById("username")
.value.trim();

const password =
document.getElementById("password")
.value.trim();

if(!username || !password){

    Swal.fire(
        "Missing Information",
        "Please enter Username and Password",
        "warning"
    );

    return;
}

// SUPER ADMIN

if(
    username.toLowerCase() === "admin" &&
    password === "Password"
){

    Swal.fire({
        icon:"success",
        title:"Super Admin Login Success",
        timer:1500,
        showConfirmButton:false
    }).then(() => {

        window.location.href =
        "../superadmin/admin.html";

    });

    return;
}

// USER LOGIN

const { data, error } =
await supabaseClient
.from("users")
.select("*")
.eq("username", username)
.eq("password", password)
.single();

if(error || !data){

    Swal.fire(
        "Login Failed",
        "Invalid Username or Password",
        "error"
    );

    return;
}

if(data.status !== "approved"){

    Swal.fire(
        "Account Pending",
        "Your account is not approved yet",
        "warning"
    );

    return;
}

localStorage.setItem(
    "userId",
    data.id
);

localStorage.setItem(
    "userName",
    data.name
);

localStorage.setItem(
    "userType",
    data.user_type
);

Swal.fire({
    icon:"success",
    title:"Login Success",
    timer:1500,
    showConfirmButton:false
}).then(() => {

    window.location.href =
    "../dashboard/dashboard.html";

});
```

}
