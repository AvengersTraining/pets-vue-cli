import axios from 'axios'

export default class PetService {
  static create (pet) {
    return axios.post('pets', pet)
  }

  static all (type) {
    return axios.get('pets', {type: type})
  }

  static find (id) {
    return axios.get('pets/' + id)
  }

  static update (pet) {
    return axios.put('pets/' + pet.id, pet)
  }

  static delete (id) {
    return axios.delete('pets/' + id)
  }
}
