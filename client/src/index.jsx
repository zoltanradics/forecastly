import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from './App'
import rootReducer from './redux/reducers'

// Create store using root reducer
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

// Get root element from the dom
const rootElement = document.getElementById('root')

// Render root component with REDUX provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
