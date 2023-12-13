<?php

include 'helpers.php';
include 'database_handler.php';

    session_start();


    if (isset($_POST['eventId'])) {
        $eventId = $_POST['eventId'];
    
        if (isset($_SESSION['email'])) {
            $email = $_SESSION['email'];

            if (isset($_POST['message'])) {
                $msg = $_POST['message'];
    
                $reg_success = add_feedback($eventId, $email, $msg);

            }
    
            if ($reg_success === true) {
                header('Location: index.php?=successFeedback');
            } else {
                header('Location: index.php?=failFeedback');
            }
        } else {
            echo 'email not seen';
        }
    } else {
        echo 'Event ID not received';
    }
?>
