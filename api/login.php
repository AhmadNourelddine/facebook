<?php
include("db_info.php");

if(isset($_GET['email']) && isset($_GET['pass']))
{
$email = $_GET['email'];
$pass = $_GET['pass'];
}
else{
  die("no required information");
}

$check_user_exist = $mysqli-> prepare("select * from users where email=? and password=?");
$check_user_exist->bind_param("ss",$email,$pass);
$check_user_exist-> execute();
$array =  $check_user_exist-> get_result();
$user_info=[];
if($array->num_rows>0)
{
  $user_info['status']=true;
  $user = $array->fetch_assoc();
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
