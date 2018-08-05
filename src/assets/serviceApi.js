import axios from 'axios'
import Vue from 'vue'
import { Loading } from 'element-ui'
const hexMd5 = require('crypto-js/md5')
const Cookies = require('cookies-js')
// const CryptoJS = require('crypto-js/core')
// const AES = require('crypto-js/aes')
// const ECB = require('crypto-js/mode-ecb')

axios.defaults.timeout = 60000 // 60秒后超时
axios.defaults.baseURL = '/advertisement/api/1'

const CancelToken = axios.CancelToken
let loading
let cancel
let cancelAjaxText = '中断成功'

Vue.prototype.cancelAxios = function () {
  if (cancel) {
    cancel(cancelAjaxText)
  }
}

// http request 拦截器
axios.interceptors.request.use(
  config => {
    loading = Loading.service({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.4)'
    })
    let token = Cookies.get('token')
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
    config.cancelToken = new CancelToken(c => {
      // 强制中断请求
      cancel = c
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    loading.close()
    if (response.data.errCode === 2) {
      this.$message.error('错误')
    }
    if (response.status === 404) {
      this.$message.error('服务出错，请稍后再试')
    }
    if (response.status === 304) {
      this.$message.error('系统故障，请反馈给客服')
    }
    if (response.status === 400) {
      this.$message.error('服务不稳定，请稍后再试')
    }
    if (response.status === 500) {
      this.$message.error('接口超时，请稍后再试')
    }
    return response
  },
  error => {
    loading.close()
    return Promise.reject(error)
  }
)

export function axiosGet (url, params) {
  console.log(params)
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params}).then(response => {
      console.log(response.data)
      if (response.message === cancelAjaxText) {
        return {
          status: false,
          msg: cancelAjaxText
        }
      }
      if (response.data.code === 9999) {
        this.$message.error(response.data.message)
      }
      if (response.data.code === -10000000) {
        this.$message.error(response.data.message)
      }
      if (response.data.code === 100) {
        Cookies.set('token', '')
        this.$router.push({path: 'Login'})
      }
      if (response.data.code === 501) {
        this.$message.error(response.data.message + '，请将电脑系统时间设置正确。')
      }
      resolve(response.data)
    }).catch(err => {
      console.log(err)
      console.log(err.message)
      reject(err)
    })
  })
}

export function axiosPost (url, data) {
  console.log(data)
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(response => {
      if (response.message === cancelAjaxText) {
        return {
          status: false,
          msg: cancelAjaxText
        }
      }
      if (response.data.code === 9999) {
        this.$message.error(response.data.message)
      }
      if (response.data.code === -10000000) {
        this.$message.error(response.data.message)
      }
      if (response.data.code === 100) {
        Cookies.set('token', '')
        this.$router.push({path: 'Login'})
      }
      if (response.data.code === 501) {
        this.$message.error(response.data.message + '，请将电脑系统时间设置正确。')
      }
      console.log(response.data)
      resolve(response.data)
    }, err => {
      console.log(err)
      console.log(err.message)
      this.$message.error('接口出错，请稍后再试')
    })
  })
}
