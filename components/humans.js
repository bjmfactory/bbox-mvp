Humans = {}

// Model
Humans.model = function() {
  // should this take a name argument?
  this.email = m.prop('')
}

Humans.controller = function () {
  if (!Sessions.token()) {
    return m.route('/sessions')
  }
  var ctrl = this
  // should I pass this username?
  ctrl.human = new Humans.model()
}

Humans.view = function(ctrl) {
  return m('h2', 'hellow world from humans')
}


