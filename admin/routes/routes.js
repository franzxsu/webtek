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
    console.log(req.session.userData);
    res.render('index.ejs',{
      orgName: req.session.userData.OrganizationName,
    });
  //go to login if there is no session set
  } else {
    res.redirect('/login');
  }
});

router.get('/profile', (req, res) => {
    //check for session (todoextract)
    if (req.session.userData) {
        res.render('profile.ejs',{
          orgName: req.session.userData.OrganizationName,
          orgEmail: req.session.userData.email
        });
    
      } else {
        console.log('redirecting to login')
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

module.exports = router;
