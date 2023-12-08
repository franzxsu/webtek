const express = require('express');
const router = express.Router();
const db = require('../database_handler.js');

const multer = require('multer');

//store to memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

router.get('/index', async  (req, res) => {
  //check if there is session
  if (req.session.userData) {
    // console.log(req.session.userData);
    const success=req.query.eventSuccess

    res.render('index.ejs',{
      orgName: req.session.userData.OrganizationName,
      orgId: req.session.userData.OrganizerID,
      success: success
    });
  //go to login if there is no session set
  } else {
    res.redirect('/login');
  }
});

router.get('/attendance', async  (req, res) => {
  //check if there is session
  if (req.session.userData) {

    res.render('attendance.ejs',{
      orgName: req.session.userData.OrganizationName,
      orgId: req.session.userData.OrganizerID,
    });
  //go to login if there is no session set
  } else {
    res.redirect('/login');
  }
});

router.get('/events', async  (req, res) => {
  //check if there is session
  if (req.session.userData) {

    res.render('events.ejs',{
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

router.get('/profile', async (req, res) => {

    if (req.session.userData) {
        // console.log("ID"+req.session.userData.OrganizerID)
        const orgMembers = await db.getOrganizationMembers(req.session.userData.OrganizerID);
        const allEvents = await db.getAllEvents(req.session.userData.OrganizerID);
        const pastEvents = await db.getCompletedEvents(req.session.userData.OrganizerID);
        const upcomingEvents = await db.getUpcomingEvents(req.session.userData.OrganizerID);
        const success = req.query.success;
        const successRemove = req.query.successRemove;
        const emailOfAddedMember = req.query.email;
        res.render('profile.ejs',{
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

router.post('/auth', async (req, res) => {
    const { username, password } = req.body;
    try {
      const userData = await db.authLogIn(username, password);
        //check if query returned row
      if (userData !== null) {
        //set session data and fo to index
        req.session.userData = userData;
        res.redirect('/index');
      } else {
        //go back to login
        res.render('login', { error: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error authenticating user:', error);
      res.status(500).json({ message: 'Error authenticating user' });
    }
});

router.post('/addOrgMember', async (req, res) => {
  const { email, orgid } = req.body;
  try {
      const bool = await db.addOrgMember(orgid, email);
      if (bool) {
          // Success adding member
          console.log("go to success")
          res.redirect(`/profile?success=true&email=${encodeURIComponent(email)}`);
      } else {
          // Handle failure to add member
          console.log("go to failure")
          res.redirect('/profile?success=false');
      }
  } catch (error) {
      console.error('Error adding member:', error);
      res.status(500).json({ message: 'Error adding member' });
  }
});

router.post('/removeOrgMember', async (req, res) => {
  const { memberEmail, orgid } = req.body;
  try {
      const bool = await db.removeOrgMember(orgid, memberEmail);
      if (bool) {
          // Success adding member
          console.log("go to success")
          res.redirect(`/profile?successRemove=true&email=${encodeURIComponent(memberEmail)}`);
      } else {
          // Handle failure to add member
          console.log("go to failure")
          res.redirect('/profile?successRemove=false');
      }
  } catch (error) {
      console.error('Error adding member:', error);
      res.status(500).json({ message: 'Error adding member' });
  }
});

router.post('/removeEvent', async (req, res) => {
  const { eventID } = req.body;
  try {
      const bool = await db.removeEvent(eventID);
      if (bool) {

          console.log("success remove event")
          res.redirect(`/events?successRemove=true`);
      } else {

          console.log("fail")
          res.redirect('/events?successRemove=false');
      }
  } catch (error) {
      console.error('Error adding member:', error);
      res.status(500).json({ message: 'Error adding member' });
  }
});

router.post('/createEvent', upload.single('eventPoster'), async (req, res) => {
  try {
    let { 
      orgid,
      eventName,
      eventLocation,
      eventInfo,
      eventDateStart,
      eventDateEnd,
      visibility,
      course } = req.body;

      // const fileBuffer = req.file.buffer;
      // console.log(fileBuffer);

      // const posterBlob = new Blob([fileBuffer]);
      let posterBlob = null;

      if (req.file) {
        posterBlob = Buffer.from(req.file.buffer);
      }

    //   const bufferToBlob = (bufferData, contentType) => {
    //     const arrayBuffer = bufferData.buffer.slice(
    //         bufferData.byteOffset, bufferData.byteOffset + bufferData.byteLength
    //     );
    
    //     return new Blob([arrayBuffer], { type: contentType });
    // };
    
    // const posterBlob = bufferToBlob(req.file.buffer, 'image/jpeg');
    // console.log(posterBlob);
    

    if (visibility === 'Course') {
      console.log('course chosen');
    }
    
    //for good measure
    else{
      course = null
    }

    // console.log('orgid:', orgid);
    // console.log('eventName:', eventName);
    // console.log('eventInfo:', eventInfo);
    // console.log('eventDateStart:', eventDateStart);
    // console.log('eventDateEnd:', eventDateEnd);
    // console.log('eventLocation:', eventLocation);
    // console.log('course:', course);
    // console.log('visibility:', visibility);
    // console.log('posterBlob:', posterBlob);

    const bool = await db.createEvent(orgid, eventName, eventInfo, 
      eventDateStart, eventDateEnd, eventLocation, course, visibility, posterBlob);

      console.log(bool);

      if(bool){
        console.log('go success');
        res.redirect('/index?eventSuccess=true');
      } else{
        //fail
        console.log('event creation fail');
        res.redirect('/index?eventSuccess=false');
      }

    // res.status(200).json({ message: 'Event created successfully!' });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Error creating event' });
  }
});



module.exports = router;
