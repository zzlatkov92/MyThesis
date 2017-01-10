<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection
    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    session_start();
    $id = $_SESSION['uid'];

    $result = mysqli_query($con, "SELECT * FROM products products 
                                    LEFT JOIN favorite_products fav 
                                    ON products.ProductId = fav.ProductId 
                                    WHERE fav.UserId = '$id'");
   
    $data = array();

    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
      $data[] = $row;
    }

    print json_encode($data);
?>