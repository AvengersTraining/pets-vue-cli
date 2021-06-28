export default {
  handleError (err, statusCode) {
    let error = {}
    error.status = true
    error.code = statusCode
    if (statusCode >= 500) {
      error.message = 'Server Error'
    } else {
      switch (statusCode) {
        case 422:
          error.message = 'Unprocessable Entity'
          error = {...error, ...err.response.data.errors}
          break
        case 401:
          error.message = 'Unauthorized'
          break
      }
    }
    return error
  },

  objectNotEmpty (object) {
    if (object && object.length > 0) {
      return true
    }
    return false
  }
}
