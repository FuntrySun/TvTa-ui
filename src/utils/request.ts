import axios from 'axios'
import { createDiscreteApi } from 'naive-ui'

const { message } = createDiscreteApi(['message'])

const service = axios.create({
  baseURL: 'http://localhost:8080', // Default Spring Boot port
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    // Add token here if needed
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    message.error(error.message || 'Request Error')
    return Promise.reject(error)
  }
)

export default service