<?php

include 'helpers.php';
include 'database_handler.php';

    session_start();


    if (isset($_POST['event_id'])) {
        $eventId = $_POST['event_id'];

        if (isset($_SESSION['user_id'])) {
            $userId = $_SESSION['user_id'];

            $reg_success = register_to_event($userId, $eventId);

            if ($reg_success) {
                $_SESSION['reg_success'] = $eventId; 
                logme("okay g");
                header('Location: index.php');
            } else {
                echo 'Error: ' . mysqli_error($conn);
                logme("EEEEHHH");
            }
        } else {
            echo 'User ID not found in session';
        }
    } else {
        echo 'Event ID not received';
    }
?>
