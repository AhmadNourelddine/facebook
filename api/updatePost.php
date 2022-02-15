<?php

include("db_info.php");

$array = json_decode(file_get_contents("php://input"), true);
if(isset($array['post_id']) && isset($array['text']))
{
  $post_id = $array['post_id'];
  $text = $array['text'];
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
