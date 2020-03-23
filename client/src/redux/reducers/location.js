import { actionTypes } from '../actions'

const reducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.REQUEST_LOCATION_SUCCESS:
      return {
        ...state,
        ...payload,
      }
    case actionTypes.SET_LOCATION:
      return {
        ...state,
        ...payload,
      }
    case actionTypes.REQUEST_LOCATION_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        suggestions: payload,
      }
  }

  return state
}

export default reducer
