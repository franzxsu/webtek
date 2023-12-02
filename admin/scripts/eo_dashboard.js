var welcomeMsg = document.getElementById("welcomeSpread");
var id;
var orgName;
var events;


function getDeets() {

    fetch('/sendDeets')
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error retrieving details!');
    })
    .then(data => {
        // test data received hihi

        console.log('Received data:', data);
        id = data.id;
        orgName = data.username;

        welcomeMsg.innerText = `Hello, ${orgName}, how are you today? Your ID number is ${id}!`;
    })
    .catch(error => {
        console.error('Error:', error.message);
    })
}

function getEvents() {
    fetch('/viewEvents')
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error retrieving events!'); 
    })
    .then(data => {
        events = data;
        console.log(events);
    })
    .catch(error => {
        console.error('Error:', error.message);
    })
}

function createTable() {
    const tableContainer = document.getElementById('eventsContainer');
    const table = document.createElement('table');
    const tableHeader = document.createElement('thead');
    const tableBody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    for (let key in events[0]) {
        if (events[0].hasOwnProperty(key)) {
            const headerCell = document.createElement('th');
            headerCell.textContent = key.toUpperCase();
            headerRow.appendChild(headerCell);
        }
    }

    tableHeader.appendChild(headerRow);
    table.appendChild(tableHeader);

    events.forEach(item => {
        const row = document.createElement('tr');
        for (let key in item) {
            if (item.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                cell.textContent = item[key];
                row.appendChild(cell);
            }
        }
        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    tableContainer.appendChild(table);
}

document.addEventListener('DOMContentLoaded', function () {
    getDeets();
    getEvents();

    const createEventBtn = document.getElementById('createEventBtn');
    const eventFormContainer = document.getElementById('eventFormContainer');
    const eventsContainer = document.getElementById('eventsContainer');
    const clearFormBtn = document.getElementById('clearFormBtn');
    const form = document.createElement('form');

    createEventBtn.addEventListener('click', function () {
        eventFormContainer.innerHTML = '';
        const form = document.createElement('form');
        form.id = 'eventCreationForm';

        const formFields = [
            { label: 'Event Name:', type: 'text', name: 'eventName', required: true },
            { label: 'Event Venue:', type: 'text', name: 'eventVenue', required: true },
            { label: 'Event Date Start:', type: 'date', name: 'eventDateStart', required: true, id:'startDate' },
            { label: 'Event Date End:', type: 'date', name: 'eventDateEnd', required: true, id: 'endDate' },
            { 
                label: 'Who gets to attend the event? :', 
                type: 'select', 
                name: 'eventFor', 
                required: true,
                options: [
                    { value: "everyone", text: "Everyone!"},
                    { value: "sluOnly", text: "SLU Students Only"},
                    { value: "courseOnly", text: "A Particular Course Only"},
                    { value: "orgOnly", text: "Organization Members Only"}
                ] 
            },
            { label: 'Event Description:', type: 'textarea', name: 'eventDescription', rows: 4, required: true }
        ];

        formFields.forEach(field => {
            const label = document.createElement('label');
            label.textContent = field.label;
        
            let input;
        
            if (field.type === 'select') {
                input = document.createElement('select');
                input.name = field.name;
                input.required = field.required;
        
                // Creating the placeholder option
                const placeholderOption = document.createElement('option');
                placeholderOption.value = '';
                placeholderOption.text = 'Select an option';
                placeholderOption.disabled = true;
                placeholderOption.selected = true;
                input.appendChild(placeholderOption);
        
                // Adding other options
                field.options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.text = option.text;
                    input.appendChild(optionElement);
                });
            } else {
                input = document.createElement(field.type === 'textarea' ? 'textarea' : 'input');
                input.type = field.type;
                input.name = field.name;
                input.required = field.required;

                if (field.id) {
                    input.id = field.id;
                    console.log(input.id);
                }
        
                if (field.rows) {
                    input.rows = field.rows;
                    input.cols = 50;
                }
            }
        
            form.appendChild(label);
            form.appendChild(input);
            form.appendChild(document.createElement('br'));
        });
        

        const createButton = document.createElement('button');
        createButton.type = 'submit';
        createButton.textContent = 'Create';

        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.textContent = 'Cancel';

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            if (form.checkValidity()) {
                const startDate = form.querySelector('#startDate').value;
                const endDate = form.querySelector('#endDate').value;
            
                if (!checkDate(startDate, endDate)) {
                    alert("Invalid dates! Please try again.");
                    return;
                }
            
                if (confirm('Confirm event creation?')) {
                    const formData = new FormData(form);
                    const eventData = {};
                    eventData["id"] = id;
                    for (const [name, value] of formData.entries()) {
                        eventData[name] = value;
                    }
            
                    saveEventData(eventData);
            
                    form.reset();
                    eventFormContainer.classList.add('hidden');
                }
            }
        });

        function checkDate(startDate, endDate) {
            return endDate >= startDate;
        }
        

        form.appendChild(createButton);
        form.appendChild(cancelButton);

        // Functionality for canceling form submission (Cancel button)
        cancelButton.addEventListener('click', function () {
            // Hide the form when the Cancel button is clicked
            form.reset();
            eventFormContainer.classList.add('hidden');
        });

        eventFormContainer.appendChild(form);
        eventFormContainer.classList.remove('hidden'); // Show the event form container
        eventsContainer.classList.add('hidden'); // Hide event containers
      });

    // Functionality for showing all events
    showAllEventsBtn.addEventListener('click', function () {
        if (eventsContainer.classList.contains('hidden')) {
            showAllEventsBtn.textContent = 'Hide Events';
            eventsContainer.classList.remove('hidden');
            eventFormContainer.classList.add('hidden');
            console.log('show events'); 
            createTable();
        } else {
            showAllEventsBtn.textContent = 'Show Events';
            eventsContainer.classList.add('hidden');
            eventFormContainer.classList.add('hidden');
        }
    });

    showAllEventsBtn.addEventListener('click', function () {
        // Clear previous events
        eventsContainer.innerHTML = '';


        // Retrieve stored events from localStorage
        // let eventData = JSON.parse(getEvents()) || [];
        // console.log(getEvents());

        // Create event containers dynamically
        // eventData.forEach(event => {
            // const eventDiv = document.createElement('div');
            // eventDiv.classList.add('event-item');

            // const eventName = document.createElement('h3');
            // eventName.textContent = `Event Name: ${event.eventName}`;

            // const eventVenue = document.createElement('p');
            // eventVenue.textContent = `Venue: ${event.eventVenue}`;

            // const eventDateStart = document.createElement('p');
            // eventDate.textContent = `Date Start: ${event.eventDate}`;

            // const eventDateEnd = document.createElement('p');
            // eventDate.textContent = `Date End: ${event.eventDate}`;

            // const eventFor = document.createElement('p');
            // eventFor.textContent = `For: ${event.eventFor}`;

            // const eventDescription = document.createElement('p');
            // eventDescription.textContent = `Description: ${event.eventDescription}`;

            // eventDiv.appendChild(eventName);
            // eventDiv.appendChild(eventVenue);
            // eventDiv.appendChild(eventDateStart);
            // eventDiv.appendChild(eventDateEnd);
            // eventDiv.appendChild(eventFor);
            // eventDiv.appendChild(eventDescription);

            // eventsContainer.appendChild(eventDiv);
        // });

        // if (showAllEventsBtn.dataset.state === 'show') {
            // showAllEventsBtn.click();
        // }
    });

    // // Functionality for form submission (Create button)
    // form.addEventListener('submit', function (event) {
    //     event.preventDefault(); // Prevent form submission for demonstration purposes

    //     // Perform actions when the Create button is clicked
    //     if (form.checkValidity()) {
    //         // Gather form data
    //         const formData = new FormData(form);
    //         const eventData = {};
    //         for (const [name, value] of formData.entries()) {
    //             eventData[name] = value;
    //         }
    //         // Save new event data to localStorage
    //         // saveEventData(eventData);

    //         // Reset the form after processing data
    //         form.reset();
    //         eventFormContainer.classList.add('hidden'); // Hide the form after submission (you can adjust this behavior)

    //         // Trigger display of all events again, including the newly added event
    //         // showAllEventsBtn.click();
    //     }
    // });

    // Function to save event data to localStorage
    function saveEventData(eventData) {
        // let events = JSON.parse(localStorage.getItem('events')) || [];
        // events.push(eventData);
        // localStorage.setItem('events', JSON.stringify(events));

        fetch('/createEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
        .then(response => {
            if(response.ok) {
                return response.json().then(data => {
                    alert(data.message);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        })
    }
});
