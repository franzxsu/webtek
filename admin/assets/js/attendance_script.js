

var SESSION_EVENTID = null;
var SESSION_SEGMENTNO = null;

var qrcode = window.qrcode;
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");
// const qrForGettingSegments = document.getElementById("x");
// const express = require('express');
// import { getSegments } from './frontenddb.js';

const eventModal = new bootstrap.Modal(document.getElementById('selectEventModal'));
const myModal = new bootstrap.Modal(document.getElementById('myModal'), {
  keyboard: false
});

let scanning = false;
let userIDVal;
let eventIDVal;
let regIDVal;
let emailVal;



qrcode.callback = res => {
  console.log('QR SCANNED');
  if (res) {
    console.log('in');

    console.log('stop scan flag');
    // Stop scanning
    scanning = false;

    try {
      const jsonValid = isValid(res);
      console.log(jsonValid);

      // Handle the logic based on jsonValid here
      // For example:
      if (jsonValid === 'true') {
        console.log('JSON is valid');
        const parsedValues = getValuesFromJSONString(res);
        const { userID, eventID, registrationID, userEmail } = parsedValues;
        console.log("EVENT ID IS:"+eventID );
        console.log("user ID IS:"+userID );
        console.log("registrationID ID IS:"+registrationID );
        console.log("userEmail IS:"+userEmail );

        userIDVal = userID;
        eventIDVal = eventID;
        regIDVal = registrationID;
        emailVal = userEmail;

        //TODO ADD VALIDATIONS!!!
        
        //ADD ATTENDANCE IF ALL GOOD
        postAttendance(SESSION_SEGMENTNO, SESSION_EVENTID, userID, userEmail);

        outputData.innerText = "is true valid";

      } else {
        console.log('JSON is not valid');
        // Handle the scenario where JSON is not valid
      }
    } catch (error) {
      console.error('Error occurred during validation:', error);
      // Handle the error, show a message, etc.
    }

    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });

    // Hide camera
    qrResult.hidden = false;
    canvasElement.hidden = true;
    btnScanQR.hidden = false;
  }
};


btnScanQR.onclick = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      scanning = true;
      qrResult.hidden = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true);
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

//recursive
function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}

//NOT WORKING
function isValid(str) {
  try {
    const data = JSON.parse(str);
    if (
      typeof data === 'object' &&
      data !== null &&
      Object.keys(data).length === 4 &&
      'userID' in data &&
      'eventID' in data &&
      'registrationID' in data &&
      'userEmail' in data &&
      /^\d+$/.test(data.userID) &&
      /^\d+$/.test(data.eventID) &&
      /^\d+$/.test(data.registrationID)
    ) {
      //convert string representations of integers to actual int
      const userID = parseInt(data.userID);
      const eventID = parseInt(data.eventID);
      const registrationID = parseInt(data.registrationID);

      if (!Number.isNaN(userID) && !Number.isNaN(eventID) && !Number.isNaN(registrationID)) {
        return 'true';
      }
    }
    return 'error sad';
  } catch (error) {
    return error.toString();
  }
}



//get values form json
function getValuesFromJSONString(jsonString) {
    try {
      const jsonObject = JSON.parse(jsonString);
  
      if (jsonObject && typeof jsonObject === 'object') {
        const { userID, eventID, registrationID, userEmail } = jsonObject;
        return { userID, eventID, registrationID, userEmail };
      } else {
        throw new Error('invalid json');
      }
    } catch (error) {
      console.error('error:',error.message);
      return null;
    }
  }


  function getSegmentsAndOpenModal(eventID) {
    fetch(`/api/segments/${eventID}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(segments => {
        console.log('Segments:', segments);
        populateModalWithSegments(segments, eventID);
      })
      .catch(error => {
        console.error('Error fetching segments:', error);
      });
  }
  
  function populateModalWithSegments(segments, eventID) {
    console.log('asd');
    console.log(segments);

    segments.forEach(segment => {
      console.log(segment.SegmentName);
      openModal(segments, eventID);
    });
  }

  function openModal(data, eventID) {
    

    var modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = ''; 

    //build select buttons PLS FIX
    data.forEach(function(segment) {
      var rowDiv = document.createElement('div');
      rowDiv.classList.add('row', 'mb-2');

      var selectButtonDiv = document.createElement('div');
      selectButtonDiv.classList.add('col');

      var selectButton = document.createElement('button');
      selectButton.classList.add('btn', 'btn-primary', 'w-100', 'mb-2');
      selectButton.textContent = segment.SegmentName;


    selectButton.addEventListener('click', function() {
      console.log("BTN CLICK");
      console.log(segment.SegmentNo);
      console.log(eventID);
      setSessionVariables(eventID, segment.SegmentNo);
      myModal.hide();
      SESSION_EVENTID = eventID;
      SESSION_SEGMENTNO = segment.SegmentNo;
      startChecking();
      
    });

    //add buttons to the modal
      selectButtonDiv.appendChild(selectButton);
      rowDiv.appendChild(selectButtonDiv);
      modalContent.appendChild(rowDiv);
    });

    // Show the modal
    myModal.show();
  }


function populateEvents(OrganizerID){
  const eventModalBody = document.getElementById('modalContentEvent');
  fetch(`/api/events/${OrganizerID}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(events => {
    console.log('events:', events);
    events.forEach(event => {
      // Create a button element for each event
      const button = document.createElement('button');
      button.textContent = event.EventName; // Set the button text to event name
      button.classList.add('btn', 'btn-primary', 'w-100', 'mb-2'); // Optionally add a class for styling
      
      button.addEventListener('click', () => {
        console.log(`Button clicked for event ${event.eventID}`);
        // openModalSegments(event.eventID);
        getSegmentsAndOpenModal(event.eventID);
        eventModal.hide() 
      });

      // Append the button to the modal
      eventModalBody.appendChild(button);
    });
  })
  .catch(error => {
    console.error('Error fetching segments:', error);
  });
}


// WHEN EJS IS OPENED SHOW BEGINNING MODAL IF NO SESSION  
document.addEventListener('DOMContentLoaded', function() {
  fetch('/getAttendanceInfo')
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok');
    })
    .then(data => {
      const { eventID, segmentNo } = data || {};

      if (eventID && segmentNo) {
        //do nothing
        //if session already set

        SESSION_EVENTID = eventID;
        SESSION_SEGMENTNO = segmentNo;

        startChecking();
        console.log('attendance session info already exists');
      } else {
        populateEvents(orgId);
        // Show the selectEventModal
        eventModal.show();
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});


//set session variables via a POST request
function setSessionVariables(eventID, segmentNo) {
  fetch('/setSessionVariables', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ eventID, segmentNo }),
  })
    .then(response => {
      if (response.ok) {
        console.log('Session variables updated successfully!');
      } else {
        console.error('Failed to update session variables.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function showAnAlert(message) {
  // Create the alert element dynamically
  const alertElement = document.createElement('div');
  alertElement.classList.add('alert', 'alert-info', 'alert-dismissible', 'fade', 'show');
  alertElement.setAttribute('role', 'alert');
  alertElement.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  // Append the alert to a container in the DOM
  const alertContainer = document.getElementById('alertContainer');
  if (alertContainer) {
    alertContainer.appendChild(alertElement);
  }

  // Close the alert after 3 seconds
  setTimeout(() => {
    alertElement.classList.remove('show');
    alertElement.classList.add('hide');
    setTimeout(() => {
      alertElement.remove();
    }, 500);
  }, 3000);
}

function startChecking(){
  showAnAlert(`Checking attendance for Event:${SESSION_EVENTID} segment ${SESSION_SEGMENTNO}`);
  showAnAlert('click on the QR code to scan QR');
}

function postAttendance(segment, event, user, email){
    var postData = {
      segmentNo: segment,
      eventID: event,
      userID: user
    };

    fetch('/attendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(response => {
      if (response.ok) {
        showAnAlert(`${email} has attended the event!`);
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      outputData.innerHTML = "Attendance already checked"
    });
    
    
    
    
}