Humans = {}

// Model
Humans.model = function(attrs) {
  // should this take a name argument?
  var links     = attrs.links || []
  this.id       = m.prop(attrs.id || '')
  this.email    = m.prop(attrs.email || '')
  this.username = m.prop(attrs.username || '')
  this.links    = m.prop(links.map(function(link) {
    return new Links.model(link.title, link.url)
  }))
}

var testData = [
  {
    id: 1,
    email: 'a@b.com',
    links: [
      {title: "hello world from garb", url: "http://google.com"},
      {title: "hello world", url: "http://google.com"},
      {title: "from garb", url: "http://google.com"},
    ],
    username: 'garb'
  },
  {
    id: 2,
    email: 'b@b.com',
    links: [
      {title: "hello world from ben", url: "http://google.com"},
      {title: "hello world from ben", url: "http://google.com"},
      {title: "hello world from ben", url: "http://google.com"},
    ],
    username: 'ben'
  },
  {
    id: 3,
    email: 'o@b.com',
    links: [
      {title: "hello world from o", url: "http://google.com"},
      {title: "hello world from o", url: "http://google.com"},
      {title: "hello world from o", url: "http://google.com"},
    ],
    username: 'beno'
  }
]

Humans.findByUsername = function (username) {
  // Search through test data
  // Return m.request.resolve (and feed it the human you found)
  // Or return m.request.reject if not found

  for (var i = 0; i < testData.length; i++){
    if ( testData[i].username === username ){
      return m.deferred.resolve(testData[i])
    }
  }

  return m.deferred.reject({ error: 'user not found'})
}

Humans.controller = function () {
  if (!Sessions.token()) {
    return m.route('/sessions')
  }

  var ctrl = this
  // should I pass this username?
  ctrl.human = m.prop()
  // ctrl.linksCtrl = m.prop()

  var username = m.route.param('username')
  Humans.findByUsername(username).then(function (humanDataFromServer) {
    console.log('Got human:', humanDataFromServer)
    ctrl.human(new Humans.model(humanDataFromServer))
    ctrl.linksCtrl = new Links.controller(ctrl.human().links)
  }, function (response) {
    console.log("Rejected:", response)
  })
  console.log('two')

}

Humans.view = function(ctrl) {
  return [
    m('h2', ctrl.human().username),
    // Links.view(ctrl.linksCtrl)
    ctrl.linksCtrl ? Links.view(ctrl.linksCtrl) : null
  ]
}


