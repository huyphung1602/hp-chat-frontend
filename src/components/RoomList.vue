<template>
  <div class="container mx-auto px-0">
    <div class="grid grid-cols-12 gap-4 h-screen p-10">
      <div class="col-span-4">
        <div
          class="border border-gray-200 shadow-sm rounded-md p-2 mb-5"
          v-for="room in rooms"
          :key="room.id"
          @click.prevent="fetchRoomMessages(room.id)"
        >
          <router-link :to="{ name: 'room', params: { id: room.id } }">
            <div class="font-normal pb-2">
              Room: {{ room.name }}
            </div>
            <div class="font-semibold">
              Owner: {{ room.owner }}
            </div>
          </router-link>
        </div>
      </div>
      <div class="col-span-8">
        <div
          class="border border-gray-200 shadow-sm rounded-md h-full"
        >
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { each } from 'lodash';
import { onMounted, ref } from 'vue';
import consumer from '@/api/consumer.ts';
import { fetchRooms } from '@/api/roomApi.ts';
import { useStore } from 'vuex'

export default {
  name: 'RoomList',
  setup() {
    const rooms = ref([]);
    const subscribeWebSocket = room => consumer.subscriptions.create({ channel: 'RoomChannel', room_id: room.id }, {
      received(data) {
        console.log(data);
        store.commit('appendMessage', {
          roomId: room.id,
          message: data,
        });
      },
    });
    
    const store = useStore()
    const fetchRoomMessages = roomId => store.dispatch('fetchMessages', roomId);

    onMounted(async () => {
      const data = await fetchRooms();
      rooms.value = data;
      each(data, room => subscribeWebSocket(room));
    });

    return {
      rooms,
      fetchRoomMessages,
    };
  }
}
</script>
