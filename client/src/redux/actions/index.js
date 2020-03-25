export const actionTypes = {
  SET_MODE: 'SET_MODE',
  SET_LOCATION: 'SET_LOCATION',
  REQUEST_LOCATION_SUCCESS: 'REQUEST_LOCATION_SUCCESS',
  REQUEST_LOCATION_FAILED: 'REQUEST_LOCATION_FAILED',
  REQUEST_WEATHER_SUCCESS: 'REQUEST_WEATHER_SUCCESS',
  REQUEST_WEATHER_FAILED: 'REQUEST_WEATHER_FAILED',
  REQUEST_LOCATION_SUGGESTIONS_SUCCESS: 'REQUEST_LOCATION_SUGGESTIONS_SUCCESS',
  REQUEST_LOCATION_SUGGESTIONS_FAILED: 'REQUEST_LOCATION_SUGGESTIONS_FAILED',
}

const apiBaseURL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5001/forecastly-46d2c/us-central1/api'
    : 'https://us-central1-forecastly-46d2c.cloudfunctions.net/api'
const locationApiEndpoint = `${apiBaseURL}/location-by-ip`
const weatherApiEndpoint = `${apiBaseURL}/weather`
const geocodingApiEndpoint = `${apiBaseURL}/location-by-name`

export const setModeAction = (payload) => ({
  type: actionTypes.SET_MODE,
  payload,
})

export const requestLocationAction = () => async (dispatch) => {
  // Send request to get data (and handle error)
  const response = await fetch(locationApiEndpoint).catch(() => {
    dispatch({
      type: actionTypes.REQUEST_LOCATION_FAILED,
    })
  })

  // Get data from response
  const { lattitude, longitude, name } = await response.json()

  // Request weather data
  dispatch(requestWeatherDataAction(lattitude, longitude, name))
}

export const requestLocationSuggestionAction = (locationName) => async (
  dispatch
) => {
  // Send request to get data (and handle error)
  const response = await fetch(
    `${geocodingApiEndpoint}?location=${locationName}`
  ).catch(() => {
    dispatch({
      type: actionTypes.REQUEST_LOCATION_SUGGESTIONS_FAILED,
    })
  })

  // Get data from response
  const data = await response.json()

  // Add data to redux store
  dispatch({
    type: actionTypes.REQUEST_LOCATION_SUGGESTIONS_SUCCESS,
    payload: data,
  })
}

export const requestWeatherDataAction = (lattitude, longitude, name) => async (
  dispatch
) => {
  // Set layout mode
  dispatch({
    type: actionTypes.SET_MODE,
    payload: 'loading',
  })

  dispatch({
    type: actionTypes.REQUEST_LOCATION_SUCCESS,
    payload: {
      lattitude,
      longitude,
      name,
    },
  })

  const url = `${weatherApiEndpoint}${
    typeof lattitude !== 'undefined' && typeof longitude !== 'undefined'
      ? `?lattitude=${lattitude}&longitude=${longitude}`
      : ''
  }`

  // Send request to get data (and handle error)
  const response = await fetch(url).catch(() => {
    dispatch({
      type: actionTypes.REQUEST_WEATHER_FAILED,
    })
  })

  // Get data from response
  const data = await response.json()

  // Add weather data to redux store
  dispatch({
    type: actionTypes.REQUEST_WEATHER_SUCCESS,
    payload: {
      daily: data.daily,
      currently: data.currently,
    },
  })

  // Set layout mode
  dispatch({
    type: actionTypes.SET_MODE,
    payload: 'display',
  })
}
