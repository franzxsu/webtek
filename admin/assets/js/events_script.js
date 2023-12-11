const eventIDs = document.querySelectorAll('.eventReg');

eventIDs.forEach((element) => {
  const eventID = element.id.split('_')[1];
  console.log(eventID);
  fetch(`/registeredUsers/${eventID}`)
  .then(response => response.json())
  .then(data => {
    document.getElementById(`eventRegisteredFor_${eventID}`).innerText = data.rowCount;
  })
});

const eventIDsAtt = document.querySelectorAll('.eventAttended');

eventIDsAtt.forEach((element) => {
  const eventID = element.id.split('_')[1];
  console.log(eventID);
  fetch(`/attendedUsers/${eventID}`)
  .then(response => response.json())
  .then(data => {
    document.getElementById(`eventAttendedFor_${eventID}`).innerText = data.rowCount;
  })
});


