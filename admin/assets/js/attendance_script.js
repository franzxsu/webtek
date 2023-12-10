var qrcode = window.qrcode;
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");

let scanning = false;

qrcode.callback = res => {
    console.log('QR SCANNED');
  if (res) {
    console.log('in');

    jsonValid = isValid(res);

    if(jsonValid==='true'){
        //handle ok
        outputData.innerText = "is true valid";
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