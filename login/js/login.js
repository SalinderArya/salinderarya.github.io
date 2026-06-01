document
.getElementById("loginBtn")
.addEventListener("click", function(){

const username =
document.getElementById("username").value;

const password =
document.getElementById("password").value;

/* SUPER ADMIN */

if(username === "admin" &&
   password === "admin")
{

window.location.href =
"../superadmin/admin.html";

return;

}

alert("Invalid Username Or Password");

});
