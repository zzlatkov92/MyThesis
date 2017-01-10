<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection
    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    mysqli_set_charset($con,"utf8");

    $data = json_decode(file_get_contents("php://input"));
    $name = mysqli_real_escape_string($con, $data->name);
    $last_name = mysqli_real_escape_string($con, $data->last_name);
    $email = mysqli_real_escape_string($con, $data->email);
    $password = mysqli_real_escape_string($con, $data->password);
    $salt = substr($password,0,2);
    $password_crypt = crypt($password,$salt);
     
    $qry_em = "SELECT * FROM `users` WHERE `UserEmail` = '$email'";
    $result = mysqli_query($con, $qry_em) or die(mysqli_error($con));
    $res = mysqli_fetch_row($result);
     
    if (is_null($res)) {
        $qry = "INSERT INTO `users`(`UserName`, `UserLastName`, `UserPassword`, `UserEmail`) VALUES ('$name', '$last_name', '$password_crypt', '$email')";
        $qry_res = mysqli_query($con, $qry) or die(mysqli_error($con));
    } else {
        $arr = array('msg' => "", 'error' => 'Вече има потребител, регистртиран със същият И-мейл');
        $jsn = json_encode($arr);
        print_r($jsn);
    }
?>