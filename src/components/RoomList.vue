<template>
  <div class="relative grid grid-cols-12 bg-gray-50 overflow-hidden">
    <div class="col-span-2 bg-indigo-50 h-screen">
      <div
        class="h-20 flex items-center justify-between border-b border-gray-200 px-4 shadow-sm"
      >
        <div class="font-bold text-center">
          {{ currentUser.name }}
        </div>
        <user-options />
      </div>
      <div class="overflow-y-auto h-full">
        <div
          class="border-b border-gray-200 py-2 px-4"
          :class="{'active-room shadow-inner': activeRoomId === room.id }"
          v-for="room in rooms"
          :key="room.id"
        >
          <div class="flex flex-row items-center justify-between">
            <div
              class="w-full cursor-pointer"
              @click.prevent="fetchRoomMessages(room.id)"
            >
              <div class="font-normal pb-1">
                {{ room.name }}
              </div>
              <div class="font-semibold">
                Owner: {{ room.owner.name }}
              </div>
            </div>
            <div
              class="cursor-pointer flex items-center justify-center text-gray-700 h-10 w-10"
              @click.prevent="openInvitationGenerationModal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <invitation-generation-modal
      v-show="showInvitationGenerationModal"
      @close="closeInvitationGenerationModal"
    />
    <div class="border-l col-span-10">
      <router-view />
    </div>
  </div>
</template>

<script>
import { each } from 'lodash';
import { onMounted, ref } from 'vue';
import consumer from '@/api/consumer.ts';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import UserOptions from './UserOptions.vue';
import InvitationGenerationModal from './modals/InvitationGenerationModal.vue';

export default {
  name: 'RoomList',
  components: {
    UserOptions,
    InvitationGenerationModal,
  },
  setup() {
    const rooms = ref([]);
    const activeRoomId = ref();
    const showInvitationGenerationModal = ref(false);

    const store = useStore()
    const router = useRouter();
    const currentUser = store.getters.currentUser;

    const subscribeWebSocket = room => consumer.subscriptions.create({ channel: 'RoomChannel', room_id: room.id }, {
      received(data) {
        store.commit('appendMessage', {
          roomId: room.id,
          message: data,
        });
      },
    });
    
    const fetchRoomMessages = roomId => {
      store.dispatch('fetchMessages', roomId);
      activeRoomId.value = roomId;
      router.push({ name: 'room', params: { id: roomId }});
    };

    onMounted(async () => {
      await store.dispatch('fetchRooms');
      rooms.value = store.getters.rooms;

      if (rooms.value.length > 0) {
        // Fetch default active room
        const defaultRoomId = rooms.value[0].id;
        activeRoomId.value = defaultRoomId;
        store.dispatch('fetchMessages', defaultRoomId);
        router.push({ name: 'room', params: { id: defaultRoomId }});
      }

      each(rooms.value, room => subscribeWebSocket(room));
    });

    const openInvitationGenerationModal = () => {
      showInvitationGenerationModal.value = true;
    }
    const closeInvitationGenerationModal = () => showInvitationGenerationModal.value = false;

    return {
      rooms,
      fetchRoomMessages,
      activeRoomId,
      currentUser,
      showInvitationGenerationModal,
      openInvitationGenerationModal,
      closeInvitationGenerationModal,
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