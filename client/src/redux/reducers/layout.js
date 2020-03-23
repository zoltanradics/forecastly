import { actionTypes } from '../actions'

const initialState = {
  mode: 'search',
}

const layout = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.SET_MODE:
      return {
        ...state,
        mode: payload,
      }
  }
  return state
}

export default layout
