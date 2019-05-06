<?php
    require_once('../../connection.php');

    $data = [];
    $index = 0;

    $query = $conn->query("SELECT COUNT(id_music) AS jumlah, music_genre FROM tb_music GROUP BY music_genre");

    if($query->num_rows){
        while($row = $query->fetch_object()){
            $data[$index]['jumlah'] = $row->jumlah;

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
    }

    print_r(
        json_encode(
            array(
                'success' => $success,
                'message' => $message,
                'data' => $data
            )
        )
    )
?>