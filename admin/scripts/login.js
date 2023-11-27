var usernameInput = document.getElementById("usernameInput");
var passwordInput = document.getElementById("passwordInput");

function verifyLogin() {
    var usernameValue = usernameInput.value;
    var passwordValue = passwordInput.value;

    fetch(`/verify?username=${usernameValue}&password=${passwordValue}`)
    .then(response => {
        if (response.ok) {
            window.location.href = '/dashboard';
        } else {
            return response.json().then(data => {
                throw new Error(data.message); 
            });
        }
    })
    .catch(error => {
        console.error('Error:', error.message);
        alert(error.message);
    });
}

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    verifyLogin();
});

document.addEventListener("DOMContentLoaded", function() {
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
