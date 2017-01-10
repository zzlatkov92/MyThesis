<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection

    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    mysqli_set_charset($con,"utf8");

    $id = '';

    if(!empty($_POST['id'])) {
        $id = $_POST['id'];
    }

    if(count($_FILES) > 0) {
        $filename = $_FILES['photo']['name'];
        $filename_64 = base64_encode($filename);
        $filename_ext = pathinfo($filename, PATHINFO_EXTENSION);

        $rand_photo_name = '';
                
        for ($i = 0; $i < 10; $i++) {
            $rand_photo_name .= $filename_64[rand(0, strlen($filename_64) - 1)];
        }

        $folder = $_SERVER['DOCUMENT_ROOT'].'/uploads/';
        $cover = $folder . $rand_photo_name . '.' . $filename_ext;

        move_uploaded_file( $_FILES['photo']['tmp_name'] , $cover );

        $photo = 'http://' . $_SERVER['HTTP_HOST'] . '/uploads/' . $rand_photo_name . '.' . $filename_ext;    
    } else {
        $photo = $_POST['photo'];
    }
    
    $name = $_POST['name'];
    $link = $_POST['link'];
    $date_start = date_format(new DateTime($_POST['date_start']),"Y-m-d");
    $date_end = date_format(new DateTime($_POST['date_end']),"Y-m-d");
    
    if ($id != '') {
        $sql = "UPDATE `promotions` SET PromotionName='$name', PromotionLink='$link', PromotionPhoto='$photo', PromotionDateStart='$date_start', PromotionDateEnd='$date_end' WHERE `PromotionId`='$id'";
        $sql_res = mysqli_query($con, $sql) or die(mysqli_error($con));

        if ($sql_res) {
            print 'success';
        } else {
            print 'error';
        }
    } else {
        $sql = "INSERT INTO promotions (PromotionName, PromotionLink, PromotionPhoto, PromotionDateStart, PromotionDateEnd) VALUES ('$name', '$link', '$photo', '$date_start', '$date_end')";
        $sql_res = mysqli_query($con, $sql) or die(mysqli_error($con));

        if ($sql_res) {
            print 'success';
        } else {
            print 'error';
        }
    }
?>