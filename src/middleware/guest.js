export default function guest ({ next, store }) {
  if (store.state.storeAuthen.loggedIn) {
    return next({
      name: 'home'
    })
  }

  return next()
}
