const mysql = require('mysql');
const util = require('util');
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

  const query = util.promisify(connection.query).bind(connection);

  function authLogIn(username, password) {
    const queryString = `
      SELECT OrganizerID AS AdminOrOrgID, OrganizationName AS UsernameOrOrganizationName, password AS Password
      FROM eventorganizers
      WHERE OrganizationName = ? AND password = ?
    `;
  
    return query(queryString, [username, password])
      .then((results) => {
        if (results.length > 0) {
          const adminOrOrgID = results[0].AdminOrOrgID;
          return adminOrOrgID;
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.error('Error querying database:', error);
        throw error;
      });
  }

module.exports = {
    authLogIn
};  