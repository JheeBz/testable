/**
 * Action Types
 */

export const SET_TOKEN = 'SET_TOKEN'

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
