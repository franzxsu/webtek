const express = require('express');
const router = express.Router();
const db = require('../database_handler.js');

const multer = require('multer');

//store to memory
const storage = multer.memoryStorage();
const upload = multer({
	storage: storage
});

router.get('/', (req, res) => {
	res.redirect('/login');
});

router.get('/login', (req, res) => {
	//check if there is userdata, if there is, go to index
	if (req.session.userData) {
		res.redirect('/index');
	}
	//render login view if no userdata
	else {
		res.render('login.ejs');
	}
});

router.get('/index', async (req, res) => {
    // Check if there is a session
    if (req.session.userData) {
        const success = req.session.eventSuccess || false; // Retrieve the success flag from the session
		let newEventId = null;
		if (success===true){
			newEventId = req.session.successEventId //eventId Flag
		}

		
        
    
		//clear flags after using it
        req.session.eventSuccess = false;
		req.session.successEventId = null;

        res.render('index.ejs', {
            orgName: req.session.userData.OrganizationName,
            orgId: req.session.userData.OrganizerID,
			newEventId: newEventId,
            success: success,
            currentPath: req.path,
			orgOngoingEvents: await db.getOngoingEvents(req.session.userData.OrganizerID),
			orgUpcomingEvents: await db.getUpcomingEvents(req.session.userData.OrganizerID),
			orgPastEvents: await db.getCompletedEvents(req.session.userData.OrganizerID)
        });
    } else {
        res.redirect('/login');
    }
});



router.get('/events', async (req, res) => {
	//check if there is session
	if (req.session.userData) {

		res.render('events.ejs', {
			orgName: req.session.userData.OrganizationName,
			orgId: req.session.userData.OrganizerID,
			orgOngoingEvents: await db.getOngoingEvents(req.session.userData.OrganizerID),
			orgUpcomingEvents: await db.getUpcomingEvents(req.session.userData.OrganizerID),
			orgPastEvents: await db.getCompletedEvents(req.session.userData.OrganizerID)
		});
		//go to login if there is no session set
	} else {
		res.redirect('/login');
	}
});

router.get('/about', async (req, res) => {
	//check if there is session
	if (req.session.userData) {
		res.render('about.ejs', {
			orgName: req.session.userData.OrganizationName,
			orgId: req.session.userData.OrganizerID,
		});
	} else {
		res.redirect('/login');
	}
});

router.get('/profile', async (req, res) => {

	if (req.session.userData) {
		// 
		const orgMembers = await db.getOrganizationMembers(req.session.userData.OrganizerID);
		const allEvents = await db.getAllEvents(req.session.userData.OrganizerID);
		const pastEvents = await db.getCompletedEvents(req.session.userData.OrganizerID);
		const upcomingEvents = await db.getUpcomingEvents(req.session.userData.OrganizerID);
		const success = req.query.success;
		const successRemove = req.query.successRemove;
		const emailOfAddedMember = req.query.email;
		res.render('profile.ejs', {
			orgName: req.session.userData.OrganizationName,
			orgEmail: req.session.userData.Email,
			orgId: req.session.userData.OrganizerID,
			orgMembers: orgMembers,
			allEvents: allEvents,
			pastEvents: pastEvents,
			upcomingEvents: upcomingEvents,
			success: success,
			successRemove: successRemove,
			addedEmail: emailOfAddedMember
		});

	} else {

		res.redirect('/login');
	}
});

router.get('/logout', (req, res) => {
	//remove session then reditrect to login
	req.session.destroy((err) => {
		if (err) {
			console.error("Error destroying session:", err);
			res.status(500).send('Error logging out!')
		} else {
			res.redirect('/login');
		}
	})
});

router.get('/attendance', async (req, res) => {
	//check if there is session
	if (req.session.userData) {

		res.render('attendance.ejs', {
			orgName: req.session.userData.OrganizationName,
			orgId: req.session.userData.OrganizerID,
		});
		//go to login if there is no session set
	} else {
		res.redirect('/login');
	}
});

router.post('/auth', async (req, res) => {
	const {
		username,
		password
	} = req.body;
	try {
		const userData = await db.authLogIn(username, password);
		//check if query returned row
		if (userData !== null) {
			//set session data and fo to index
			req.session.userData = userData;
			res.redirect('/index');
		} else {
			//go back to login
			res.render('login', {
				error: 'Invalid username or password'
			});
		}
	} catch (error) {
		console.error('Error authenticating user:', error);
		res.status(500).json({
			message: 'Error authenticating user'
		});
	}
});

router.post('/addOrgMember', async (req, res) => {
	const {
		email,
		orgid
	} = req.body;
	try {
		const bool = await db.addOrgMember(orgid, email);
		if (bool) {
			// Success adding member
			
			res.redirect(`/profile?success=true&email=${encodeURIComponent(email)}`);
		} else {
			// Handle failure to add member
			
			res.redirect('/profile?success=false');
		}
	} catch (error) {
		console.error('Error adding member:', error);
		res.status(500).json({
			message: 'Error adding member'
		});
	}
});

router.post('/removeOrgMember', async (req, res) => {
	const {
		memberEmail,
		orgid
	} = req.body;
	try {
		const bool = await db.removeOrgMember(orgid, memberEmail);
		if (bool) {
			// Success adding member
			
			res.redirect(`/profile?successRemove=true&email=${encodeURIComponent(memberEmail)}`);
		} else {
			// Handle failure to add member
			
			res.redirect('/profile?successRemove=false');
		}
	} catch (error) {
		console.error('Error adding member:', error);
		res.status(500).json({
			message: 'Error adding member'
		});
	}
});

router.post('/removeEvent', async (req, res) => {
	const {
		eventID
	} = req.body;
	try {
		const bool = await db.removeEvent(eventID);
		if (bool) {

			
			res.redirect(`/events?successRemove=true`);
		} else {

			
			res.redirect('/events?successRemove=false');
		}
	} catch (error) {
		console.error('Error adding member:', error);
		res.status(500).json({
			message: 'Error adding member'
		});
	}
});

router.post('/createEvent', upload.single('eventPoster'), async (req, res) => {
	try {
		
		

		
		let {
			orgid, eventName, eventLocation, eventInfo, 
			eventDateStart, eventDateEnd, visibility, course
		} = req.body;
		let posterBlob = null;

		//if there is poster uploaded
		if (req.file) {
			posterBlob = Buffer.from(req.file.buffer);
		}
		if (visibility === 'Course') {
			
		}

		//for good measure
		else {
			course = null
		}

		const newEventId = await db.createEvent(orgid, eventName, eventInfo,
			eventDateStart, eventDateEnd, eventLocation, course, visibility, posterBlob);

		
		let success = true;
		if (newEventId) {
			
			let eventID = newEventId;
			

			//GET SEGMENTS SINCE SEGMENTS CAN VARY FROM 0-5
			for (const key in req.body) {
				if (key.startsWith('segmentInfo_')) {
					const segmentNumber = key.split('_')[1];
					const segmentInfo = req.body[key];
					
					const segmentSuccess = await db.addSegment(segmentNumber, eventID, segmentInfo);
					
					// Set success to false if any segment fails to add for some reason
					if (!segmentSuccess) {
						success = false;
						break;
					}
				}
			}
			if (success) {
				//success flag
				req.session.eventSuccess = true;
				req.session.successEventId = eventID;
				res.redirect('/index');
			} else {
				req.session.eventSuccess = false;
				req.session.errorMessage = "wrong"; //placeholder
				res.redirect('/index');
			}
		} 
	}catch (error) {
		console.error('Error in route handler:', error);
		req.session.eventSuccess = false;
		req.session.errorMessage = "An error occurred while creating the event"; // Update error message
		res.redirect('/index');
	}
});

router.post('/attendance', async (req, res) => {
	const segmentNo = req.body.segmentNo;
	const eventID = req.body.eventID;
	const userID = req.body.userID;
	const email = req.body.userEmail;
  
	try {
	  const isSuccess = await db.addAttendance(eventID, userID, segmentNo);
	  if (isSuccess) {
		
		res.status(200).json({ message: `${email} has attended the event!`});
	  } else {
		throw new Error('Failed to add attendance.');
	  }
	} catch (error) {
	  if (error.code === 'ER_DUP_ENTRY' || error.sqlState === '23000') {
		console.error('Duplicate entry error:', error);
		res.status(400).json({ error: 'Duplicate entry error. Attendance already exists.' });
	  } else {
		console.error('Error:', error);
		res.status(500).json({ error: 'An error occurred while processing your request.' });
	  }
	}
  });
  
  

router.get('/registeredUsers/:eventId', async (req, res) => {
	const eventId = req.params.eventId;
	try {
		const rows = await db.getRegistered(eventId);
		const rowCount = rows && rows.length > 0 ? rows.length : 0;
		res.send({
			rowCount,
			rows
		});
	} catch (error) {
		console.error('Error fetching registered users:', error);
		res.status(500).send('Error fetching registered users');
	}
});

router.get('/registeredUsersEmails/:eventId', async (req, res) => {
	const eventId = req.params.eventId;
	try {
		const rows = await db.getRegisteredEmails(eventId);
		res.send({
			rows
		});
	} catch (error) {
		console.error('Error fetching registered users:', error);
		res.status(500).send('Error fetching registered users');
	}
});

router.get('/attendedUsersEmails/:eventId', async (req, res) => {
	const eventId = req.params.eventId;
	try {
		const rows = await db.getAttendanceEmails(eventId);
		res.send({
			rows
		});
	} catch (error) {
		console.error('Error fetching registered users:', error);
		res.status(500).send('Error fetching registered users');
	}
});

router.get('/attendedUsers/:eventId', async (req, res) => {
	const eventId = req.params.eventId;
	try {
		const rows = await db.getAttendance(eventId);
		const rowCount = rows && rows.length > 0 ? rows.length : 0;
		res.send({
			rowCount
		});
	} catch (error) {
		console.error('Error fetching registered users:', error);
		res.status(500).send('Error fetching registered users');
	}
});

router.get('/getFeedback/:eventId', async (req, res) => {
	const eventId = req.params.eventId;
	try {
		const rows = await db.getFeedbacks(eventId);
		res.send({
			rows
		});
	} catch (error) {
		console.error('Error fetching FEEDBACKS:', error);
		res.status(500).send('Error fetching FEEDB');
	}
});

router.get('/attendanceList/:eventId', async (req, res) => {
	const eventId = req.params.eventId;
	try {
		const rows = await db.getAttendanceEmails(eventId);
		res.send({
			rows
		});
	} catch (error) {
		console.error('Error fetching registered users:', error);
		res.status(500).send('Error fetching registered users');
	}
});


router.get('/api/segments/:eventID', async (req, res) => {
	const {
		eventID
	} = req.params;

	try {
		const segments = await db.getSegments(eventID);
		res.json(segments);
	} catch (error) {
		console.error('Error fetching segments:', error);
		res.status(500).send('Error fetching segments');
	}
});

router.get('/api/getUserId/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const userId = await db.getUserIdFromEmail(email);
        res.json({ userId });
    } catch (error) {
        console.error('Error fetching uid:', error);
        res.status(500).send('Error fetching uid');
    }
});

router.post('/api/isRegistered', async (req, res) => {
    const { event, user } = req.query;

	
	
	

    try {
        const isRegistered = await db.checkRegistration(event, user);

        if (isRegistered) {
            // If registered, send a success response
            res.status(200).json({ message: 'User is registered' });
        } else {
            // If not registered, send a failure response
            res.status(404).json({ error: 'User is not registered' });
        }
    } catch (error) {
        console.error('Error checking registration:', error);
        res.status(500).json({ error: 'Error checking registration' });
    }
});

router.get('/api/events/:OrganizerID', async (req, res) => {
	const {
		OrganizerID
	} = req.params;

	try {
		const events = await db.getUpcomingEvents(OrganizerID);
		res.json(events);
	} catch (error) {
		console.error('Error fetching segments:', error);
		res.status(500).send('Error fetching segments');
	}
});

//SET SESSION VARIABLES ENDPOINT
router.post('/setSessionVariables', (req, res) => {
	const { eventID, segmentNo } = req.body;

	req.session.eventID = eventID;
	req.session.segmentNo = segmentNo;

	
	
  
	res.sendStatus(200); 
  });
  
  router.post('/clearEvent', (req, res) => {
    delete req.session.eventID;
    delete req.session.segmentNo;

    
    

    res.sendStatus(200);
});


  router.get('/getAttendanceInfo', (req, res) => {
	//check if the session variables are set
	const eventID = req.session && req.session.eventID;
	const segmentNo = req.session && req.session.segmentNo;
  
	// Send the information to the client-side JavaScript
	res.json({ eventID, segmentNo });
  });


module.exports = router;