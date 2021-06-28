export default class ConfigAxios {
  static setAuthorizationHeader (tokenType = null, accessToken = null) {
    let authorization = ''

    if (tokenType && accessToken) {
      authorization = `${tokenType} ${accessToken}`
    }

    localStorage.setItem('token', authorization)
  }
}
