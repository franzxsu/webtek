<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];
    echo "UNAME: " . $username . "<br>";
    echo "PASS: " . $password . "<br>";
}
?>
