<?php

include_once 'database_handler.php';
include_once 'helpers.php';

//check if session is set (user is logged in), then show events for user
if (isset($_SESSION['user_id'])) {
    $x = get_events_for_me($_SESSION['courseID'], $_SESSION['organizations'], $_SESSION['email']);
}

//if not, show events that are marked for 'everyone'
else {
    $x = get_everyone_events();
}
$result = get_upcoming_events($x);

echo '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>';

if (is_array($result) && count($result) > 0) {
    foreach ($result as $row) {
        $eventID = $row["eventID"];
        $eventName = $row["EventName"];

        $realDateStart = date_format(date_create($row["EventDateStart"]), "F j");
        $realDateEnd = date_format(date_create($row["EventDateEnd"]), "F j");

        $eventMonthStart = date_format(date_create($row["EventDateStart"]), "M");
        $eventMonthEnd = date_format(date_create($row["EventDateEnd"]), "M");

        $eventDayStart = date_format(date_create($row["EventDateStart"]), "d");
        $eventDayEnd = date_format(date_create($row["EventDateEnd"]), "d");

        $eventLocation = $row["EventLocation"];
        $eventInfo = $row["EventInfo"];
        $posterBlob = $row["poster"];

        // Set image source based on MIME type or use default image
        if ($posterBlob) {
            if (strpos($posterBlob, "\xFF\xD8") === 0) {
                $mime = 'image/jpeg';
            } elseif (strpos($posterBlob, "\x89\x50\x4E\x47\x0D\x0A\x1A\x0A") === 0) {
                $mime = 'image/png';
            } else {
                // Default jpeg if signature not found
                $mime = 'image/jpeg';
            }

            if ($mime && in_array($mime, ['image/jpeg', 'image/png'])) {
                echo '
                <figure class="snip1527">
                    <figcaption>
                        <div class="date"><span class="day">'.$eventDayStart.'</span><span class="month">'.$eventMonthStart.'</span></div>
                        <h3>'. $eventName .'</h3>
                        <p class="d-inline-block text-truncate" style="max-width: 200px;">
                        '.$eventInfo.'
                    </p>
                    </figcaption>
                    <div class="image"><img src="data:'.$mime.';base64,'.base64_encode($posterBlob).'" alt="event-image" /></div>
                    <a data-bs-toggle="modal" href="#exampleModalToggle_'.$eventID.'"></a>
                </figure>';
            } else {
                echo '
                <figure class="snip1527">
                    <figcaption>
                        <div class="date"><span class="day">'.$eventDayStart.'</span><span class="month">'.$eventMonthStart.'</span></div>
                        <h3>'. $eventName .'</h3>
                        <p class="d-inline-block text-truncate" style="max-width: 200px;">
                        '.$eventInfo.'
                    </p>
                    </figcaption>
                    <div class="image"><img src="../client/assets/img/defaultposter.jpg" alt="default-event-image" /></div>
                    <a data-bs-toggle="modal" href="#exampleModalToggle_'.$eventID.'"></a>
                </figure>';
            }
        } else {
            echo '
            <figure class="snip1527">
                <figcaption>
                    <div class="date"><span class="day">'.$eventDayStart.'</span><span class="month">'.$eventMonthStart.'</span></div>
                    <h3 >'. $eventName .'</h3>
                    <p class="d-inline-block text-truncate" style="max-width: 200px;">
                        '.$eventInfo.'
                    </p>
                </figcaption>
                <div class="image"><img src="../client/assets/img/defaultposter.jpg" alt="default-event-image" /></div>
                <a data-bs-toggle="modal" href="#exampleModalToggle_'.$eventID.'"></a>
            </figure>';
        }

        echo' 
        
        <div class="modal fade" id="exampleModalToggle_'.$eventID.'" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Register to     ' . $eventName . '</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <p>' . $eventInfo . '</p>
                        </div>
                        <div class="row">
                            <p>VENUE: '. $eventLocation .'</p>
                        </div>
                        <div class="row">
                            <p>' . $realDateStart . ' - ' .$realDateEnd .'</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Go back to Home</button>';
                        if(isset($_SESSION['user_id'])){
                        echo '
                        <form action="register_event.php" method="post">
                            <input type="hidden" name="event_id" value="' . $eventID . '">
                            <button type="submit" class="btn btn-primary">Register to event</button>
                        </form>
                        </form>';
                        }
                        else{
                        echo '<a href="login.php" type="submit" class="btn btn-primary">You must be signed in to continue</a>';
                        }
                        echo'
                    </div>
                </div>
            </div>
            </div>

        ';
    }
}
?>