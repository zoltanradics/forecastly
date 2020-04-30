import axios from 'axios'
import queryString from 'querystring'

export const sendHttpRequest = (baseUrl, queryParamObject) =>
  axios.get(`${baseUrl}?${queryString.stringify(queryParamObject)}`)

export const transformLocationList = async (response) => {
  if (
    typeof response === 'undefined' &&
    typeof response?.data === 'undefined' &&
    typeof response?.data?.results === 'undefined'
  ) {
    throw new Error('Location suggestion API response is undefined.')
  }

  return await response.data.results.map((item) => ({
    name: item?.formatted,
    flag: item?.annotations.flag,
    lat: item?.geometry.lat,
    lng: item?.geometry.lng,
  }))
}

export const transformWeatherData = async (response) => {
  // Validate weather data
  if (typeof response === 'undefined' && typeof response.data === 'undefined') {
    throw new Error('Weather API response is undefined.')
  } else if (typeof response?.data?.daily === 'undefined') {
    throw new Error('Daily weather data is missing.')
  } else if (typeof response?.data?.currently === 'undefined') {
    throw new Error('Current weather data is missing.')
  }

  // Get current weather data
  const { time, summary, icon, temperature } = response.data.currently

  // Get weekly weather data
  const daily = response?.data?.daily?.data.map((item) => ({
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
