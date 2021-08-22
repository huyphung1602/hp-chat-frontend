const sessionStore = {
  state: () => ({
    isLoggedIn: null,
  }),
  mutations: {
    setLoginStatus (state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    }
  },
  actions: {
    setLoginStatus ({ commit }, isLoggedIn) {
      commit('setLoginStatus', isLoggedIn);
    }
  },
  getters: {
    isLoggedIn (state) {
      return state.isLoggedIn;
    }
  },
}

export default sessionStore;
