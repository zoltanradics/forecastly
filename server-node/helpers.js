import fetch from 'node-fetch'

// Send request to location API
export const sendHttpRequest = async (endpoint) => {
  try {
    const response = await fetch(endpoint)
    return response.json()
  } catch (error) {
    throw new Error(`Something went wrong: HTTP Request has failed!`)
  }
}

// Construct location APi endpoint
export const getLocationApiEndpoint = (ipLocationApiEndpoint, ip) =>
  `${ipLocationApiEndpoint}&ipAddress=${ip}`

export const getDarkSkyApiEndpoint = (darkSkyApiEndpoint, lat, lng, time) =>
  `${darkSkyApiEndpoint}/${lat},${lng}` +
  (time ? `,${time}` : ``) +
  `?exclude=minutely,hourly,alerts,currently,daily,flags&units=si`
