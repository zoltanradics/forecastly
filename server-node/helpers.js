import fetch from 'node-fetch'

// Get data from Fetch response
const getJsonResponse = async (response) => {
  try {
    return await response.json()
  } catch (error) {
    throw new Error(`Something went wrong: Can't parse response!`)
  }
}

// Send request to location API
export const sendLocationApiRequest = async (locationApiEndpoint) => {
  try {
    const response = await fetch(locationApiEndpoint)
    return await getJsonResponse(response)
  } catch (error) {
    throw new Error(`Something went wrong: Location request has failed!`)
  }
}
