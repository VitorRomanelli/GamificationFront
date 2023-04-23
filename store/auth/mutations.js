export default {
  setUser(state, payload) {
    state.user = payload
  },

  setToken(state, payload) {
    state.token = payload
  },

  setExpires(state, payload) {
    state.expires = payload
  },

  logout(state) {
    this.$router.push('/')
    state.user = null
    state.token = null
    state.expires = null
  },
}
