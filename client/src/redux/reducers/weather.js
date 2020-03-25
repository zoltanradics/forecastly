import { actionTypes } from '../actions'

import { transformWeatherData } from '../../utils'

const reducer = (state = { daily: null, currently: null }, action) => {
  const { type, payload } = action

  switch (type) {
    case actionTypes.REQUEST_WEATHER_SUCCESS:
      return {
        ...state,
        daily: transformWeatherData(payload.daily),
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
