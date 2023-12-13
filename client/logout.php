<?php
//clear session
   session_start();
   session_unset();

   header('Refresh: 1; URL = login.php');
?>