const sessionStore = {
  state: () => ({
    isLoggedIn: null,
    currentUser: {},
  }),
  mutations: {
    setLoginStatus (state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setCurrentUser (state, user) {
      state.currentUser = user;
    },
  },
  actions: {
    setLoginStatus ({ commit }, isLoggedIn) {
      commit('setLoginStatus', isLoggedIn);
    },
    setCurrentUser ({ commit }, user) {
      commit('setCurrentUser', user);
    },
  },
  getters: {
    isLoggedIn (state) {
      return state.isLoggedIn;
    },
    currentUser (state) {
      return state.currentUser;
    },
  },
}

export default sessionStore;
