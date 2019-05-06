<?php
    require_once('../../connection.php');

    $data = [];
    $no = 0;
    $index = 0;

    $where = "";
    $searchString = "";

    if(isset($_GET['filter']) && !empty($_GET['filter'])){
        
        $searchString = $_GET['filter'];
        $where .= "WHERE music_title LIKE '%$searchString%' OR music_singer LIKE '%$searchString%'";
    }

    $query = $conn->query("SELECT * FROM tb_music $where");
    
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

            $no+=1;
            $index+=1;
        }
    }

    print_r(
        json_encode(
            array(
                "success" => true,
                "message" => "data loaded",
                "where" => $where,
                "data" => $data
            )
        )
    );

?>