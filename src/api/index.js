import axios from 'axios'
// import Vue from "vue";

// let env = process.env.NODE_ENV == 'development' ? '开发环境' : '生产环境'
const env = process.env.NODE_ENV  //在生产环境时，会被设置为production
//在开发环境时，会被设置为development
const baseURL = process.env.NODE_ENV == 'development' ? '/api' : ''

let instance = axios.create({
  baseURL,
  timeout: 15000
})

const xhr = {
  get(url, data, config) {
    return new Promise((resolve, reject) => {
      instance.get(url, { params: data }, config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  fetch(url, data, config, methods) {
    return new Promise((resolve, reject) => {
      instance[methods](url, data, config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  post(url, data, config) {
    return this.fetch(url, data, config, 'post')
  },

  delete(url, data, config) {
    return this.fetch(url, data, config, 'delete')
  },

  put(url, data, config) {
    return this.fetch(url, data, config, 'put')
  },
}

export default xhr