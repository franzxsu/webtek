<?php
$sql = "SELECT * FROM events";
$result = $conn->query($sql);
echo
'<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>';

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
                <div class="card" style="width: 18rem; height: 35rem;">
                    <h5 class="card-title d-flex justify-content-center" style="padding: 15px; padding-bottom: 5px; text-align: center;">' 
                    . $eventName . '
                    </h5>
                    <img class="card-img-top img-fluid" src="../client/assets/img/sample_pubmat.jpg" alt="Card image cap" style="border-radius: 0px; max-width: 100%; height: 14rem; object-fit: cover;">
                    <div class="card-body" style="padding: 0px;">
                        <p class="card-text" style="margin: 0px; text-align: center;">' . $eventDateStart . ' - ' . $eventDateEnd . '</p>
                        <p class="card-text" style="margin: 0px; text-align: center;">VENUE: ' . $eventLocation . '</p>
                    </div>
                    <div class="card-body" style="max-height: 500px; overflow-y: auto;">
                        <p class="card-text" style="max-width: 100%; padding: 0px;">' . $eventInfo . '</p>
                    </div>';

        if (isset($_SESSION['user_id'])) {
            echo '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" style="border-radius: 0px;">Register</button>';
        } else {
            echo '<a href="login.php" class="btn btn-primary" style="border-radius: 0px;">Not signed in</a>';
        }

        echo '
            </div>
        </div>';
        
    }
    
}


?> 
<div class="modal" id="myModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
