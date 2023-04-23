export default function ({ store, redirect, route, $moment }) {
  const info = store.getters['auth/getUserInfo']

  const token = info.token
  const validTo = info.expires

  let isAuthenticated = false

  if (token !== '' && token !== null) {
    if ($moment().isBefore($moment(validTo))) {
      isAuthenticated = true
    } else {
      isAuthenticated = false
    }
  } else {
    isAuthenticated = false
  }

  if (!isAuthenticated && route.path !== '/') {
    return redirect('/')
  }
}
