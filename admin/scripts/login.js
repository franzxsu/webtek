document.addEventListener("DOMContentLoaded", function() {
    var passwordInput = document.getElementById("passwordInput");
    var eyeBtn = document.getElementById("showPass");
    var btnCheck = false;

    eyeBtn.addEventListener("mousedown", function() {
        console.log("button held!")
        passwordInput.type = "text";
        btnCheck = true;
    });

    window.addEventListener("mouseup", function() {
        if (btnCheck) {
            console.log("button not held!")
            passwordInput.type = "password";
            btnCheck = false;
        }
    });
});