export default {
  async login({ commit, dispatch }, { email, password }) {
    // make an API call to login the user with an email address and password
    await this.$axios
      .$post('auth', { email, password })
      .then((response) => {
        const user = response.user
        const token = response.token
        const expires = response.validTo

        commit('setUser', user)
        commit('setToken', token)
        commit('setExpires', expires)

        this.$router.push('/dash')
      })
      .catch(() => {})
  },

  logout({ commit, state }) {
    commit('logout')
  },

  setUser({ commit, dispatch }, user) {
    commit('setUser', user)
  },
}
