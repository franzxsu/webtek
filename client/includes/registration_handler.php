<?php
include("database_handler.php");

ob_start();
session_start();


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

        if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            header("Location: register.php?signup=invalidemail");
        } else {
            $email = $_POST['email'];
            $firstName = $_POST['first_name'];
            $lastName = $_POST['last_name'];
            $password = $_POST['password'];
            $result = add_user($email, $firstName, $lastName, $password);
            if ($result !== true) {
                echo "error: " . $result;
            } else {
                // REGISTRATION SUCCESSFUL
                header("Location: register.php?signup=success");
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
        header('Location: register.php?signup=empty');
    }
}
?>