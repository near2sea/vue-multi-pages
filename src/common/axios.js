import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://local-api.sythealth.com',
  timeout: 4000,
  headers: {
    tokenid: 'tokenid_undefined'
  }
})
export default instance
