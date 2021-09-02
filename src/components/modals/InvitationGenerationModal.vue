<template>
  <modal
    @close="close"
  >
    <template v-slot:header>
      <div class="font-normal text-sm text-gray-800">
        Invitation Link
      </div>
    </template>
    <template v-slot:body>
      <p>Link will be generated here</p>
    </template>
    <template v-slot:footer>
      <button
        class="rounded-md bg-gray-200 font-normal text-sm text-gray-500 hover:bg-gray-300 focus::bg-gray-400 focus:outline-none p-2"
        type="button"
        @click="close"
        aria-label="Close modal"
      >
        Cancel
      </button>
    </template>
  </modal>
</template>

<script>
  import { ref } from 'vue';

  import Modal from '../Modal.vue';

  export default {
    name: 'InvitationGenerationModal',
    components: {
      Modal,
    },
    emits: ['close'],
    setup(props, { emit }) {
      const roomName = ref('');
      const close = () => emit('close');
      return {
        roomName,
        close,
      };
    }
  };
</script>
