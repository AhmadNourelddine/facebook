<?php
include("db_info.php");

$array = json_decode(file_get_contents("php://input"), true);

if(isset($array['post-id']))
{
  $post_id = $array['post-id'];
}
else {
  echo("no required information");
}

$get_friends_id = $mysqli->prepare("SELECT count(user_like_id) as nblikes from likes where post_id=?");
$get_friends_id->bind_param("s",$post_id);
$get_friends_id-> execute();
$array =  $get_friends_id-> get_result();

$likes=[];

if($array->num_rows>0)
{
  $likes['status']= true;

  $res = $array->fetch_assoc();
  // print_r($res);
  if($res['nblikes'])
  {
    $likes['likes']=$res['nblikes'];
  }else{
    $likes['likes']=0;
  }

}
else {
    $likes['status']= false;
    $likes['likes']=0;
}
    echo(json_encode($likes));

 ?>
