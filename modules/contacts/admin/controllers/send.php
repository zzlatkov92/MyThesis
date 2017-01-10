<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection

    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    mysqli_set_charset($con,"utf8");

    $data = json_decode(file_get_contents("php://input"));

    $id = mysqli_real_escape_string($con, $data->ContactId);
    $answer = mysqli_real_escape_string($con, $data->ContactAnswer);
     
    $sql = "UPDATE `contacts` SET ContactAnswer='$answer' WHERE `ContactId`='$id'";
    $sql_res = mysqli_query($con, $sql) or die(mysqli_error($con));

    if ($sql_res) {

        $to = mysqli_real_escape_string($con, $data->ContactMail);
        $subject = mysqli_real_escape_string($con, $data->ContactTitle);
        $txt = $answer;
        $headers = "From: admin@ecommerce.com" . "\r\n" .
        "CC: admin@ecommerce.com";

        mail($to,$subject,$txt,$headers);

        print 'success';
    } else {
        print 'error';
    }
?>