<?php
include("db_info.php");

$array = json_decode(file_get_contents("php://input"), true);

print_r($array);
if(isset($array['id']) && isset($array['requester_id']))
{
  $user_id = $array['id'];
  $requester_id = $array['requester_id'];
}
else {
  echo("no required information");
}

$delete_request = $mysqli->prepare("delete from friends_requests where user_requester_id=? and user_id=? or user_requester_id=? and user_id=?");
$delete_request->bind_param("ssss",$requester_id,$user_id,$user_id,$requester_id);
$delete_request-> execute();
$array =  $delete_request-> get_result();
// print_r($array);
$result=[];

if(mysqli_affected_rows($mysqli) >0){
  
  $delete_request = $mysqli->prepare("insert into friends (friend1_id,friend2_id) values(?,?)");
  $delete_request->bind_param("ss",$requester_id,$user_id);
  $delete_request-> execute();
  $array =  $delete_request-> get_result();

  if(mysqli_affected_rows($mysqli) >0){
    $result['status']= true;
  }
  else{
      $result['status']= false;
  }
}
else{
    $result['status']= false;
}
echo(json_encode($result));


 ?>
