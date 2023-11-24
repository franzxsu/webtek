document.addEventListener('DOMContentLoaded', function () {
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
            { label: 'Event Date:', type: 'date', name: 'eventDate', required: true },
            { label: 'Event For:', type: 'text', name: 'eventFor', required: true },
            { label: 'Event Description:', type: 'textarea', name: 'eventDescription', rows: 4, required: true }
        ];

        formFields.forEach(field => {
            const label = document.createElement('label');
            label.textContent = field.label;

            const input = document.createElement(field.type === 'textarea' ? 'textarea' : 'input');
            input.type = field.type;
            input.name = field.name;
            input.required = field.required;

            if (field.rows) {
                input.rows = field.rows;
                input.cols = 50;
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

        // Form submission
        form.addEventListener('submit', function (event) {
            event.preventDefault();
    
            if (form.checkValidity()) {
                if (confirm('Confirm event creation?')) {
                    const formData = new FormData(form);
                    const eventData = {};
                    for (const [name, value] of formData.entries()) {
                        eventData[name] = value;
                    }
    
                    saveEventData(eventData); // Save data to localStorage
    
                    form.reset();
                    eventFormContainer.classList.add('hidden');
                    }
            }
        });

        //for test purposes
        function saveEventData(eventData) {
            let events = JSON.parse(localStorage.getItem('events')) || [];
            events.push(eventData);
            localStorage.setItem('events', JSON.stringify(events));
        }
        // Functionality for canceling form submission (Cancel button)
        cancelButton.addEventListener('click', function () {
            // Hide the form when the Cancel button is clicked
            form.reset();
            eventFormContainer.classList.add('hidden');
        });

        form.appendChild(createButton);
        form.appendChild(cancelButton);

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
        let eventData = JSON.parse(localStorage.getItem('events')) || [];

        // Create event containers dynamically
        eventData.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event-item');

            const eventName = document.createElement('h3');
            eventName.textContent = `Event Name: ${event.eventName}`;

            const eventVenue = document.createElement('p');
            eventVenue.textContent = `Venue: ${event.eventVenue}`;

            const eventDate = document.createElement('p');
            eventDate.textContent = `Date: ${event.eventDate}`;

            const eventFor = document.createElement('p');
            eventFor.textContent = `For: ${event.eventFor}`;

            const eventDescription = document.createElement('p');
            eventDescription.textContent = `Description: ${event.eventDescription}`;

            eventDiv.appendChild(eventName);
            eventDiv.appendChild(eventVenue);
            eventDiv.appendChild(eventDate);
            eventDiv.appendChild(eventFor);
            eventDiv.appendChild(eventDescription);

            eventsContainer.appendChild(eventDiv);
        });

        if (showAllEventsBtn.dataset.state === 'show') {
            showAllEventsBtn.click();
        }
    });

    // Functionality for form submission (Create button)
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission for demonstration purposes

        // Perform actions when the Create button is clicked
        if (form.checkValidity()) {
            // Gather form data
            const formData = new FormData(form);
            const eventData = {};
            for (const [name, value] of formData.entries()) {
                eventData[name] = value;
            }

            // Save new event data to localStorage
            saveEventData(eventData);

            // Reset the form after processing data
            form.reset();
            eventFormContainer.classList.add('hidden'); // Hide the form after submission (you can adjust this behavior)

            // Trigger display of all events again, including the newly added event
            showAllEventsBtn.click();
        }
    });

    // Function to save event data to localStorage
    function saveEventData(eventData) {
        let events = JSON.parse(localStorage.getItem('events')) || [];
        events.push(eventData);
        localStorage.setItem('events', JSON.stringify(events));
    }
});
