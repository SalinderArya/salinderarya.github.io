document.querySelector(".login-btn").addEventListener("click", async function () {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Default Admin Login
    if (username === "admin" && password === "admin") {
        window.location.href = "../superadmin/admin.html";
        return;
    }

   const SUPABASE_URL = "https://hjxqtfykngkwmiejeyei.supabase.co";

const SUPABASE_KEY = "sb_publishable_cspfS5CyrtJGlp9DdAq5Pw_DQJoevoG";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const { data: userData } = await supabaseClient
    .from("users")
    .select("*")
    .eq("username", username)
    .eq("password", password)
    .single();

if (!userData) {
    Swal.fire("Error", "Invalid Username or Password", "error");
    return;
}

// Approval Check
if (!userData.approval) {
    Swal.fire(
        "Pending Approval",
        "Your account has not been approved yet.",
        "warning"
    );
    return;
}

    const { data: bankData } = await supabaseClient
    .from("bank_details")
    .select("*")
    .eq("user_id", userData.id)
    .single();
    if (!bankData) {

    const { value: formValues } = await Swal.fire({
        title: "Bank Details Required",
        html: `
            <input id="holder" class="swal2-input" placeholder="Account Holder">
            <input id="bank" class="swal2-input" placeholder="Bank Name">
            <input id="account" class="swal2-input" placeholder="Account Number">
            <input id="ifsc" class="swal2-input" placeholder="IFSC Code">
        `,
        focusConfirm: false,
        showCancelButton: false,
        preConfirm: () => {
            return {
                holder: document.getElementById('holder').value,
                bank: document.getElementById('bank').value,
                account: document.getElementById('account').value,
                ifsc: document.getElementById('ifsc').value
            };
        }
    });

    await supabaseClient
        .from("bank_details")
        .insert([
            {
                user_id: userData.id,
                account_holder: formValues.holder,
                bank_name: formValues.bank,
                account_number: formValues.account,
                ifsc_code: formValues.ifsc
            }
        ]);
}
    Swal.fire({
    icon: "success",
    title: "Login Successful",
    timer: 1500,
    showConfirmButton: false
}).then(() => {
    window.location.href = "../superadmin/admin.html";
});


