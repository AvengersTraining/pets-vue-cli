import axios from 'axios'

export default class PostService {
  static create (post) {
    return axios.post('posts', post)
  }

  static all () {
    return axios.get('posts')
  }
  static find (id) {
    return axios.get('posts/' + id)
  }

  static update (post) {
    return axios.put('posts/' + post.id, post)
  }

  static delete (id) {
    return axios.delete('posts/' + id)
  }
}
