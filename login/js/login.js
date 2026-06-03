const SUPABASE_URL =
"https://hjxqtfykngkwmiejeyei.supabase.co";

const SUPABASE_KEY =
"YOUR_PUBLISHABLE_KEY";

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

if(!username || !password){

    Swal.fire(
        "Missing",
        "Enter Username & Password",
        "warning"
    );

    return;
}

const { data:user, error } =
await supabaseClient
.from("users")
.select("*")
.eq("username", username)
.eq("password", password)
.single();

if(error || !user){

    Swal.fire(
        "Error",
        "Invalid Username or Password",
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

const { data:bank } =
await supabaseClient
.from("bank_details")
.select("*")
.eq("user_id", user.id)
.maybeSingle();

if(!bank){

    const result =
    await Swal.fire({

        title:"Complete Bank Details",

        html:`
        <input id="bank_name"
        class="swal2-input"
        placeholder="Bank Name">

        <input id="account_holder"
        class="swal2-input"
        placeholder="Account Holder">

        <input id="account_number"
        class="swal2-input"
        placeholder="Account Number">

        <input id="ifsc_code"
        class="swal2-input"
        placeholder="IFSC Code">

        <input id="branch_name"
        class="swal2-input"
        placeholder="Branch Name">
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

        user_id:user.id,

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
    "userType",
    user.user_type
);

Swal.fire({
    icon:"success",
    title:"Login Success",
    timer:1500,
    showConfirmButton:false
}).then(() => {

    if(user.user_type === "superadmin"){
        window.location.href =
        "../superadmin/admin.html";
    }
    else{
        window.location.href =
        "../dashboard/dashboard.html";
    }

});
```

}
