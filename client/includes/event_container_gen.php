<?php

include_once 'database_handler.php';

$result = get_upcoming_events(date("Y/m/d"));
echo '
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>';

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $eventID = $row["eventID"];
        $eventName = $row["EventName"];
        $eventDateStart = date_format(date_create($row["EventDateStart"]), "F j, Y");
        $eventDateEnd = date_format(date_create($row["EventDateEnd"]), "F j, Y");
        $eventLocation = $row["EventLocation"];
        $eventInfo = $row["EventInfo"];

        echo '
        <div class="col-md-6 col-xl-3 mb-4">
            <div class="card" style="width: 18rem; height: 25rem;">
                <h5 class="card-title d-flex justify-content-center" style="padding: 15px; padding-bottom: 5px; text-align: center;">' 
                . $eventName . '
                </h5>
                <img class="card-img-top img-fluid" src="../client/assets/img/sample_pubmat.jpg" alt="Card image cap" style="border-radius: 0px; max-width: 100%; height: 14rem; object-fit: cover;">
                <div class="card-body" style="padding: 0px;">
                    <p class="card-text" style="margin: 0px; text-align: center;">' . $eventDateStart . ' - ' . $eventDateEnd . '</p>
                    <p class="card-text" style="margin: 0px; text-align: center;">VENUE: ' . $eventLocation . '</p>
                </div>
                
                <a class="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle_'.$eventID.'" role="button" style="border-radius: 0px;">Register</a>
        
                    <div class="modal fade" id="exampleModalToggle_'.$eventID.'" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Register to     ' . $eventName . '</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p>' . $eventInfo . '</p>
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Go back to Home</button>';

                                if(isset($_SESSION['user_id'])){
                                    echo '<form action="register_event.php" method="post">
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
    
        echo '
            </div>
        </div>';
    }
}
?>
