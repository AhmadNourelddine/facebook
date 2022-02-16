<?php
include("db_info.php");

$array = json_decode(file_get_contents("php://input"), true);

if(isset($array['id']))
{
  $id = $array['id'];
}
else {
  die("no required information");
}


$get_friends_id = $mysqli->prepare("SELECT p.*,count(l.user_like_id) likes from posts p left join likes l on l.post_id=p.id where p.user_id=? group by p.id order by p.post_date desc");
$get_friends_id->bind_param("s",$id);
$get_friends_id-> execute();
$array =  $get_friends_id-> get_result();

$posts_info=[];
if($array->num_rows>0)
{
  $posts_info['status']= true;
  $i=1;
  while($user = $array->fetch_assoc()){
    $posts_info['post'.$i] = $user;
    $i = $i +1;
}
}
else {
    $posts_info['status']= false;
}
    echo(json_encode($posts_info));

 ?>
