<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection

    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    mysqli_set_charset($con,"utf8");

    $data = json_decode(file_get_contents("php://input"));

    $id = '';

    if(!empty($data->ProducerId)) {
        $id = mysqli_real_escape_string($con, $data->ProducerId);
    }

    $name = mysqli_real_escape_string($con, $data->ProducerName);
     
    if ($id != '') {
        $sql = "UPDATE `producers` SET ProducerName='$name' WHERE `ProducerId`='$id'";
        $sql_res = mysqli_query($con, $sql) or die(mysqli_error($con));

        if ($sql_res) {
            print 'success';
        } else {
            print 'error';
        }
    } else {
        $sql = "INSERT INTO producers (ProducerName) VALUES ('$name')";
        $sql_res = mysqli_query($con, $sql) or die(mysqli_error($con));

        if ($sql_res) {
            print 'success';
        } else {
            print 'error';
        }
    }
?>