const invitationStore = {
  state: () => ({
    invitation: {
      code: '',
      id: '',
    },
  }),
  mutations: {
    setInvitation (state, { code, id }) {
      state.invitation.code = code;
      state.invitation.id = id;
    },
  },
  actions: {
    setInvitation ({ commit }, { code, id }) {
      commit('setInvitation', { code, id });
    },
  },
  getters: {
    invitation (state) {
      return state.invitation;
    },
  },
}

export default invitationStore;
