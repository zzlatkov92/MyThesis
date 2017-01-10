<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection

    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    mysqli_set_charset($con,"utf8");

    function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    $id = '';

    if(!empty($_POST['id'])) {
        $id = $_POST['id'];
    }

    $name = $_POST['name'];


    $link = str_replace(" ", "-", $name);
    $link_lower = mb_convert_case($link, MB_CASE_LOWER, "UTF-8");

    $cyr = [
        'а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п',
        'р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я',
        'А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П',
        'Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я'
    ];
    $lat = [
        'a','b','v','g','d','e','io','zh','z','i','y','k','l','m','n','o','p',
        'r','s','t','u','f','h','ts','ch','sh','sht','a','i','y','e','yu','ya',
        'A','B','V','G','D','E','Io','Zh','Z','I','Y','K','L','M','N','O','P',
        'R','S','T','U','F','H','Ts','Ch','Sh','Sht','A','I','Y','e','Yu','Ya'
    ];

    $link_lat = str_replace($cyr, $lat, $link_lower);

    $folder = $_SERVER['DOCUMENT_ROOT'].'/uploads/';

    if(count($_FILES) > 0 && isset($_FILES['photo'])) {
        $filename = $_FILES['photo']['name'];
        $filename_64 = base64_encode($filename);
        $filename_ext = pathinfo($filename, PATHINFO_EXTENSION);

        $rand_photo_name = '';
                
        for ($k = 0; $k < 10; $k++) {
            $rand_photo_name .= $filename_64[rand(0, strlen($filename_64) - 1)];
        }

        $avatar = $folder . $rand_photo_name . '.' . $filename_ext;
        move_uploaded_file( $_FILES['photo']['tmp_name'] , $avatar );

        $photo = 'http://' . $_SERVER['HTTP_HOST'] . '/uploads/' . $rand_photo_name . '.' . $filename_ext;
        
    } else {
        $photo = $_POST['photo'];
    }

    $cat_num = generateRandomString();
    $qty = $_POST['qty'];
    $price = $_POST['price'];
    $category = $_POST['category'];
    $producer = $_POST['producer'];

    if(!empty($_POST['overview'])) {
        $overview = mysqli_real_escape_string($con, $_POST['overview']);
    } else {
        $overview = '';
    }

    if(!empty($_POST['features'])) {
        $features = mysqli_real_escape_string($con, $_POST['features']);
    } else {
        $features = '';
    }

    if(empty($_POST['sizing'])) {
        $sizing = false;
    } else {
        $sizing = true;
    }

    if(empty($_POST['old_price'])) {
        $old_price = '';
    } else {
        $old_price = empty($_POST['old_price']);
    }

    if($qty > 5) {
        $status = 'instock';
    } elseif ($qty < 5) {
        $status = 'limit';
    } else {
        $status = 'out';
    }
     
    if ($id != '') {
        $sql = "UPDATE `products` 
                SET ProductName='$name'
                , ProductPhoto='$photo'
                , ProductStatus='$status'
                , ProductOverview='$overview'
                , ProductFeatures='$features'
                , ProductSizing='$sizing'
                , ProductQty='$qty'
                , ProductOldPrice='$old_price'
                , ProductPrice='$price'
                , ProductLink='$link_lat'
                , CategoryId='$category'
                , ProducerId='$producer' 
                WHERE `ProductId`='$id'";
        $sql_res = mysqli_query($con, $sql) or die(mysqli_error($con));
        
        if(count($_FILES) > 0 && isset($_FILES['gallery'])) {
            $gallery_images = $_FILES['gallery']['name'];
            $gallery_images_length = count($gallery_images);

            $sql_delete_gallery = "DELETE FROM `products_photos` WHERE `ProductId`='$id'";
            $sql_delete_gallery_res = mysqli_query($con, $sql_delete_gallery) or die(mysqli_error($con));

            for($i = 0; $i < $gallery_images_length; $i++) {

                $gallery_images_64 = base64_encode($gallery_images[$i]);
                $gallery_images_ext = pathinfo($gallery_images[$i], PATHINFO_EXTENSION);

                $rand_gallery_name = '';
                
                for ($j = 0; $j < 10; $j++) {
                    $rand_gallery_name .= $gallery_images_64[rand(0, strlen($gallery_images_64) - 1)];
                }

                $gallery_src = $folder . $rand_gallery_name . '.' . $gallery_images_ext;

                move_uploaded_file( $_FILES['gallery']['tmp_name'][$i] , $gallery_src );

                $photo = 'http://' . $_SERVER['HTTP_HOST'] . '/uploads/' . $rand_gallery_name . '.' . $gallery_images_ext;

                if($sql_delete_gallery_res) {
                    $sql_gallery = "INSERT INTO `products_photos` (PhotoSrc, ProductId) VALUES ('$photo', '$id')";
                    $sql_gallery_res = mysqli_query($con, $sql_gallery) or die(mysqli_error($con));


                    if (!$sql_gallery_res) {
                        print 'error gallery';
                        exit;
                    }
                }
            }
        }

        if ($sql_res) {
            print 'success';
        } else {
            print 'error';
        }
    } else {
        $sql = "INSERT INTO products 
                (ProductId
                    , ProductName
                    , ProductPhoto
                    , ProductStatus
                    , ProductOverview
                    , ProductFeatures
                    , ProductSizing
                    , CategoryId
                    , ProducerId
                    , ProductQty
                    , ProductOldPrice
                    , ProductPrice
                    , ProductLink) 
                VALUES ('$cat_num'
                    , '$name'
                    , '$photo'
                    , '$status'
                    , '$overview'
                    , '$features'
                    , '$sizing'
                    , '$category'
                    , '$producer'
                    , '$qty'
                    , '$old_price'
                    , '$price'
                    , '$link_lat')";
        $sql_res = mysqli_query($con, $sql) or die(mysqli_error($con));

        if(count($_FILES) > 0 && isset($_FILES['gallery'])) {
            $gallery_images = $_FILES['gallery']['name'];
            $gallery_images_length = count($gallery_images);

            for($i = 0; $i < $gallery_images_length; $i++) {
                $gallery_images_64 = base64_encode($gallery_images[$i]);
                $gallery_images_ext = pathinfo($gallery_images[$i], PATHINFO_EXTENSION);

                $rand_gallery_name = '';

                for ($j = 0; $j < 10; $j++) {
                    $rand_gallery_name .= $gallery_images_64[rand(0, strlen($gallery_images_64) - 1)];
                }

                $gallery_src = $folder . $rand_gallery_name . '.' . $gallery_images_ext;

                move_uploaded_file( $_FILES['gallery']['tmp_name'][$i] , $gallery_src );

                $photo = 'http://' . $_SERVER['HTTP_HOST'] . '/uploads/' . $rand_gallery_name . '.' . $gallery_images_ext;

                $sql_gallery = "INSERT INTO `products_photos` (PhotoSrc, ProductId) VALUES ('$photo', '$cat_num')";
                $sql_gallery_res = mysqli_query($con, $sql_gallery) or die(mysqli_error($con));

                if (!$sql_gallery_res) {
                    print 'error gallery';
                    exit;
                }
            }
        }

        if ($sql_res) {
            print 'success';
        } else {
            print 'error';
        }
    }
?>