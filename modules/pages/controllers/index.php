<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection
    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $link = json_decode(file_get_contents('php://input'), true)["link"];

    $result = mysqli_query($con, "SELECT * FROM pages WHERE `PageLink`='$link'");
    $row = mysqli_fetch_object($result);

    $data = '';

    if (!is_null($row)) {
      $data = $row;
    }

    print json_encode($data);
?>