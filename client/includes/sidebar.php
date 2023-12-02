<body id="page-top">
    <div id="wrapper">
        <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
            <div class="container-fluid d-flex flex-column p-0"><a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="aboutUs.html">
                    <div class="sidebar-brand-icon rotate-n-15"><i class="fab fa-evernote"></i></div>
                    <div class="sidebar-brand-text mx-3"><span>WEBTEK</span></div>
                </a>
                <hr class="sidebar-divider my-0">
                <ul class="navbar-nav text-light" id="accordionSidebar">
                    <li class="nav-item"><a class="nav-link active" href="index.php"><i class="fas fa-tachometer-alt"></i><span>Dashboard</span></a></li>

                    <?php

                    if(isset($_SESSION['user_id'])){
                        echo ' <li class="nav-item"><a class="nav-link" href="my_events.php"><i class="fas fa-user"></i><span>My Events</span></a></li> ';
                        echo ' <li class="nav-item"><a class="nav-link" href="history_events.php"><i class="fas fa-user"></i><span>Past Events</span></a></li>';
                    }

                    ?>
                    
                    <li class="nav-item"><a class="nav-link" href="login.php"><i class="far fa-user-circle"></i><span>Login</span></a></li>
                    <li class="nav-item"><a class="nav-link" href="register.php"><i class="fas fa-user-circle"></i><span>Register</span></a></li>
                </ul>
                <div class="text-center d-none d-md-inline"><button class="btn rounded-circle border-0" id="sidebarToggle" type="button"></button></div>
            </div>
        </nav>