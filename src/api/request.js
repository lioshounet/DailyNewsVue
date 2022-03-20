import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

var BASE_URL = 'http://dev.flyaha.top:8903/'

if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://blade.flyaha.top/thor/'
} else {
  BASE_URL = 'http://dev.flyaha.top:8903/'
}

// create an axios instance
const service = axios.create({
  baseURL: BASE_URL,
  timeout: 60 * 1000 // request timeout
})

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    return res;
  },
  error => {
    const res = error.response.data
    Message({
      message: res.msg || error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(res.msg || error.message)
  }
)

export default service