import fakeApi from './fakeApi'

const api = {
  defaults: {
    baseURL: 'http://localhost:8000/api',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },

  get(url, config = {}) {
    return fakeApi.get(url, config)
  },

  post(url, data = {}, config = {}) {
    return fakeApi.post(url, data, config)
  },

  put(url, data = {}, config = {}) {
    return fakeApi.put(url, data, config)
  },

  delete(url, config = {}) {
    return fakeApi.delete(url, config)
  },
}

export default api
