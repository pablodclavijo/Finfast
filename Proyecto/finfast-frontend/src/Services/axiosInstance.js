import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7070/api',
  timeout: 25000,
  headers: {
    'content-type': 'application/json',
    'Api-Key-Id': process.env.API_KEY
  }
})

axiosInstance.defaults.withCredentials = false

export default axiosInstance
