export default {
  getUserInfo(state) {
    return {
      user: state.user,
      token: state.token,
      expires: state.expires,
    }
  },
}
