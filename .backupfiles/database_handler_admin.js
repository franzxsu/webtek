const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'webteknameronadmin'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  
});

//insert
const createUser = (user) => {
  const sql = 'INSERT INTO users SET ?';
  connection.query(sql, user, (err, results) => {
    if (err) throw err;
    
  });
};

const readUsers = () => {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    
  });
};

const updateUser = (userId, newData) => {
  const sql = 'UPDATE users SET ? WHERE userId = ?';
  connection.query(sql, [newData, userId], (err, results) => {
    if (err) throw err;
    
  });
};

// DELETE operation
const deleteUser = (userId) => {
  const sql = 'DELETE FROM users WHERE userId = ?';
  connection.query(sql, userId, (err, results) => {
    if (err) throw err;
    
  });
};

// Usage
createUser({ email: 'rj@example.com', FirstName: 'Rj', LastName: 'Bustin', password: 'rjbustin' });
readUsers();
updateUser(1, { FirstName: 'rjbust' });
deleteUser(2);

connection.end();


