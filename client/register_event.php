<?php

include 'helpers.php';
include 'database_handler.php';

    session_start();


    if (isset($_POST['event_id'])) {
        $eventId = $_POST['event_id'];
    
        if (isset($_SESSION['user_id'])) {
            $userId = $_SESSION['user_id'];
    
            $reg_status = register_to_event($userId, $eventId);
    
            if ($reg_status) {
                $_SESSION['reg_status'] = $reg_status; 
                header('Location: index.php');
            }
        } else {
            echo 'User ID not found in session';
        }
    } else {
        echo 'Event ID not received';
    }
?>
