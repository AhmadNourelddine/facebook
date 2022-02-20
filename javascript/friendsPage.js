
  async function navigateFriends() {

    import * as name from 'home.js'
    import * as name from 'postPage.js'
    import * as name from 'newsfeedPage.js'
    import * as name from 'peofilePage.js'

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
        '<img src="./assets/pp.png" width="10%" height="auto" alt="">' +
        '<div class="user-name-date">' +
        '<p class="friend-name">' + friend['name'] + '</p><p class="friend-email">' + friend['email'] + '</p>' +
        '</div></div>' +
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

    document.getElementById('friends-nav').style.boxShadow='0px 8px rgb(0 0 0 / 50%)'
    document.getElementById('friends-nav').addEventListener('click', navigateFriends)

    async function blockfriend(e) {

      function getfriendId() {
        return e.currentTarget.parentElement.parentElement.parentElement.id
      }

      var block_friend_id = await getfriendId()

      console.log(block_friend_id)
      let url = 'http://localhost/facebook/facebook/api/block_Unblock_User.php'
      block_flag = !block_flag
      console.log(block_flag)
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
        if(block_flag){
          document.getElementById(block_friend_id).style.opacity=0.5
        }else{
          document.getElementById(block_friend_id).style.opacity=1
        }
    }

    async function unfriend(e) {

      function getfriendId() {
        return e.currentTarget.parentElement.parentElement.parentElement.id
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
            '<img src="./assets/pp.png" width="10%" height="auto" alt="">' +
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

      document.getElementById('requests').style.boxShadow='0px 8px rgb(0 0 0 / 50%)'

      document.getElementById('friends-nav').addEventListener('click', navigateFriends)

      async function acceptFriend(e) {
        function getAcceptId() {
          return e.currentTarget.parentElement.parentElement.parentElement.id
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
          return e.currentTarget.parentElement.parentElement.parentElement.id
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
