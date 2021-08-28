<template>
  <div class="grid grid-cols-12 bg-gray-50 h-screen overflow-hidden">
    <div class="col-span-2">
      <div
        class="border border-gray-200 py-2 px-4 cursor-pointer"
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
    <div class="col-span-10">
      <div
        class="border border-gray-200"
      >
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { each } from 'lodash';
import { onMounted, ref } from 'vue';
import consumer from '@/api/consumer.ts';
import { fetchRooms } from '@/api/roomApi.ts';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'RoomList',
  setup() {
    const rooms = ref([]);
    const activeRoomId = ref();
    const router = useRouter();

    const subscribeWebSocket = room => consumer.subscriptions.create({ channel: 'RoomChannel', room_id: room.id }, {
      received(data) {
        store.commit('appendMessage', {
          roomId: room.id,
          message: data,
        });
      },
    });
    
    const store = useStore()
    const fetchRoomMessages = roomId => {
      store.dispatch('fetchMessages', roomId);
      activeRoomId.value = roomId;
      router.push({ name: 'room', params: { id: roomId }});
    };

    onMounted(async () => {
      const data = await fetchRooms();
      rooms.value = data;

      if (data.length !== 0) {
        // Fetch default active room
        const defaultRoomId = data[0].id;
        activeRoomId.value = defaultRoomId;
        store.dispatch('fetchMessages', defaultRoomId);
        router.push({ name: 'room', params: { id: defaultRoomId }});
      }

      each(data, room => subscribeWebSocket(room));
    });

    return {
      rooms,
      fetchRoomMessages,
      activeRoomId,
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