<?php
$db_host = "localhost";
$db_user = "root";
$db_pass = null;
$db_name = "facebookdb";

$mysqli = new mysqli($db_host,$db_user,$db_pass,$db_name);
if($mysqli->connect_errno)
{
  die("error connecting to database");
}
 ?>
