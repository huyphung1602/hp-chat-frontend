import { fetchMessages as fetchMessagesApi } from '@/api/roomApi.ts';

const roomStore = {
  state: () => ({
    rooms: {},
  }),
  mutations: {
    fetchMessages (state, { roomId, messages }) {
      state.rooms[`${roomId}`] = messages;
    }
  },
  actions: {
    async fetchMessages ({ commit, state }, roomId) {
      if (!state.rooms[`${roomId}`]) {
        commit('fetchMessages', {
          roomId,
          messages: await fetchMessagesApi(roomId),
        });
      }
    }
  },
  getters: {
    roomMessages: (state) => (roomId) =>  {
      return state.rooms[`${roomId}`] || [];
    }
  },
}

export default roomStore;
