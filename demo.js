try {
  var Router = require('Router.js')
  var m      = require('mithril')
}
catch(e){}

m.mount(document.documentElement, {
  view: () => [
    m('head',
      m('style', `
        body {
          padding: 1em;
          font-family: sans-serif;
        }
      `)
    ),

    m('body',
      m('.bar',
      ),
      m('.main',
        m('h1', 'Hello'),

        m(Router, {
          '/': () =>
            m('p', 'Root!'),

          '/demo.html': () =>
            m('p', 'Root!'),

          '/:404?': () =>
            m('p', 'Root!'),

          then: console.log.bind(console),
          catch: console.log.bind(console),
          finally: console.log.bind(console),
        })
      ),
    ),
  ]
})
