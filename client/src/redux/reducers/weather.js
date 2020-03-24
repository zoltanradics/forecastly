import { actionTypes } from '../actions'

import { getWeatherData, isWeatherDataLoaded } from '../../utils'

const reducer = (state = { daily: null, currently: null }, action) => {
  const { type, payload } = action

  switch (type) {
    case actionTypes.REQUEST_WEATHER_SUCCESS:
      return {
        ...state,
        daily: getWeatherData(payload.daily.data),
        currently: payload.currently,
      }
    case actionTypes.SET_MODE:
      if (payload === 'search') {
        return {
          daily: null,
          currently: null,
        }
      }
  }

  return state
}

export default reducer
