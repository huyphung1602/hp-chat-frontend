<template>
  <div class="relative grid grid-cols-12 bg-gray-50 overflow-hidden">
    <div class="col-span-2 bg-indigo-50 h-screen">
      <div
        class="h-20 flex items-center justify-between border-b border-gray-200 px-4 shadow-sm"
      >
        <div class="font-bold text-center">
          {{ currentUser.name }}
        </div>
        <user-options />
      </div>
      <div class="overflow-y-auto h-full">
        <div
          class="border-b border-gray-200 py-2 px-4 cursor-pointer"
          :class="{'active-room shadow': activeRoomId === room.id }"
          v-for="room in rooms"
          :key="room.id"
          @click.prevent="fetchRoomMessages(room.id)"
        >
          <div class="font-normal pb-1">
            {{ room.name }}
          </div>
          <div class="font-semibold">
            Owner: {{ room.owner.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="border-l col-span-10">
      <router-view />
    </div>
  </div>
</template>

<script>
import { each } from 'lodash';
import { onMounted, ref } from 'vue';
import consumer from '@/api/consumer.ts';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import UserOptions from './UserOptions.vue';

export default {
  name: 'RoomList',
  components: {
    UserOptions,
  },
  setup() {
    const rooms = ref([]);
    const activeRoomId = ref();

    const store = useStore()
    const router = useRouter();
    const currentUser = store.getters.currentUser;

    const subscribeWebSocket = room => consumer.subscriptions.create({ channel: 'RoomChannel', room_id: room.id }, {
      received(data) {
        store.commit('appendMessage', {
          roomId: room.id,
          message: data,
        });
      },
    });
    
    const fetchRoomMessages = roomId => {
      store.dispatch('fetchMessages', roomId);
      activeRoomId.value = roomId;
      router.push({ name: 'room', params: { id: roomId }});
    };

    onMounted(async () => {
      await store.dispatch('fetchRooms');
      rooms.value = store.getters.rooms;

      if (rooms.value.length > 0) {
        // Fetch default active room
        const defaultRoomId = rooms.value[0].id;
        activeRoomId.value = defaultRoomId;
        store.dispatch('fetchMessages', defaultRoomId);
        router.push({ name: 'room', params: { id: defaultRoomId }});
      }

      each(rooms.value, room => subscribeWebSocket(room));
    });

    return {
      rooms,
      fetchRoomMessages,
      activeRoomId,
      currentUser,
    };
  }
}
</script>

<style lang="scss" scoped>
  .active-room {
    --tw-border-opacity: 1;
    border-left: 4px solid rgba(67, 56, 202, var(--tw-border-opacity));
  }
</style>