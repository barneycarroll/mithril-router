try {
  module.exports = Router
} catch(e){}

try {
  var UniversalRouter = require('universal-router')
  var History         = require('history')
} catch(e){}

function Router(v){
  let   state   = {}
  const history = History.createBrowserHistory()

  const router  = new UniversalRouter(
    Object.keys(v.attrs).map(key => ({
      path   : key,
      action : ({params, path}) => ({
        key,
        path,
        params,
      }),
    })),
  )

  const resolve = ({
    action,
    location = history.createHref(history.location),
  }) => {
    state = {action, path: location}

    const promise = router.resolve({
      action,
      pathname : location,
    })
      .then(({key, params}) => {
        Object.assign(state, {key, params})
      })
      .catch(error => {
        Object.assign(state, {error})
      })
      .finally(() => {
        m.redraw()
      })

    for(const method of ['then', 'catch', 'finally'])
      promise[method](() => {
        if(v.attrs[method])
          v.attrs[method](state)
      })
  }

  const listener = history.listen((location, action) => {
    action = args[1]

    resolve({
      action,
      location: history.createHref(location)
    })
  })

  resolve({
    location: history.createHref(location)
  })

  return {
    view: v =>
        state.key
      &&
        v.attrs[state.key]
      &&
        v.attrs[state.key](state),

    onremove: listener,
  }
}
