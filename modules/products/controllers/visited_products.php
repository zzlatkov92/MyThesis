<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection
    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $products = json_decode(file_get_contents('php://input'), true)['visited_products'];

    $data = array();

    for($i = 0; $i < count($products); $i++) {
        $result = mysqli_query($con, "SELECT ProductId
                                            ,ProductName
                                            ,ProductOldPrice
                                            ,ProductPrice
                                            ,ProductLink
                                            ,ProductPhoto 
                                    FROM products 
                                    WHERE ProductLink = '$products[$i]' 
                                    AND ProductStatus != 'out'");
       
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
          $data[] = $row;
        }
    }


    print json_encode($data);
?>