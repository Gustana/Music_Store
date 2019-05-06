<?php
    require_once('../../connection.php');

    $data = [];
    $index = 0;
    $no = 0;
    $where = "";

    if(isset($_GET['filter']) && !empty($_GET['filter'])){
        $filterString = $_GET['filter'];

        $where .= "WHERE music.music_title LIKE '%$filterString%'";
    }

    $query = $conn->query("SELECT music.id_music, music.music_title, music.music_genre, rating.id_rating, rating.costumer_name, rating.costumer_age, rating.costumer_comment, rating.costumer_rating
                        FROM tb_music music INNER JOIN tb_rating rating ON music.id_music = rating.id_music $where");

    if($query->num_rows){
        while($row = $query->fetch_object()){
            $data[] = $row;
            $data[$index]->no = $no+1;

            if($row->music_genre == 1){
                $data[$index]->music_genre =  "Pop";
           }else if($row->music_genre == 2){
                $data[$index]->music_genre =  "Edm";
           }else if($row->music_genre == 3){
                $data[$index]->music_genre =  "Rock";
           }else if($row->music_genre == 4){
                $data[$index]->music_genre =  "Reggae";
           }else if($row->music_genre == 5){
                $data[$index]->music_genre =  "Jazz";
           }else if($row->music_genre == 6){
                $data[$index]->music_genre =  "Klasik";
           }

            $index+=1;
            $no+=1;
        }
    }

    print_r(
        json_encode(
            array(
                "success" => true,
                "message" => "success",
                "data" => $data
            )
        )
    );

?>