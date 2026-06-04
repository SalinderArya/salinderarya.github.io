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
.addEventListener("click", testLogin);

async function testLogin(){

```
alert("Button Clicked");

const { data, error } =
await supabaseClient
.from("users")
.select("*");

console.log("DATA =", data);
console.log("ERROR =", error);

if(error){

    Swal.fire(
        "Database Error",
        error.message,
        "error"
    );

    return;
}

Swal.fire(
    "Success",
    "Database Connected",
    "success"
);
```

}
