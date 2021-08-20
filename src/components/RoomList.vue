<template>
  <div class="container mx-auto px-6">
    <div class="grid grid-cols-12 gap-4 h-screen p-10">
      <div class="col-span-4">
        <div
          class="box-border p-2 border-4 my-4"
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
      <div class="col-span-8">
        <div
          class="box-border h-full my-4"
        >
          <router-view />
        </div>
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
