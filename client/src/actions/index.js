/**
 * Action Types
 */

export const SET_TOKEN = 'SET_TOKEN'
export const UNSET_TOKEN = 'UNSET_TOKEN'

/**
 * Action Creators
 * @todo these are currently unused. Research more about using them in an application.
 */
export const setToken = token => {
  return {
    type: SET_TOKEN,
    token
  }
}

export const unsetToken = () => {
  return {
    type: UNSET_TOKEN,
    token: null
  }
}
