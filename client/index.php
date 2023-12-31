<!-- https://getbootstrap.com/docs/5.3/getting-started/introduction/ -->

<?php
include_once 'database_handler.php';

session_start();

if(isset($_SESSION['user_id'])){
    //refresh get in realtime course and org of user
    $_SESSION['courseID'] = get_user_course_id($_SESSION['email']);
    $_SESSION['organizations'] = get_user_organizations($_SESSION['email']);
}
?>



<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>E-HUB | Dashboard</title>
    <link rel="stylesheet" href="assets/fonts/material-icons.min.css">
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i">
    <link rel="stylesheet" href="assets/fonts/fontawesome-all.min.css">
    <link rel="stylesheet" href="assets/fonts/font-awesome.min.css">
    <link rel="stylesheet" href="assets/fonts/fontawesome5-overrides.min.css">
    <link rel="stylesheet" href="assets/css/News-Cards.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
</head>
<body id="page-top">
    <div id="wrapper">
<?php include_once 'includes/sidebar.php'; ?>
        <div class="d-flex flex-column" id="content-wrapper">
            <div id="content">
            <?php include_once "includes/header.php"; ?>
                <div class="container-fluid">
                    <div class="d-sm-flex justify-content-between align-items-center mb-4">
                        <h3 class="text-dark mb-0">Upcoming Events</h3>
                    </div>
                    <div class="row">
                        <div class="col">
                            <?php include_once 'includes/event_container_gen.php' ?>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            
            <?php
                if(isset($_SESSION['reg_status'])){
                    //this code will just check if reg_status returned a registration id (registration is ok)
                    if (is_numeric($_SESSION['reg_status'])) {
                        $registration_status = <<<EOT
                        You have successfully registered to the event
                        ID: {$_SESSION['reg_status']}
                        EOT;
                        $status = "successful";
                    } else {
                        $registration_status = $_SESSION['reg_status'];
                        $status = "failed";
                    }
                } 
            ?>

            <!-- MODAL REGISTRATION STATUS -->
            <div class="modal fade" id="eventRegistrationStatusModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="successModalLabel">Registration <?php echo $status?></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <?php
                                echo '<p>'. $registration_status .'</p>';
                            ?>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <a href="my_events.php" class="btn btn-primary">My Events</a>
                        </div>
                    </div>
                </div>
            </div>
        <script>
            <?php 
            
            if (isset($_SESSION['reg_status'])): ?>
                var myModal = new bootstrap.Modal(document.getElementById('eventRegistrationStatusModal'), {
                    keyboard: false
                });
                myModal.show();
                    //unset after showing modal
                <?php unset($_SESSION['reg_status']); ?>
            <?php endif; ?>

        </script>
<?php
    include_once 'includes/footer.php';
?>
