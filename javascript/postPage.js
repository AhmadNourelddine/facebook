

async function navigateWritePost() {

  import * as name from 'home.js'
  import * as name from 'newsfeedPage.js'
  import * as name from 'friendsPage.js'
  import * as name from 'peofilePage.js'

  pagesContainer.innerHTML = ''

  pagesContainer.innerHTML += '<div class="write-post-container">' +
    '<div class="post-input">' +
    '<textarea type="text" name="" value="" id="input-post-text" placeholder="Write Post Here ..."></textarea>' +
    '</div>' +
    '<button type="button" name="button" class="post-cancel-btn" id="user-post-btn">Post</button>' +
    '</div>'

  document.getElementById('user-post-btn').addEventListener('click', postTodb)

  async function postTodb() {
    let text = document.getElementById('input-post-text').value
    let url = 'http://localhost/facebook/facebook/api/writePost.php'
    let object = {
      'user_id': user_id,
      'text': text
    }
    let data = await axios.post(url, object)
      .then(async (resp) => {
        console.log("post sent successfully")
        return resp.data
      })
      .catch((e) => {
        console.log(e)
      })
    console.log(data)
    navigateNewsFeed()
  }
}
