<?php 
    session_start();
    if(isset($_SESSION['adminid'])) {
    	print 'authenticated';
    }
?>