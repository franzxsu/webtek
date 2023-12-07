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
    // const queryString = `
    //   SELECT OrganizerID, OrganizationName, Email, Password
    //   FROM eventorganizers
    //   WHERE OrganizationName = ? AND Password = ?;
    // `;

    // TESTING
    const queryString = `
      SELECT OrganizerID, OrganizationName, Email, Password
      FROM eventorganizers
    `;
    
    return query(queryString, [username, password])
      .then((results) => {
        if (results.length > 0) {
          const userData = results[0];
          console.log(userData)
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

//get all events given organization id
function getAllEvents(orgID){
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM events WHERE OrganizerId = ?";
    connection.query(query, [orgID], (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        reject(error);
      } else {
        console.log("Data fetched successfully!");
        // console.log(results);
        resolve(results);
      }
    });
  });
}

function removeEvent(eventID){

}
function changeEventAttribute(eventID, headerOfTableToChange, newValue){

}
function getCompletedEvents(orgID){
  return new Promise((resolve, reject) => {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Get current date in MySQL datetime format
    const query = "SELECT * FROM events WHERE OrganizerId = ? AND eventDateEnd < ?";
    connection.query(query, [orgID, currentDate], (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        reject(error);
      } else {
        console.log("Data fetched successfully!");
        // console.log(results);
        resolve(results);
      }
    });
  });
}
function getUpcomingEvents(orgID){
  return new Promise((resolve, reject) => {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const query = "SELECT * FROM events WHERE OrganizerId = ? AND eventDateStart > ?";
    connection.query(query, [orgID, currentDate], (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        reject(error);
      } else {
        console.log("Data fetched successfully!");
        // console.log(results);
        resolve(results);
      }
    });
  });
}
function getOngoignEvents(){

}

function getOrganizationMembers(orgID) {
  return new Promise((resolve, reject) => {
    const query = "SELECT Email FROM organizationmembers WHERE organizationID = ?";
    connection.query(query, [orgID], (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        reject(error);
      } else {
        console.log("Data fetched successfully!");
        // console.log(results);
        resolve(results);
      }
    });
  });
}

//todo`
function addOrgMember(orgID, email){

  const insertQuery = `
  INSERT INTO organizationmembers (organizationID, Email)
  VALUES (?, ?) `;

  // const values = [
  //   eventData.id,
  //   eventData.eventName,
  // ];

  query(insertQuery, values, (error) => {
    if (error) {
      throw new Error(error);
    } 
    else {
      console.log("Data inserted successfully!");
    }
  })
}

module.exports = {
    authLogIn,
    createEvent,
    getOrgNameFromId, 
    getOrganizationMembers,
    getAllEvents,
    getCompletedEvents,
    getUpcomingEvents
};  