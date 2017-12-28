import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'localhost:8081'
  })
}
