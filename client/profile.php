<?php
include_once 'database_handler.php';
include_once 'helpers.php';

session_start();

if(isset($_SESSION['user_id'])){

}
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>E-HUB | Profile</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed:400,400i,700,700i">
    <link rel="stylesheet" href="assets/fonts/fontawesome-all.min.css">
    <link rel="stylesheet" href="assets/fonts/font-awesome.min.css">
    <link rel="stylesheet" href="assets/fonts/fontawesome5-overrides.min.css">
</head>
<body id="page-top">
    <div id="wrapper">
<?php
    include_once 'includes/sidebar.php';
?>
        <div class="d-flex flex-column" id="content-wrapper">
            <div id="content">
            <?php include_once "includes/header.php"; ?>
                <div class="container-fluid">
                    <h3 class="text-dark mb-4">Profile</h3>
                    <div class="row mb-3">
                        <div class="col-lg-4">
                            <div class="card mb-3">
                                <div class="card-body text-center shadow"><img class="rounded-circle mb-3 mt-4" src="assets/img/avatars/default_icon2.jpg" width="160" height="160">
                                    <div class="mb-3"><button class="btn btn-primary btn-sm" type="button">Change Photo</button></div>
                                </div>
                            </div>
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="text-primary fw-bold m-0">User stats</h6>
                                </div>
                                <div class="card-body">
                                    <h4 class="small fw-bold">Registered events<span class="float-end">
                                        <?php
                                            $userData = get_registered_events_for_me($_SESSION['user_id']);
                                            if ($userData !== null) {
                                                echo $userData->num_rows;
                                            } else {
                                                echo "0";
                                            }
                                        ?>
                                    </span></h4>
                                    <h4 class="small fw-bold">Attended Events<span class="float-end">

                                    <?php
                                            $userData = get_number_of_attended_events($_SESSION['user_id']);
                                            if ($userData !== null) {
                                                echo $userData;
                                            } else {
                                                echo "0";
                                            }
                                        ?>

                                    </span></h4>
                                    <h4 class="small fw-bold">Course<span class="float-end">
                                        
                                    <?php
                                        $userData = get_course_name_from_id(get_user_course_id($_SESSION['email']));
                                        if ($userData !== null){
                                            echo $userData;
                                        }
                                        else{
                                            echo "N/A";
                                        }
                                            
                                    ?>

                                    </span></h4>


                                    <h4 class="small fw-bold"># of organizations<span class="float-end">
                                        
                                    <?php
                                        $userData = get_user_organizations($_SESSION['email']);
                                        if ($userData !== null) {
                                            $numberOfRows = count($userData);
                                            echo $numberOfRows;
                                        } else {
                                            echo "0";
                                        }
                                    ?>


                                    </span></h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <div class="row">
                                <div class="col">
                                    <div class="card shadow mb-3">
                                        <div class="card-header py-3">
                                            <p class="text-primary m-0 fw-bold">User Settings</p>
                                        </div>
                                        <div class="card-body">
                                            <form>
                                                <div class="row">
                                                    <div class="col">
                                                        <div class="mb-3"><label class="form-label" for="email"><strong>Email Address</strong></label><input class="form-control" type="email" id="email" placeholder=<?php echo $_SESSION['email']; ?> name="email"></div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <div class="mb-3"><label class="form-label" for="first_name"><strong>First Name</strong></label><input class="form-control" type="text" id="first_name" placeholder=<?php echo $_SESSION['first_name']; ?> name="first_name"></div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="mb-3"><label class="form-label" for="last_name"><strong>Last Name</strong></label><input class="form-control" type="text" id="last_name" placeholder=<?php echo $_SESSION['last_name'];?> name="last_name"></div>
                                                    </div>
                                                </div>
                                                <div class="mb-3"><button class="btn btn-primary btn-sm" type="submit">Save Settings</button></div>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="card shadow">
                                        <div class="card-header py-3">
                                            <p class="text-primary m-0 fw-bold">Organizations</p>
                                        </div>
                                        <div class="card-body">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Organization Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <?php
                                                        $organizations = get_user_organizations_all_name($_SESSION['email']);
                                                        if ($organizations) {
                                                            foreach ($organizations as $orgName) {
                                                                echo "<tr><td>$orgName</td></tr>";
                                                            }
                                                        }
                                                        ?>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card shadow mb-5">
                        <div class="card-header py-3">
                            <p class="text-primary m-0 fw-bold"><i class="fa fa-code"></i> - WORK IN PROGRESS: ACTIVITY LOGS - <i class="fa fa-code"></i></p>
                        </div>
                        <div class="card-body">


                        </div>
                    </div>
                </div>
            </div>
            <?php
            include_once 'includes/footer.php'
            ?>
        </div><a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a>
    </div>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="assets/js/theme.js"></script>
</body>

</html>