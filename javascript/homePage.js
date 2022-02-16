window.onload = () => {

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

  setMenuProfile()

  function setMenuProfile() {
    document.getElementById('user-menu-name').innerText = user_name
    document.getElementById('user-menu-email').innerText = user_email
  }

  navigateNewsFeed()

  async function fetchAPI(url, obj) {
    await axios.post(url, obj)
      .then(async (resp) => {
        console.log(resp)
        return resp
      })
      .catch((e) => {
        console.log(e)
      })
  }

  async function navigateFriends() {

    let url = 'http://localhost/facebook/facebook/api/friends.php'
    let object = {
      'id': user_id
    }
    let data = await axios.post(url, object)
      .then(async (resp) => {
        return resp.data
      })
      .catch((e) => {
        console.log(e)
      })
    console.log(data)

    pagesContainer.innerHTML = '<div class="navbar-friends"><div class="friends-requests-btn" id="requests">' +
      '<i class="fa-solid fa-bell fa-lg"></i><p>Requests</p></div>' +
      '<div class="friends-btn" id="friends-nav"><i class="fa-solid fa-users fa-lg"></i><p>Friends</p></div></div>'

    var i = 1
    while (data['user' + i]) {
      let friend = data['user' + i]
      pagesContainer.innerHTML += '<div class="friend-container" id="' + friend['id'] + '">' +
        '<div class="user-profile">' +
        '<div class="user-image-name-date">' +
        '<img src="./pp.png" width="10%" height="auto" alt="">' +
        '<div class="user-name-date">' +
        '<p class="friend-name">' + friend['name'] + '</p><p class="friend-email">' + friend['email'] + '</p>' +
        '</div></div>'+
        '<div class="accept-reject"><div class="accept block">' +
        '<i class="fa-solid fa-user-slash fa-lg"></i><p>Block</p></div>' +
        '<div class="reject unfriend"><i class="fa-solid fa-user-xmark fa-lg"></i><p>Unfriend</p>' +
        '</div></div></div></div>'
        i = i + 1
    }

    document.getElementById('requests').addEventListener('click', getRequests)


    function setfriendsListeners() {
      var blockButtons = document.getElementsByClassName('block')
      var unfriendButtons = document.getElementsByClassName('unfriend')
      for (var j = 0; j < blockButtons.length; j++) {
        blockButtons[j].addEventListener('click', blockfriend)
      }
      for (var k = 0; k < unfriendButtons.length; k++) {
        unfriendButtons[k].addEventListener('click', unfriend)
      }
    }

    await setfriendsListeners()

    document.getElementById('friends-nav').addEventListener('click', navigateFriends)

    async function blockfriend(e) {

      function getfriendId() {
        return e.target.parentElement.parentElement.parentElement.id
      }

      var block_friend_id = await getfriendId()

      console.log(block_friend_id)
      let url = 'http://localhost/facebook/facebook/api/block_Unblock_User.php'
      block_flag = !block_flag
      let object = {
        'user_id': user_id,
        'block_user_id': block_friend_id,
        'set_block': block_flag
      }
      let data = await axios.post(url, object)
        .then(async (resp) => {
          return resp.data
        })
        .catch((e) => {
          console.log(e)
        })
    }

    async function unfriend(e){

      function getfriendId() {
        return e.target.parentElement.parentElement.parentElement.id
      }

      var unfriend_id = await getfriendId()

      console.log(unfriend_id)
      let url = 'http://localhost/facebook/facebook/api/unfriend.php'
      let object = {
        'user_id': user_id,
        'unfriend_id': unfriend_id
      }
      let data = await axios.post(url, object)
        .then(async (resp) => {
          return resp.data
        })
        .catch((e) => {
          console.log(e)
        })
        navigateFriends()
    }


    async function getRequests() {
      let url = 'http://localhost/facebook/facebook/api/getFriendsRequests.php'
      let object = {
        'id': user_id
      }
      let data = await axios.post(url, object)
        .then(async (resp) => {
          return resp.data
        })
        .catch((e) => {
          console.log(e)
        })

      console.log(data)
      pagesContainer.innerHTML = '<div class="navbar-friends"><div class="friends-requests-btn" id="requests">' +
        '<i class="fa-solid fa-bell fa-lg"></i><p>Requests</p></div>' +
        '<div class="friends-btn" id="friends-nav"><i class="fa-solid fa-users fa-lg"></i><p>Friends</p></div></div>'

      async function generateRequests() {
          var i = 1
          while (data['request' + i]) {
            let friend = data['request' + i]
            pagesContainer.innerHTML += '<div class="friend-container" id="' + friend['id'] + '">' +
              '<div class="user-profile">' +
              '<div class="user-image-name-date">' +
              '<img src="./pp.png" width="10%" height="auto" alt="">' +
              '<div class="user-name-date">' +
              '<p class="friend-name">' + friend['name'] + '</p><p class="friend-email">' + friend['email'] + '</p>' +
              '</div></div>' +
              '<div class="accept-reject"><div class="accept">' +
              '<i class="fa-solid fa-circle-check fa-lg"></i><p>accept</p></div>' +
              '<div class="reject"><i class="fa-solid fa-xmark fa-lg"></i><p>reject</p>' +
              '</div></div></div></div>'
            i = i + 1
          }
      }

      await generateRequests()

      function setListeners() {
        var acceptButtons = document.getElementsByClassName('accept')
        var rejectButtons = document.getElementsByClassName('reject')
        for (var j = 0; j < acceptButtons.length; j++) {
          acceptButtons[j].addEventListener('click', acceptFriend)
        }
        for (var k = 0; k < rejectButtons.length; k++) {
          rejectButtons[k].addEventListener('click', rejectFriend)
        }
      }

      await setListeners()

      document.getElementById('friends-nav').addEventListener('click', navigateFriends)

      async function acceptFriend(e) {
        function getAcceptId() {
          return e.target.parentElement.parentElement.parentElement.id
        }
        var accept_friend_id = await getAcceptId()

        console.log(accept_friend_id)
        let url = 'http://localhost/facebook/facebook/api/acceptFriend.php'
        let object = {
          'id': user_id,
          'requester_id': accept_friend_id
        }
        let data = await axios.post(url, object)
          .then(async (resp) => {
            return resp.data
          })
          .catch((e) => {
            console.log(e)
          })
        getRequests()
      }

      async function rejectFriend(e) {
        function getRejectId() {
          return e.target.parentElement.parentElement.parentElement.id
        }
        var reject_friend_id = await getRejectId()

        console.log(reject_friend_id)
        let url = 'http://localhost/facebook/facebook/api/rejectRequest.php'
        let object = {
          'id': user_id,
          'requester_id': reject_friend_id
        }
        let data = await axios.post(url, object)
          .then(async (resp) => {
            getRequests()
            return resp.data
          })
          .catch((e) => {
            console.log(e)
          })
        getRequests()
      }

    }

  }


  async function navigateProfile() {

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
          '<img src="./pp.png" width="10%" height="auto" alt="">' +
          '<div class="user-name-date">' +
          '<p>ahmad nrdn</p><p>' + post['post_date'] + '</p>' +
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

      var i = 1
      while (data['user' + i]) {
        let friend = data['user' + i]
        pagesContainer.innerHTML = '<div class="friend-container" id="' + friend['id'] + '">' +
          '<div class="user-profile">' +
          '<div class="user-image-name-date">' +
          '<img src="./pp.png" width="10%" height="auto" alt="">' +
          '<div class="user-name-date">' +
          '<p>' + friend['name'] + '</p><p>' + friend['email'] + '</p>' +
          '</div></div>' +
          '<div class="add-friend" id="add-search-friend">' +
          '<i class="fa-solid fa-user-plus fa-lg"></i><p>Add Friend</p></div>' +
          '</div></div>'
        i = i + 1
      }


      document.getElementById('add-search-friend').addEventListener('click', sendRequest)

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

      }
    }

  }

  async function navigateNewsFeed() {

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
    pagesContainer.innerHTML = ''
    var i = 1
    while (data['post' + i]) {
      let post = data['post' + i]
      pagesContainer.innerHTML += '<div class="post-container">' +
        '<div class="user-profile">' +
        '<div class="user-image-name-date">' +
        '<img src="./pp.png" width="10%" height="auto" alt="">' +
        '<div class="user-name-date">' +
        '<p class="post-user-name">' + post['name'] + '</p><p class="post-date">' + post['post_date'] + '</p>' +
        '</div></div></div>' +
        '<div class="post-text">' +
        '<p>' + post['text'] + '</p>' +
        '<p class="users-likes" id="likes"' + post['id'] + '><i class="fa-solid fa-thumbs-up"></i>&nbsp;Likes ' + post['likes'] + '</p>' +
        '</div>' +
        '</div>'
      i = i + 1
    }


  }

  async function navigateWritePost() {

    pagesContainer.innerHTML = ''

    pagesContainer.innerHTML += '<div class="write-post-container">' +
      '<div class="post-input">' +
      '<textarea type="text" name="" value="" id="input-post-text" placeholder="Write Post Here ..."></textarea>' +
      '</div>' +
      '<button type="button" name="button" id="user-post-btn">Post</button>' +
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

  async function navigateEditPost() {

    var text = window.localStorage.getItem('post_text')
    var post_id = window.localStorage.getItem('post_id')

    pagesContainer.innerHTML = ''

    pagesContainer.innerHTML += '<div class="write-post-container">' +
      '<div class="post-input">' +
      '<textarea type="text" name="" value="" id="input-post-text" placeholder="Write Post Here ..."></textarea>' +
      '</div>' +
      '<button type="button" name="button" id="user-post-btn">Post</button>' +
      '<button type="button" name="button" id="user-cancel-btn">Cancel</button>' +
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

  function logout() {
    console.log('clicked logout')
    window.localStorage.clear()
    window.location.href = "http://localhost/facebook/facebook/loginSignUp.html"
  }


}
