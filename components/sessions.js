window.Sessions = {}

// Model
Sessions.signIn = function (username, password) {
  // Stub success!
  return m.deferred.resolve({ token: 'abc123' })
  // Stub failure
  // return m.deferred.reject({ error: 'invalid_credentials' })
}

// Controller
Sessions.controller = function () {

}

// View
Sessions.view = function(ctrl) {
  return m('h1', 'Hello World from Sessions')
}


