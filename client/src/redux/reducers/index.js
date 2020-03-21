import { combineReducers } from 'redux'

import layout from './layout'
import location from './location'
import weather from './weather'

export default combineReducers({
  layout,
  location,
  weather,
})
