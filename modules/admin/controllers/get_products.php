<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection
    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $result = mysqli_query($con, "SELECT ProductName, COUNT(ProductName) AS product FROM orders_products GROUP BY ProductName ORDER BY product DESC LIMIT 30");

    $data = array();

    while ($row = mysqli_fetch_array($result)) {
      $data[] = $row;
    }

    print json_encode($data);
?>