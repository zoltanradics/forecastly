import { actionTypes } from '../actions'

const initialState = {
  city: null,
  country: null,
  region: null,
  lat: null,
  lng: null,
  postalCode: null,
  timezone: null,
  geonameId: null,
}

const location = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.REQUEST_LOCATION_SUCCESS:
      return {
        ...state,
        ...payload,
      }
  }

  return state
}

export default location
