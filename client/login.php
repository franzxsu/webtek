<!-- http://localhost/webtek/client/login.php -->

<!-- VALID CREDENTIALS FOR TESTING: 
    , 123 -->

<?php
    include 'includes/login_handler.php';
?>


<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Login - Brand</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i">
</head>

<style>
     body {
  background: url('../client/assets/img/logos/slu-campus.jpg');
  background-attachment: fixed;
}
body.bg-gradient-primary {
    background-image: url('../client/assets/img/logos/slu-campus.jpg') !important;
    background-color: rgba(0,0,0,0.5) !important; 
}

.bg-image-overlay {
  position: relative; 
}

.bg-image-overlay::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;  
  background-color: rgba(0,0,0,0.5) !important; 
} 
</style>

<body class="bg-gradient-primary">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-9 col-lg-12 col-xl-10">
                <div class="card shadow-lg o-hidden border-0 my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-flex">
                                <div class="flex-grow-1 bg-login-image" style="background-image: url(&quot;../client/assets/img/logos/slu-logo-bg.jpg&quot;);"></div>
                            </div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h4 class="text-dark mb-4">Log In</h4>
                                    </div>
                                    <form class="user" method="post">
                                        <div class="mb-3"><input class="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." name="email"></div>
                                        <div class="mb-3"><input class="form-control form-control-user" type="password" id="exampleInputPassword" placeholder="Password" name="password"></div>
                                        <?php 
                                                if(isset($login_error)) {
                                                    // error message
                                                    echo '<small class="text-danger">' . htmlspecialchars($login_error) . '</small>';
                                                }
                                            ?>
                                        <div class="mb-3">
                                            <div class="custom-control custom-checkbox small">
                                                <div class="form-check"><input class="form-check-input custom-control-input" type="checkbox" id="formCheck-1"><label class="form-check-label custom-control-label" for="formCheck-1">Remember Me</label></div>
                                            </div>
                                        </div><button class="btn btn-primary d-block btn-user w-100" type="submit">Login</button>
                                        <hr>
                                    </form>
                                    <div class="text-center"><a class="small" href="index.php">Continue as Guest</a></div>
                                    <div class="text-center"><a class="small" href="signup.php">Create an Account!</a></div>
                                </div>
                            </div>
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