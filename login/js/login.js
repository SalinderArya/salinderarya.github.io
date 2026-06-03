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

// =====================
// SUPER ADMIN LOGIN
// =====================

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

// =====================
// USER LOGIN
// =====================

const { data:user, error } =
await supabaseClient
.from("users")
.select("*")
.eq("username", username)
.eq("password", password)
.single();

if(error || !user){

    Swal.fire(
        "Login Failed",
        "Invalid Username or Password",
        "error"
    );

    return;
}

if(user.status !== "approved"){

    Swal.fire(
        "Account Pending",
        "Your account is not approved yet",
        "warning"
    );

    return;
}

// =====================
// CHECK BANK DETAILS
// =====================

const { data:bankData } =
await supabaseClient
.from("bank_details")
.select("*")
.eq("user_id", user.id)
.maybeSingle();

if(!bankData){

    const result =
    await Swal.fire({

        title:"Complete Bank Details",

        html:`

        <input
        id="bank_name"
        class="swal2-input"
        placeholder="Bank Name">

        <input
        id="account_holder"
        class="swal2-input"
        placeholder="Account Holder Name">

        <input
        id="account_number"
        class="swal2-input"
        placeholder="Account Number">

        <input
        id="ifsc_code"
        class="swal2-input"
        placeholder="IFSC Code">

        <input
        id="branch_name"
        class="swal2-input"
        placeholder="Branch Name">

        `,

        confirmButtonText:
        "Save Details",

        focusConfirm:false,

        preConfirm: () => {

            return {

                bank_name:
                document.getElementById(
                "bank_name").value,

                account_holder:
                document.getElementById(
                "account_holder").value,

                account_number:
                document.getElementById(
                "account_number").value,

                ifsc_code:
                document.getElementById(
                "ifsc_code").value,

                branch_name:
                document.getElementById(
                "branch_name").value

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

        user_id:
        user.id,

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

    Swal.fire(
        "Saved",
        "Bank Details Saved Successfully",
        "success"
    );
}

// =====================
// SESSION
// =====================

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

localStorage.setItem(
    "koCode",
    user.ko_code
);

// =====================
// REDIRECT
// =====================

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
