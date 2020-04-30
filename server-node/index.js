import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import express from 'express'
import cors from 'cors'
import { query, validationResult } from 'express-validator'

import {
  sendHttpRequest,
  transformLocationList,
  transformWeatherData,
} from './helpers'

const PORT = 3000
const isDev = process.env.NODE_ENV !== 'production'
const testIpAddress = '77.57.123.202' // This IP address is for Zurich / Switzerland
const IP_LOCATION_API_ENDPOINT = `https://ipapi.co/__IP__/json`
const DARK_SKY_KEY = process.env.DARK_SKY_KEY || functions.config().key.dark_sky
const DARK_SKY_API_ENDPOINT = `https://api.darksky.net/forecast/${DARK_SKY_KEY}`
const OPEN_CAGE_KEY =
  process.env.OPEN_CAGE_KEY || functions.config().key.open_cage
const OPEN_CAGE_API_ENDPOINT = `https://api.opencagedata.com/geocode/v1/json`

// Init Firebase admin
if (!isDev) {
  admin.initializeApp()
}

const app = express()
app.use(cors())

// Check if required API keys are defined
app.use((req, res, next) => {
  if (typeof DARK_SKY_KEY === 'undefined') {
    res.status(500).json({ message: 'DARK_SKY_KEY is undefined!' })
  } else if (typeof OPEN_CAGE_KEY === 'undefined') {
    res.status(500).json({ message: 'OPEN_CAGE_KEY is undefined!' })
  } else {
    next()
  }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

app.get('/location-by-ip', async (req, res) => {
  const ipAddress = isDev
    ? testIpAddress
    : req.headers['x-forwarded-for'] || req.connection.remoteAddress

  // Send HTTP request
  const response = await sendHttpRequest(
    IP_LOCATION_API_ENDPOINT.replace('__IP__', ipAddress)
  ).catch((_error) => {
    res.status(500).json({
      message: 'Something went wrong: Requesting location by ip address.',
    })
  })

  // Check if requred data does exist
  if (
    typeof response !== 'undefined' &&
    typeof response?.data?.country_name !== 'undefined' &&
    typeof response?.data?.city !== 'undefined' &&
    typeof response?.data?.latitude !== 'undefined' &&
    typeof response?.data?.longitude !== 'undefined'
  ) {
    // Return data in JSON
    res.json({
      name: `${response?.data?.country_name}, ${response?.data?.city}`,
      latitude: response?.data?.latitude,
      longitude: response?.data?.longitude,
    })
  } else {
    res.status(500).json({
      message: 'Something went wrong: Wrong location data.',
    })
  }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

app.get(
  '/location-by-name',
  [
    query('location')
      .not()
      .isEmpty()
      .withMessage('Query param "location" is mandatory!'),
  ],
  async (req, res) => {
    // Return error is route validation fails
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    // Get query parameters
    const { location } = req.query

    // Send HTTP request
    const response = await sendHttpRequest(OPEN_CAGE_API_ENDPOINT, {
      key: OPEN_CAGE_KEY,
      q: location,
      limit: 5,
    }).catch((_error) => {
      res.status(500).json({
        message:
          'Something went wrong: Requesting location data by location name.',
      })
    })

    // Transform recieved data
    const transformedData = await transformLocationList(response).catch(
      (error) => {
        res.status(500).json({ message: error })
      }
    )

    // Return data in JSON
    res.json(transformedData)
  }
)

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

app.get(
  '/weather',
  [
    query('latitude')
      .not()
      .isEmpty()
      .withMessage('Query param "latitude" is mandatory!'),
    query('longitude')
      .not()
      .isEmpty()
      .withMessage('Query param "longitude" is mandatory!'),
  ],
  async (req, res) => {
    // Return error is route validation fails
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    // Get query parameters
    let { latitude, longitude } = req.query

    // Send HTTP request
    const response = await sendHttpRequest(
      `${DARK_SKY_API_ENDPOINT}/${latitude},${longitude}`,
      {
        exclude: 'minutely,hourly,alerts,flags',
        units: 'si',
      }
    ).catch((error) => {
      res
        .status(500)
        .json({ message: `Something went wrong: Requesting user's weather!` })
    })

    const transformedData = await transformWeatherData(response).catch(
      (error) => {
        res.status(500).json({ message: error })
      }
    )

    // Return data in JSON
    res.json(transformedData)
  }
)

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Export Express app to Firebase
export const api = isDev
  ? app.listen(PORT, console.log(new Date(), `App listening on port ${PORT}!`))
  : functions.region('europe-west1').https.onRequest(app)
