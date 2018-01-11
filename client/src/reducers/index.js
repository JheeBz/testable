import { combineReducers } from 'redux'
import authenticationReducer from './authenticationReducer'

const app = combineReducers({
  authenticationReducer
})

export default app
