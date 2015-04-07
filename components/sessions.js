window.Sessions = {}

// Model
Sessions.model = function () {
  this.username = m.prop('')
  this.password = m.prop('')
}

Sessions.signIn = function (username, password) {
  // Stub success!
  return m.deferred.resolve({ token: 'abc123' })
  // Stub failure
  // return m.deferred.reject({ error: 'invalid_credentials' })
}

// Controller
Sessions.controller = function () {
  var ctrl = this
}

// View
Sessions.view = function(ctrl) {
  return m('.sesssionsForm' , [
    m('h1', 'Enter your info'),
    m('input[type=text]', {
      value: '',
      onchange: m.withAttr('value', ctrl.session.username)
    }),
    m('input[type=text]', {
      value: '',
      onchange: m.withAttr('value', ctrl.session.password)
    }),
  ])
}


