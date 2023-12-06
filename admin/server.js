// https://www.geeksforgeeks.org/reading-query-parameters-in-node-js/

const express = require('express');
const session = require('express-session');
const cookieMonster = require('cookie-parser');
const { request } = require('http');
const path = require('path');
const port = 3000
const db = require("../admin/database_handler.js");

const app = express()

app.listen(port, () => {
  console.log(`Admin / EO application listening on port ${port}`)
  console.log(`http://localhost:${port}/`)
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/scripts', express.static(path.join(__dirname,'scripts')));
app.use('/public/assets/bootstrap/css', express.static(path.join(__dirname, 'public/assets/bootstrap/css')));
app.use('/public/assets/fonts', express.static(path.join(__dirname, 'public/assets/fonts')));

app.use(express.static('public'));

app.use(cookieMonster());
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
  }
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ----------------------------------------- ROUTES -----------------------------------------

app.get('/', (req, res) => {
  res.redirect("/login");
})

app.get('/login', (req, res) => {
    if (req.session.adminId) {
      res.redirect('/index');
    } else if (req.session.eventOrgId) {
      res.redirect('/index');
    } else {
      res.render('login.ejs');
    }
})


app.get('/index', (req, res) => { 
  if (req.session.eventOrgId) {
    res.render('index.ejs',{
      orgName: req.session.username,
    });

  } else {
    console.log('redirecting to login')
    res.redirect('/login');
    
  }
});

app.get('/profile', (req, res) => { 
  if (req.session.eventOrgId) {
    res.render('profile.ejs',{
      orgName: req.session.username,
      orgEmail: req.session.email
    });

  } else {
    console.log('redirecting to login')
    res.redirect('/login');
    
  }
});

app.get('/admin_dashboard', (req, res) => {
  if (req.session.adminId) {
    res.render('admin_dashboard.ejs');
  } else {
    console.log('di na nakalog-in admin')
    res.redirect('/login');
  }
});

app.get('/eo_dashboard', (req, res) => {
  if (req.session.eventOrgId) {
    res.render('eo_dashboard.ejs');
  } else {
    console.log('di na nakalog-in event organizer')
    res.redirect('/login');
  }
});

app.get('/sendDeets', (req, res) => {
  if (req.session.adminId) {
    res.status(200).json({
        id: req.session.adminId,
        username: req.session.username
    });
  } else if (req.session.eventOrgId) {
    res.status(200).json({
      id: req.session.eventOrgId,
      username: req.session.username
    })
  } else {
    res.status(404).json({ error: 'User not found!'});
  } 
});



app.get('/viewEvents', (req, res) => {
  if (req.session.eventOrgId) {
    const { sortBy, sortOrder } = req.query;
    let queryString = 'SELECT * FROM events';

    if (sortBy) {
      queryString += ` ORDER BY ${sortBy}`;
      if (sortOrder && (sortOrder.toUpperCase() === 'ASC' || sortOrder.toUpperCase() === 'DESC')) {
        queryString += ` ${sortOrder.toUpperCase()}`;
      }
    }

    // executeQuery(req, res, queryString);
  } else {
    console.log('Unauthorized access: Redirecting to login');
    res.status(401).redirect('/login');
  }
});

app.get('/viewOrgEvents', (req, res) => {
  if (req.session.eventOrgId) {
    const eventOrgId = req.session.eventOrgId;
    const { sortBy, sortOrder } = req.query;

    let queryString = `SELECT * FROM events WHERE OrganizerId = ${eventOrgId}`;

    if (sortBy) {
      queryString += ` ORDER BY ${sortBy}`;
      if (sortOrder && (sortOrder.toUpperCase() === 'ASC' || sortOrder.toUpperCase() === 'DESC')) {
        queryString += ` ${sortOrder.toUpperCase()}`;
      }
    }

    // executeQuery(req, res, queryString);
  } else {
    console.log('Unauthorized access: Redirecting to login');
    res.status(401).redirect('/login');
  }
});


app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).send('Error logging out!')
    } else {

      res.redirect('/login');
    }
  })
});

app.post('/auth', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userData = await db.authLogIn(username, password);
    console.log(userData);

    if (userData !== null) {
      console.log(userData['OrganizerID']);

      if (req.session.adminId || req.session.eventOrgId) {
        res.status(401).json({ message: 'User is already logged in!' });
        return;
      }

      if (userData['OrganizerID'] >= 1000) {
        // log in as admin
        req.session.username = userData['OrganizationName'];
        req.session.adminId = userData['OrganizerID'];
        req.session.email = userData['Email'];
        console.log("Logged in as admin: " + req.session.adminId);
        res.redirect('/index');
      } else {
        // log in as event organizer
        req.session.username = userData['OrganizationName'];
        req.session.eventOrgId = userData['OrganizerID'];
        req.session.email = userData['Email'];
        
        console.log("Logged in as event organizer: " + req.session.eventOrgId);
        res.redirect('/index');
      }
    } 
    else {
      // Authentication failed
      res.status(401).json({ message: 'Invalid username or password! Try again.' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ message: 'Error authenticating user' });
  }
});


app.post('/createEvent', (req, res) => {

  if (req.session.eventOrgId) {
    const eventData = req.body;
    console.log(req.body);

    // sakaling may nakapasa sa client-side alert somehow na invalid date
    if (!(eventData.eventDateEnd >= eventData.eventDateStart)) {
      res.status.apply(406).json( {message: 'Invalid date! Please try again.'});
      return;
    } else {
      try {
        db.createEvent(eventData);
        res.status(200).json({message: 'Event successfully created!'});
      } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Error encountered when adding the event!');
      }
    }
  } else {
    console.log('Unauthorized access: Redirecting to login');
    res.status(401).redirect('/login');
  }
});
