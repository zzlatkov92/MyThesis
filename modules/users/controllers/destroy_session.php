<?php 
    session_id('uid');
    session_start();
    unset($_SESSION['uid']);
    session_commit();
?>