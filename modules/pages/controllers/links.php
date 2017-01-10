<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection
    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $result = mysqli_query($con, "SELECT * FROM pages");

    $data = array();

    while ($row = mysqli_fetch_array($result)) {
      $data[] = $row;
    }

    print json_encode($data);
?>