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

  //todo
  function authLogIn(username, password) {
    const queryString = `
      SELECT OrganizerID, OrganizationName, Email, Password
      FROM eventorganizers
    `;
    
    return query(queryString, [username, password])
      .then((results) => {
        if (results.length > 0) {
          const userData = results[0];
          return userData;
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
  // todo: figure out how to do courseID and OrganizationID

  const insertQuery = `
  INSERT INTO events (OrganizerId, EventName, EventInfo, EventDateStart, EventDateEnd, EventLocation, courseID, OrganizationID)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?) `;

  const values = [
    eventData.id,
    eventData.eventName,
    eventData.eventFor,
    eventData.eventDateStart,
    eventData.eventDateEnd,
    eventData.eventVenue,
    eventData.courseID !== undefined ? eventData.courseID : null,
    eventData.OrganizationID !== undefined ? eventData.OrganizationID : null
  ];

  query(insertQuery, values, (error) => {
    if (error) {
      throw new Error(error);
    } 
    else {
      console.log("Data inserted successfully!");
    }
  })
 
}

function getOrgNameFromId(id) {
  const query = "SELECT OrganizationName FROM eventOrganizers WHERE OrganizerID = ?";

  try {
    connection.query(query, [id], (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        throw error;
      }
      else 
      {
        console.log("Data fetched successfully!");
        console.log(results);
        const orgName = results[0].OrganizationName;
        console.log(orgName);
        return orgName;
      }
    });
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

//hans pagawa 'to
//per org, should return entire row hindi attributes, (SELECT *)
function getAllOrganizationEvents(){

}

function removeEvent(eventID){

}
function changeEventAttribute(eventID, headerOfTableToChange, newValue){

}
function getCompletedEvents(){

}
function getUpcomingEvents(){

}
function getOrganizationMembers(orgID){
  const query = "SELECT Email FROM organizationmembers WHERE organizationID = ?";

  try {
    connection.query(query, [orgID], (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        throw error;
      }
      else 
      {
        console.log("Data fetched successfully!");
        console.log(results);
        // const orgName = results[0].OrganizationName;
        // console.log(orgName);
        return results;
      }
    });
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

module.exports = {
    authLogIn,
    createEvent,
    getOrgNameFromId, 
    getOrganizationMembers
};  