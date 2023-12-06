var usernameInput = document.getElementById("usernameInput");
var passwordInput = document.getElementById("passwordInput");

function verifyLogin() {
    var usernameValue = usernameInput.value;
    var passwordValue = passwordInput.value;

    fetch('/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: usernameValue,
            password: passwordValue
        })
    })
    .then(response => {
        if (response.ok) {
            if (response.url.includes('/admin_dashboard')) {
                window.location.href = '/admin_dashboard';
            } else if (response.url.includes('/eo_dashboard')) {
                window.location.href = '/eo_dashboard';
            } else {
                // default reditect lang
                window.location.href = '/admin_dashboard';
            }
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
    // var eyeBtn = document.getElementById("showPass");
    // var btnCheck = false;

    // eyeBtn.addEventListener("mousedown", function() {``
    //     console.log("button held!")
    //     passwordInput.type = "text";
    //     btnCheck = true;
    // });

    // window.addEventListener("mouseup", function() {
    //     if (btnCheck) {
    //         console.log("button not held!")
    //         passwordInput.type = "password";
    //         btnCheck = false;
    //     }
    // });
});
