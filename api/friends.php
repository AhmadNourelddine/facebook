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

$get_friends_id = $mysqli->prepare("SELECT U.name, U.email, U.id, F.friend_blocked FROM users U INNER JOIN friends F"
                                   ." ON U.id = F.friend1_id WHERE F.friend2_id=?"
                                   ." UNION SELECT U.name, U.email, U.id, F.friend_blocked FROM users U INNER JOIN friends F"
                                   ." ON U.id = F.friend2_id WHERE F.friend1_id=?");
$get_friends_id->bind_param("ss",$id,$id);
$get_friends_id-> execute();
$array =  $get_friends_id-> get_result();

$friends_info=[];
if($array->num_rows>0)
{
  $friends_info['status']= true;
  $i=1;
  while($user = $array->fetch_assoc()){
    $friends_info['user'.$i] = $user;
    $i = $i +1;
}
}
else {
    $friends_info['status']= false;
}
    echo(json_encode($friends_info));

 ?>
