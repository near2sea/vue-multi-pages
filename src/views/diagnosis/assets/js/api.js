import axios from '_lib/axios.js';

export const fetchData = async userId => {
  let params = {
    userId
  }
  const {
    data
  } = await axios.get('/ws/fit/v66/oldbringnew/getsharedoldbringnew', {
    params
  })
  return data
}