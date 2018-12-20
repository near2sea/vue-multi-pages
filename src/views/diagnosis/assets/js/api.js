import axios from '_lib/axios.js';

export const fetchData = async () => {
  const {
    data
  } = await axios.get('/sytactivities/api/open/diag/questions')
  return data
}

export const evalData = async (pages) => {
  const params = {
    pages,
    userId: '123123'
  }
  const {
    data
  } = await axios.post('sytactivities/api/open/diag/eval', params)
  return data
}