export default function auth ({ next, store }) {
  if (!store.state.storeAuthen.loggedIn) {
    return next({
      name: 'login'
    })
  }

  return next()
}
