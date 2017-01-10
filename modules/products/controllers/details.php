<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection
    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $link = json_decode(file_get_contents('php://input'), true)["link"];

    $result = mysqli_query($con, "SELECT * FROM products WHERE ProductLink = '$link'");
    $products = array();

    if ($result) {
        while (($product = mysqli_fetch_object($result)) != null) {
            $id = $product->ProductId;
            $photoresult = mysqli_query($con, "SELECT * FROM products_photos WHERE ProductId = '$id'");
            $product->Photos = array();

            if ($photoresult) {
                while (($photo = mysqli_fetch_object($photoresult)) != null) {
                    array_push($product->Photos, $photo);
                }
            }

            $commentresult = mysqli_query($con, "SELECT * FROM products_review WHERE ProductId = '$id'");
            $product->Comments = array();

            if ($commentresult) {
                while (($comment = mysqli_fetch_object($commentresult)) != null) {
                    array_push($product->Comments, $comment);
                }
            }
            array_push($products, $product);
        }
    }

    print json_encode($products[0]);
?>