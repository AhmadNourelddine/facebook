<?php
include("db_info.php");

if(isset($_GET['email']) && isset($_GET['pass']) && isset($_GET['username']))
{
  $email = $_GET['email'];
  $password = hash('sha256',$_GET['pass']);
  $username = $_GET['username'];
}
else {
  die("no required information");
}
$user_info=[];

$check_email = $mysqli->prepare("select email from users where email=?");
$check_email->bind_param("s",$email);
$check_email->execute();
$check_rows = $check_email->get_result();
if($check_rows->num_rows>0)
{
  $user_info['status']= false;
  echo(json_encode($user_info));
  die("email already exists");
}

$add_user = $mysqli->prepare("insert into users (email,password,name) values(?,?,?)");
$add_user->bind_param("sss",$email,$password,$username);
$success=$add_user->execute();

if($success==0){
 $user_info['status']= false;
 echo(json_encode($user_info));
 die("error in insertion");
}
$check_user_exist = $mysqli-> prepare("select * from users where email=? and password=?");
$check_user_exist-> bind_param("ss",$email,$password);
$check_user_exist-> execute();
$array =  $check_user_exist-> get_result();

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
