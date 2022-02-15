<?php

include("db_info.php");

$array = json_decode(file_get_contents("php://input"), true);

if(isset($array['user_id']) && isset($array['text']))
{
  $user_id = $array['user_id'];
  $post_text = $array['text'];
}else {
  die("no required information");
}

if($post_text == NULL)
{
  die("no text entered");
}
$result=[];

$add_post = $mysqli->prepare("insert into posts (user_id,text) values(?,?)");
$add_post->bind_param("ss",$user_id,$post_text);
$success=$add_post->execute();

if($success==0){
 $result['status']= false;
}
else{
   $result['status']= true;
}
echo(json_encode($result));


 ?>
