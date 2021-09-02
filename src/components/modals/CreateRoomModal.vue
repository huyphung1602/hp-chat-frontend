<template>
  <modal
    @close="close"
    @resolve="resolve"
  >
    <template v-slot:header>
      <div class="font-semibold text-md text-gray-800">
        Create new chat room
      </div>
    </template>
    <template v-slot:body>
      <input
        v-model="roomName"
        type="text"
        placeholder="Type your room name"
        class="p-1 text-sm font-normal w-full border rounded-md focus:outline-none focus:ring focus:border-blue-400"
        @keyup.enter="onEnter()"
      />
    </template>
  </modal>
</template>

<script>
  import { ref } from 'vue';
  import { createRoom } from '@/api/roomApi.ts';
  import { useStore } from 'vuex';

  import Modal from '../Modal.vue';

  export default {
    name: 'CreateRoomModal',
    components: {
      Modal,
    },
    emits: ['close', 'resolve'],
    setup(props, { emit }) {
      const roomName = ref('');
      const store = useStore();

      const close = () => emit('close');
      const resolve = async () => {
        try {
          const newRoom = await createRoom({ name: roomName.value });
          store.commit('appendRoom', newRoom);
          roomName.value = '';
          emit('resolve');
        } catch (error) {
          console.log(error);
        }
      };
      const onEnter = () => resolve();

      return {
        roomName,
        close,
        resolve,
        onEnter,
      };
    }
  };
</script>
