<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection
    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    session_start();
    $id = $_SESSION['uid'];

    $query = "SELECT * FROM products products 
                INNER JOIN products_review review 
                ON products.ProductId = review.ProductId 
                INNER JOIN products_photos photos 
                ON photos.ProductId = products.ProductId 
                WHERE review.UserId = '$id'";
    $result = mysqli_query($con, $query) or die(mysqli_error($con));
    $row = mysqli_fetch_array($result);

    $data = array();

    if(!is_null($row)) {
      $data[] = $row;
    }

    print json_encode($data);
?>