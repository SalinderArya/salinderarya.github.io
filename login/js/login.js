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
.getElementById("loginBtn")
.addEventListener("click", loginUser);

async function loginUser(){

```
const username =
document.getElementById("username")
.value.trim();

const password =
document.getElementById("password")
.value.trim();

// SUPER ADMIN

if(
    username === "admin" &&
    password === "admin"
){

    Swal.fire(
        "Success",
        "Super Admin Login",
        "success"
    ).then(() => {

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
        "Error",
        "Invalid Username or Password",
        "error"
    );

    return;
}

if(data.status !== "approved"){

    Swal.fire(
        "Pending",
        "Account Not Approved Yet",
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

Swal.fire(
    "Success",
    "Login Successful",
    "success"
).then(() => {

    window.location.href =
    "../dashboard/dashboard.html";

});
```

}
