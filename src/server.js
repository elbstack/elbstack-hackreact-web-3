import Express from 'express'
import React from 'react'
import ReactDOM from '../node_modules/react-dom/server'
import config from './config'
import favicon from 'serve-favicon'
import compression from 'compression'
import path from 'path'
import createStore from './redux/create'
import ApiClient from './helpers/ApiClient'
import Html from './helpers/Html'
import PrettyError from 'pretty-error'
import http from 'http'
import acceptLanguage from 'accept-language'

import {ReduxRouter} from 'redux-router'
import createHistory from '../node_modules/history/lib/createMemoryHistory'
import {reduxReactRouter, match} from '../node_modules/redux-router/server'
import {Provider} from 'react-redux'
import qs from 'query-string'
import getRoutes from './routes'
import getStatusFromRoutes from './helpers/getStatusFromRoutes'

const pretty = new PrettyError()
const app = new Express()
const server = new http.Server(app)


app.use(compression())
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')))

app.use(Express.static(path.join(__dirname, '..', 'static')))

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh()
  }
  const client = new ApiClient(req)
  let locale

  if (typeof req.headers.cookie !== 'undefined') {
    const explodedCookieHeader = req.headers.cookie.split('; ')
    explodedCookieHeader.forEach((keyValuePairString) => {
      const keyValuePair = keyValuePairString.split('=') // this does only work if the cookie value does not contain a '='

      if (typeof keyValuePair[0] !== 'undefined' && typeof keyValuePair[1] !== 'undefined' && keyValuePair[0] === 'locale') {
        locale = keyValuePair[1]
      }
    })
  }

  if (!locale) {
    acceptLanguage.languages(['en', 'de'])
    locale = acceptLanguage.get(req.headers["accept-language"])
  }

  let localeIdentifier = 'en'
  switch (locale) {
    case 'de':
      localeIdentifier = 'de'
      break
    default:
      localeIdentifier = 'en'
      break
  }

  const langvars = require('../static/i18n/' + localeIdentifier + '.json')
  const initialState = {
    language: {
      messages: langvars,
      countryCode: localeIdentifier === 'de' ? 'de' : 'en'
    },
    sendbird: {
      connected: false,
      connecting: false,
      app_id: config.sendbird.app_id
    }
  }

  const store = createStore(reduxReactRouter, getRoutes, createHistory, client, initialState)

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>))
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient()
    return
  }

  store.dispatch(match(req.originalUrl, (error, redirectLocation, routerState) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error))
      res.status(500)
      hydrateOnClient()
    } else if (!routerState) {
      res.status(500)
      hydrateOnClient()
    } else {
      // Workaround redux-router query string issue:
      // https://github.com/rackt/redux-router/issues/106
      if (routerState.location.search && !routerState.location.query) {
        routerState.location.query = qs.parse(routerState.location.search)
      }

      store.getState().router.then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxRouter />
          </Provider>
        )

        const status = getStatusFromRoutes(routerState.routes)
        if (status) {
          res.status(status)
        }
        res.send('<!doctype html>\n' +
          ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />))
      }).catch((err) => {
        console.error('DATA FETCHING ERROR:', pretty.render(err))
        res.status(500)
        hydrateOnClient()
      })
    }
  }))
})

if (config.port) {
  if (config.isProduction) {
    // const io = new SocketIo(server)
    // io.path('/api/ws')
  }

  server.listen(config.port, (err) => {
    if (err) {
      console.error(err)
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort)
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port)
  })
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified')
}
