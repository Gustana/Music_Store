<?php
    require_once('../../connection.php');

    $idMusic = $_POST['id_music'];

    $query = $conn->query("DELETE FROM tb_music WHERE id_music = $idMusic");

    if($query){
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
                "message" => $message. " menghapus data"
            )
        )
    )

?>