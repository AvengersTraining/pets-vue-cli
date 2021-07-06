export default async function guest ({ next, store }) {
  if (localStorage.getItem('token')) {
    await store.dispatch('storeAuthen/initAuth')

    if (store.state.storeAuthen.loggedIn) {
      return next({
        name: 'home'
      })
    }
  }

  return next()
}
