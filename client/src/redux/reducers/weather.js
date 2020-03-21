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
        weatherLoaded: isWeatherDataLoaded(payload),
      }
  }

  return state
}

export default reducer
