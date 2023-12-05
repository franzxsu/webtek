const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'events'
  });
  
  connection.connect((err) => {
    if(err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to MySQL database successfully!')
  })

function authLogIn(username, password){
    const queryString = `
    SELECT OrganizerID AS AdminOrOrgID, OrganizationName AS UsernameOrOrganizationName, password AS Password
    FROM eventorganizers
    WHERE OrganizationName = ? AND password = ?
   `;
  
    connection.query( queryString, [username, password], (error, results) => {
      if(error) {
        console.error('Error querying database:', error);
        res.status(500).send('Error verifying credentials!');
        return;
      }
      else if (results){
        console.log(results[0].AdminOrOrgID);
        return results[0].AdminOrOrgID;
      }
    });
}

module.exports = {
    authLogIn
};  