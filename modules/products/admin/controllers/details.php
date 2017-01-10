<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection
    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $id = json_decode(file_get_contents('php://input'), true)["id"];

    $result = mysqli_query($con, "SELECT * FROM products WHERE ProductId = '$id'");
    $products = array();

    if ($result) {
        while (($product = mysqli_fetch_object($result)) != null) {
            $photoresult = mysqli_query($con, "SELECT * FROM products_photos WHERE ProductId = '$id'");
            $product->Photos = array();

            if ($photoresult) {
                while (($photo = mysqli_fetch_object($photoresult)) != null) {
                    array_push($product->Photos, $photo);
                }
            }
            array_push($products, $product);
        }
    }

    print json_encode($products[0]);
?>