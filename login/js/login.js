const SUPABASE_URL =
"https://hjxqtfykngkwmiejeyei.supabase.co";

const SUPABASE_KEY =
"sb_publishable_cspfS5CyrtJGlp9DdAq5Pw_DQJoevoG";

const supabaseClient =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

document.addEventListener(
"DOMContentLoaded",
function(){

```
    document
    .getElementById("loginBtn")
    .onclick = loginUser;

}
```

);

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

    alert("Super Admin Login");

    window.location.href =
    "../superadmin/admin.html";

    return;
}

// SUPABASE TEST

const { data, error } =
await supabaseClient
.from("users")
.select("*");

console.log(data);
console.log(error);

if(error){

    alert(error.message);
    return;
}

alert(
    "Users Found : " +
    data.length
);
```

}
