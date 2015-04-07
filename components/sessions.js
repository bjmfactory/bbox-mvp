window.Sessions = {}

// Model
Sessions.model = function () {
  this.username = m.prop('')
  this.password = m.prop('')
}

Sessions.token = m.prop(localStorage.getItem('token'))

Sessions.signIn = function (username, password) {
  // Stub success!
  if ((username === 'ben') && (password === 'piano')){
    return m.deferred.resolve({ token: 'abc123', username: username })
  } else {
    // Stub failure
    return m.deferred.reject({ error: 'invalid_credentials' })
  }

  // m.deffered is a substitute for this kind of thing:
  // this is what you would use with a server

  // return m.request({
  //   url: '/signin', method: 'post',
  //   data: { username: username, password: password }
  // })
  // .then()

}

// Controller
Sessions.controller = function () {
  var ctrl = this
  ctrl.session = new Sessions.model()

  ctrl.submit = function(e){
    e.preventDefault()
    Sessions.signIn(ctrl.session.username(), ctrl.session.password())
    .then(
      function (response) {
        Sessions.token(response.token) //=> abc123
        // redirect to links
        console.log("Session success")
        m.route("/h/" + response.username);
      },
      function (response) {
        // log error message
        console.log(response.error)
      }
    )
  }
}

// View
Sessions.view = function(ctrl) {
  // return m('h2', 'hello world from sessions')
  return m('form.sessionForm', {onsubmit: ctrl.submit}, [
    m('h1', 'Enter your info'),
    m('p', 'Username:'),
    m('input[type=text]', {
      value: ctrl.session.username(),
      onchange: m.withAttr('value', ctrl.session.username)
    }),
    m('p', 'Password:'),
    m('input[type=password]', {
      value: ctrl.session.password(),
      onchange: m.withAttr('value', ctrl.session.password)
    }),
    m('input[type=submit]', {value: 'Log in'})
  ])
}


