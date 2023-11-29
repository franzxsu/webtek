<?php

include("database_config.php");

global $conn; 
$conn = mysqli_connect("localhost","root","","events");

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
//else{
//  echo "database ok!";
//}

function test() {
  return "test";
}

function check_login($email, $password) {
  
  global $conn;
  $stmt = $conn->prepare("SELECT userId, FirstName, LastName, email FROM users WHERE email = ? AND password = ?");
  $stmt->bind_param("ss", $email, $password);

  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows === 1) {  
    //get user row data from da database
     $userData = $result->fetch_assoc(); 
     return $userData;  
  }
  
  return null;
}

function add_user($email, $firstName, $lastName, $password){
  global $conn;   
  $stmt = $conn->prepare("INSERT INTO users (email, FirstName, LastName, password) VALUES (?, ?, ?, ?);");
  $stmt->bind_param("ssss", $email, $firstName, $lastName, $password);

  // if(email_exists($email)) {
  //   return "Email already taken"; 
  // }

  $stmt->execute();
  $result = $stmt->get_result();

  // //RETURN SQL ERROR IF THERES AN ERROR, OTHERWISE, RETURN TRUE (napush sa database)
  // if(!$stmt->execute()){
  //   return mysqli_error($conn); 
  // }  

  return true;
}

// check if email exists
function email_exists($email) {
  // global $conn;   
  // $stmt = $conn->prepare("SELECT * FROM ");
}

function register_to_event($userID, $EventID){
  global $conn;
  //will populate registrations table
}

function remove_registration($registrationID){
  global $conn;
  //will remove registration from registration table
}

function get_all_events(){

  global $conn;

  $query = "SELECT * FROM events";
  $result = mysqli_query($conn, $query);
  
  $events = array();
  
  if(mysqli_num_rows($result) > 0){
  
    while($row = mysqli_fetch_assoc($result)){
      
      $event = array();  

      $event['eventID'] = $row["eventID"];
      $event['organizerID'] = $row["OrganizerId"];
      $event['eventName'] = $row["EventName"];
      $event['startDate'] = $row["EventDateStart"];
      $event['endDate'] = $row["EventDateEnd"];
      
      $events[] = $event;

    }
  
  }
  
  return $events;

}

//giveen email of the user, return his/her course id, return null if none
function get_user_course_id($email){
  global $conn;

  $stmt = $conn->prepare("SELECT courseID from enrolledcourse WHERE email = ?;");
  $stmt->bind_param("s", $email);

  // if(email_exists($email)) {
  //   return "Email already taken"; 
  // }

  $stmt->execute();
  $result = $stmt->get_result();

  $row = $result->fetch_assoc();
  return $row['courseID'];
}
//giveen email of the user, return his/her organizations as list, return null if none
function get_user_organizations($userID){

  global $conn;

  $stmt = $conn->prepare("SELECT organizationID FROM organizationmembers WHERE userID = ?");
  $stmt->bind_param("i", $userID); 
  $stmt->execute();
  
  $result = $stmt->get_result();
  $orgs = [];
  
  while($row = $result->fetch_assoc()) {
    $orgs[] = $row['organizationID']; 
  }
  
  if(empty($orgs)) {
    return null;
  }
  
  return $orgs;

}
function add_user_to_org($email, $organizationID){

}
function remove_user_to_org($email, $organizationID){

}
?>