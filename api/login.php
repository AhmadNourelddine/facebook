<?php
include("db_info.php");

$array = json_decode(file_get_contents("php://input"), true);
// print_r($array);
$email = $array['email'];
$pass = $array['pass'];

$check_user_exist = $mysqli-> prepare("select * from users where email=? and password=?");
$check_user_exist->bind_param("ss",$email,$pass);
$check_user_exist-> execute();
$array =  $check_user_exist-> get_result();
$user_info=[];
if($array->num_rows > 0)
{
  $user_info['status']=true;
  $user = $array->fetch_assoc();
    // $user_info['user_info']=$user;
  foreach ($user as $key => $value) {
     $user_info[$key] = $value;
  }
}
else{
  $user_info['status']=false;
}

$jsonfile = json_encode($user_info);
echo($jsonfile);

 ?>
