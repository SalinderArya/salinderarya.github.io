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
.addEventListener("click", async function(){

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

    alert("Super Admin Login");

    window.location.href =
    "../superadmin/admin.html";

    return;
}

// USER LOGIN

const { data, error } =
await supabaseClient
.from("users")
.select("*")
.eq("username", username);

console.log(data);
console.log(error);

if(error){

    alert(error.message);
    return;
}

if(!data || data.length === 0){

    alert("User Not Found");
    return;
}

const user = data[0];

if(user.password !== password){

    alert("Wrong Password");
    return;
}

if(user.status !== "approved"){

    alert("Account Not Approved");
    return;
}

alert("Login Success");

window.location.href =
"../dashboard/dashboard.html";
```

});
