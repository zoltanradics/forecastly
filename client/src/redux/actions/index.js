import axios from 'axios'

export const actionTypes = {
  SET_MODE: 'SET_MODE',
  SET_LOCATION: 'SET_LOCATION',
  REQUEST_LOCATION_SUCCESS: 'REQUEST_LOCATION_SUCCESS',
  REQUEST_LOCATION_FAILED: 'REQUEST_LOCATION_FAILED',
  REQUEST_WEATHER_SUCCESS: 'REQUEST_WEATHER_SUCCESS',
  REQUEST_WEATHER_FAILED: 'REQUEST_WEATHER_FAILED',
  REQUEST_LOCATION_SUGGESTIONS_SUCCESS: 'REQUEST_LOCATION_SUGGESTIONS_SUCCESS',
  REQUEST_LOCATION_SUGGESTIONS_FAILED: 'REQUEST_LOCATION_SUGGESTIONS_FAILED',
  CLEAR_LOCATION_SUGGESTIONS: 'CLEAR_LOCATION_SUGGESTIONS',
}

const apiBaseURL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://europe-west1-forecastly-46d2c.cloudfunctions.net/api'
const locationApiEndpoint = `${apiBaseURL}/location-by-ip`
const geocodingApiEndpoint = `${apiBaseURL}/location-by-name`
const weatherApiEndpoint = `${apiBaseURL}/weather`

export const setModeAction = (payload) => ({
  type: actionTypes.SET_MODE,
  payload,
})

export const requestLocationAction = () => async (dispatch) => {
  // Set layout mode
  dispatch({
    type: actionTypes.SET_MODE,
    payload: 'loading',
  })

  // Send request to get data (and handle error)
  const response = await axios.get(locationApiEndpoint).catch(() => {
    // Set layout mode
    dispatch({
      type: actionTypes.SET_MODE,
      payload: 'error',
    })
  })

  if (
    typeof response !== 'undefined' &&
    typeof response.data !== 'undefined' &&
    typeof response.data.latitude !== 'undefined' &&
    typeof response.data.longitude !== 'undefined' &&
    typeof response.data.name !== 'undefined'
  ) {
    // Request weather data
    dispatch(
      requestWeatherDataAction(
        response.data.latitude,
        response.data.longitude,
        response.data.name
      )
    )
  }
}

export const requestLocationSuggestionAction = (locationName) => async (
  dispatch
) => {
  // Send request to get data (and handle error)
  const response = await axios
    .get(`${geocodingApiEndpoint}?location=${locationName}`)
    .catch(() => {
      // Set layout mode
      dispatch({
        type: actionTypes.SET_MODE,
        payload: 'error',
      })
    })

  if (typeof response !== 'undefined' && typeof response.data !== 'undefined') {
    // Add data to redux store
    dispatch({
      type: actionTypes.REQUEST_LOCATION_SUGGESTIONS_SUCCESS,
      payload: response.data,
    })
  }
}

export const requestWeatherDataAction = (latitude, longitude, name) => async (
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
      latitude,
      longitude,
      name,
    },
  })

  const url = `${weatherApiEndpoint}${
    typeof latitude !== 'undefined' && typeof longitude !== 'undefined'
      ? `?latitude=${latitude}&longitude=${longitude}`
      : ''
  }`

  // Send request to get data (and handle error)
  const response = await axios.get(url).catch(() => {
    dispatch({
      type: actionTypes.SET_MODE,
      payload: 'error',
    })
  })

  if (
    typeof response !== 'undefined' &&
    typeof response.data !== 'undefined' &&
    typeof response.data.daily !== 'undefined' &&
    typeof response.data.currently !== 'undefined'
  ) {
    // Add weather data to redux store
    dispatch({
      type: actionTypes.REQUEST_WEATHER_SUCCESS,
      payload: {
        daily: response.data.daily,
        currently: response.data.currently,
      },
    })

    // Set layout mode
    dispatch({
      type: actionTypes.SET_MODE,
      payload: 'display',
    })
  }
}

export const dumpSuggestionAction = () => ({
  type: actionTypes.CLEAR_LOCATION_SUGGESTIONS,
})
