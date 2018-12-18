import axios from '_lib/axios.js';

export const fetchData = async () => {
  const {
    data
  } = await axios.get('/sytactivities/api/open/diag/questions')
  return data
}