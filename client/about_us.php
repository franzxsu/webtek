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
    <title>E-HUB | SUBWAY</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i">
    <link rel="stylesheet" href="assets/fonts/fontawesome-all.min.css">
    <link rel="stylesheet" href="assets/fonts/font-awesome.min.css">
    <link rel="stylesheet" href="assets/fonts/fontawesome5-overrides.min.css">
    <link rel="stylesheet" href="assets/css/Team-Boxed.css">
</head>

<body id="page-top">
    <div id="wrapper">
        <?php include_once 'includes/sidebar.php'; ?>
        <div class="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <?php include_once 'includes/header.php'; ?>
                <div class="container-fluid">
                    <section class="team-boxed">
                        <div class="container">
                            <div class="intro">
                                <h2 class="text-center">SUBWAY</h2>
                                <p class="text-center">about the team</p>
                            </div>
                            <div class="row people">
                                <div class="col-md-6 col-lg-4 item">
                                    <div class="box"><img class="rounded-circle" src="assets/img/members/darren.jpg">
                                        <h3 class="name">Darren Franz</h3>
                                        <p class="title">Lead developer</p>
                                        <p class="description">Darren is a highly creative individual who thrives on challenging tasks. He has a knack for turning complex problems into elegant solutions. Outside of work, he's a passionate gamer and coffee enthusiast.</p>
                                        <div class="social"><a href="#"><i class="fa fa-facebook-official"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-instagram"></i></a></div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4 item">
                                    <div class="box"><img class="rounded-circle" src="assets/img/members/derek.jpg">
                                        <h3 class="name">Derek Isabelo</h3>
                                        <p class="title">DevOps Engineer</p>
                                        <p class="description">Derek is an experienced DevOps professional with a keen eye for detail. He's passionate about automation and loves to explore new technologies. Outside of work, he's a travel enthusiast and a foodie.</p>
                                        <div class="social"><a href="#"><i class="fa fa-facebook-official"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-instagram"></i></a></div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4 item">
                                    <div class="box"><img class="rounded-circle" src="assets/img/members/hans.jpg">
                                        <h3 class="name">Hans Lloyd Reyes</h3>
                                        <p class="title">Project Manager</p>
                                        <p class="description">Hans is a detail-oriented project manager who excels in leading cross-functional teams. He is known for his effective skills and ability to meet tight deadlines. Outside work, he enjoys playing the guitar and traveling to new places.</p>
                                        <div class="social"><a href="#"><i class="fa fa-facebook-official"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-instagram"></i></a></div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4 item">
                                    <div class="box"><img class="rounded-circle" src="assets/img/members/justin.jpg">
                                        <h3 class="name">Bustin Louie Lo</h3>
                                        <p class="title">Backend Developer</p>
                                        <p class="description">Bustin is a skilled backend developer with a passion for problem-solving. He loves working on challenging projects and implementing innovative solutions. In his free time, he enjoys hiking and exploring nature.</p>
                                        <div class="social"><a href="#"><i class="fa fa-facebook-official"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-instagram"></i></a></div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4 item">
                                    <div class="box"><img class="rounded-circle" src="assets/img/members/trisha.jpg">
                                        <h3 class="name">Trisha Andaya</h3>
                                        <p class="title">QA Tester</p>
                                        <p class="description">Trisha is an enthusiastic QA tester known for her meticulous attention to detail. She has a knack for finding bugs and ensuring software quality. Outside of work, she enjoys cooking and attending art classes.</p>
                                        <div class="social"><a href="#"><i class="fa fa-facebook-official"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-instagram"></i></a></div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4 item">
                                    <div class="box"><img class="rounded-circle" src="assets/img/members/rey.jpg">
                                        <h3 class="name">Rey John Agbayani</h3>
                                        <p class="title">Frontend Developer</p>
                                        <p class="description">Rey is a creative frontend developer with a passion for crafting intuitive user interfaces. He loves experimenting with new design trends and technologies. During his free time, he enjoys photography and hiking.</p>
                                        <div class="social"><a href="#"><i class="fa fa-facebook-official"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-instagram"></i></a></div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4 item">
                                    <div class="box"><img class="rounded-circle" src="assets/img/members/aeronn.jpg">
                                        <h3 class="name">Aeronn Charles Camza</h3>
                                        <p class="title">UI/UX Designer</p>
                                        <p class="description">Aeronn is a passionate UI/UX designer dedicated to creating visually appealing and user-friendly interfaces. He enjoys brainstorming new design ideas and turning them into elegant solutions. In his leisure time, he loves playing guitar and writing poetry.</p>
                                        <div class="social"><a href="#"><i class="fa fa-facebook-official"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-instagram"></i></a></div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <?php include_once 'includes/footer.php'; ?>
        </div><a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a>
    </div>
    <script src="assets/js/theme.js"></script>
</body>

</html>