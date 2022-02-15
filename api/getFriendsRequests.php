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


$get_friends_id = $mysqli->prepare("select u.* from friends_requests fr inner join users u on fr.user_requester_id=u.id and fr.user_id=?");
$get_friends_id->bind_param("s",$id);
$get_friends_id-> execute();
$array =  $get_friends_id-> get_result();

$friends_requests_info=[];
if($array->num_rows>0)
{
  $friends_requests_info['status']= true;
  $i=1;
  while($user = $array->fetch_assoc()){
    $friends_requests_info['request'.$i] = $user;
    $i = $i +1;
}
}
else {
    $friends_requests_info['status']= false;
}
    echo(json_encode($friends_requests_info));

 ?>
