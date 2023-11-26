<?php
//clear session road :D
   session_start();
   session_unset();

   header('Refresh: 1; URL = login.php');
?>