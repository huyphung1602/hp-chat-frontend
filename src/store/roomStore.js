import { map } from 'lodash';
import { fetchMessages as fetchMessagesApi } from '@/api/roomApi.ts';
import { fetchRooms as fetchRoomsApi } from '@/api/roomApi.ts';

const roomStore = {
  state: () => ({
    messages: {},
    rooms: [],
  }),

  mutations: {
    fetchMessages (state, { roomId, messages }) {
      state.messages[`${roomId}`] = messages;
    },
    appendMessage (state, { roomId, message }) {
      state.messages[`${roomId}`].push(message);
    },

    fetchRooms (state, rooms) {
      state.rooms = rooms;
    },
    appendRoom (state, room ) {
      state.rooms.push(room);
    }
  },

  actions: {
    async fetchMessages ({ commit, state }, roomId) {
      if (!state.messages[`${roomId}`]) {
        commit('fetchMessages', {
          roomId,
          messages: await fetchMessagesApi(roomId),
        });
      }
    },
    async fetchRooms ({ commit, state }) {
      if (state.rooms.length <= 0) {
        commit('fetchRooms', await fetchRoomsApi());
      }
    },
  },

  getters: {
    roomMessages: (state) => (roomId) =>  {
      const messages = state.messages[`${roomId}`] || [];
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
    },
    rooms (state) {
      return state.rooms;
    },
    roomById: (state) => (roomId) => {
      const room = state.rooms.filter(room => room.id === roomId)[0]
      return !!room ? room : {};
    }
  },
}

export default roomStore;
