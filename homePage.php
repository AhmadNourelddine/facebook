<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <title>FaceBook</title>
  </head>
  <body>
    <div class="home-page-container">
      <div class="menu-container">
        <div class="menu-items">
          <ul>
          <div class="" id="post">
            <li>post</li>
          </div>
          <div class="" id="newsfeed">
            <li>newsfeed</li>
          </div>
          <div class="" id="friends">
            <li>friends</li>
          </div>
          <div class="" id="profile">
            <li>profile</li>
          </div>
          </ul>
        </div>
      </div>
      <div class="pages-container">
        <h1>FaceBook</h1>
        <?php

        // include 'pages/userPostsPage.php';
        // include 'pages/friendsPage.php';
        include 'pages/friendsPostsPage.php';

        ?>

        <!-- <p>welcome </p>
        <div class="post-container">
          <div class="user-profile">
            <div class="user-image-name-date">
              <img src="pp.png" width="5%" height="5%" alt="">
              <div class="user-name-date">
                <p>ahmad nrdn</p>
                <p>17/10/2000</p>
              </div>
            </div>
          </div>
          <div class="post-text">
            <p>helloooosss my name is ahmad</p>
          </div>
        </div> -->
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script type="text/javascript">
    window.onload = ()=>{
      document.getElementById('newsfeed').addEventListener('click',navigateNewsfeed)
      async function navigateNewsfeed()
      {
        let func={function:'newsfeed'}
        await axios.post('http://localhost/facebook/facebook/homePage.php', JSON.stringify({
            function: 'newsfeed'
        }))
        .then(()=>{console.log("navigate to newsfeed")})
        .catch((e)=>console.log(e))
        // ({
        //       method: 'post',
        //       url: 'http://localhost/facebook/facebook/homePage.php',
        //       data: JSON.stringify({
        //           function: 'newsfeed'
        //       })
        //     })

      }

    }
    </script>
  </body>
</html>
