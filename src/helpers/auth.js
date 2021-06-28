import {store} from '../store'

export default class auth {
  static isAuth () {
    if (localStorage.getItem('token') && store.state.storeAuthen.loggedIn) {
      return true
    }
    return false
  }
}
