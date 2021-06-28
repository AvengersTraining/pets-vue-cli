import axios from 'axios'

export default class UserService {
  static login (user) {
    return axios.post('login', user, {
      'username': user.username,
      'password': user.password
    })
  }

  static logout () {
    return axios.get('logout')
  }

  static getProfile () {
    return axios.get('profile')
  }
}
