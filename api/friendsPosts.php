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

$get_friends_id = $mysqli->prepare("select p.*,u.name"
                                    ." from posts p inner join friends f on p.user_id=? or p.user_id in"
                                    ." (select (case when f.friend1_id = ? then f.friend2_id else f.friend1_id end) from friends f where f.friend_blocked = 0 and (f.friend1_id=? or f.friend2_id=?))"
                                    ." left join users u on u.id=p.user_id GROUP BY p.id ORDER by p.post_date desc");

$get_friends_id->bind_param("ssss",$id,$id,$id,$id);
$get_friends_id-> execute();
$array =  $get_friends_id-> get_result();

$friends_posts_info=[];
if($array->num_rows>0)
{
  $friends_posts_info['status']= true;
  $i=1;
  while($user = $array->fetch_assoc()){
    $friends_posts_info['post'.$i] = $user;
    $i = $i +1;
}
}
else {
    $friends_posts_info['status']= false;
}
  echo(json_encode($friends_posts_info));

 ?>
