import axios from 'axios'
import queryString from 'querystring'

export const sendHttpRequest = (baseUrl, queryParamObject) =>
  axios.get(`${baseUrl}?${queryString.stringify(queryParamObject)}`)

export const transformLocationList = (data) =>
  data && data.results
    ? data.results.map((item) => ({
        name: item.formatted,
        flag: item.annotations.flag,
        lat: item.geometry.lat,
        lng: item.geometry.lng,
      }))
    : []

export const transformWeatherData = async (data) => {
  // Validate weather data
  if (typeof data.daily === 'undefined') {
    throw new Error('Daily weather data is missing.')
  } else if (typeof data.currently === 'undefined') {
    throw new Error('Current weather data is missing.')
  }

  // Get current weather data
  const { time, summary, icon, temperature } = data.currently
  // Get weekly weather data
  const daily = data.daily.data.map((item) => ({
    time: item.time,
    icon: item.icon,
    temperatureHigh: item.temperatureHigh,
    temperatureLow: item.temperatureLow,
  }))

  return {
    daily,
    currently: {
      time,
      summary,
      icon,
      temperature,
    },
  }
}
