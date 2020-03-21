import { actionTypes } from '../actions'

import { getDateString } from '../../utils'

const getWeatherData = (data) =>
  data.reduce((acc, item) => {
    // Get date from timestamp
    const date = new Date(item.time * 1000)
    // Create string from date
    const dateString = getDateString(date)
    // Create object with date string key
    if (typeof acc[dateString] === 'undefined') {
      acc[dateString] = item
    }
    return acc
  }, {})

const reducer = (state = { summary: null, data: {} }, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.REQUEST_WEATHER_SUCCESS:
      return {
        ...state,
        summary: payload.summary,
        data: getWeatherData(payload.data),
      }
  }

  return state
}

export default reducer
