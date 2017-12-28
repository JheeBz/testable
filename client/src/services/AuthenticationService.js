import api from './Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  }
}
