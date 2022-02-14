<?php
$url = "http://localhost/facebook/facebook/api/friendsPosts.php?id=1";
$json = file_get_contents($url);
$json_data = json_decode($json, true);
// echo json_encode($json_data);
$i=1;
while(isset($json_data['post'.$i]))
{
  $post = $json_data['post'.$i];
  echo '<div class="post-container">';
  echo '<div class="user-profile">';
  echo '<div class="user-image-name-date">';
  echo '<img src="./pp.png" width="5%" height="5%" alt="">';
  echo '<div class="user-name-date">';
  echo '<p>'.$post['name'].'</p><p>'.$post['post_date'].'</p>';
  echo '</div></div></div>';
  echo '<div class="post-text">';
  echo '<p>'.$post['text'].'</p>';
  echo '<p>Likes '.$post['likes'].'</p>';
  echo '</div>';
  echo '</div>';
  $i=$i+1;
}

?>
