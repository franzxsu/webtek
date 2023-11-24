const express = require('express')
const { request } = require('http')
const path = require('path')
const app = express()
const mysql = require('mysql')
const port = 3000

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'wibtik'
});

connection.connect((err) => {
  if(err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database successfully!')
})

app.set('view engine', 'ejs')

app.use('/scripts', express.static(path.join(__dirname, 'scripts')))

app.get('/', (req, res) => {
  res.render("../admin/login.php")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`http://localhost:${port}/`)
})  

app.get('/login', (req, res) => {
    res.render('../admin/login.php')
    res.send('naklik jay login')
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
          res.status(200).send(`<h1>Hello, ${username}! Welcome!</h1>`);
        } else {
          // non user
          res.status(401).send('<h1>Invalid username or password</h1>');
        }
      }
    )
  });