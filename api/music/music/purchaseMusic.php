<?php
    require_once('../../connection.php');

    $idMusic = $_POST['id_music'];
    $jumlahBeli = $_POST['total_purchase'];
    $totalHarga = $_POST['totalPrice'];
    $costumerName = $_POST['costumer_name'];
    $cosumerAge = $_POST['costumer_age'];

    //Check the avaliability of music stock using stored function
    $query = $conn->query("SELECT isMusicAvailable($idMusic, $jumlahBeli) AS isMusicAvailable");
    if($query->fetch_object()->isMusicAvailable){
        $query = $conn->query("INSERT INTO tb_penjualan(id_music, total_purchase, costumer_name, costumer_age, total_price) 
                            VALUES($idMusic, $jumlahBeli, '$costumerName', $cosumerAge, $totalHarga)");

        if($query){
            $success = true;
            $message = "success";
        }else{
            $success = false;
            $message = "gagal";
        }
    }else{
        $success = false;
        $message = "habis";
    }

    print_r(
        json_encode(
            array(
                "message" => $message,
                "totalHarga" => $totalHarga,
                "costumer" => $costumerName,
                "success" => $success
            )
        )
    );
?>