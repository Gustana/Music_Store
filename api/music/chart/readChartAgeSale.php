<?php
    require_once('../../connection.php');

    $data = [];
    $index = 0;

    $query = $conn->query("SELECT jual.costumer_age, SUM(jual.total_purchase) AS jumlahBeli, music.music_genre FROM tb_penjualan jual
                        INNER JOIN tb_music music ON jual.id_music = music.id_music GROUP BY jual.costumer_age");

    if($query->num_rows){
        while($row = $query->fetch_object()){
            $data[$index]['jumlah'] = $row->jumlahBeli;

            if($row->costumer_age >= 1 && $row->costumer_age <= 10){
                $data[$index]['umur']  = "1-10 tahun";
            }else if($row->costumer_age >= 11 && $row->costumer_age <= 20){
                $data[$index]['umur']  = "11-20 tahun";
            }else if($row->costumer_age >= 21 && $row->costumer_age <= 30){
                $data[$index]['umur']  = "21-30 tahun";
            }else if($row->costumer_age >= 31 && $row->costumer_age <= 40){
                $data[$index]['umur']  = "31-40 tahun";
            }else if($row->costumer_age >= 41 && $row->costumer_age <= 50){
                $data[$index]['umur']  = "41-50 tahun";
            }else if($row->costumer_age >= 41 && $row->costumer_age <= 50){
                $data[$index]['umur']  = "41-50 tahun";
            }else if($row->costumer_age >= 51 && $row->costumer_age <= 60){
                $data[$index]['umur']  = "51-60 tahun";
            }else if($row->costumer_age >= 61 && $row->costumer_age <= 150){
                $data[$index]['umur']  = "61-150 tahun";
            }

            if($row->music_genre == 1){
                $data[$index]['label'] = 'Pop';
            }else if ($row->music_genre == 2) {
                $data[$index]['label'] = 'Edm';
            }else if($row->music_genre == 3){
                $data[$index]['label'] = 'Rock';
            }else if($row->music_genre == 4){
                $data[$index]['label'] = 'Reggae';
            }else if($row->music_genre == 5){
                $data[$index]['label'] = 'Jazz';
            }else if($row->music_genre == 6){
                $data[$index]['label'] = 'Klasik';
            }

            $index+=1;
        }

        $success = true;
        $message = "success";
    }else{
        $success = false;
        $message = "gagal";
    }

    print_r(
        json_encode(
            array(
                "success" => $success,
                "message" => $message,
                "data" => $data
            )
        )
    );
?>