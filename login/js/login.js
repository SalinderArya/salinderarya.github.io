alert("JS Loaded");

document.addEventListener(
"DOMContentLoaded",
function(){

```
    alert("DOM Loaded");

    const btn =
    document.getElementById("loginBtn");

    console.log(btn);

    btn.onclick = function(){

        alert("Button Working");

    };

}
```

);
