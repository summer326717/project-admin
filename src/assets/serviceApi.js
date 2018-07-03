import axios from 'axios'
const hexMd5 = require('crypto-js/md5')
// const CryptoJS = require('crypto-js/core')
// const AES = require('crypto-js/aes')
// const ECB = require('crypto-js/mode-ecb')

axios.defaults.timeout = 5000
axios.defaults.baseURL = '/advertisement/api/1'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token') // 注意使用的时候需要引入cookie方法，推荐js-cookie
    if (!token) {
      token = ''
    }
    let Timestamp = Date.parse(new Date())
    let SignInfo = hexMd5(Timestamp + 'IronMan')
    config.data = JSON.stringify(config.data)
    config.headers = {
      'Access-Control-Allow-Origin': '*',
      'Timestamp': Timestamp,
      'SignInfo': SignInfo,
      'Content-Type': 'application/json;charset=UTF-8',
      'token': token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errCode === 2) {
      alert('错误')
    }
    if (response.status === 404) {
      alert('服务出错，请稍后再试')
    }
    if (response.status === 304) {
      alert('系统故障，请反馈给客服')
    }
    if (response.status === 400) {
      alert('服务不稳定，请稍后再试')
    }
    if (response.status === 500) {
      alert('接口超时，请稍后再试')
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export function axiosGet (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params}).then(response => {
      resolve(response.data)
    }).catch(err => {
      console.log(err)
      console.log(err.message)
      reject(err)
    })
  })
}

export function axiosPost (url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(response => {
      if (response.data.code === 9999) {
        alert(response.data.msg)
      }
      if (response.data.code === -10000000) {
        alert(response.data.msg)
      }
      console.log(response.data)
      resolve(response.data)
    }, err => {
      console.log(err)
      console.log(err.message)
      // reject(err)
      alert('接口出错，请稍后再试')
    })
  })
}
