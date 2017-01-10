<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection
    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $result = mysqli_query($con, "SELECT ProductId FROM favorite_products");
   
    $data = array();

    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
      $data[] = $row;
    }

    $unique_ids = array_unique($data, SORT_REGULAR);

    $products = array();

    foreach ($unique_ids as $value) {
        $id = array_values($value)[0];

        $product = mysqli_query($con, "SELECT ProductName
                                            ,ProductOldPrice
                                            ,ProductPrice
                                            ,ProductLink
                                            ,ProductPhoto 
                                    FROM products 
                                    WHERE ProductId = '$id' AND ProductStatus != 'out'");

        while ($product_row = mysqli_fetch_array($product, MYSQLI_ASSOC)) {
          $products[] = $product_row;
        }
    }

    print json_encode($products);
?>