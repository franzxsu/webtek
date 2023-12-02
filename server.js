const express = require('express');
const session = require('express-session');
const cookieMonster = require('cookie-parser');
const { request } = require('http');
const path = require('path');
const mysql = require('mysql');
const port = 3000

const app = express()

// palitan nyo db name if it isnt connecting here
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'webteknameronadmin'
});

connection.connect((err) => {
  if(err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database successfully!')
})

app.listen(port, () => {
  console.log(`Admin / EO application listening on port ${port}`)
  console.log(`http://localhost:${port}/`)
})  

app.set('view engine', 'ejs')

app.use('/admin/scripts', express.static(path.join(__dirname, 'admin/scripts')))

app.use(cookieMonster());
app.use(session({
  secret: 'idk', // i have no idea what this does
  resave: false,
  saveUninitialized: true,
  // store: seshonStorage,
  cookie: {
    secure: false,
  }
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.redirect("/login");
})

app.get('/login', (req, res) => {
    if (req.session.adminId) {
      res.redirect('/admin_dashboard');
    } else if (req.session.eventOrgId) {
      res.redirect('/eo_dashboard');
    } else {
      res.render('../admin/login.ejs');
    }
})


app.get('/admin_dashboard', (req, res) => {
  if (req.session.adminId) {
    res.render('../admin/admin_dashboard.ejs');
  } else {
    console.log('di ka na nakalog-in admin boi haha')
    res.redirect('/login');
  }
});

app.get('/eo_dashboard', (req, res) => {
  if (req.session.eventOrgId) {
    res.render('../admin/eo_dashboard.ejs');
  } else {
    console.log('di ka na nakalog-in event organizer boi haha')
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
  if (req.session.eventOrgId || req.session.adminId) {
    const queryString = `SELECT * FROM events`;

    connection.query(queryString, (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Error verifying credentials!');
        return;
      }

      if (results && results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).json({message: 'No events found!'});
      }
    });
  } else {
    console.log('ops bat ka andito bawal balik ka');
    res.redirect('/login')
  }
});



app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session road:", err);
      res.status(500).send('Error logging out')
    } else {
      console.log("logout si parecakes")
      res.redirect('/login');
    }
  })
});

app.post('/verify', (req, res) => {
  const {username, password} = req.body;

  const queryString = `
  SELECT id AS AdminOrOrgID, username AS UsernameOrOrganizationName, password AS Password
  FROM admin
  WHERE username = ? AND password = ?
  UNION
  SELECT OrganizerID AS AdminOrOrgID, OrganizationName AS UsernameOrOrganizationName, password AS Password
  FROM eventorganizers
  WHERE OrganizationName = ? AND password = ? `;

  connection.query( queryString, [username, password, username, password], (error, results) => {
    if(error) {
      console.error('Error querying database:', error);
      res.status(500).send('Error verifying credentials!');
      return;
    }

    if (results && results.length > 0) {
      // yes user
      const user = results[0];

      if (req.session.adminId || req.session.eventOrgId) {
        res.status(401).json({message: 'User is already logged in!'});
        return;
      }

      if (user.AdminOrOrgID && user.AdminOrOrgID < 1000) {
        // log in si admin
        req.session.username = username;
        req.session.adminId = user.AdminOrOrgID;
        console.log("log in si admin: " + req.session.adminId);
        res.redirect('/admin_dashboard');

      } else if (user.AdminOrOrgID && user.AdminOrOrgID >= 1000) {
        // log in si event organizer
        req.session.username = username;
        req.session.eventOrgId = user.AdminOrOrgID;
        console.log("log in si event organizer: " + req.session.eventOrgId);
        res.redirect('/eo_dashboard');
      }

    } else {
      // non user
      res.status(401).json( {message: 'Invalid username or password! Try again. tite' });
    }
  }
  )
});

app.post('/createEvent', (req, res) => {

  const eventData = req.body;
  console.log(req.body);

  if (!(eventData.eventDateEnd >= eventData.eventDateStart)) {
    res.status.apply(406).json( {message: 'How did you do this lol'});
    return;
  }

  const insertQuery = `
  INSERT INTO events (OrganizerId, EventName, EventInfo, EventDateStart, EventDateEnd, EventLocation, courseID, OrganizationID)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?) `;

  const values = [
    eventData.id,
    eventData.eventName,
    eventData.eventFor,
    eventData.eventDateStart,
    eventData.eventDateEnd,
    eventData.eventVenue,
    eventData.courseID !== undefined ? eventData.courseID : null,
    eventData.OrganizationID !== undefined ? eventData.OrganizationID : null
  ];

  connection.query(insertQuery, values, (error) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).send('Error verifying credentials!');
      return;
    } else {
      console.log("Data inserted successfully!")
      res.status(200).json( {message: 'Event successfully created!'});
    }
  });
});