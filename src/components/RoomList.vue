<template>
  <div class="container mx-auto px-0">
    <div class="grid grid-cols-12 gap-4 h-screen p-10">
      <div class="col-span-4">
        <div
          class="box-border p-2 border-4 my-4"
          v-for="room in rooms"
          :key="room.id"
        >
          <router-link :to="{ name: 'messages', params: { id: room.id } }">
            <div class="room-name pb-2">
              Room: {{ room.name }}
            </div>
            <div class="room-owner">
              Owner: {{ room.owner }}
            </div>
          </router-link>
        </div>
      </div>
      <div class="col-span-8">
        <div
          class="box-border border-4 h-full my-4"
        >
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createConsumer } from '@rails/actioncable';
import { each } from 'lodash';
import { onMounted, ref } from 'vue';
import { fetchRooms } from '@/api/roomApi.ts';

export default {
  name: 'RoomList',
  setup() {
    const rooms = ref([]);
    const consumer = createConsumer('ws://localhost:3000/cable');
    onMounted(async () => {
      const data = await fetchRooms();
      rooms.value = data;
      each(data, room => consumer.subscriptions.create({ channel: 'RoomChannel', room_id: room.id }))
    });

    return {
      rooms,
    };
  }
}
</script>
