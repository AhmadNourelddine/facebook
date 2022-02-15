<?php

include("db_info.php");

$array = json_decode(file_get_contents("php://input"), true);

if(isset($array['user_id']) && isset($array['block_user_id']) && isset($array['set_block']))
{
  $user_id = $array['user_id'];
  $block_user_id = $array['block_user_id'];
  $set_block = $array['set_block'];
}
else {
  die("no required information");
}

$result=[];

$block_unblock_friend = $mysqli->prepare("update friends f"
                                          ." set f.friend_blocked=?"
                                          ." where (f.friend1_id=? and f.friend2_id=?) or (f.friend1_id=? and f.friend2_id=?)");

$block_unblock_friend->bind_param("issss",$set_block,$user_id,$block_user_id,$block_user_id,$user_id);
$success=$block_unblock_friend->execute();

if(mysqli_affected_rows($mysqli) >0){
     $result['status']= true;
}
else{
    $result['status']= false;
}
echo(json_encode($result));


 ?>
