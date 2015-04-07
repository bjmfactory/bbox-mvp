Links = {}

// Model
Links.model = function (title, url) {
  this.title    = m.prop(title)
  this.url      = m.prop(url)
}

// Controller
Links.controller = function (links) {
  // put in humans controller
  // if (! Sessions.token()) return m.route('/sessions')
  var ctrl = this
  ctrl.links = links
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
      m('h2', 'View Links'),
      ctrl.links().map(function (link) {
        return m('.link', [
          m('a', { href: link.url()}, link.title())
        ])
      })
    ])
  ])
}
