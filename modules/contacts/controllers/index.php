<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection

    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    mysqli_set_charset($con,"utf8");

    $data = json_decode(file_get_contents("php://input"));

    $title = mysqli_real_escape_string($con, $data->ContactTitle);
    $sender = mysqli_real_escape_string($con, $data->ContactSender);
    $email = mysqli_real_escape_string($con, $data->ContactMail);
    $ctx = mysqli_real_escape_string($con, $data->ContactContext);
     
    $sql = "INSERT INTO contacts (ContactTitle, ContactSender, ContactMail, ContactContext) VALUES ('$title', '$sender', '$email', '$ctx')";
    $sql_res = mysqli_query($con, $sql) or die(mysqli_error($con));

    if ($sql_res) {
        print 'success';
    } else {
        print 'error';
    }
?>