<?php
    require_once('../../connection.php');

    $data = [];
    $index = 0;

    $query = $conn->query("SELECT SUM(jual.total_purchase) AS jumlahTerjual, music.music_genre FROM tb_penjualan jual 
                        INNER JOIN tb_music music ON jual.id_music = music.id_music GROUP BY music.music_genre");
    
    if($query->num_rows){
        while($row = $query->fetch_object()){
            $data[$index]['jumlah'] = $row->jumlahTerjual;

            if($row->music_genre == 1){
                $data[$index]['label'] = 'Pop';
            }else if($row->music_genre == 2) {
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
                'message' => $message,
                'success' => $success,
                'data' => $data
            )
        )
    );
?>