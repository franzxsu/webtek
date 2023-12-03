var createEventBtn = document.getElementById('createEventBtn');
var eventFormContainer = document.getElementById('eventFormContainer');
var eventsContainer = document.getElementById('eventsContainer');
var welcomeMsg = document.getElementById("welcomeSpread");
var id;
var orgName;
var allEvents;
var orgEvents;


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

        console.log(id + " " + orgName)

        welcomeMsg.innerText = `Hello, ${orgName}, how are you today? Your ID number is ${id}!`;
    })
    .catch(error => {
        console.error('Error:', error.message);
    })
}

function getEvents(endpoint) {
    return fetch(endpoint)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error retrieving events!');
        })
        .catch(error => {
            console.error('Error:', error.message);
            throw error;
    });
}

function getAllEvents() {
    getEvents('/viewEvents')
        .then(data => {
            allEvents = data; // Assigning fetched data to global variable
            console.log(allEvents);
        })
        .catch(error => {
            console.error('Error:', error.message);
     });
}

function getOrgEvents(id) {
    getEvents(`/viewOrgEvents?eventOrgId=${id}`)
        .then(data => {
            orgEvents = data; // Assigning fetched data to global variable
            console.log(orgEvents);
        })
        .catch(error => {
            console.error('Error:', error.message);
    });
}


document.addEventListener('DOMContentLoaded', function () {
    getDeets();
    getAllEvents();
    getOrgEvents();

    createEventBtn.addEventListener('click', function () {
        toggleEvents(createEventBtn);
    });

    // Functionality for showing all events
    showAllEventsBtn.addEventListener('click', function () {
        toggleEvents(showAllEventsBtn, eventsContainer);
    });

    showMyEventsBtn.addEventListener('click', function() {
        toggleEvents(showMyEventsBtn, eventsContainer);
    });

    function saveEventData(eventData) {

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

    function createEvents() {
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
    }

    function createEventsTable(eventsData) {
        const table = document.createElement('table');
        const tableHeader = document.createElement('thead');
        const tableBody = document.createElement('tbody');


        // comment this out if us2 nyo makita all the columns
        const hideColumns = ['eventID', 'OrganizerId', 'courseID', 'OrganizationID'];
    
        // tebl headers
        const headerRow = document.createElement('tr');
        for (let key in eventsData[0]) {
            // remove !hideColumns if u want to see all columns din
            if (eventsData[0].hasOwnProperty(key) && !hideColumns.includes(key)) {
                const headerCell = document.createElement('th');
                headerCell.textContent = key.toUpperCase();
                headerRow.appendChild(headerCell);
            }
        }
    
        tableHeader.appendChild(headerRow);
        table.appendChild(tableHeader);
    
        // tebl rows and cells
        eventsData.forEach(item => {
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
        return table;
    }

    function toggleEvents(button, container) {

        if (button === createEventBtn) {
            createEvents();
        } else {
            toggleHide(button, container);
        }

    }

    function toggleHide(button, container) {
        if (container.classList.contains('hidden')) {


            container.classList.remove('hidden');
            eventFormContainer.classList.add('hidden');

            if (button === showAllEventsBtn) {
                getAllEvents();
                const eventsTable = createEventsTable(allEvents);
                container.innerHTML = '';
                container.appendChild(eventsTable);
            } else if (button === showMyEventsBtn) {
                getOrgEvents();
                const eventsTable = createEventsTable(orgEvents);
                container.innerHTML = '';
                container.appendChild(eventsTable);
            }

        } else {

            if (button === showAllEventsBtn) {
                button.textContent = 'Show Events';
            } else if (button === showMyEventsBtn) {
                button.textContent = 'Show My Events';
            }

            container.classList.add('hidden');
            eventFormContainer.classList.add('hidden');
        } 
    }
});
