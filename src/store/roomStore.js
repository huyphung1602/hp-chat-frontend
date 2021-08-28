import { map } from 'lodash'; 
import { fetchMessages as fetchMessagesApi } from '@/api/roomApi.ts';

const roomStore = {
  state: () => ({
    rooms: {},
  }),
  mutations: {
    fetchMessages (state, { roomId, messages }) {
      state.rooms[`${roomId}`] = messages;
    },
    appendMessage (state, { roomId, message }) {
      state.rooms[`${roomId}`].push(message);
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
      const messages = state.rooms[`${roomId}`] || [];
      let previousOwnerId;
      return map(messages, message => {
        const newMessage = {
          id: message.id,
          content: message.content,
          owner: message.owner,
          roomId: message.room_id,
          previousOwnerId,
        }
        previousOwnerId = message.owner.id;
        return newMessage;
      })
    }
  },
}

export default roomStore;
