export default {
  async login({ commit, dispatch }, { email, password }) {
    // make an API call to login the user with an email address and password
    await this.$axios
      .$post('auth', { email, password })
      .then((response) => {
        const user = response.content.user
        const token = response.content.token
        const expires = response.content.validTo

        commit('setUser', user)
        commit('setToken', token)
        commit('setExpires', expires)

        this.$router.push('/users')
      })
      .catch(() => {})
  },

  logout({ commit, state }) {
    commit('logout')
  },
}
