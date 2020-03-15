export const actionTypes = {
  REQUEST_LOCATION: 'REQUEST_LOCATION',
  REQUEST_LOCATION_SUCCESS: 'REQUEST_LOCATION_SUCCESS',
}

export const requestLocationAction = () => (dispatch) => {
  fetch('http://localhost:3000/location')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      const { location } = data
      setTimeout(() => {
        dispatch({
          type: actionTypes.REQUEST_LOCATION_SUCCESS,
          payload: location,
        })
      }, 1500)
    })
}
