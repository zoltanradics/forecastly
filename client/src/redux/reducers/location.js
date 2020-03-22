import { actionTypes } from '../actions'

const reducer = (state = {}, action) => {
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

export default reducer
