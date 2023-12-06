<?php

global $conn;
$conn = mysqli_connect("localhost", "root", "", "events");

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// OLD CHECK_LOGIN CODE
function check_login_no_hash($email, $password) {
  
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

function check_login($email, $password)
{

  global $conn;
  $stmt = $conn->prepare("SELECT userId, FirstName, LastName, email, password FROM users WHERE email = ?");
  $stmt->bind_param("s", $email);

  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows === 1) {
    //get user row data from da database
    $userData = $result->fetch_assoc();
    if (password_verify($password, $userData['password'])) {
      return $userData;
    }
  }

  return null;
}

function add_user($email, $firstName, $lastName, $password)
{
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
function email_exists($email)
{
  // global $conn;   
  // $stmt = $conn->prepare("SELECT * FROM ");
}

//return true if successful, k
function register_to_event($userID, $eventID) {
  global $conn;

  // Check if the registration already exists
  $checkStmt = $conn->prepare("SELECT * FROM registrations WHERE userId = ? AND eventId = ?");
  $checkStmt->bind_param("ii", $userID, $eventID);
  $checkStmt->execute();
  $existingRegistration = $checkStmt->get_result()->fetch_assoc();

  if ($existingRegistration) {
      return "You are already registered for this event.";
  }

  // If not, proceed with inserting the new registration
  $insertStmt = $conn->prepare("INSERT INTO registrations (userId, eventId) VALUES (?, ?)");
  $insertStmt->bind_param("ii", $userID, $eventID);

  if (!$insertStmt->execute()) {
      return $insertStmt->error;
  }

  return true;
}


if (isset($_POST['cancel'])) {
  $userID = $_POST['userID'];
  $eventID = $_POST['eventID'];

  $removed = remove_registration($userID, $eventID);

  if ($removed) {
      header('Location: my_events.php?removed=success');
      exit();
  } else {
      echo "fail remove reg";
  }
}

function remove_registration($userID, $eventID) {

  global $conn;

  $stmt = $conn->prepare("DELETE FROM registrations WHERE userId = ? AND eventId = ?");
  $stmt->bind_param("ii", $userID, $eventID);

  if(!$stmt->execute()) {
    echo "fail";
    return false;
  }

  return true; 

}

function get_all_events()
{

  global $conn;

  $query = "SELECT * FROM events";
  $result = mysqli_query($conn, $query);

  return $result;
}

function get_upcoming_events_all($currentDate){
  global $conn;

  $query = "SELECT * FROM events WHERE eventDateStart > ? ORDER BY eventDateStart";
  $stmt = $conn->prepare($query);

  $stmt->bind_param("s", $currentDate);
  $stmt->execute();

  $result = $stmt->get_result();

  return $result;
}

function get_everyone_events(){
  global $conn;

  $query = "SELECT *
            FROM events
            WHERE accessLevel = 'Everyone'";

  $result = mysqli_query($conn, $query);
  return $result;
}

// !IMPORTANT METHOD

function get_events_for_me($courseID, $organizations, $email) {
  $accessLevel = 'Everyone';

  if (strpos($email, "@slu.edu.ph") !== false) {
      $accessLevel = 'SLU';
  }

  global $conn;

  $query = "SELECT *
            FROM events
            WHERE accessLevel = 'Everyone'";

  if ($accessLevel === 'SLU') {
      $query .= " OR (accessLevel = 'SLU' OR accessLevel = 'Everyone')";
  }

  if ($accessLevel === 'SLU') {
      $query .= " OR (accessLevel = 'Course' AND courseID = $courseID)";
  }

  if ($accessLevel === 'SLU') {
      $orgConditions = implode(',', array_map('intval', (array)$organizations));
      if (!empty($orgConditions)) {
          $query .= " OR (accessLevel = 'Organization' AND OrganizerId IN ($orgConditions))";
      }
  }

  $result = mysqli_query($conn, $query);
  return $result;
}


function get_events_given_ids($eventIDs){
  global $conn;

  $eventIDString = implode(',', array_map('intval', $eventIDs));
  $query = "SELECT * FROM events WHERE eventID IN ($eventIDString)";
  

  $result = mysqli_query($conn, $query);
  return $result;
}

function get_registered_events_for_me($userID){
  global $conn;

  $query = "SELECT EventId from registrations WHERE userId = ?" ;

  $stmt = $conn->prepare($query);

  $stmt->bind_param("i", $userID);
  $stmt->execute();

  $result = $stmt->get_result();

  $eventIDs = [];
    while ($row = $result->fetch_assoc()) {
        $eventIDs[] = $row['EventId'];
    }

  $result = get_events_given_ids($eventIDs);

  return $result;

}

function get_registered_events_for_me_done($currentDate, $userID, $courseID, $organizations){
  global $conn;

  $orgIDs = implode(',', array_map('intval', (array)$organizations));

  $orgCondition = "";
  if (!empty($orgIDs)) {
    $orgCondition = " OR OrganizationID IN ($orgIDs)";
  }

  $query = "SELECT e.* FROM events e
            JOIN registrations r ON e.eventID = r.eventID
            WHERE (e.eventDateStart < ?) 
            AND ((e.courseID = ? $orgCondition) OR (e.courseID IS NULL AND e.OrganizationID IS NULL)) 
            AND r.userID = ?
            ORDER BY e.eventDateStart";

  $stmt = $conn->prepare($query);

  $stmt->bind_param("sii", $currentDate, $courseID, $userID);
  $stmt->execute();

  $result = $stmt->get_result();

  return $result;
}


//giveen email of the user, return his/her course id, return null if none
function get_user_course_id($email)
{
  global $conn;

  $stmt = $conn->prepare("SELECT courseID from enrolledcourse WHERE email = ?;");
  $stmt->bind_param("s", $email);

  $stmt->execute();
  $result = $stmt->get_result();

  $row = $result->fetch_assoc();
  return $row['courseID'];
}

//giveen email of the user, return his/her organizations as list, return null if none
function get_user_organizations($email)
{

  global $conn;

  $stmt = $conn->prepare("SELECT organizationID FROM organizationmembers WHERE email = ?");
  $stmt->bind_param("s", $email);

  // echo "<script>";
  // echo "console.log('SQL Query: " . $stmt->queryString . "')";
  // echo "</script>";

  $stmt->execute();

  $result = $stmt->get_result();
  $orgs = [];

  while ($row = $result->fetch_assoc()) {
    $orgs[] = $row['organizationID'];
  }

  if (empty($orgs)) {
    return null;
  }

  return $orgs;
}

function get_attendance_list(){

}

function get_event_name_from_id($eventID){
  global $conn;

  $stmt = $conn->prepare("SELECT eventName from events WHERE eventID = ?;");
  $stmt->bind_param("s", $eventID);

  $stmt->execute();
  $result = $stmt->get_result();

  $row = $result->fetch_assoc();
  return $row['eventName'];

}
function get_organization_name_from_id($orgID){
  global $conn;

  $stmt = $conn->prepare("SELECT OrganizationName from eventorganizers WHERE OrganizerID = ?;");
  $stmt->bind_param("s", $orgID);

  $stmt->execute();
  $result = $stmt->get_result();

  $row = $result->fetch_assoc();
  return $row['OrganizationName'];
}

function get_event_course($eventID){
  global $conn;

  $stmt = $conn->prepare("SELECT courseID from events WHERE eventID = ?;");
  $stmt->bind_param("s", $eventID);

  $stmt->execute();
  $result = $stmt->get_result();

  $row = $result->fetch_assoc();
  return $row['courseID'];
}

function get_event_org($eventID){
  global $conn;

  $stmt = $conn->prepare("SELECT organizationID from events WHERE eventID = ?;");
  $stmt->bind_param("s", $eventID);

  $stmt->execute();
  $result = $stmt->get_result();

  $row = $result->fetch_assoc();
  return $row['organizationID'];
}