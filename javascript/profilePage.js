async function navigateProfile() {

  import * as name from 'home.js'
  import * as name from 'postPage.js'
  import * as name from 'newsfeedPage.js'
  import * as name from 'friendsPage.js'

  let url = 'http://localhost/facebook/facebook/api/userPosts.php'
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

  async function generatePost() {
    pagesContainer.innerHTML = '<div class="search-container">' +
      '<input value="" name="" placeholder="Add Friends" id="search_input">' +
      '<i class="fa-solid fa-magnifying-glass fa-3x" id="search"></i></div>'
    var i = 1
    while (data['post' + i]) {
      let post = data['post' + i];
      pagesContainer.innerHTML += '<div class="post-container">' +
        '<div class="user-profile">' +
        '<div class="user-image-name-date">' +
        '<img src="./assets/pp.png" width="10%" height="auto" alt="">' +
        '<div class="user-name-date">' +
        '<p style="font-weight:bolder">' + user_name + '</p><p>' + post['post_date'] + '</p>' +
        '</div></div>' +
        '<div class="edit-post-icon" id="' + post['id'] + '"><i class="fa-solid fa-pen fa-2x"></i></div></div>' +
        '<div class="post-text">' +
        '<p id="text-' + post['id'] + '">' + post['text'] + '</p>' +
        '</div>' +
        '</div>'
      i = i + 1
    }
  }

  await generatePost()

  var editButtons = document.getElementsByClassName('edit-post-icon')

  function addEditListener() {
    for (var x = 0; x < editButtons.length; x++) {
      editButtons[x].addEventListener('click', editPost)
    }
  }

  await addEditListener()

  async function editPost(e) {
    var post_id = e.target.parentElement.id
    console.log(post_id)
    var post_text = document.getElementById('text-' + post_id).innerText
    window.localStorage.setItem('post_text', post_text)
    window.localStorage.setItem('post_id', post_id)
    navigateEditPost()
  }

  document.getElementById('search').addEventListener('click', search)

  async function search() {
    let search_name = document.getElementById('search_input').value
    let url = 'http://localhost/facebook/facebook/api/searchUsers.php'
    let object = {
      'user_name': search_name
    }
    let data = await axios.post(url, object)
      .then(async (resp) => {
        console.log(resp)
        return resp.data
      })
      .catch((e) => {
        console.log(e)
      })

    function generatefriendsRequests() {
      pagesContainer.innerHTML = '<div class="search-container">' +
        '<input value="" name="" placeholder="Add Friends" id="search_input">' +
        '<i class="fa-solid fa-magnifying-glass fa-3x" id="search"></i></div>'

      var i = 1
      while (data['user' + i]) {
        let friend = data['user' + i]
        pagesContainer.innerHTML += '<div class="friend-container" id="' + friend['id'] + '">' +
          '<div class="user-profile">' +
          '<div class="user-image-name-date">' +
          '<img src="./assets/pp.png" width="10%" height="auto" alt="">' +
          '<div class="user-name-date">' +
          '<p>' + friend['name'] + '</p><p>' + friend['email'] + '</p>' +
          '</div></div>' +
          '<div class="add-friend" id="' + friend['id'] + '">' +
          '<i class="fa-solid fa-user-plus fa-lg"></i><p>Add Friend</p></div>' +
          '</div></div>'
        i = i + 1
      }
    }
    await generatefriendsRequests()

    document.getElementById('search').addEventListener('click', search)
    var sendRequestbtns = document.getElementsByClassName('add-friend')

    for (var x = 0; x < sendRequestbtns.length; x++) {
      sendRequestbtns[x].addEventListener('click', sendRequest)
    }

    async function sendRequest(e) {
      var request_friend_id = e.target.parentElement.id
      console.log(request_friend_id)
      let url = 'http://localhost/facebook/facebook/api/friendRequest.php'
      let object = {
        'friend_id': request_friend_id,
        'user_requester_id': user_id
      }
      let data = await axios.post(url, object)
        .then(async (resp) => {
          console.log(resp)
          return resp.data
        })
        .catch((e) => {
          console.log(e)
        })

        pagesContainer.innerHTML = '<div class="search-container">' +
          '<input value="" name="" placeholder="Add Friends" id="search_input">' +
          '<i class="fa-solid fa-magnifying-glass fa-3x" id="search"></i></div>'

            document.getElementById('search').addEventListener('click', search)

    }
  }

}

async function navigateEditPost() {

  var text = window.localStorage.getItem('post_text')
  var post_id = window.localStorage.getItem('post_id')

  pagesContainer.innerHTML = ''

  pagesContainer.innerHTML += '<div class="write-post-container">' +
    '<div class="post-input">' +
    '<textarea type="text" name="" value="" id="input-post-text" placeholder="Write Post Here ..."></textarea>' +
    '</div>' +
    '<button type="button" name="button" class="post-cancel-btn" id="user-post-btn">Post</button>' +
    '<button type="button" name="button" class="post-cancel-btn" id="user-cancel-btn">Cancel</button>' +
    '</div>'

  document.getElementById('user-post-btn').addEventListener('click', editPost)
  document.getElementById('user-cancel-btn').addEventListener('click', cancelPost)

  document.getElementById('input-post-text').innerText = text

  async function editPost() {
    let text = document.getElementById('input-post-text').value
    let url = 'http://localhost/facebook/facebook/api/updatePost.php'
    let object = {
      'post_id': post_id,
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
    window.localStorage.removeItem('post_text')
    window.localStorage.removeItem('post_id')
    navigateNewsFeed()
  }
}

async function cancelPost() {
  window.localStorage.removeItem('post_text')
  window.localStorage.removeItem('post_id')
  navigateProfile()
}
