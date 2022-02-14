<?php

include("db_info.php");

if(isset($_GET['friend_id']) && isset($_GET['user_requestor_id']))
{
  $user_id = $_GET['friend_id'];
  $friend_id = $_GET['user_requestor_id'];
}
else {
  die("no required information");
}

$check_friends = $mysqli->prepare("select 1 from friends f where f.friend1_id=? and f.friend2_id=? or f.friend2_id=? and f.friend1_id=?");
$check_friends->bind_param("ssss",$user_id,$friend_id,$user_id,$friend_id);
$check_friends->execute();
$array =  $check_friends-> get_result();

if($array->num_rows>0)
{
   $result['status']= false;
   die("already friends");
}
$result=[];

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
