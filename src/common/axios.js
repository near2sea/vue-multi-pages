import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://192.168.0.3:7600',
  timeout: 1000,
  headers: {
    'tokenid': 'tokenid_undefined'
  }
})
export default instance