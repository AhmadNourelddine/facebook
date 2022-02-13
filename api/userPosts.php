<?php
include("db_info.php");

if(isset($_GET['id']))
{
  $id = $_GET['id'];
}
else {
  die("no required information");
}

$get_friends_id = $mysqli->prepare("SELECT p.*,count(l.user_like_id) likes from posts p inner join likes l where p.user_id=? and l.post_id=p.id group by p.id");
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
