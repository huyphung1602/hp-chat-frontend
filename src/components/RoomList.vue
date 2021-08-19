<template>
  <div>
    <h1>Rooms</h1>
    <div
      class="room"
      v-for="room in rooms"
      :key="room.id"
    >
      <div
        class="room-name"
        style="padding-bottom: 8px;"
      >
        Room: {{ room.name }}
      </div>
      <div
        class="room-owner"
      >
        Owner: {{ room.content }}
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

<style lang="scss" scoped>
@import 'src/assets/scss/_variables.scss';

.room {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 48px;
  max-width: 400px;
  background: $color-white;
  margin: 10px;
  padding: 10px;
  border-radius: 2px;
  border: 1px solid $color-primary-light-2;
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.04);
  .room-name {
    font-weight: $font-weight-bold;
  }
  .room-owner {
    font-weight: $font-weight;
  }
}
</style>
