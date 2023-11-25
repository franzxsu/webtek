<?php
    ob_start();
    session_start();

    $server = "localhost";
    $username = "root";
    $password = "";
    $dbname = "wibtik";

    $conn = new mysqli($server ,$username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // INSERT INTO `users`(email, password) VALUES ("asd", "asd");

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        

        //check kung nalagyan ng shit sa lahat ng fields, todo add more validators
        if(!empty($_POST['first_name']) && 
            !empty($_POST['last_name']) && 
            !empty($_POST['email']) && 
            !empty($_POST['password']) && 
            !empty($_POST['password_repeat'])){

                $email = $_POST['email'];
                $password = $_POST['password'];

                $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
                $stmt->bind_param("ss", $email, $password);

                $stmt->execute();
                $result = $stmt->get_result();

                echo $result;
            } else {
                echo "INVALID";
            }
            

    }
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Register - Brand</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i">
</head>
<body class="bg-gradient-primary">
    <div class="container">
        <div class="card shadow-lg o-hidden border-0 my-5">
            <div class="card-body p-0">
                <div class="row">
                    <div class="col-lg-5 d-none d-lg-flex">
                        <div class="flex-grow-1 bg-register-image" style="background-image: url(&quot;../client/assets/img/logos/slu-logo-bg.jpg&quot;);"></div>
                    </div>
                    <div class="col-lg-7">
                        <div class="p-5">
                            <div class="text-center">
                                <h4 class="text-dark mb-4">Sign In</h4>
                            </div>
                            <form class="user" method="post">
                                <div class="row mb-3">
                                    <div class="col-sm-6 mb-3 mb-sm-0"><input class="form-control form-control-user" type="text" id="exampleFirstName" placeholder="First Name" name="first_name"></div>
                                    <div class="col-sm-6"><input class="form-control form-control-user" type="text" id="exampleLastName" placeholder="Last Name" name="last_name"></div>
                                </div>
                                <div class="mb-3"><input class="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Email Address" name="email"></div>
                                <div class="row mb-3">
                                    <div class="col-sm-6 mb-3 mb-sm-0"><input class="form-control form-control-user" type="password" id="examplePasswordInput" placeholder="Password" name="password"></div>
                                    <div class="col-sm-6"><input class="form-control form-control-user" type="password" id="exampleRepeatPasswordInput" placeholder="Repeat Password" name="password_repeat"></div>
                                </div><button class="btn btn-primary d-block btn-user w-100" type="submit">Register Account</button>
                                <hr>
                            </form>
                            <div class="text-center"></div>
                            <div class="text-center"><a class="small" href="login.php">Already have an account? Login!</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="assets/js/theme.js"></script>
</body>

</html>