import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'

// access the store, http request and environment from the Nuxt context
// https://nuxtjs.org/api/context/
export default ({ store, req, isDev }) => {
  createPersistedState({
    key: 'authentication-cookie', // choose any name for your cookie
    paths: [
      // persist the token and expires values from the "auth" store module
      'auth.token',
      'auth.expires',
      'auth.user',
      'auth.company',
      'theme.theme',
    ],
    storage: {
      // if on the browser, parse the cookies using js-cookie otherwise parse from the raw http request
      getItem: (key) =>
        process.client
          ? Cookies.get(key)
          : cookie.parse(req.headers.cookie || '')[key],
      // js-cookie can handle setting both client-side and server-side cookies with one method
      // use isDev to determine if the cookies is accessible via https only (i.e. localhost likely won't be using https)
      setItem: (key, value) =>
        Cookies.set(key, value, { expires: 14, secure: !isDev }),
      // also allow js-cookie to handle removing cookies
      removeItem: (key) => Cookies.remove(key),
    },
  })(store)
}
