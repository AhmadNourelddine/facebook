<?php
include("db_info.php");

$array = json_decode(file_get_contents("php://input"), true);

if(isset($array['user_id']) && isset($array['unfriend_id']))
{
  $user_id = $array['id'];
  $unfriend_id = $array['unfriend_id'];
}
else {
  die("no required information");
}

$delete_request = $mysqli->prepare("delete from friends where friend1_id=? and friend2_id=? or friend2_id=? and friend1_id=?");
$delete_request->bind_param("ss",$user_id,$unfriend_id,$user_id,$unfriend_id);
$delete_request-> execute();
$array =  $delete_request-> get_result();

$result=[];

if(mysqli_affected_rows($mysqli) >0){
  $result['status']= true;
}
else{
    $result['status']= false;
}

?>
