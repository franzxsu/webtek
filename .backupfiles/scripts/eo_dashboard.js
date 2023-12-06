// var createEventBtn = document.getElementById('createEventBtn');
// var eventFormContainer = document.getElementById('eventFormContainer');
// var eventsContainer = document.getElementById('eventsContainer');
// var welcomeMsg = document.getElementById("welcomeSpread");
var id;
var orgName;
var allEvents;
var orgEvents;


async function getDeets() {
    try {
        const response = await fetch('/sendDeets');
        if (!response.ok) {
            throw new Error('Error retrieving details!');
        }
        const data = await response.json();
        id = data.id;
        orgName = data.username;
        console.log(id + " " + orgName);
        // Additional logic if needed
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

// ----------------------------------------- GET FUNCTIONS -----------------------------------------

async function getEvents(endpoint) {
    try {
        const response = await fetch(endpoint);

        if (response.ok) {
            return await response.json();
        }

        throw new Error('Error retrieving events!');
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function getAllEvents() {
    try {
        const data = await getEvents('/viewEvents');
        allEvents = data; // Assigning fetched data to global variable
        console.log(allEvents);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function getOrgEvents(id) {
    try {
        const data = await getEvents(`/viewOrgEvents?eventOrgId=${id}`);
        orgEvents = data; // Assigning fetched data to global variable
        console.log(orgEvents);
    } catch (error) {
        console.error('Error:', error.message);
    }
}


// ----------------------------------------- POST FUNCTIONS -----------------------------------------

async function saveEventData(eventData) {
    try {
        const response = await fetch('/createEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


// ----------------------------------------- CLIENT-SIDE SCRIPTING -----------------------------------------


document.addEventListener('DOMContentLoaded', async function () {
    await getDeets();
    getAllEvents();
    getOrgEvents();

    createEvents();

    // const minutes = 2.5;
    // const miliseconds = minutes * 60 * 1000;

    // setInterval(() => {
    //     getDeets();
    //     getAllEvents();
    //     getOrgEvents();
    // }, miliseconds);

    // createEventBtn.addEventListener('click', function () {
    //     toggleEvents(createEventBtn, eventFormContainer);
    // });

    // // Functionality for showing all events
    // showAllEventsBtn.addEventListener('click', function () {
    //     toggleEvents(showAllEventsBtn, eventsContainer);
    // });

    // showMyEventsBtn.addEventListener('click', function() {
    //     toggleEvents(showMyEventsBtn, eventsContainer);
    // });

    function createEvents() {
        const form = document.getElementById('eventCreationForm');

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = new FormData(form);
            const eventData = {};
            eventData["id"] = id;

            const buttonMapping = {
                flexRadioDefault1: 'Organization Exclusive',
                flexRadioDefault2: 'SLU Exclusive',
                flexRadioDefault3: 'Open for all',
            };

            for (const [name, value] of formData.entries()) {
                if (name === 'flexRadioDefault' && buttonMapping[value]) {
                    eventData['selectedOption'] = buttonMapping[value];
                } else {
                    eventData[name] = value;
                }
            }

            console.log(eventData);

            // saveEventData(eventData);
            

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
                    // eventFormContainer.classList.add('hidden');
                }
            }
        });

        function checkDate(startDate, endDate) {
            return endDate >= startDate;
        }
        

        // form.appendChild(createButton);
        // form.appendChild(cancelButton);

        // // Functionality for canceling form submission (Cancel button)
        // cancelButton.addEventListener('click', function () {
        //     // Hide the form when the Cancel button is clicked
        //     form.reset();
        //     eventFormContainer.classList.add('hidden');
        // });

        // eventFormContainer.appendChild(form);
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
                if (item.hasOwnProperty(key) && !hideColumns.includes(key)) {
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
        if (container.classList.contains('hidden')) {
            container.classList.remove('hidden');
            container.innerHTML = '';
    
            if (button === showAllEventsBtn) {
                getAllEvents();
                const eventsTable = createEventsTable(allEvents);
                container.appendChild(eventsTable);
            } else if (button === showMyEventsBtn) {
                getOrgEvents();
                const eventsTable = createEventsTable(orgEvents);
                container.appendChild(eventsTable);
            } else {
                createEvents();
            }
        } else {
            container.classList.add('hidden');
        }
    }    
});
