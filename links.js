Links = {}

// Model
Links.model = function () {
  this.title  = m.prop('search the world')
  this.url    = m.prop('http://google.com')
}

// Controller
Links.controller = function () {
  var ctrl = this
  ctrl.links = m.prop( [new Links.model()] )

  ctrl.add = function () {
    var newModel = new Links.model()
    ctrl.links().push(newModel)
  }
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
    ]),

    m('button', { onclick: ctrl.add }, 'Add Link (temporary)')
  ])
}
