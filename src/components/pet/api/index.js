import axios from 'axios'

export default class PetService {
  static create (pet) {
    return axios.post('pets', pet)
  }

  static all (type) {
    return axios.get('pets', {type: type})
  }
}
