export default async function auth ({ next, store }) {
  if (!localStorage.getItem('token')) {
    return next({
      name: 'login'
    })
  } else {
    if (!store.state.storeAuthen.loggedIn) {
      await store.dispatch('storeAuthen/initAuth')

      if (!store.state.storeAuthen.loggedIn) {
        return next({
          name: 'login'
        })
      }
    }

    return next()
  }
}
