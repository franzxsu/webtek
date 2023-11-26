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
  
}
?>