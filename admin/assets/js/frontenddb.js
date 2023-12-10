const mysql = require('mysql');
const util = require('util');
const config = require('config');

const connection = mysql.createConnection({
    connectionLimit: 100,
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
    console.log('connect frontend db')
  });

  const query = util.promisify(connection.query).bind(connection);

  export function getSegments(eventID){
    return new Promise((resolve, reject) => {
      const query = "SELECT segmentNo, segmentName FROM segments WHERE eventID = ?";
      connection.query(query, [eventID], (error, results) => {
        if (error) {
          console.error('Error querying database:', query);
          console.error('Error:', error);
          reject(error);
        } else {
          console.log("Returned something");
          resolve(results);
        }
      });
    });
  }