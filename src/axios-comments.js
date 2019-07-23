import axios from 'axios'

const instance = axios.create({
  baseURL: "https://fir-comm.firebaseio.com/"
});

export default instance;