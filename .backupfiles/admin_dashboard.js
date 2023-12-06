var welcomeMsg = document.getElementById("welcomeSpread");
var id;
var adminName;


function getDeets() {

    fetch('/sendDeets')
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error retrieving details!');
    })
    .then(data => {

        console.log('Received data:', data);
        id = data.id;
        adminName = data.username;

        welcomeMsg.innerText = `Hello, ${adminName}, how are you today? Your ID number is ${id}!`;
    })
    .catch(error => {
        console.error('Error', error.message);
    })
}

document.addEventListener('DOMContentLoaded', function() {
    getDeets();
})