document
.getElementById("loginBtn")
.addEventListener("click", function(){

const username =
document.getElementById("username")
.value.trim();

const password =
document.getElementById("password")
.value.trim();

if(
    username === "admin" &&
    password === "admin"
){

    window.location.href =
    "../superadmin/admin.html";

}
else{

    alert(
        "Invalid Username or Password"
    );

}

});
