<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection
    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    mysqli_set_charset($con,"utf8");

    $data = json_decode(file_get_contents("php://input"));
    session_start();
    $id = $_SESSION['uid'];
    $name = mysqli_real_escape_string($con, $data->UserName);
    $last_name = mysqli_real_escape_string($con, $data->UserLastName);
    $email = mysqli_real_escape_string($con, $data->UserEmail);
     
    $qry_em = "SELECT * FROM `users` WHERE `UserId` = '$id'";
    $result = mysqli_query($con, $qry_em) or die(mysqli_error($con));
    $res = mysqli_fetch_row($result);
     
    if (!is_null($res)) {
        $sql = "UPDATE `users` SET UserName='$name', UserLastName='$last_name', UserEmail='$email' WHERE `UserId`='$id'";

        if ($con->query($sql) === TRUE) {
            print 'success';
        } else {
            print 'error';
        }
    } else {
        print 'error';
    }
?>