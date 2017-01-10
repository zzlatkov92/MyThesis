<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection
    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $today = date_format(new DateTime(),"Y-m-d");

    $result = mysqli_query($con, "SELECT * FROM promotions WHERE PromotionDateEnd > '$today'");

    $data = array();

    while ($row = mysqli_fetch_array($result)) {
      $data[] = $row;
    }

    print json_encode($data);
?>