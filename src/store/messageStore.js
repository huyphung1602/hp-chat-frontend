import { fetchMessages as fetchMessagesApi } from '@/api/roomApi.ts';

const messageStore = {
  state: () => ({
    messages: [],
  }),
  mutations: {
    fetchMessages (state, newMessages) {
      state.messages = newMessages;
    }
  },
  actions: {
    async fetchMessages ({ commit }, roomId) {
      commit('fetchMessages', await fetchMessagesApi(roomId));
    }
  },
  getters: {
    roomMessages (state, roomId) {
      return state.messages.filter(message => message.roomId === roomId);
    }
  },
}

export default messageStore;
