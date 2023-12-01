<?php
include('database_handler.php');
echo test();

session_start();

if (isset($_SESSION['user_id'])) {
    echo "YOU ARE LOGGED IN!  ";
    echo "NAME: " . $_SESSION['first_name'] . " " . $_SESSION['last_name'];

    echo "USER ID: " . $_SESSION['user_id'];

    echo "EMAIL: " . $_SESSION['email'];

    echo "COURSE: " . get_user_course_id($_SESSION['email']);

    $userOrgs = get_user_organizations($_SESSION['user_id']);

    if ($userOrgs) {

        echo "ORGS OF USER: ";
        foreach ($userOrgs as $orgId) {
            echo $orgId . " ";
        }
    }

    echo "REGISTERED?:" . $_SESSION['reg_success'];

    

} else {
    echo "YOU ARE NOT LOGGED IN!  ";
}

// $allEvents = get_all_events();
// print_r($allEvents);

?>