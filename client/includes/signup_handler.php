<?php
include("database_handler.php");

ob_start();
session_start();

function account_exists($conn, $email) {
    // Check if account already exists
    $sql = 'SELECT * FROM users WHERE email = ?';
    $stmt1 = mysqli_stmt_init($conn);

    // Error pag meron mang case na d gumana ung query
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

// INSERT INTO `users`(email, password) VALUES ("asd", "asd");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //check kung nalagyan ng shit sa lahat ng fields, todo add more validators
    if (
        !empty($_POST['first_name']) &&
        !empty($_POST['last_name']) &&
        !empty($_POST['email']) &&
        !empty($_POST['password']) &&
        !empty($_POST['password_repeat'])
    ) {

        if (account_exists($conn, $_POST['email']) !== false) {
            header('Location: signup.php?signup=accountexists');
            exit();
        }

        if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            header("Location: signup.php?signup=invalidemail");
        } else {
            $email = $_POST['email'];
            $firstName = $_POST['first_name'];
            $lastName = $_POST['last_name'];
            $password = $_POST['password'];

            // Hash browns tolz
            $hashedPwd = password_hash($password, PASSWORD_DEFAULT);

            $result = add_user($email, $firstName, $lastName, $hashedPwd);        

            if ($result !== true) {
                echo "error: " . $result;
                exit();
            } else {
                // REGISTRATION SUCCESSFUL
                header("Location: signup.php?signup=success");
                exit();
            }
        }
    } elseif (
        empty($_POST['first_name']) ||
        empty($_POST['last_name']) ||
        empty($_POST['email']) ||
        empty($_POST['password']) ||
        empty($_POST['password_repeat'])
    ) {
        header('Location: signup.php?signup=empty');
        exit();
    }
}
?>