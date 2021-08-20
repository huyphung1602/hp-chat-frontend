<template>
  <div class="container mx-auto flex-col mt-20">
    <p class="text-4xl">Rooms</p>
    <div
      class="box-border h-auto max-w-md p-2 border-4 my-4"
      v-for="room in rooms"
      :key="room.id"
    >
      <div
        class="room-name pb-2"
      >
        Room: {{ room.name }}
      </div>
      <div
        class="room-owner"
      >
        Owner: {{ room.owner }}
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { fetchRooms } from '@/api/roomApi.ts';

export default {
  name: 'RoomList',
  setup() {
    const rooms = ref([]);
    onMounted(async () => {
      const data = await fetchRooms();
      rooms.value = data;
    });

    return {
      rooms,
    };
  }
}
</script>
