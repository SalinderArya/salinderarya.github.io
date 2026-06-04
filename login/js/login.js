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
    const btn =
    document.getElementById("loginBtn");

    if(btn){
        btn.onclick = loginUser;
    }

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

if(!username || !password){

    Swal.fire(
        "Warning",
        "Enter Username and Password",
        "warning"
    );

    return;
}

// SUPER ADMIN

if(
    username.toLowerCase() === "admin" &&
    password === "admin"
){

    await Swal.fire(
        "Success",
        "Super Admin Login",
        "success"
    );

    window.location.href =
    "../superadmin/admin.html";

    return;
}

// USER LOGIN

const { data:user, error } =
await supabaseClient
.from("users")
.select("*")
.eq("username", username)
.eq("password", password)
.maybeSingle();

if(error){

    Swal.fire(
        "Database Error",
        error.message,
        "error"
    );

    return;
}

if(!user){

    Swal.fire(
        "Login Failed",
        "User does not match",
        "error"
    );

    return;
}

if(user.status !== "approved"){

    Swal.fire(
        "Pending",
        "Your account is not approved yet",
        "warning"
    );

    return;
}

// CHECK BANK DETAILS

const { data:bank } =
await supabaseClient
.from("bank_details")
.select("*")
.eq("user_id", user.id)
.maybeSingle();

if(!bank){

    const result =
    await Swal.fire({

        title: "Complete Bank Details",

        html: `
        <input id="bank_name" class="swal2-input" placeholder="Bank Name">
        <input id="account_holder" class="swal2-input" placeholder="Account Holder">
        <input id="account_number" class="swal2-input" placeholder="Account Number">
        <input id="ifsc_code" class="swal2-input" placeholder="IFSC Code">
        <input id="branch_name" class="swal2-input" placeholder="Branch Name">
        `,

        confirmButtonText:
        "Save Details",

        preConfirm: () => {

            return {

                bank_name:
                document.getElementById("bank_name").value,

                account_holder:
                document.getElementById("account_holder").value,

                account_number:
                document.getElementById("account_number").value,

                ifsc_code:
                document.getElementById("ifsc_code").value,

                branch_name:
                document.getElementById("branch_name").value

            };

        }

    });

    if(!result.isConfirmed){
        return;
    }

    const { error:bankError } =
    await supabaseClient
    .from("bank_details")
    .insert([{

        user_id: user.id,

        bank_name:
        result.value.bank_name,

        account_holder:
        result.value.account_holder,

        account_number:
        result.value.account_number,

        ifsc_code:
        result.value.ifsc_code,

        branch_name:
        result.value.branch_name

    }]);

    if(bankError){

        Swal.fire(
            "Error",
            bankError.message,
            "error"
        );

        return;
    }
}

localStorage.setItem(
    "userId",
    user.id
);

localStorage.setItem(
    "userName",
    user.name
);

localStorage.setItem(
    "userType",
    user.user_type
);

await Swal.fire(
    "Success",
    "Login Successful",
    "success"
);

window.location.href =
"../dashboard/dashboard.html";
```

}
