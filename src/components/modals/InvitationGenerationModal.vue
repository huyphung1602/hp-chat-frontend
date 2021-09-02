<template>
  <modal
    @close="close"
  >
    <template v-slot:header>
      <div class="font-semibold text-md text-gray-800">
        Send this url to your friends
      </div>
    </template>
    <template v-slot:body>
      <input
        v-model="invitationUrl"
        readonly
        type="text"
        placeholder="Type your room name"
        class="p-1 text-sm font-normal w-full border rounded-md focus:outline-none focus:ring focus:border-blue-400"
      />
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
  import { computed } from 'vue';

  import Modal from '../Modal.vue';

  export default {
    name: 'InvitationGenerationModal',
    components: {
      Modal,
    },
    props: {
      invitationUrl: {
        type: String,
        default: '',
      },
    },
    emits: ['close'],
    setup(props, { emit }) {
      const close = () => emit('close');
      const invitationUrl = computed(() => props.invitationUrl);

      return {
        invitationUrl,
        close,
      };
    }
  };
</script>
