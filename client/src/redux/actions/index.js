export const actionTypes = {
  REQUEST_LOCATION_SUCCESS: 'REQUEST_LOCATION_SUCCESS',
  REQUEST_LOCATION_FAILED: 'REQUEST_LOCATION_FAILED',
  SET_LOCATION: 'SET_LOCATION',
  REQUEST_WEATHER_SUCCESS: 'REQUEST_WEATHER_SUCCESS',
  REQUEST_WEATHER_FAILED: 'REQUEST_WEATHER_FAILED',
  REQUEST_GEOCODiNG_SUCCESS: 'REQUEST_GEOCODiNG_SUCCESS',
  REQUEST_GEOCODING_FAILED: 'REQUEST_GEOCODING_FAILED',
}

const apiBaseURL = 'http://localhost:3000'
const locationApiEndpoint = `${apiBaseURL}/location`
const weatherApiEndpoint = `${apiBaseURL}/weather`
const geocodingApiEndpoint = `${apiBaseURL}/geocoding`

export const requestLocationAction = () => async (dispatch) => {
  // Send request to get data (and handle error)
  const response = await fetch(locationApiEndpoint).catch(() => {
    dispatch({
      type: actionTypes.REQUEST_LOCATION_FAILED,
    })
  })

  // Get data from response
  const { location } = await response.json()

  // Add data to redux store
  dispatch({
    type: actionTypes.REQUEST_LOCATION_SUCCESS,
    payload: location,
  })
}

export const requestLocationSuggestionAction = (locationName) => async (
  dispatch
) => {
  // Send request to get data (and handle error)
  const response = await fetch(
    `${geocodingApiEndpoint}?location=${locationName}`
  ).catch(() => {
    dispatch({
      type: actionTypes.REQUEST_GEOCODING_FAILED,
    })
  })

  // Get data from response
  const data = await response.json()

  // Add data to redux store
  dispatch({
    type: actionTypes.REQUEST_GEOCODiNG_SUCCESS,
    payload: data,
  })
}

export const requestWeatherDataAction = (
  lattitude,
  longitude,
  timestamp
) => async (dispatch) => {
  // Send request to get data (and handle error)
  const response = await fetch(
    `${weatherApiEndpoint}?time=${Date.now()}`
  ).catch(() => {
    dispatch({
      type: actionTypes.REQUEST_WEATHER_FAILED,
    })
  })

  // Get data from response
  const data = await response.json()

  // Add location data to redux store
  dispatch({
    type: actionTypes.SET_LOCATION,
    payload: data.city,
  })

  // Add weather data to redux store
  dispatch({
    type: actionTypes.REQUEST_WEATHER_SUCCESS,
    payload: {
      daily: data.daily,
      currently: data.currently,
    },
  })
}
