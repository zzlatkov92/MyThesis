<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection
    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $id = '';

    session_start();
    if(!empty($_SESSION['uid'])) {
        $id = $_SESSION['uid'];
    }

    $result = mysqli_query($con, "SELECT * FROM users WHERE `UserId`='$id'");
    $row = mysqli_fetch_object($result);

    $data = '';

    if (!is_null($row)) {
      $data = $row;
    }

    print json_encode($data);
?>