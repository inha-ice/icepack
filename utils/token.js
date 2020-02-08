const getToken = () => window.localStorage.getItem('access_token')

const hasToken = () => getToken() !== null

const removeToken = () => window.localStorage.removeItem('access_token')

const setToken = token => window.localStorage.setItem('access_token', token)

module.exports = {
  getToken,
  hasToken,
  removeToken,
  setToken
}
