import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

import {
  sendHttpRequest,
  getLocationApiEndpoint,
  getDarkSkyApiEndpoint,
  getOpenCageApiEndpoint,
  getLocationList,
} from './helpers'

const isDev = process.env.NODE_ENV !== 'production'
const PORT = isDev ? 3000 : 80
const testIpAddress = '77.57.123.202' // This IP address is for Zurich / Switzerland
const IP_LOCATION_KEY = process.env.IP_LOCATION_KEY
const IP_LOCATION_API_ENDPOINT = `https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=${IP_LOCATION_KEY}`
const DARK_SKY_KEY = process.env.DARK_SKY_KEY
const DARK_SKY_API_ENDPOINT = `https://api.darksky.net/forecast/${DARK_SKY_KEY}`
const OPEN_CAGE_KEY = process.env.OPEN_CAGE_KEY
const OPEN_CAGE_API_ENDPOINT = `https://api.opencagedata.com/geocode/v1/json?q=__PLACENAME__&key=${OPEN_CAGE_KEY}&limit=5`

const app = express()
app.use(cors())

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

app.get('/location-by-ip', async (req, res) => {
  const ip = isDev
    ? testIpAddress
    : req.headers['x-forwarded-for'] || req.connection.remoteAddress

  // Construct URL
  const locationApiEndpoint = getLocationApiEndpoint(
    IP_LOCATION_API_ENDPOINT,
    ip
  )

  // Request users's location by IP address
  const {
    location: { city, lat, lng },
  } = await sendHttpRequest(locationApiEndpoint).catch((error) => {
      res.status(500).json({
        message: 'Something went wrong: Requesting location by ip address',
      })
  })

  res.json({ city, lat, lng })
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

app.get('/location-by-name', async (req, res) => {
  // Get query parameters
  let { location } = req.query

  // Handle if required query parameter is missing
  if (typeof location === 'undefined') {
    return res.status(400).json({
      message: 'Something went wrong: Location parameter is missing.',
    })
  }

  // Construct URL
  const locationApiEndpoint = getOpenCageApiEndpoint(
    OPEN_CAGE_API_ENDPOINT,
    location
  )

  // Request location data by location name
  const response = await sendHttpRequest(locationApiEndpoint).catch((error) => {
    res.status(500).json({
      message:
        'Something went wrong: Requesting location data by location name.',
    })
  })

  res.json(getLocationList(response))
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

app.get('/weather', async (req, res) => {
  // Get query parameters
  let { lattitude, longitude, timestamp } = req.query
  let locationData

  // Get user's IP address
  const ip = isDev
    ? testIpAddress
    : req.headers['x-forwarded-for'] || req.connection.remoteAddress

  // Check if query parameters are passed
  if (typeof lattitude === 'undefined' && typeof longitude === 'undefined') {
    // Construct URL
    const locationApiEndpoint = getLocationApiEndpoint(
      IP_LOCATION_API_ENDPOINT,
      ip
    )

    // Request location by ip address if lat and lng query params are defined
    const { location } = await sendHttpRequest(locationApiEndpoint).catch(
      (error) => {
        res.status(500).json({
          message: `Something went wrong: Requesting user's location!`,
        })
      }
    )

    lattitude = location.lat
    longitude = location.lng
    locationData = location
  }

  // Request user's weather by location
  const darkSkyApiEndpoint = getDarkSkyApiEndpoint(
    DARK_SKY_API_ENDPOINT,
    timestamp,
    lattitude,
    longitude
  )

  const data = await sendHttpRequest(darkSkyApiEndpoint).catch((error) => {
    res
      .status(500)
      .json({ message: `Something went wrong: Requesting user's weather!` })
  })

  res.json(Object.assign(data, { location: locationData }))
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Check if mandatory keys are defined
if (typeof IP_LOCATION_KEY === 'undefined') {
  console.error(new Date(), 'IP_LOCATION_KEY is undefined!')
} else if (typeof DARK_SKY_KEY === 'undefined') {
  console.error(new Date(), 'DARK_SKY_KEY is undefined!')
} else {
  app.listen(
    PORT,
    console.log(new Date(), `Express is running on port: ${PORT}.`)
  )
}
