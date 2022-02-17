<?php

include("db_info.php");

$array = json_decode(file_get_contents("php://input"), true);

if(isset($array['post_id']) && isset($array['user_id']))
{
  $post_id = $array['post_id'];
  $user_id = $array['user_id'];
  $set_like = $array['set_like'];
}
else {
  echo("no required information");
}

if($set_like)
{
  $check_friends = $mysqli->prepare("insert into likes (post_id,user_like_id) values(?,?)");
  $check_friends->bind_param("ss",$post_id,$user_id);
  $check_friends->execute();
  $array =  $check_friends-> get_result();

  $result=[];

  if(mysqli_affected_rows($mysqli) >0)
  {
     $result['status']= true;
     echo("liked post");
  }
}
else{
  $check_friends = $mysqli->prepare("delete from likes where post_id=? and user_like_id=?");
  $check_friends->bind_param("ss",$post_id,$user_id);
  $check_friends->execute();
  $array =  $check_friends-> get_result();

  $result=[];

  if(mysqli_affected_rows($mysqli) >0)
  {
     $result['status']= true;
     echo("unliked post");
  }
}

echo(json_encode($result));


 ?>
