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



let scanning = false;
let userIDVal;
let eventIDVal;

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
        const { userID, eventID } = parsedValues;
        console.log("EVENT ID IS:"+eventID );

        userIDVal = userID;
        eventIDVal = eventID;

        outputData.innerText = "is true valid";
        getSegmentsAndOpenModal(eventID);

        // Other logic based on a valid JSON
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

function isValid(str) {
  try {
    const data = JSON.parse(str);
    if (
      typeof data === 'object' &&
      data !== null &&
      Object.keys(data).length === 2 &&
      'userID' in data &&
      'eventID' in data &&
      /^\d+$/.test(data.userID) &&
      /^\d+$/.test(data.eventID)
    ) {
      // Convert string representations of integers to actual integers
      const userID = parseInt(data.userID);
      const eventID = parseInt(data.eventID);

      if (!Number.isNaN(userID) && !Number.isNaN(eventID)) {
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
        const { userID, eventID } = jsonObject;
        return { userID, eventID };
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
        populateModalWithSegments(segments);
      })
      .catch(error => {
        console.error('Error fetching segments:', error);
      });
  }
  
  function populateModalWithSegments(segments) {
    openModal(segments);
    segments.forEach(segment => {
      console.log(segment.SegmentName);
    });
  }

  function openModal(data) {
    var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
      keyboard: false
    });

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


        var postData = {
          segmentNo: segment.SegmentNo,
          eventID: eventIDVal,
          userID: userIDVal
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
            alert('ATTENDANCE FOR SEGMENT: ' + segment.SegmentNo + 'OF EVENTID: '+eventIDVal+' OF USER '+userIDVal+'ADDED TO DATABASE');
            
            console.log("ATTEMDANCE ADDED");
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
    });
      selectButtonDiv.appendChild(selectButton);
      rowDiv.appendChild(selectButtonDiv);
      modalContent.appendChild(rowDiv);
    });

    // Show the modal
    myModal.show();
  }


function populateEvents(OrganizerID){
  const eventModal = document.getElementById('selectEventModal');
  fetch(`/api/events/${OrganizerID}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(events => {
    console.log('events:', events);
    // populateModalsEvents(events);
    console.log('asd: ',orgId);
  })
  .catch(error => {
    console.error('Error fetching segments:', error);
  });
}

// WHEN EJS IS OPENED SHOW BEGINNING MODAL
document.addEventListener('DOMContentLoaded', function() {
  populateEvents(orgId);
  // Show the selectEventModal
  var eventModal = new bootstrap.Modal(document.getElementById('selectEventModal'));
  eventModal.show();
});