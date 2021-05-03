import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.discordstudy.com/',
  // process.env.NODE_ENV == 'development'
  //   ? 'http://localhost:5000'
  //   : 'https://api.discordstudy.com/',
})

export default axiosInstance
