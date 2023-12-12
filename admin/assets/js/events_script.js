
const eventIDs = document.querySelectorAll('.eventReg');
const eventIDsAtt = document.querySelectorAll('.eventAttended');
const eventAttendEmail = document.querySelectorAll('.viewAttendedEmails');
const emailContainer = document.getElementById("putEmailsHere");

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

			console.log("ROWS: "+response.rows.length +" FOR EVENT ID: "+eventID);
			for (let i = 0; i < response.rows.length; i++) {
				const elementEmail = document.createElement("p");
				// console.log("FOR EVENT ID: "+eventID);
				// console.log("ATTENDED: "+response.rows[i].email)
				elementEmail.innerText = response.rows[i].email;
				emailContainer.insertBefore(elementEmail, emailContainer.firstChild);
			}
		});
});
