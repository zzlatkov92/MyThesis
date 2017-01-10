<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection

    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    mysqli_set_charset($con,"utf8");

    $data = json_decode(file_get_contents("php://input"));

    $id = mysqli_real_escape_string($con, $data->id);

    session_start();
    $user_id = $_SESSION['uid'];

    $sql_test = "SELECT * FROM favorite_products WHERE ProductId = '$id'";
    $sql_test_res = mysqli_query($con, $sql_test) or die(mysqli_error($con));

    if(mysqli_fetch_object($sql_test_res) == null) {
        $sql = "INSERT INTO favorite_products (UserId, ProductId) VALUES ('$user_id', '$id')";
        $sql_res = mysqli_query($con, $sql) or die(mysqli_error($con));

        if ($sql_res) {
            print 'success';
        } else {
            print 'error';
        }
    } else {
        print 'added';
    }
?>