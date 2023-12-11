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

<?php include_once "includes/sidebar.php"; ?>
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
                                        <h6 class="dropdown-header">Notifications</h6><a class="dropdown-item d-flex align-items-center" href="#">
                                            <div class="me-3">
                                                <div class="bg-primary icon-circle"><i class="fas fa-file-alt text-white"></i></div>
                                            </div>
                                            <div><span class="small text-gray-500">December 12, 2019</span>
                                                <p>Upcoming event at date</p>
                                            </div>
                                        </a><a class="dropdown-item d-flex align-items-center" href="#">
                                            <div class="me-3">
                                                <div class="bg-success icon-circle"><i class="fas fa-donate text-white"></i></div>
                                            </div>
                                            <div><span class="small text-gray-500">December 7, 2019</span>
                                                <p>Upcoming event at date</p>
                                            </div>
                                        </a><a class="dropdown-item d-flex align-items-center" href="#">
                                            <div class="me-3">
                                                <div class="bg-warning icon-circle"><i class="fas fa-exclamation-triangle text-white"></i></div>
                                            </div>
                                            <div><span class="small text-gray-500">December 2, 2019</span>
                                                <p>Upcoming event at date</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <div class="d-none d-sm-block topbar-divider"></div>
                            <li class="nav-item dropdown no-arrow">
                                <div class="nav-item dropdown no-arrow">
                                    <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
                                        <span class="d-none d-lg-inline me-2 text-gray-600 small">
                                            <?php if (
                                                isset(
                                                    $_SESSION["first_name"]
                                                ) &&
                                                isset($_SESSION["last_name"])
                                            ) {
                                                echo $_SESSION["first_name"] .
                                                    " " .
                                                    $_SESSION["last_name"];
                                            } else {
                                                echo "GUEST";
                                            } ?>
                                        </span>
                                        <img class="border rounded-circle img-profile" src="assets/img/avatars/default_icon.jpg">
                                    </a>
                                    <div class="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                                        <?php if (isset($_SESSION["user_id"])) {
                                            echo '<a class="dropdown-item" href="logout.php"><i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Log out</a>';
                                        } else {
                                            echo '<a class="dropdown-item" href="login.php"><i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Log in</a>';
                                        } ?>

                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
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
                                                                <form>
                                                                    <div class="mb-3">
                                                                        <label for="recipient-name" class="col-form-label">Rating (star rating dapat ito):</label>
                                                                        <input type="text" class="form-control" id="recipient-name">
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label for="message-text" class="col-form-label">Message:</label>
                                                                        <textarea class="form-control" id="message-text"></textarea>
                                                                    </div>  
                                                                    <div class="form-check">
                                                                        <input class="form-check-input custom-control-input" type="checkbox" id="formCheck-1">
                                                                        <label class="form-check-label custom-control-label" for="formCheck-1">Send anonymously</label>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                <button type="button" class="btn btn-primary">Send Rating</button>
                                                            </div>
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