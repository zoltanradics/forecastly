import { actionTypes } from '../actions'

const reducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.SET_LOCATION:
      return {
        ...state,
        city: payload,
      }
  }

  return state
}

export default reducer
