<?php
include("db_info.php");

if(isset($_GET['id']))
{
  $id = $_GET['id'];
}
else {
  die("no required information");
}

$get_friends_id = $mysqli->prepare("select p.*,count(l.user_like_id) likes"
                                    ." from posts p inner join friends f on p.user_id=? or p.user_id in"
                                    ." (select (case when f.friend1_id = ? then f.friend2_id else f.friend1_id end) from friends f where f.friend1_id=? or f.friend2_id=?)"
                                    ." left join likes l on l.post_id=p.id GROUP BY p.id ORDER by p.post_date");
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
