import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

import {
  sendHttpRequest,
  getLocationApiEndpoint,
  getDarkSkyApiEndpoint,
} from './helpers'

const isDev = process.env.NODE_ENV !== 'production'
const PORT = isDev ? 3000 : 80
const testIpAddress = '77.57.123.202' // This IP address is for Zurich / Switzerland
const IP_LOCATION_KEY = process.env.IP_LOCATION_KEY
const IP_LOCATION_API_ENDPOINT = `https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=${IP_LOCATION_KEY}`
const DARK_SKY_KEY = process.env.DARK_SKY_KEY
const DARK_SKY_API_ENDPOINT = `https://api.darksky.net/forecast/${DARK_SKY_KEY}`

const app = express()
app.use(cors())

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// ROUTES

app.get('/location', async (req, res) => {
  const ip = isDev
    ? testIpAddress
    : req.headers['x-forwarded-for'] || req.connection.remoteAddress

  // Request users's location by IP address
  const locationApiEndpoint = getLocationApiEndpoint(
    IP_LOCATION_API_ENDPOINT,
    ip
  )
  const { location } = await sendHttpRequest(locationApiEndpoint).catch(
    (error) => {
      res.status(500).json({ message: 'Something went wrong!' })
    }
  )

  res.json({ ip, location })
})

app.get('/weather', async (req, res) => {
  // Get query parameters
  const { lat, lng, timestamp } = req.query
  const ip = isDev
    ? testIpAddress
    : req.headers['x-forwarded-for'] || req.connection.remoteAddress

  if (typeof lat === 'undefined' && typeof lng === 'undefined') {
    // Request users's location by IP address
    const locationApiEndpoint = getLocationApiEndpoint(
      IP_LOCATION_API_ENDPOINT,
      ip
    )

    const {
      location: { lat, lng, city },
    } = await sendHttpRequest(locationApiEndpoint).catch((error) => {
      res.status(500).json({
        message: `Something went wrong: Requesting user's location!`,
      })
    })
  }

  // Request user's weather by location
  const darkSkyApiEndpoint = getDarkSkyApiEndpoint(
    DARK_SKY_API_ENDPOINT,
    lat,
    lng,
    timestamp
  )

  const data = await sendHttpRequest(darkSkyApiEndpoint).catch((error) => {
    res
      .status(500)
      .json({ message: `Something went wrong: Requesting user's weather!` })
  })

  res.json(data)
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
