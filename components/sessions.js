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
  ctrl.sessions = m.prop( [new Sessions.model()] )
}

// View
Sessions.view = function(ctrl) {
  // return m('h2', 'hello world from sessions')
  return m('.sessionForm' , [
    m('h1', 'Enter your info'),
    m('p', 'Username:'),
    m('input[type=text]', {
      value: '',
      onchange: m.withAttr('value', ctrl.sessions.username)
    }),
    m('p', 'Password:'),
    m('input[type=text]', {
      value: '',
      onchange: m.withAttr('value', ctrl.sessions.password)
    }),
  ])
}


