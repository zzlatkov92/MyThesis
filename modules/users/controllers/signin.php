<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection
    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $data = json_decode(file_get_contents("php://input"));
    $email = mysqli_real_escape_string($con, $data->mail);
    $password = mysqli_real_escape_string($con, $data->pass);
    $salt = substr($password,0,2);
    $password_crypt = crypt($password,$salt);
     
    $qry_em = "SELECT * FROM `users` WHERE `UserEmail` = '$email' AND `UserPassword` = '$password_crypt'";
    $result = mysqli_query($con, $qry_em) or die(mysqli_error($con));
    $res = mysqli_fetch_row($result);
     
    if (!is_null($res)) {
        session_start();
        $_SESSION['uid'] = $res[0];
        print $_SESSION['uid'];
    }
?>