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
  });

  function authLogIn(username, password, callback) {
    const queryString = `
      SELECT OrganizerID AS AdminOrOrgID, OrganizationName AS UsernameOrOrganizationName, password AS Password
      FROM eventorganizers
      WHERE OrganizationName = ? AND password = ?
    `;
    
    connection.query(queryString, [username, password], (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        callback(error, null);
      } else {
        if (results.length > 0) {
          const adminOrOrgID = results[0].AdminOrOrgID;
          callback(null, adminOrOrgID);
        } else {
          callback(null, null);
        }
      }
    });
  }
  

module.exports = {
    authLogIn
};  