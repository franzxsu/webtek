const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'events',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  
});

// Middleware to parse JSON requests
app.use(express.json());

// CRUD operations

// Create a new user
app.post('/users', (req, res) => {
  const { email, FirstName, LastName, password } = req.body;
  const query = 'INSERT INTO users (email, FirstName, LastName, password) VALUES (?, ?, ?, ?)';
  connection.query(query, [email, FirstName, LastName, password], (err, results) => {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.status(201).json({ userId: results.insertId, email, FirstName, LastName });
  });
});

app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT * FROM users WHERE userId = ?';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(results[0]);
  });
});

app.put('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const { email, FirstName, LastName, password } = req.body;
  const query = 'UPDATE users SET email = ?, FirstName = ?, LastName = ?, password = ? WHERE userId = ?';
  connection.query(query, [email, FirstName, LastName, password, userId], (err) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ userId, email, FirstName, LastName });
  });
});

app.delete('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'DELETE FROM users WHERE userId = ?';
  connection.query(query, [userId], (err) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ message: 'User deleted successfully' });
  });
});

app.listen(port, () => {
  
});
