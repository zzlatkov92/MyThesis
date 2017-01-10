<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection
    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $data = json_decode(file_get_contents("php://input"));
    session_start();
    $id = $_SESSION['uid'];
    $password = mysqli_real_escape_string($con, $data->pass_repeat);
    $salt = substr($password,0,2);
    $password_crypt = crypt($password,$salt);
     
    $qry_em = "SELECT * FROM `users` WHERE `UserId` = '$id'";
    $result = mysqli_query($con, $qry_em) or die(mysqli_error($con));
    $res = mysqli_fetch_row($result);
     
    if (!is_null($res)) {
        $sql = "UPDATE `users` SET UserPassword='$password_crypt' WHERE `UserId`='$id'";

        if ($con->query($sql) === TRUE) {
            print 'success';
        } else {
            print 'error';
        }
    } else {
        print 'error';
    }
?>