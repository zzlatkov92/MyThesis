<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection
    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    mysqli_set_charset($con,"utf8");

    $id = json_decode(file_get_contents('php://input'), true)["id"];

    $result = mysqli_query($con, "SELECT * FROM categories WHERE `CategoryId`='$id'");
    $row = mysqli_fetch_object($result);

    $data = '';

    if (!is_null($row)) {
      $data = $row;
    }

    print json_encode($data);
?>