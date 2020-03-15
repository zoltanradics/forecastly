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
