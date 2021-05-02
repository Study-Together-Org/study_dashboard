import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.discordstudy.com/',
})

export default axiosInstance
