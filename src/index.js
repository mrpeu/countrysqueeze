import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import Reducer from './reducers'
import Game from './containers/Game'
import './index.css'
import {initializingGame} from './actions'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import registerServiceWorker from './service-worker-registration'

registerServiceWorker()

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const store = createStore(
  Reducer,
  applyMiddleware(thunk)
)

store.dispatch(initializingGame())

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Game />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
