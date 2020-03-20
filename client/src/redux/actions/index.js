export const actionTypes = {
  REQUEST_LOCATION_SUCCESS: 'REQUEST_LOCATION_SUCCESS',
  REQUEST_LOCATION_FAILED: 'REQUEST_LOCATION_FAILED',
  SET_LOCATION: 'SET_LOCATION',
  REQUEST_WEATHER_SUCCESS: 'REQUEST_WEATHER_SUCCESS',
  REQUEST_WEATHER_FAILED: 'REQUEST_WEATHER_FAILED',
}

const locationApiEndpoint = 'http://localhost:3000/location'
const weatherApiEndpoint = 'http://localhost:3000/weather'

export const requestLocationAction = () => async (dispatch) => {
  // Send request to get location data (and handle error)
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

export const requestWeatherAction = (lattitude, longitude, timestamp) => async (
  dispatch
) => {
  // Send request to get weather data (and handle error)
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
    payload: data.daily,
  })
}
