import { getSegments } from '../../database_handler.js'

var qrcode = window.qrcode;
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");
const qrForGettingSegments = document.getElementById("btn-scan-qr");

let scanning = false;

qrcode.callback = res => {
    console.log('QR SCANNED');
  if (res) {
    console.log('in');

    jsonValid = isValid(res);

    if(jsonValid==='true'){
        const parsedValues = getValuesFromJSONString(res);
        if(parsedValues){
            const { userID, eventID } = parsedValues;
            outputData.innerText = "is true valid";
            populateSegmentsInModal(eventID);
        }
        else {
            outputData.innerText = "ERROR IN PARSING JSON";
        }
        
    }
    else{
        outputData.innerText = jsonValid;
    }

    //stop scanning
    scanning = false;

    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });

    //hide camera
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
      Number.isInteger(data.userID) &&
      Number.isInteger(data.eventID)
    ) {
      return 'true';
    }
    return "error sad";
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

function populateSegmentsInModal(eventID) {
    console.log("POPULATEMETHOD");
    getSegments(eventID)
      .then((segments) => {
        const modalBody = document.querySelector('.modal-body');
        const radioGroup = modalBody.querySelector('.row');
  
        radioGroup.innerHTML = '';
        segments.forEach((segment) => {
          const segmentRadio = document.createElement('div');
          segmentRadio.classList.add('form-check');
  
          segmentRadio.innerHTML = `
            <input class="form-check-input" type="radio" name="flexRadioDisabled" id="segment${segment.segmentNo}" value="${segment.segmentNo}">
            <label class="form-check-label" for="segment${segment.segmentNo}">
              ${segment.segmentName}
            </label>
          `;
  
          radioGroup.appendChild(segmentRadio);
        });
      })
      .catch((error) => {
        console.error('err:', error);
      });
  }