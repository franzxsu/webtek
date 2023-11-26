<!-- https://getbootstrap.com/docs/5.3/getting-started/introduction/ -->

<?php
include('database_handler.php');
echo test();

session_start();
    echo "NAME: " . $_SESSION['first_name'] . " " . $_SESSION['last_name'];

    echo "USER ID: " . $_SESSION['user_id'];

    echo "EMAIL: " . $_SESSION['email']; 
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Event Dashboard</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-4">
        <h1>Event Dashboard</h1>
            <div class="row mt-4">
                <div class="card" style="width: 18rem;">
                    <h5 class="card-title d-flex justify-content-center">Summer Sounds Festival 2023</h5>
                    <img class="card-img-top" src="../client/assets/img/sample_pubmat.jpg" alt="Card image cap">
                    <div class="card-body ">
                        <p class="card-text text-truncate" style="max-width: 100% ;">Lorem ipsum dolor sit amet, 
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                            laboris nisi ut aliquip ex ea.</p>
                        <a href="#" class="btn btn-primary">Register</a>
                    </div>
                </div>
                <div class="card" style="width: 18rem;">
                    <h5 class="card-title d-flex justify-content-center">sample</h5>
                    <img class="card-img-top" src="../client/assets/img/sample_pubmat2.jpg" alt="Card image cap">
                    <div class="card-body ">
                        <p class="card-text text-truncate" style="max-width: 100% ;">Lorem ipsum dolor sit amet, 
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                            laboris nisi ut aliquip ex ea.</p>
                        <a href="#" class="btn btn-primary">Register</a>
                    </div>
                </div>
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="..." alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>

    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script>
    </script>
</body>
</html>
