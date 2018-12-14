import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://api.sythealth.com',
  timeout: 1000,
  headers: {
    'tokenid': 'tokenid_undefined'
  }
})
export default instance