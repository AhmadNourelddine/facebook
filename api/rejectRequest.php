<?php
include("db_info.php");

$array = json_decode(file_get_contents("php://input"), true);

if(isset($array['id']) && isset($array['requester_id']))
{
  $user_id = $array['id'];
  $requester_id = $array['requester_id'];
}
else {
  die("no required information");
}

$delete_request = $mysqli->prepare("delete from friends_requests where user_requester_id=? and user_id=?");
$delete_request->bind_param("ss",$requester_id,$user_id);
$delete_request-> execute();
$array =  $delete_request-> get_result();

$result=[];

  if(mysqli_affected_rows($mysqli) >0){
    $result['status']= true;
  }
  else{
      $result['status']= false;
  }

echo(json_encode($result));


 ?>
