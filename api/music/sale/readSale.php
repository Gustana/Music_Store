<?php
    require_once('../../connection.php');

    $data = [];
    $index = 0;
    $no = 0;

    $where = "";

    if (isset($_GET['filter']) && !empty($_GET['filter'])) {
        $filterString = $_GET['filter'];

        $where .= "WHERE music.music_title LIKE '%$filterString%'";
    }

    $query = $conn->query("SELECT jual.costumer_name, jual.costumer_age, jual.total_purchase, jual.total_price, music.music_title, music.music_genre FROM tb_penjualan jual 
                        INNER JOIN tb_music music ON jual.id_music = music.id_music $where");

    if($query->num_rows){
        while($row = $query->fetch_object()){
            $data[] = $row;
            $data[$index]->no = $no+1;

            $index+=1;
            $no+=1;
        }
    }

    print_r(
        json_encode(
            array(
                "success" => true,
                "message" => "data loaded",
                "data" => $data
            )
        )
    );
?>