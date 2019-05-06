<?php
    require_once('../../connection.php');

    $ratingId = $_POST['id_rating'];
    
    $query = $conn->query("DELETE FROM tb_rating WHERE id_rating = $ratingId");

    if($query){
        $message = "success";
        $success = true;
    }else{
        $message = "gagal";
        $success = false;
    }

    print_r(
        json_encode(
            array(
                "success" => $success,
                "message" => $message,
                "id" => $ratingId
            )
        )
    );
?>