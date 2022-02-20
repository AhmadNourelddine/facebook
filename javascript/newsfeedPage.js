async function navigateNewsFeed() {

  import * as name from 'home.js'
  import * as name from 'postPage.js'
  import * as name from 'friendsPage.js'
  import * as name from 'peofilePage.js'

  let url = 'http://localhost/facebook/facebook/api/friendsPosts.php'
  let object = {
    'id': user_id
  }
  let data = await axios.post(url, object)
    .then(async (resp) => {
      // console.log(resp)
      return resp.data
    })
    .catch((e) => {
      console.log(e)
    })
  console.log(data)

  async function generateNewsFeed()
  {
    async function postLikes(postid)
    {
      let url = 'http://localhost/facebook/facebook/api/getpostlikes.php'
      let object = {
        'post-id': postid
      }
      let post = await axios.post(url, object)
        .then(async (resp) => {
          console.log(resp.data['likes'])
          likes = resp.data['likes']
          return likes
        })
        .catch((e) => {
          console.log(e)
        })
    }

    pagesContainer.innerHTML = ''
    var i = 1
    while (data['post' + i]) {

      let post = data['post' + i]
      var thepostlikes = await postLikes(post['id'])
      pagesContainer.innerHTML += '<div class="post-container">' +
        '<div class="user-profile">' +
        '<div class="user-image-name-date">' +
        '<img src="./assets/pp.png" width="10%" height="auto" alt="">' +
        '<div class="user-name-date">' +
        '<p class="post-user-name">' + post['name'] + '</p><p class="post-date">' + post['post_date'] + '</p>' +
        '</div></div></div>' +
        '<div class="post-text">' +
        '<p>' + post['text'] + '</p>' +
        '<p class="users-likes" id='+post['id']+'><i class="fa-solid fa-thumbs-up"></i>&nbsp;Likes '+likes+'</p>' +
        '</div>' +
        '</div>'
      i = i + 1
    }
  }

  await generateNewsFeed()

  var likesbtns = document.getElementsByClassName('users-likes')

  for(var l=0;l<likesbtns.length;l++)
  {
    likesbtns[l].addEventListener('click',likePost)
  }

  async function likePost(e)
  {
    like_flag = !like_flag
    var post = e.currentTarget.id
    let url = 'http://localhost/facebook/facebook/api/likepost.php'
    let object = {
      'user_id': user_id,
      'post_id': post,
      'set_like': like_flag
    }
    let data = await axios.post(url, object)
      .then(async (resp) => {
        return resp.data
      })
      .catch((e) => {
        console.log(e)
      })

      if(like_flag){
        document.getElementById(post).style.opacity=1
      }
      else{
        document.getElementById(post).style.opacity=0.5
      }
  }

}
