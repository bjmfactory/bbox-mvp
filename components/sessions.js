window.Sessions = {}

// Model
Sessions.model = function () {
  this.username = m.prop('')
  this.password = m.prop('')
}

Sessions.signIn = function (username, password) {
  // Stub success!
  return m.deferred.resolve({ token: 'abc123' })
  // return m.request({
  //   url: '/signin', method: 'post',
  //   data: { username: username, password: password }
  // })
  // Stub failure
  // return m.deferred.reject({ error: 'invalid_credentials' })
}

// Controller
Sessions.controller = function () {
  var ctrl = this
  ctrl.session = new Sessions.model()

  ctrl.submit = function(){
    Sessions.signIn(ctrl.session.username(), ctrl.session.password())
    .then(
      function (response) {
        response.token //=> abc123
        // redirect to links
        console.log("Session success")
      },
      function () {
        // log error message
        console.log("Session failure")
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


