<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection
    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    mysqli_set_charset($con,"utf8");

    $id = json_decode(file_get_contents('php://input'), true)["id"];

    $result = mysqli_query($con, "SELECT * FROM orders o 
                                    LEFT JOIN orders_bill ob 
                                    ON o.BillId = ob.BillId 
                                    LEFT JOIN orders_delivery od 
                                    ON o.DeliveryId = od.DeliveryId 
                                    LEFT JOIN orders_invoice oi 
                                    ON o.InvoiceId = oi.InvoiceId 
                                    WHERE o.OrderId = '$id'");
    $orders = array();

    if ($result) {
        while (($order = mysqli_fetch_object($result)) != null) {
            $productresult = mysqli_query($con, "SELECT * FROM orders_products WHERE OrderId = '$id'");
            $order->Products = array();

            if ($productresult) {
                while (($product = mysqli_fetch_object($productresult)) != null) {
                    array_push($order->Products, $product);
                }
            }

            array_push($orders, $order);
        }
    }

    print json_encode($orders[0]);
?>