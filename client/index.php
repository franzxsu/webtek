<!-- https://getbootstrap.com/docs/5.3/getting-started/introduction/ -->

<?php
include('database_handler.php');
echo test();

session_start();

    if (isset($_SESSION['user_id'])){
        echo "YOU ARE LOGGED IN!  ";
        echo "NAME: " . $_SESSION['first_name'] . " " . $_SESSION['last_name'];

        echo "USER ID: " . $_SESSION['user_id'];
    
        echo "EMAIL: " . $_SESSION['email']; 

        echo "COURSE: " . get_user_course_id($_SESSION['email']);

        $userOrgs = get_user_organizations($_SESSION['user_id']);

        if($userOrgs) {

        echo "ORGS OF USER: ";
        foreach ($userOrgs as $orgId) {
            echo $orgId . " "; 
        }
    }
    }

    

    else{
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
        <div class="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <nav class="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                    <div class="container-fluid"><button class="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i class="fas fa-bars"></i></button>
                        <form class="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
                            <div class="input-group"><input class="bg-light form-control border-0 small" type="text" placeholder="Search for ..."><button class="btn btn-primary py-0" type="button"><i class="fas fa-search"></i></button></div>
                        </form>
                        <ul class="navbar-nav flex-nowrap ms-auto">
                            <li class="nav-item dropdown d-sm-none no-arrow"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><i class="fas fa-search"></i></a>
                                <div class="dropdown-menu dropdown-menu-end p-3 animated--grow-in" aria-labelledby="searchDropdown">
                                    <form class="me-auto navbar-search w-100">
                                        <div class="input-group"><input class="bg-light form-control border-0 small" type="text" placeholder="Search for ...">
                                            <div class="input-group-append"><button class="btn btn-primary py-0" type="button"><i class="fas fa-search"></i></button></div>
                                        </div>
                                    </form>
                                </div>
                            </li>
                            <li class="nav-item dropdown no-arrow mx-1">
                                <div class="nav-item dropdown no-arrow"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><span class="badge bg-danger badge-counter">3+</span><i class="fas fa-bell fa-fw"></i></a>
                                    <div class="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                                        <h6 class="dropdown-header">alerts center</h6><a class="dropdown-item d-flex align-items-center" href="#">
                                            <div class="me-3">
                                                <div class="bg-primary icon-circle"><i class="fas fa-file-alt text-white"></i></div>
                                            </div>
                                            <div><span class="small text-gray-500">December 12, 2019</span>
                                                <p>A new monthly report is ready to download!</p>
                                            </div>
                                        </a><a class="dropdown-item d-flex align-items-center" href="#">
                                            <div class="me-3">
                                                <div class="bg-success icon-circle"><i class="fas fa-donate text-white"></i></div>
                                            </div>
                                            <div><span class="small text-gray-500">December 7, 2019</span>
                                                <p>$290.29 has been deposited into your account!</p>
                                            </div>
                                        </a><a class="dropdown-item d-flex align-items-center" href="#">
                                            <div class="me-3">
                                                <div class="bg-warning icon-circle"><i class="fas fa-exclamation-triangle text-white"></i></div>
                                            </div>
                                            <div><span class="small text-gray-500">December 2, 2019</span>
                                                <p>Spending Alert: We've noticed unusually high spending for your account.</p>
                                            </div>
                                        </a><a class="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                                    </div>
                                </div>
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
                                        if (isset($_SESSION['user_id'])){
                                            echo '<a class="dropdown-item" href="logout.php"><i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Log out</a>';
                                        }
                                        else {
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
                        <div class="col-md-6 col-xl-3 mb-4">
                            <div class="card" style="width: 18rem; height: 28rem;">
                              <h5 class="card-title d-flex justify-content-center" style="padding: 15px; padding-bottom: 5px; text-align: center;">
                                Sample Event Name 2023 extra extra
                              </h5>
                              <img class="card-img-top img-fluid" src="../client/assets/img/sample_pubmat.jpg" alt="Card image cap" style="border-radius: 0px; max-width: 100%; height: 14rem;">
                              <div class="card-body" style="padding: 0px;">
                                <p class="card-text" style="margin: 0px; text-align: center;">DATE: Oct. 23 - Oct. 25</p>
                                <p class="card-text" style="margin: 0px; text-align: center;">VENUE: SLU AVR Room</p>
                              </div>
                              <div class="card-body" style="max-height: 500px; overflow-y: auto;">
                                <p class="card-text" style="max-width: 100%; padding: 0px;">Lorem ipsum dolor sit amet, 
                                    consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
                                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                                    ullamco laboris nisi ut aliquip ex ea.</p>
                              </div>
                              <a href="#" class="btn btn-primary" style="border-radius: 0px;">Register</a>
                            </div>
                          </div>
                          
                          <div class="col-md-6 col-xl-3 mb-4">
                            <div class="card" style="width: 18rem; height: 28rem;">
                              <h5 class="card-title d-flex justify-content-center" style="padding: 15px; padding-bottom: 5px;">
                                Sample Event Name 2023
                              </h5>
                              <img class="card-img-top img-fluid" src="../client/assets/img/sample_pubmat2.jpg" alt="Card image cap" style="border-radius: 0px; max-width: 100%; height: 14rem;">
                              <div class="card-body" style="max-height: 500px; overflow-y: auto;">
                                <p class="card-text" style="max-width: 100%;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.</p>
                                <a href="#" class="btn btn-primary">Register</a>
                              </div>
                            </div>
                          </div>
                          
                          <div class="col-md-6 col-xl-3 mb-4">
                            <div class="card" style="width: 18rem; height: 28rem;">
                              <h5 class="card-title d-flex justify-content-center">christmas event</h5>
                              <img class="card-img-top" src="../client/assets/img/sample_pubmat2.jpg" alt="Card image cap" style="height: 14rem;">
                              <div class="card-body ">
                                <p class="card-text text-truncate" style="max-width: 100%;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.</p>
                                <a href="#" class="btn btn-primary">Register</a>
                              </div>
                            </div>
                          </div>
                          
                          <div class="col-md-6 col-xl-3 mb-4">
                            <div class="card" style="width: 18rem; height: 28rem;">
                              <h5 class="card-title d-flex justify-content-center">Summer Sounds Festival 2023</h5>
                              <img class="card-img-top" src="../client/assets/img/sample_pubmat.jpg" alt="Card image cap" style="height: 14rem;">
                              <div class="card-body ">
                                <p class="card-text text-truncate" style="max-width: 100%;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.</p>
                                <a href="#" class="btn btn-primary">Register</a>
                              </div>
                            </div>
                          </div>
                          
                    </div>
                </div>
            </div>
            <footer class="bg-white sticky-footer">
                <div class="container my-auto">
                    <div class="text-center my-auto copyright"><span>Copyright © Team Subway 2023</span></div>
                </div>
            </footer>
        </div><a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a>
    </div>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="assets/js/theme.js"></script>
</body>

</html>