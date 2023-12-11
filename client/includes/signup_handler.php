<?php
include("database_handler.php");

ob_start();
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //check if fields are filled up
    if (
        !empty($_POST['first_name']) &&
        !empty($_POST['last_name']) &&
        !empty($_POST['email']) &&
        !empty($_POST['password']) &&
        !empty($_POST['password_repeat'])
    ) {
        //check if account exists, show error if it does
        if (account_exists($conn, $_POST['email']) !== false) {
            header('Location: signup.php?signup=accountexists');
            exit();
        }
        //check if email is valid, show error if invalid
        if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            header("Location: signup.php?signup=invalidemail");

        //handle registration if no errors
        } else {
            $email = $_POST['email'];
            $firstName = $_POST['first_name'];
            $lastName = $_POST['last_name'];
            $password = $_POST['password'];

            //hash the password
            $hashedPwd = password_hash($password, PASSWORD_DEFAULT);

            //add user to database
            $result = add_user($email, $firstName, $lastName, $hashedPwd);        

            if ($result !== true) {
                //error in the database
                echo "error: " . $result;
                exit();
            } else {
                //REGISTRATION SUCCESSFUL
                header("Location: signup.php?signup=success");
                exit();
            }
        }

        //validation for checking if fields are empty
    } elseif (
        empty($_POST['first_name']) ||
        empty($_POST['last_name']) ||
        empty($_POST['email']) ||
        empty($_POST['password']) ||
        empty($_POST['password_repeat'])
    ) {
        //show error and go back
        header('Location: signup.php?signup=empty');
        exit();
    }
}

function account_exists($conn, $email) {
    //check if account alreadyu exists
    $sql = 'SELECT * FROM users WHERE email = ?';
    $stmt1 = mysqli_stmt_init($conn);

    //show error
    if (!mysqli_stmt_prepare($stmt1, $sql)) {
        header('Location: ../signup.php?error=stmtfailed');
        exit();
    }

    mysqli_stmt_bind_param($stmt1, "s", $email);
    mysqli_stmt_execute($stmt1);
    $resultData = mysqli_stmt_get_result($stmt1);

    if ($row = mysqli_fetch_assoc($resultData)) {
        
    } else {
        return false;
    }
}

?>