<?php

include("db_info.php");

$array = json_decode(file_get_contents("php://input"), true);

if(isset($array['friend_id']) && isset($array['user_requester_id']))
{
  $friend_id = $array['friend_id'];
  $user_id = $array['user_requester_id'];
}
else {
  echo("no required information");
}

$check_friends = $mysqli->prepare("select 1 from friends f where f.friend1_id=? and f.friend2_id=? or f.friend2_id=? and f.friend1_id=?");
$check_friends->bind_param("ssss",$user_id,$friend_id,$user_id,$friend_id);
$check_friends->execute();
$array =  $check_friends-> get_result();

$result=[];

if($array->num_rows>0)
{
   $result['status']= false;
   die("already friends");
}


$friend_request = $mysqli->prepare("insert into friends_requests (user_id,user_requester_id) values(?,?)");
$friend_request->bind_param("ss",$friend_id,$user_id);
$success = $friend_request->execute();

if(mysqli_affected_rows($mysqli) >0){
     $result['status']= true;
}
else{
    $result['status']= false;
}
echo(json_encode($result));


 ?>
