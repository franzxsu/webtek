<?php
$sql = "SELECT * FROM events";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $eventName = $row["EventName"];
        $eventDateStart = date_format(date_create($row["EventDateStart"]), "F j, Y");
        $eventDateEnd = date_format(date_create($row["EventDateEnd"]), "F j, Y");
        $eventLocation = $row["EventLocation"];
        $eventInfo = $row["EventInfo"];

        echo '<div class="col-md-6 col-xl-3 mb-4">
                                        <div class="card" style="width: 18rem; height: 35rem;">
                                            <h5 class="card-title d-flex justify-content-center" style="padding: 15px; padding-bottom: 5px; text-align: center;">
                                                ' . $eventName . '
                                            </h5>
                                            <img class="card-img-top img-fluid" src="../client/assets/img/sample_pubmat.jpg" alt="Card image cap" style="border-radius: 0px; max-width: 100%; height: 14rem; object-fit: cover;">
                                            <div class="card-body" style="padding: 0px;">
                                                <p class="card-text" style="margin: 0px; text-align: center;">' . $eventDateStart . ' - ' . $eventDateEnd . '</p>
                                                <p class="card-text" style="margin: 0px; text-align: center;">VENUE: ' . $eventLocation . '</p>
                                            </div>
                                            <div class="card-body" style="max-height: 500px; overflow-y: auto;">
                                                <p class="card-text" style="max-width: 100%; padding: 0px;">' . $eventInfo . '</p>
                                            </div>
                                            <a href="#" class="btn btn-primary" style="border-radius: 0px;">Register</a>
                                        </div>
                                    </div>';
    }
}
