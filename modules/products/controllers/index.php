<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection
    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $link = json_decode(file_get_contents('php://input'), true)["link"];

    $result = mysqli_query($con, "SELECT ProductId
                                        ,ProductName
                                        ,ProductStatus
                                        ,ProducerId
                                        ,ProductOldPrice
                                        ,ProductPrice
                                        ,ProductLink
                                        ,ProductPhoto 
                                    FROM products pr 
                                    LEFT JOIN categories ca 
                                    ON ca.CategoryId = pr.CategoryId
                                    WHERE ca.CategoryLink = '$link' 
                                    AND pr.ProductStatus != 'out'"
                            );
   
    $data = array();

    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
      $data[] = $row;
    }

    print json_encode($data);
?>