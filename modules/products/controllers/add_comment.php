<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection

    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    mysqli_set_charset($con,"utf8");

    $data = json_decode(file_get_contents("php://input"));

    $id = mysqli_real_escape_string($con, $data->id);
    $ctx = mysqli_real_escape_string($con, $data->ctx);
    $name = mysqli_real_escape_string($con, $data->name);
    $lastname = mysqli_real_escape_string($con, $data->lastname);

    session_start();
    $user_id = $_SESSION['uid'];

    $sql = "INSERT INTO products_review (ReviewContent, ReviewUserName, ReviewUserLastName, UserId, ProductId) VALUES ('$ctx', '$name', '$lastname', '$user_id', '$id')";
    $sql_res = mysqli_query($con, $sql) or die(mysqli_error($con));

    if ($sql_res) {
        print 'success';
    } else {
        print 'error';
    }
?>