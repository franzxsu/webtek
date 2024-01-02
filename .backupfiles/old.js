// https://www.geeksforgeeks.org/reading-query-parameters-in-node-js/

const express = require('express');
const session = require('express-session');
const cookieMonster = require('cookie-parser');
const path = require('path');
const port = 3000
const db = require("../admin/database_handler.js");

const app = express()

app.listen(port, () => {
  
  
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/scripts', express.static(path.join(__dirname,'scripts')));
app.use('/public/assets', express.static(path.join(__dirname, 'public/assets')));

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
  //check if there is userdata, if there is, go to index
    if (req.session.userData) {
      res.redirect('/index');
    }
    //render login view if no userdata
    else {
      res.render('login.ejs');
    }
})


app.get('/index', (req, res) => { 
  //check if there is session
  if (req.session.userData) {
    
    res.render('index.ejs',{
      orgName: req.session.userData.OrganizationName,
    });
  //go to login if there is no session set
  } else {
    res.redirect('/login');
  }
});

app.get('/profile', (req, res) => { 
  if (req.session.userData) {
    res.render('profile.ejs',{
      orgName: req.session.userData.OrganizationName,
      orgEmail: req.session.userData.email
    });

  } else {
    
    res.redirect('/login');
    
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
    
    if (userData !== null) {
      req.session.userData = userData;
      res.redirect('/index');
    } else {
      
      res.render('login', { error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ message: 'Error authenticating user' });
  }
});

// app.post('/addmember')

app.post('/createEvent', (req, res) => {

  if (req.session.eventOrgId) {
    const eventData = req.body;
    

    // sakaling may nakapasa sa client-side alert somehow na invalid date
    if (!(eventData.eventDateEnd >= eventData.eventDateStart)) {
      res.status(406).json( {message: 'Invalid date! Please try again.'});
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
    
    res.status(401).redirect('/login');
  }
});

