import { SET_TOKEN } from '../actions/'

const initialState = {
  token: null
}

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return Object.assign({}, state, {
        token: action.token
      })
    default:
      return state
  }
}

export default authenticationReducer
