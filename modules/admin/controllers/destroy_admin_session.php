<?php 
    session_id('adminid');
    session_start();
    unset($_SESSION['adminid']);
    session_commit();
?>