
  <?php
  $url = "http://localhost/facebook/facebook/api/friends.php?id=1";
  $json = file_get_contents($url);
  $json_data = json_decode($json, true);
  // echo json_encode($json_data);
  $i=1;
  while(isset($json_data['user'.$i]))
  {
    $friend = $json_data['user'.$i];
    echo '<div class="friend-container" id="'.$friend['id'].'">';
    echo '<div class="user-profile">';
    echo '<div class="user-image-name-date">';
    echo '<img src="./pp.png" width="5%" height="5%" alt="">';
    echo '<div class="user-name-date">';
    echo '<p>'.$friend['name'].'</p><p>'.$friend['email'].'</p>';
    echo '</div></div></div></div>';
    $i=$i+1;
  }
  ?>
