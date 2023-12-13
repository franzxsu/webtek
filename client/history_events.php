<?php
include_once "database_handler.php";
include "helpers.php";

session_start();

if (isset($_SESSION["user_id"])) {
    $x = get_registered_events_for_me($_SESSION["user_id"]);
    if ($x !== null) {
        $events = get_past_events($x);
    } else {
        $events = null;
    }
}
?>


<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>E-HUB | History</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i">
    <link rel="stylesheet" href="assets/fonts/fontawesome-all.min.css">
    <link rel="stylesheet" href="assets/fonts/font-awesome.min.css">
    <link rel="stylesheet" href="assets/fonts/fontawesome5-overrides.min.css">
</head>
<body id="page-top">
    <div id="wrapper">
<?php include_once "includes/sidebar.php"; ?>
        <div class="d-flex flex-column" id="content-wrapper">
            <div id="content">
            <?php include_once "includes/header.php"; ?>
                <div class="container-fluid">
                    <h3 class="text-dark mb-4">My Events</h3>
                    <div class="card shadow">
                        <div class="card-header py-3">
                            <p class="text-primary m-0 fw-bold">Past Events</p>
                        </div>
                        <div class="card-body">
                        <?php if ($events !== null && !empty($events)): ?>
                            <div class="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                            <table class="table my-0" id="dataTable">
                                <thead>
                                    <tr>
                                        <th>Event Name</th>
                                        <th>Event Info</th>
                                        <th>Organizer</th>
                                        <th>Event Venue</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Attendance</th>
                                        <th>Rate</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($events as $event): ?>
                                        <tr>
                                            <td>
                                                <!-- FOR POSTER -->
                                                    <?php if (
                                                        $event["poster"] !==
                                                        null
                                                    ): ?>
                                                        <img class="rounded-circle me-2" width="30" height="30" src="data:image/jpeg;base64,<?= base64_encode(
                                                            $event["poster"]
                                                        ) ?>">
                                                    <?php else: ?>
                                                        <img class="rounded-circle me-2" width="30" height="30" src="assets/img/sample_pubmat.jpg">
                                                    <?php endif; ?>


                                            </td>
                                            <td><?= $event["EventInfo"] ?></td>
                                            <td><?= get_organization_name_from_id(
                                                $event["OrganizerId"]
                                            ) ?></td>
                                            <td><?= $event[
                                                "EventLocation"
                                            ] ?></td>
                                            <td><?= date(
                                                "F j",
                                                strtotime(
                                                    $event["EventDateStart"]
                                                )
                                            ) ?></td>
                                            <td><?= date(
                                                "F j",
                                                strtotime(
                                                    $event["EventDateEnd"]
                                                )
                                            ) ?></td>
                                            <?php if (
                                                isAttended(
                                                    $_SESSION["user_id"],
                                                    $event["eventID"]
                                                )
                                            ) {
                                                echo '<td style="text-align: center;"><i class="fas fa-check"></i></td>';
                                                echo '<td>
                                                        <a href="#" data-bs-toggle="modal" data-bs-target="#ratingModal' .
                                                            $event["eventID"] .
                                                            '">Rate</a>
                                                        <!-- Rating modal -->
                                                        <div class="modal fade" id="ratingModal' .
                                                    $event["eventID"] .
                                                    '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog modal-dialog-centered">
                                                    <div class="modal-content"> 
                                                        <div class="modal-header">
                                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Rate ' .
                                                    $event["EventName"] .
                                                    '</h1>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <form action="send_feedback.php" method="post">
                                                                    <div class="mb-3">
                                                                        <input type="hidden" name="eventId" value='.$event["eventID"].'>
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label for="message-text" class="col-form-label">Message:</label>
                                                                        <textarea class="form-control" name="message" id="message-text"></textarea>
                                                                    </div>  
                                                                    <div class="form-check">
                                                                        <input class="form-check-input custom-control-input" type="checkbox" id="formCheck-1">
                                                                        <label class="form-check-label custom-control-label" for="formCheck-1">Send anonymously</label>
                                                                    </div>
                                                                
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                <button type="submit" class="btn btn-primary">Send Rating</button>
                                                            </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>';
                                            } else {
                                                echo '<td style="text-align: center;"></td>';
                                                echo "<td>n/a</td>";
                                            } ?>           
                                        </tr>
                                    <?php endforeach; ?>
                                </tbody>
                                
                            </table>
                            </div>
                            <?php foreach ($events as $event): ?>
                                <div class="modal fade" id="cancelConfirmationModal<?= $event[
                                    "eventID"
                                ] ?>" tabindex="-1" aria-labelledby="cancelConfirmationModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="cancelConfirmationModalLabel">Cancel event</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                Are you sure you want to cancel your registration for this event?
                                            </div>
                                            <div class="modal-footer">
                                                <form action="database_handler.php" method="post">
                                                    <input type="hidden" name="userID" value="<?= $_SESSION[
                                                        "user_id"
                                                    ] ?>">
                                                    <input type="hidden" name="eventID" value="<?= $event[
                                                        "eventID"
                                                    ] ?>">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" class="btn btn-danger" name="cancel">Confirm Cancel</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <div class="alert alert-danger" role="alert">
                                You have no past events.
                            </div>
                        <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
            <?php include_once "includes/footer.php"; ?>
        </div><a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a>
    </div>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="assets/js/theme.js"></script>
</body>

</html>