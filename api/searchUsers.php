
<?php
include("db_info.php");

$array = json_decode(file_get_contents("php://input"), true);

if(isset($array['user_name']))
{
  $user_name = $array['user_name'];
}
else {
  die("no required information");
}

$search_user = $mysqli->prepare("select u.id, u.name, u.email from users u where u.name=? or u.name like ? or u.name like ? or u.name like ?");
$search_user->bind_param("ssss",$user_name,'%'.$user_name.'%','%'.$user_name,$user_name.'%');
$search_user-> execute();
$array =  $search_user-> get_result();

$users=[];


if($array->num_rows >0){
  $users['status']= true;
  $i=1;
  while($user = $array->fetch_assoc()){
    $users['user'.$i] = $user;
    $i = $i +1;
  }
}
else{
    $users['status']= false;
}

echo(json_encode($users));


 ?>
