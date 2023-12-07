const express = require('express');
const router = express.Router();
const db = require('../database_handler.js');

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

router.get('/index', (req, res) => {
  //check if there is session
  if (req.session.userData) {
    // console.log(req.session.userData);
    res.render('index.ejs',{
      orgName: req.session.userData.OrganizationName,
    });
  //go to login if there is no session set
  } else {
    res.redirect('/login');
  }
});

router.get('/profile', async (req, res) => {
    //check for session (todoextract)
    if (req.session.userData) {
        // console.log("ID"+req.session.userData.OrganizerID)
        const orgMembers = await db.getOrganizationMembers(req.session.userData.OrganizerID);
        const allEvents = await db.getAllEvents(req.session.userData.OrganizerID);
        const pastEvents = await db.getCompletedEvents(req.session.userData.OrganizerID);
        const upcomingEvents = await db.getUpcomingEvents(req.session.userData.OrganizerID);
        const success = req.query.success;
        console.log("SUCCESS");
        console.log(success);
        res.render('profile.ejs',{
          orgName: req.session.userData.OrganizationName,
          orgEmail: req.session.userData.Email,
          orgId: req.session.userData.OrganizerID,
          orgMembers: orgMembers,
          allEvents: allEvents,
          pastEvents: pastEvents,
          upcomingEvents: upcomingEvents,
          success: success
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
          res.redirect('/profile?success=true');
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



module.exports = router;
