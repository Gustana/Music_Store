<?php
    require_once('../../connection.php');

    $idMusic = $_POST['id_music'];
    $costumerName = $_POST['costumer_name'];
    $costumerAge = $_POST['costumer_age'];
    $costumerComment = $_POST['costumer_comment'];
    $costumerRating = $_POST['costumer_rating'];

    $query = $conn->query("INSERT INTO tb_rating(id_music, costumer_name, costumer_age, costumer_comment, costumer_rating)
                        VALUES ($idMusic, '$costumerName', $costumerAge, '$costumerComment', $costumerRating)");

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
                "message" => $message,
                "success" => $success
            )
        )
    );
?>