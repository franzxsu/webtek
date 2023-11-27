const express = require('express')
const session = require('express-session')
const { request } = require('http')
const path = require('path')
const mysql = require('mysql')
const port = 3000

const app = express()

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
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
  console.log(`Example app listening on port ${port}`)
  console.log(`http://localhost:${port}/`)
})  

app.set('view engine', 'ejs')

app.use('/admin/scripts', express.static(path.join(__dirname, 'admin/scripts')))

app.use(session({
  secret: 'idk',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  res.render("../admin/login.ejs");
})

app.get('/login', (req, res) => {
    res.render('../admin/login.ejs');
})

app.get('/verify', (req, res) => {
  let username = req.query.username;
  let password = req.query.password;

  connection.query(
    'SELECT * FROM admin WHERE username = ? AND password = ?',
    [username, password],
    (error, results, fields) => {
      if(error) {
        console.error('Error querying database:', error);
        res.status(500).send('Error verifying credentials!');
      }

      if (results.length > 0) {
        // yes user
        req.session.username = username;
        res.redirect('/dashboard');
      } else {
        // non user
        res.status(401).json( {message: 'Invalid username or password! Try again. tite' });
      }
    }
  )
});

app.get('/dashboard', (req, res) => {
  if (req.session.username) {
    res.render('../admin/dashboard.ejs');
  } else {
    res.redirect('/login');
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session road:", err);
      res.status(500).send('Error logging out')
    } else {
      res.redirect('/login');
    }
  })
})