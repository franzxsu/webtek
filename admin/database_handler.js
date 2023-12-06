const mysql = require('mysql');
const util = require('util');

const config = require('config');

const connection = mysql.createConnection({
    connectionLimit: 100,
    host: config.get('database.host'),
    user: config.get('database.username'),
    password: config.get('database.password'),
    database: config.get('database.name')
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

  function createEvent(eventData) {
    const insertQuery = `
    INSERT INTO events (OrganizerId, EventName, EventInfo, EventDateStart, EventDateEnd, EventLocation, courseID, OrganizationID)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?) `;

    const values = [
      eventData.id,
      eventData.eventName,
      eventData.eventDescription,
      eventData.eventDateStart,
      eventData.eventDateEnd,
      eventData.eventVenue,
      eventData.courseID !== undefined ? eventData.courseID : null,
      eventData.OrganizationID !== undefined ? eventData.OrganizationID : null
    ];

    query(insertQuery, values, (error) => {
      if (error) {
        throw new Error(error);
      } else {
        console.log("Data inserted successfully!");
      }
    })
    
  };

module.exports = {
    authLogIn,
    createEvent
};  