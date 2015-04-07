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
      {title: "mithril tutorial", url: "http://gilbert.ghost.io/mithril-js-tutorial-1/"},
      {title: "bossa nova", url: "http://www.pandora.com/station/play/2596507473269624311"},
      {title: "life without semicolons", url: "http://dreamatico.com/data_images/beach/beach-8.jpg"}
    ],
    username: 'gilbert'
  },
  {
    id: 2,
    email: 'b@b.com',
    links: [
      {title: "julianna barwick cover", url: "https://soundcloud.com/bjmfactory/learning-cloudbank-by-julianna"},
      {title: "alaska music", url: "https://bjmfactory.bandcamp.com/album/the-alaska-recordings"},
      {title: "dylan covers", url: "https://www.youtube.com/playlist?list=PLek-1iNyr8pLMYauUZze9CL9W3MFHdXaI"}
    ],
    username: 'ben'
  },
  {
    id: 3,
    email: 'o@b.com',
    links: [
      {title: "clojure", url: "http://clojure.org/"},
      {title: "spotify API", url: "https://developer.spotify.com/web-api/"},
      {title: "atx restaurants", url: "http://inspectatx.herokuapp.com/"}
    ],
    username: 'nick'
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
}

Humans.view = function(ctrl) {
  return [
    m('h2', 'Profile page'),
    // Links.view(ctrl.linksCtrl)
    ctrl.linksCtrl ? Links.view(ctrl.linksCtrl) : null
  ]
}


