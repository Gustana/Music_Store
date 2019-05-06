<?php
    $conn = new mysqli("localhost", "root", "gustana", "db_music");


    if(!$conn){
        echo mysqli_error($conn);
    }
?>