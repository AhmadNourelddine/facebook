<?php

include("db_info.php");

if(isset($_GET['post_id']) && isset($_GET['text']))
{
  $post_id = $_GET['post_id'];
  $text = $_GET['text'];
}
else {
  die("no required information");
}

$result=[];

$update_post = $mysqli->prepare("update posts p set p.text=? where p.id=?");

$update_post->bind_param("ss",$text,$post_id);
$success = $update_post->execute();

if(mysqli_affected_rows($mysqli) >0){
     $result['status']= true;
}
else{
    $result['status']= false;
}
echo(json_encode($result));


 ?>
