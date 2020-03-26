import { actionTypes } from '../actions'

const reducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.REQUEST_LOCATION_SUCCESS:
      return {
        ...state,
        suggestions: [],
        ...payload,
      }
    case actionTypes.REQUEST_LOCATION_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        suggestions: payload,
      }
    case actionTypes.CLEAR_LOCATION_SUGGESTIONS:
      return {
        ...state,
        suggestions: [],
      }
  }

  return state
}

export default reducer
