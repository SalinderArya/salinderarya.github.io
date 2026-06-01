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
.getElementById("createUserBtn")
.addEventListener("click", async function () {

    const name =
    document.getElementById("name").value;

    const mobile =
    document.getElementById("mobile").value;

    const ko_code =
    document.getElementById("ko_code").value;

    const username =
    document.getElementById("username").value;

    const password =
    document.getElementById("password").value;

    const confirm_password =
    document.getElementById("confirm_password").value;

    const user_type =
    document.getElementById("user_type").value;

    if (
        !name ||
        !mobile ||
        !ko_code ||
        !username ||
        !password
    ) {

        Swal.fire(
            "Required",
            "Please fill all fields",
            "warning"
        );

        return;
    }

    if(password !== confirm_password){

        Swal.fire(
            "Error",
            "Passwords do not match",
            "error"
        );

        return;
    }

    const { error } =
    await supabaseClient
    .from("users")
    .insert([
        {
            name,
            mobile,
            ko_code,
            username,
            password,
            user_type
        }
    ]);

    if(error){

        Swal.fire(
            "Error",
            error.message,
            "error"
        );

        return;
    }

    Swal.fire({
        icon: "success",
        title: "Success",
        text: "User Created Successfully"
    });

});
