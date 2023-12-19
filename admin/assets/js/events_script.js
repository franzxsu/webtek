
const eventIDs = document.querySelectorAll('.eventReg');
const eventIDsAtt = document.querySelectorAll('.eventAttended');
const eventAttendEmail = document.querySelectorAll('.viewAttendedEmails');
const feedbacks = document.querySelectorAll('.feedbacksForEvent');

const emailContainer = document.getElementById(`putEmailsHere_<%= event.eventID %>`);

const downloadButtons = document.querySelectorAll('.downloadEmailButton');

eventIDs.forEach((element) => {
	const eventID = element.id.split('_')[1];
	console.log(eventID);
	fetch(`/registeredUsers/${eventID}`)
		.then(response => response.json())
		.then(data => {
			document.getElementById(`eventRegisteredFor_${eventID}`).innerText = data.rowCount;
		})
});

eventIDsAtt.forEach((element) => {
	const eventID = element.id.split('_')[1];
	console.log(eventID);
	fetch(`/attendedUsers/${eventID}`)
		.then(response => response.json())
		.then(data => {
			document.getElementById(`eventAttendedFor_${eventID}`).innerText = data.rowCount;
		})
});

eventAttendEmail.forEach((element) => {
	const eventID = element.id.split('_')[1];
	console.log(eventID);
	fetch(`/attendanceList/${eventID}`)
	  .then(response => response.json())
	  .then(response => {
		console.log(response);
  
		console.log("ROWS: " + response.rows.length + " FOR EVENT ID: " + eventID);
		for (let i = 0; i < response.rows.length; i++) {
		  const elementEmail = document.createElement("p");
		  elementEmail.innerText = response.rows[i].email;
		  elementEmail.classList.add(`emailAttended_${eventID}`);
		  document.getElementById(`putEmailsHere_${eventID}`).insertBefore(elementEmail, this.firstChild);
		}
	  });
  });

  
  feedbacks.forEach((element) => {
	const eventID = element.id.split('_')[1];
	console.log(eventID);
	fetch(`/getFeedback/${eventID}`)
	  .then(response => response.json())
	  .then(response => {
		console.log(response);
  
		for (let i = 0; i < response.rows.length; i++) {
			//remove no feedback tag
			const removeIfExists = document.getElementById(`removeIfMeron_${eventID}`);
			//check if already removed, remove if not
			if (removeIfExists) {
				removeIfExists.remove();
			}
		  const elementMsg = document.createElement("p");
		  elementMsg.innerText = response.rows[i].message;
		  document.getElementById(`modalFeedback_${eventID}`).appendChild(elementMsg);
		}
	  });
  });
  
  //download files given the event id
  function initiateDownload(eventID) {
	const emails = gatherEmails(eventID);
	const csvContent = convertToCSV(emails);
	// FILE NAME
	const fileName = `emailsForEventId${eventID}.csv`;
	const link = document.createElement("a");
	link.setAttribute("href", csvContent);
	link.setAttribute("download", fileName);
	document.body.appendChild(link);
	link.click();
  }
  

  //make a download function for each download button
  downloadButtons.forEach((button) => {
	button.addEventListener('click', (event) => {
	  const clickedButtonID = event.target.id;
	  const eventID = clickedButtonID.split('_')[1];
	  initiateDownload(eventID);
	});
  });
  
  //get emails of attended for every eventid by getting html elements with the class emailAttended
  function gatherEmails(eventID) {
	const emailElements = document.querySelectorAll(`.emailAttended_${eventID}`);
	const emails = Array.from(emailElements).map((element) => element.textContent.trim());
	return emails;
  }

  //convert to csv replacve commas with newline
  function convertToCSV(emails) {
	const csvContent = "data:text/csv;charset=utf-8," +
	  emails.map((email) => email.replace(",", ""))
	  .join("\n");
	return encodeURI(csvContent);
  }