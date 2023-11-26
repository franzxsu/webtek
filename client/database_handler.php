<?php

include("database_config.php");

global $conn; 
$conn = mysqli_connect("localhost","root","","events");

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
else{
  echo "database ok!";
}

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
?>