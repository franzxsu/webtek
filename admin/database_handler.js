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
      WHERE OrganizationName = ? AND Password = ?;
    `;
    
    return query(queryString, [username, password])
      .then((results) => {
        if (results.length > 0) {
          const userData = results[0];
          // console.log(userData) 
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
        const orgName = results[0].OrganizationName;

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
        resolve(results);
      }
    });
  });
}

// Not sure if this works
function removeEvent(eventID){
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM events WHERE eventID = ?";
    connection.query(query, [eventID], (error, results) => {
      if (error) {
        console.error('Error querying database:', query);
        console.error('Error:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

//TODO!!
function getSegments(eventID){
  return new Promise((resolve, reject) => {
    const query = "SELECT SegmentNo, SegmentName FROM segments WHERE eventID = ?";
    connection.query(query, [eventID], (error, results) => {
      if (error) {
        console.error('Error querying database:', query);
        console.error('Error:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}


function addAttendance(eventID, userID, segmentID){
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO attendance (userID, segmentID, eventID) VALUES (?, ?, ?)";
    connection.query(query, [userID, segmentID, eventID], (error, results) => {
      if (error) {
        console.error('Error querying database:', query);
        console.error('Error:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}


// Not sure if this works
function changeEventAttribute(eventID, headerOfTableToChange, newValue){
  return new Promise((resolve, reject) => {
    const editableColumns = ['EventName', 'EventInfo', 'EventDateStart', 'EventDateEnd', 'EventLocation', 'courseID', 'accessLevel', 'poster'];
    if (!editableColumns.includes(headerOfTableToChange)) {
      reject(new Error('Invalid column name'));
      return;
    }
    const query = `UPDATE events SET ${headerOfTableToChange} = ? WHERE eventID = ?`;
    connection.query(query, [newValue, eventID], (error, results) => {
      if (error) {
        console.error('Error querying database:', query);
        reject(error);
      } else {
        if (results.affectedRows === 0) {
          console.log('Event not found');
          reject(new Error('Event not found'));
        } else {
          console.log(`Event ${headerOfTableToChange} updated successfully`);
          resolve(results);
        }
      }
    });
  });
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
        resolve(results);
      }
    });
  });
}

function getRegistered(eventID) {
  return new Promise((resolve, reject) => {
    const query = "SELECT userId FROM registrations WHERE EventId = ?";
    connection.query(query, [eventID], (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function getAttendance(eventID) {
  return new Promise((resolve, reject) => {
    const query = "SELECT DISTINCT userId FROM attendance WHERE EventId = ?";
    connection.query(query, [eventID], (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function getFeedbacks(eventID) {
  return new Promise((resolve, reject) => {
    const query = "SELECT message FROM feedback WHERE EventId = ?";
    connection.query(query, [eventID], (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function getAttendanceEmails(eventID){
  return new Promise((resolve, reject) => {
    const query = `
      SELECT DISTINCT u.email 
      FROM attendance AS a
      INNER JOIN users AS u ON a.userId = u.userId 
      WHERE a.EventId = ?;
    `;
    connection.query(query, [eventID], (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function getOngoingEvents(orgID) {
  return new Promise((resolve, reject) => {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const query = "SELECT * FROM events WHERE OrganizerId = ? AND eventDateStart <= ? AND eventDateEnd >= ?";
    connection.query(query, [orgID, currentDate, currentDate], (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}


function getOrganizationMembers(orgID) {
  return new Promise((resolve, reject) => {
    const query = "SELECT Email FROM organizationmembers WHERE organizationID = ?";
    connection.query(query, [orgID], (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

//todo`
function addOrgMember(orgID, email){
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO organizationmembers (organizationID, Email) VALUES (?,?)";
    connection.query(query, [orgID, email], (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        reject(error);
      } else if (results){
        resolve(true);
      }
    });
  });
}

function removeOrgMember(orgID, email) {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM organizationmembers WHERE organizationID = ? AND Email = ?";
    connection.query(query, [orgID, email], (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        reject(error);
      } else {
        if (results.affectedRows > 0) {
          resolve(true);//removed
        } else {
          resolve(false);//member not found/ or not removed
        }
      }
    });
  });
}


function createEvent(orgid, eventName, eventInfo, eventDateStart, eventDateEnd, eventLocation, course, visibility, posterBlob) {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO events (OrganizerId, EventName, EventInfo, EventDateStart, EventDateEnd, EventLocation, courseID, accessLevel, poster) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
    connection.query(query, [orgid, eventName, eventInfo, eventDateStart, eventDateEnd, eventLocation, course, visibility, posterBlob], (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        reject(error);
      } else {
        const eventID = results.insertId;
        resolve(eventID);
      }
    });
  });
}


function addSegment(segmentNumber, eventID, segmentInfo) {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO segments (SegmentNo, EventID, SegmentName) VALUES (?, ?, ?);";
    connection.query(query, [segmentNumber, eventID, segmentInfo], (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}




module.exports = {
    authLogIn,
    createEvent,
    removeEvent,
    getOrgNameFromId, 
    getOrganizationMembers,
    getAllEvents,
    getOngoingEvents,
    getCompletedEvents,
    getUpcomingEvents,
    addOrgMember,
    removeOrgMember,
    getSegments,
    addAttendance,
    addSegment,
    getRegistered,
    getAttendance,
    getAttendanceEmails,
    getFeedbacks
};  