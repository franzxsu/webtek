// https://www.geeksforgeeks.org/reading-query-parameters-in-node-js/

const express = require('express');
const session = require('express-session');
const cookieMonster = require('cookie-parser');
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
    console.log(req.session.userData);
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
    console.log('redirecting to login')
    res.redirect('/login');
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
    console.log(userData)
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