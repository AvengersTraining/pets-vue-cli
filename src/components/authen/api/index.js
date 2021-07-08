import axios from 'axios'

export default class UserService {
  static register (user) {
    return axios.post('register', user)
  }

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

  static getUserInformation () {
    return axios.get('profile')
      .then(response => response)
      .catch(error => error)
  }

  static updateUserInformation (params) {
    return axios.put('profile', params)
      .then(response => response)
      .catch(error => error)
  }
}
