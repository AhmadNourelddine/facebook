window.onload = function() {

  console.log('sign in sign up ')
  
  var login_btn = document.getElementById('login-btn')
  login_btn.addEventListener("click", checkLogin)

  var signup_btn = document.getElementById('signup-btn')
  signup_btn.addEventListener("click", checkSignUp)

  async function checkLogin() {

    console.log('logging in')
    var email = document.getElementById('email')
    var password = document.getElementById('password')

    let url = 'http://localhost/facebook/facebook/api/login.php'
    let object = {
      'email': email.value,
      'pass': password.value
    }
    let data = await axios.post(url, object)
      .then((resp) => {
        let d = resp.data
        return d
      })
      .catch((e) => {
        console.log(e)
      })
    console.log(data)
    let id = data['id']
    console.log(id)


    if (data['status']) {

      window.localStorage.setItem('user_id', id)
      window.localStorage.setItem('user_name', data['name'])
      window.localStorage.setItem('user_email', data['email'])
      // window.localStorage.setItem('image', data['image'])
      window.location.href = "http://localhost/facebook/facebook/homePage.html"
    }
  }

  async function checkSignUp() {
    var signup_email = document.getElementById('signup-email')
    var signup_password = document.getElementById('signup-password')
    var signup_username = document.getElementById('user-name')

    let url = 'http://localhost/facebook/facebook/api/signup.php'
    let object = {
      'email': signup_email.value,
      'pass': signup_password.value,
      'username': signup_username.value
    }
    let data = await axios.post(url, object)
      .then((resp) => {
        let d = resp.data
        return d
      })
      .catch((e) => {
        console.log(e)
      })
    console.log(data)

    if (data['status']) {
      console.log("sign up successfully")
    }
  }
}
