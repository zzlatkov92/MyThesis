<?php 
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection

    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    mysqli_set_charset($con,"utf8");

    $data = json_decode(file_get_contents("php://input"));

    $id = '';

    if(!empty($data->PageId)) {
        $id = mysqli_real_escape_string($con, $data->PageId);
    }

    $name = mysqli_real_escape_string($con, $data->PageName);
    $content = mysqli_real_escape_string($con, $data->PageContent);
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
     
    if ($id != '') {
        $sql = "UPDATE `pages` SET PageName='$name', PageContent='$content', PageLink='$link_lat' WHERE `PageId`='$id'";
        $sql_res = mysqli_query($con, $sql) or die(mysqli_error($con));

        if ($sql_res) {
            print 'success';
        } else {
            print 'error';
        }
    } else {
        $sql = "INSERT INTO pages (PageName, PageContent, PageLink) VALUES ('$name', '$content', '$link_lat')";
        $sql_res = mysqli_query($con, $sql) or die(mysqli_error($con));

        if ($sql_res) {
            print 'success';
        } else {
            print 'error';
        }
    }
?>