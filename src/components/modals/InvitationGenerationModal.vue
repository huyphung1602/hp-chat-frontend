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
      <div class="flex flex-row items-center justify-between">
        <input
          v-model="invitationUrl"
          readonly
          type="text"
          placeholder="Type your room name"
          class="p-1 text-sm font-normal w-full border rounded-md focus:outline-none focus:ring focus:border-blue-400"
        />
        <button
          class="rounded-md bg-gray-200 text-gray-500 hover:bg-gray-300 focus::bg-gray-400 focus:outline-none p-2 ml-2"
          type="button"
          @click="copyToClipBoard"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </button>
      </div>
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
      const copyToClipBoard = () => {
        navigator.clipboard.writeText(invitationUrl.value);
      };

      return {
        invitationUrl,
        copyToClipBoard,
        close,
      };
    }
  };
</script>
