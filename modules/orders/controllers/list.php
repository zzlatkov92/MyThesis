<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection
    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    session_start();
    $id = $_SESSION['uid'];

    $result = mysqli_query($con, "SELECT * FROM orders o 
                                            LEFT JOIN orders_bill ob 
                                            ON o.BillId = ob.BillId 
                                            LEFT JOIN orders_delivery od 
                                            ON o.DeliveryId = od.DeliveryId 
                                            WHERE o.UserId = '$id'");

    $data = array();

    while ($row = mysqli_fetch_array($result)) {
      $data[] = $row;
    }

    print json_encode($data);
?>