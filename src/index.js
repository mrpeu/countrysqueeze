import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import Reducer from './reducers'
import App from './components/App'
import './index.css'
import {initializingGame} from './actions'

const store = createStore(
  Reducer,
  applyMiddleware(thunk)
)

store.dispatch(initializingGame())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
