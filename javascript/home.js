window.onload = () => {


  import * as name from 'postPage.js'
  import * as name from 'newsfeedPage.js'
  import * as name from 'friendsPage.js'
  import * as name from 'peofilePage.js'

  var pagesContainer = document.getElementById('pagesContainer')

  document.getElementById('post').addEventListener('click', navigateWritePost)
  document.getElementById('friends').addEventListener('click', navigateFriends)
  document.getElementById('newsfeed').addEventListener('click', navigateNewsFeed)
  document.getElementById('profile').addEventListener('click', navigateProfile)
  document.getElementById('logout').addEventListener('click', logout)

  var user_id = window.localStorage.getItem('user_id')
  var user_email = window.localStorage.getItem('user_email')
  var user_name = window.localStorage.getItem('user_name')

  var block_flag = 0
  var like_flag =0

  var likes=0

  setMenuProfile()

  function setMenuProfile() {
    document.getElementById('user-menu-name').innerText = user_name
    document.getElementById('user-menu-email').innerText = user_email
    document.getElementById('user-menu-img').src = 'assets/pp.png'
  }

  navigateNewsFeed()

}

function logout() {
  console.log('clicked logout')
  window.localStorage.clear()
  window.location.href = "http://localhost/facebook/facebook/loginSignUp.html"
}
