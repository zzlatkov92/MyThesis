<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection

    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    mysqli_set_charset($con,"utf8");

    $data = json_decode(file_get_contents("php://input"));

    $id = mysqli_real_escape_string($con, $data->id);
    $status = mysqli_real_escape_string($con, $data->status);


    $sql = "UPDATE `orders` SET OrderStatus='$status', StatusChanged=true WHERE `OrderId`='$id'";
    $sql_res = mysqli_query($con, $sql) or die(mysqli_error($con));

    if ($sql_res) {
        print 'success';
    } else {
        print 'error';
    }
?>