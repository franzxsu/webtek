<!-- https://getbootstrap.com/docs/5.3/getting-started/introduction/ -->

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
} else {
    echo "YOU ARE NOT LOGGED IN!  ";
}

// $allEvents = get_all_events();
// print_r($allEvents);

?>


<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Dashboard - Brand</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i">
    <link rel="stylesheet" href="assets/fonts/fontawesome-all.min.css">
    <link rel="stylesheet" href="assets/fonts/font-awesome.min.css">
    <link rel="stylesheet" href="assets/fonts/fontawesome5-overrides.min.css">
</head>

<body id="page-top">
    <div id="wrapper">
        <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
            <div class="container-fluid d-flex flex-column p-0"><a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="aboutUs.html">
                    <div class="sidebar-brand-icon rotate-n-15"><i class="fab fa-evernote"></i></div>
                    <div class="sidebar-brand-text mx-3"><span>WEBTEK</span></div>
                </a>
                <hr class="sidebar-divider my-0">
                <ul class="navbar-nav text-light" id="accordionSidebar">
                    <li class="nav-item"><a class="nav-link active" href="index.html"><i class="fas fa-tachometer-alt"></i><span>Dashboard</span></a></li>
                    <li class="nav-item"><a class="nav-link" href="#"><i class="fas fa-user"></i><span>Event History</span></a></li>
                    <li class="nav-item"><a class="nav-link" href="#"><i class="fas fa-table"></i><span>Table</span></a></li>
                    <li class="nav-item"><a class="nav-link" href="login.php"><i class="far fa-user-circle"></i><span>Login</span></a></li>
                    <li class="nav-item"><a class="nav-link" href="register.php"><i class="fas fa-user-circle"></i><span>Register</span></a></li>
                </ul>
                <div class="text-center d-none d-md-inline"><button class="btn rounded-circle border-0" id="sidebarToggle" type="button"></button></div>
            </div>
        </nav>
        
                            </li>
                            <div class="d-none d-sm-block topbar-divider"></div>
                            <li class="nav-item dropdown no-arrow">
                                <div class="nav-item dropdown no-arrow">
                                    <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
                                        <span class="d-none d-lg-inline me-2 text-gray-600 small">
                                            <?php
                                            if (isset($_SESSION['first_name']) && isset($_SESSION['last_name'])) {
                                                // echo $_SESSION['last_name'] . ", " . $_SESSION['first_name'];
                                                echo $_SESSION['first_name'] . " " . $_SESSION['last_name'];
                                            } else {
                                                echo "GUEST";
                                            }
                                            ?>
                                        </span>
                                        <img class="border rounded-circle img-profile" src="assets/img/avatars/avatar1.jpeg">
                                    </a>
                                    <div class="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                                        <a class="dropdown-item" href="#"><i class="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Profile</a>
                                        <a class="dropdown-item" href="#"><i class="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Settings</a>
                                        <a class="dropdown-item" href="#"><i class="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Activity log</a>
                                        <div class="dropdown-divider"></div>
                                        <?php
                                        if (isset($_SESSION['user_id'])) {
                                            echo '<a class="dropdown-item" href="logout.php"><i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Log out</a>';
                                        } else {
                                            echo '<a class="dropdown-item" href="login.php"><i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Log in</a>';
                                        }
                                        ?>

                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div class="container-fluid">
                    <div class="d-sm-flex justify-content-between align-items-center mb-4">
                        <h3 class="text-dark mb-0">Upcoming Events</h3><a class="btn btn-primary btn-sm d-none d-sm-inline-block" role="button" href="#"><i class="fas fa-download fa-sm text-white-50"></i>&nbsp;Generate Report</a>
                    </div>
                    <div class="row">
                        <?php include 'event_container_gen.php' ?>
                    </div>
                </div>
            </div>
<?php
    include_once 'footer.php';
?>