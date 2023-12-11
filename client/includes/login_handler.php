<?php

include('database_handler.php');

ob_start();
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    //CHECK LOGIN HASHED
    $user = check_login($email, $password);
    
    //check if may nareturn na row, then it is logged in
    if ($user) {

      //SET SESSION DATA
      $_SESSION['user_id'] = $user['userId'];
      $_SESSION['first_name'] = $user['FirstName'];
      $_SESSION['last_name'] = $user['LastName'];
      $_SESSION['email'] = $user['email'];
      $_SESSION['courseID'] = get_user_course_id($user['email']);
      $_SESSION['organizations'] = get_user_organizations($user['email']);
      
      //go to index
      header("Location: index.php");
    } else {
      $login_error = "Invalid login";
    }
  }
}
