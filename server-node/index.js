import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const isDev = process.env.NODE_ENV !== 'production'
const PORT = isDev ? 3000 : 80
const testIpAddress = '77.57.123.202' // This IP address is for Zurich / Switzerland
const IP_LOCATION_KEY = process.env.IP_LOCATION_KEY
const IP_LOCATION_API_ENDPOINT = `https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=${IP_LOCATION_KEY}`
const DARK_SKY_KEY = process.env.DARK_SKY_KEY
const DARK_SKY_API_ENDPOINT = `https://api.darksky.net/forecast/${DARK_SKY_KEY}`

const app = express()
app.use(cors())

// Construct location APi endpoint
const getLocationApiEndpoint = (ip) =>
  `${IP_LOCATION_API_ENDPOINT}&ipAddress=${ip}`

const getDarkSkyApiEndpoint = (lat, lng, time) =>
  `${DARK_SKY_API_ENDPOINT}/${lat},${lng}` + (time ? `,${time}` : ``)

// Define route for find out client's location
app.get('/location', async (req, res) => {
  const ip = isDev
    ? testIpAddress
    : req.headers['x-forwarded-for'] || req.connection.remoteAddress
  const locationApiEndpoint = getLocationApiEndpoint(ip)

  // Fetch location by IP address
  try {
    const locationResponse = await fetch(locationApiEndpoint)
    const { ip, location } = await locationResponse.json()
    res.json({ ip, location })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong!' })
  }
})

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
