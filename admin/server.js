// https://www.geeksforgeeks.org/reading-query-parameters-in-node-js/

const express = require('express');
const session = require('express-session');
const cookieMonster = require('cookie-parser');
const path = require('path');
const port = 3000
const db = require("./database_handler.js");
const routes = require('./routes/routes.js');

const app = express()

// change to a proper scripts path within the admin folder instead of .backupfiles
const scriptsPath = path.join(__dirname, '..', '.backupfiles', 'scripts');
const assetsPath = path.join(__dirname, 'assets');

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/scripts', express.static(scriptsPath));
app.use('/assets', express.static(assetsPath));

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
app.use('/', routes);