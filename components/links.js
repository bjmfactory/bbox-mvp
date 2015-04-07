Links = {}

// Model
Links.model = function () {
  this.title  = m.prop('seek and find')
  this.url    = m.prop('http://google.com')
}

// Controller
Links.controller = function () {
  // put in humans controller
  // if (! Sessions.token()) return m.route('/sessions')
  var ctrl = this
  ctrl.links = m.prop( [
    // could I have a random database of links that I pass
    // in here as arguments?
    new Links.model(),
    new Links.model(),
    new Links.model(),
  ] )
}

// View
Links.view = function(ctrl) {
  return m('.human', [

    m('.edit', [
      m('h2', 'Edit Links'),
      ctrl.links().map(function (link) {
        return m('.linkForm', [
          m('input[type=text]', {
            value: link.title(),
            onchange: m.withAttr('value', link.title)
          }),
          m('input[type=text]', {
            value: link.url(),
            onchange: m.withAttr('value', link.url)
          })
        ])
      })
    ]),

    m('.box', [
      m('h2', 'bjmfactory'),
      ctrl.links().map(function (link) {
        return m('.link', [
          m('a', { href: link.url()}, link.title())
        ])
      })
    ])
  ])
}
