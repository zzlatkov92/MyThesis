<?php
    $con = mysqli_connect('ecommerce', 'root', '', 'ecommerce');
    // Check connection

    if (!$con) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    mysqli_set_charset($con,"utf8");

    $data = json_decode(file_get_contents("php://input"));

    session_start();
    if(isset($_SESSION['uid'])) {
        $user_loged = true;
    } else {
        $user_loged = false;
    }

    $def = $data->data->def;
    $extra = $data->data->extra;

    $order_date = date('Y-m-d');
    $order_status = 'send';

    if(!empty($extra->note)) {
        $order_note = $extra->note;
    } else {
        $order_note = '';
    }

    $delivery_price = $def->shipping;
    $total_price = $def->totalCost;

    $sql_bill = "INSERT INTO `orders_bill` (DeliveryPrice, TotalPrice) VALUES ('$delivery_price', '$total_price')";
    $sql_bill_res = mysqli_query($con, $sql_bill) or die(mysqli_error($con));

    if(!$sql_bill_res) {
        print 'Проблем при изпращането на заявката за сметката';
        exit;
    } else {
        $order_bill_id = mysqli_insert_id($con);

        if($user_loged) {
            $order_user_id = $_SESSION['uid'];

            $user_names = "SELECT `UserName`, `UserLastName` FROM `users` WHERE `UserId` = '$order_user_id'";
            $user_names_res = mysqli_query($con, $user_names) or die(mysqli_error($con));
            $user_names_obj = mysqli_fetch_object($user_names_res);

            $delivery_user = $user_names_obj->UserName . ' ' . $user_names_obj->UserLastName;
        } else {
            $delivery_user = $extra->user->name . ' ' . $extra->user->lastname;

            $user_name = $extra->user->name;
            $user_lastname = $extra->user->lastname;
            $user_email = $extra->user->email;
            $user_password = $extra->user->password;
            $salt = substr($user_password,0,2);
            $user_password_crypt = crypt($user_password,$salt);

            $qry_em = "SELECT * FROM `users` WHERE `UserEmail` = '$user_email'";
            $result = mysqli_query($con, $qry_em) or die(mysqli_error($con));
            $res = mysqli_fetch_row($result);
             
            if (is_null($res)) {
                $qry = "INSERT INTO `users`(`UserName`
                                            , `UserLastName`
                                            , `UserPassword`
                                            , `UserEmail`) 
                        VALUES ('$user_name'
                                , '$user_lastname'
                                , '$user_password_crypt'
                                , '$user_email')";
                $qry_res = mysqli_query($con, $qry) or die(mysqli_error($con));
                if (!$qry_res) {
                    print 'Проблем при изпращането на заявката за регистрация';
                    exit;
                } else {
                    $order_user_id = mysqli_insert_id($con);
                }
            } else {
                print 'Въведеният от Вас и-мейл вече се използва от друг потребител';
                exit;
            }
        }

        $delivery_address = $extra->delivery->address;
        $delivery_city = $extra->delivery->city;
        $delivery_postcode = $extra->delivery->postcode;
        $delivery_phone = $extra->delivery->phone;

        $sql_delivery = "INSERT INTO `orders_delivery` (DeliveryUser
                                , DeliveryPhone
                                , DeliveryAddress
                                , DeliveryCity
                                , DeliveryPostCode) 
                        VALUES ('$delivery_user'
                                , '$delivery_phone'
                                , '$delivery_address'
                                , '$delivery_city'
                                , '$delivery_postcode')";
        $sql_delivery_res = mysqli_query($con, $sql_delivery) or die(mysqli_error($con));

        if(!$sql_delivery_res) {
            print 'Проблем при изпращането на заявката за доствката';
            exit;
        } else {
            $order_delivery_id = mysqli_insert_id($con);

            if($extra->invoice != 0) {
                $invoice_type = $extra->invoicetype;

                if($invoice_type == 'person') {
                    $invoice_person = $extra->invoiceperson;
                    $invoice_name = $invoice_person->name . ' ' . $invoice_person->lastname;
                    $invoice_egn = $invoice_person->egn;
                    $invoice_eik = '';
                    $invoice_mol = '';
                    $invoice_iban = '';
                    $invoice_address = $invoice_person->address;
                    $invoice_city = $invoice_person->city;
                    $invoice_postcode = $invoice_person->postcode;
                } else {
                    $invoice_firm = $extra->invoicefirm;
                    $invoice_name = $invoice_firm->name;
                    $invoice_egn = '';
                    $invoice_eik = $invoice_firm->eik;
                    $invoice_mol = $invoice_firm->mol;
                    $invoice_iban = $invoice_firm->iban;
                    $invoice_address = $invoice_firm->address;
                    $invoice_city = $invoice_firm->city;
                    $invoice_postcode = $invoice_firm->postcode;
                }

                $sql_invoice = "INSERT INTO `orders_invoice` (InvoiceType
                                                            , InvoiceName
                                                            , InvoiceEgn
                                                            , InvoiceEik
                                                            , InvoiceMol
                                                            , InvoiceIban
                                                            , InvoiceAddress
                                                            , InvoiceCity
                                                            , InvoicePostCode) 
                                VALUES ('$invoice_type'
                                        , '$invoice_name'
                                        , '$invoice_egn'
                                        , '$invoice_eik'
                                        , '$invoice_mol'
                                        , '$invoice_iban'
                                        , '$invoice_address'
                                        , '$invoice_city'
                                        , '$invoice_postcode')";
                $sql_invoice_res = mysqli_query($con, $sql_invoice) or die(mysqli_error($con));

                if(!$sql_invoice_res) {
                    print 'Проблем при изпращането на заявката за фактурата';
                    exit;
                } else {
                    $order_invoice_id = mysqli_insert_id($con);
                }

                $sql_order = "INSERT INTO `orders` (OrderNote
                                                    , OrderDate
                                                    , OrderStatus
                                                    , BillId
                                                    , DeliveryId
                                                    , InvoiceId
                                                    , UserId) 
                            VALUES ('$order_note'
                                    , '$order_date'
                                    , '$order_status'
                                    , '$order_bill_id'
                                    , '$order_delivery_id'
                                    , '$order_invoice_id'
                                    , '$order_user_id')";
            } else {
                $sql_order = "INSERT INTO `orders` (OrderNote
                                                    , OrderDate
                                                    , OrderStatus
                                                    , BillId
                                                    , DeliveryId
                                                    , UserId) 
                            VALUES ('$order_note'
                                    , '$order_date'
                                    , '$order_status'
                                    , '$order_bill_id'
                                    , '$order_delivery_id'
                                    , '$order_user_id')";
            }

            $sql_order_res = mysqli_query($con, $sql_order) or die(mysqli_error($con));

            if(!$sql_order_res) {
                print 'Проблем при изпращането на заявката за поръчката';
                exit;
            } else {
                $order_id = mysqli_insert_id($con);

                $products = $def->items;
                $products_length = count($products);

                for($i = 0; $i < $products_length; $i++) {
                    $product_id = $products[$i]->id;
                    $product_name = $products[$i]->name;
                    $product_quantity = $products[$i]->quantity;
                    $product_price = $products[$i]->price;
                    $product_total = $products[$i]->total;
                    $product_cat_num = $products[$i]->data->ProductId;
                    $product_link = $products[$i]->data->ProductLink;
                    $product_photo = $products[$i]->data->ProductPhoto;

                    if(!empty($products[$i]->data->ProductSize)) {
                        $product_size = $products[$i]->data->ProductSize;
                    } else {
                        $product_size = '';
                    }

                    $product_cur_qty = $products[$i]->data->ProductQty - $product_quantity;

                    if($product_cur_qty > 5) {
                        $status = 'instock';
                    } elseif ($product_cur_qty == 0) {
                        $status = 'out';
                    } else {
                        $status = 'limit';
                    }

                    $order_products_id = mysqli_insert_id($con);

                    $sql_update = "UPDATE `products` 
                                    SET ProductQty='$product_cur_qty'
                                        , ProductStatus='$status' 
                                    WHERE `ProductId`='$product_id'";
                    $user_names_res = mysqli_query($con, $sql_update) or die(mysqli_error($con));
                    $sql_products = "INSERT INTO `orders_products` (OrderId
                                                                    , ProductName
                                                                    , ProductCount
                                                                    , ProductSinglePrice
                                                                    , ProductTotalPrice
                                                                    , ProductCatNumber
                                                                    , ProductPhoto
                                                                    , ProductLink
                                                                    , ProductSize) 
                                    VALUES ('$order_id'
                                            , '$product_name'
                                            , '$product_quantity'
                                            , '$product_price'
                                            , '$product_total'
                                            , '$product_cat_num'
                                            , '$product_photo'
                                            , '$product_link'
                                            , '$product_size')";
                    $sql_products_res = mysqli_query($con, $sql_products) or die(mysqli_error($con));
                }

                if (!$sql_products_res) {
                    print 'Проблем при изпращането на заявката за продуктите';
                    exit;
                } else {
                    print 'success';
                }
            }
        }
    }
?>