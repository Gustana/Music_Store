<?php
    require_once('../../connection.php');

    $title = $_POST['music_title'];
    $singer = $_POST['music_singer'];
    $genre = $_POST['music_genre'];
    $stock = $_POST['music_stock'];
    $price = $_POST['music_price'];

    if(isset($_POST['id_music']) && !empty($_POST['id_music'])){
        $idMusic = $_POST['id_music'];

        $query = $conn->query("UPDATE tb_music SET music_title = '$title', music_singer = '$singer', music_genre = '$genre', music_stock = $stock,
                                 music_price = $price WHERE id_music = $idMusic");

        if($query){
            $success = true;
            $message = "success";
        }else{
            $success = false;
            $message = "Gagal";
        }
    }else{
        $query = $conn->query("INSERT INTO tb_music(music_title, music_singer, music_genre, music_stock, music_price) VALUES('$title', '$singer', '$genre', '$stock', '$price')");

        if($query){
            $success = true;
            $message = "success";
        }else{
            $success = false;
            $message = "gagal";
        }
    }

    print_r(
        json_encode(
            array(
                "message" => $message,
                'genre' => $genre,
                'success' => $success
            )
        )
    )

?>