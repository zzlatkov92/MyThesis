<?php
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');

    // Check connection
    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
     
    $key = json_decode(file_get_contents('php://input'), true)["key"];

    $result = mysqli_query($con, "SELECT ProductId
                                        ,ProductName
                                        ,ProductOldPrice
                                        ,ProductPrice
                                        ,ProductLink
                                        ,ProductPhoto 
                                FROM products 
                                WHERE ProductName LIKE '%$key%'");
   
    $data = array();

    while ($row = mysqli_fetch_array($result,MYSQLI_ASSOC)) {
      $data[] = $row;
    }

    print json_encode($data);
?>