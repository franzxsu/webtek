<?php
$currentURL = $_SERVER['REQUEST_URI'];
$activeClass = 'active';

$navLinks = [
    'index.php' => 'Upcoming events',
    'my_events.php' => 'My Events',
    'history_events.php' => 'Past Events',
    'logout.php' => 'Log out',
];

?>

<body id="page-top">
    <div id="wrapper">
        <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
            <div class="container-fluid d-flex flex-column p-0">
                <a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="aboutUs.html">
                    <div class="sidebar-brand-icon rotate-n-15"><i class="far fa-calendar"></i></div>
                    <div class="sidebar-brand-text mx-3"><span>eventsHUB</span></div>
                </a>
                <hr class="sidebar-divider my-0">
                <ul class="navbar-nav text-light" id="accordionSidebar">

                    <?php

                    if(!isset($_SESSION['user_id'])){
                        echo ' <li class="nav-item"><a class="nav-link active" href="index.php"><i class="fa fa-calendar"></i><span>Upcoming events</span></a></li>';
                        echo ' <li class="nav-item"><a class="nav-link" href="login.php"><i class="far fa-user-circle"></i><span>Log in</span></a></li>';
                        echo ' <li class="nav-item"><a class="nav-link" href="signup.php"><i class="fas fa-user-circle"></i><span>Register</span></a></li>';
                    }else{
                        foreach ($navLinks as $url => $linkText) {
                            $isActive = strpos($currentURL, $url) !== false ? $activeClass : ''; // Check if current URL contains the link URL
                            echo '<li class="nav-item"><a class="nav-link ' . $isActive . '" href="' . $url . '"><i class="fa fa-calendar"></i><span>' . $linkText . '</span></a></li>';
                        }
                    }
                    
                    ?>

                </ul>
                <div class="text-center d-none d-md-inline"><button class="btn rounded-circle border-0" id="sidebarToggle" type="button"></button></div>
            </div>
        </nav>