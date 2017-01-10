<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection
    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $producers = json_decode(file_get_contents('php://input'), true)["producers"];

    $data = array();

    for($i = 0; $i < count($producers); $i++) {
        $result = mysqli_query($con, "SELECT ProducerId,ProducerName FROM producers WHERE ProducerId = '$producers[$i]'");

        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
          $data[] = $row;
        }
    }
    
    print json_encode($data);
?>