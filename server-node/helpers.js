import fetch from 'node-fetch'

// Send HTTP request with FETCH
export const sendHttpRequest = async (endpoint) => {
  try {
    const response = await fetch(endpoint)
    return response.json()
  } catch (error) {
    throw new Error(`Something went wrong: HTTP Request has failed!`)
  }
}

export const getLocationList = (response) =>
  response.results.map((item) => ({
    name: item.formatted,
    country: item.components.country,
    city: item.components.city,
    flag: item.annotations.flag,
    lat: item.geometry.lat,
    lng: item.geometry.lng,
  }))

// Construct location APi endpoint URL
export const getLocationApiEndpoint = (ipLocationApiEndpoint, ip) =>
  `${ipLocationApiEndpoint}&ipAddress=${ip}`

// Construct Dark Sky API endpoint URL
export const getDarkSkyApiEndpoint = (darkSkyApiEndpoint, lat, lng, time) =>
  `${darkSkyApiEndpoint}/${lat},${lng}` +
  (typeof time !== 'undefined' ? `,${time}` : ``) +
  `?exclude=minutely,hourly,alerts,flags&units=si`

export const getOpenCageApiEndpoint = (openCageApiEndpoint, location) =>
  openCageApiEndpoint.replace('__PLACENAME__', location)
