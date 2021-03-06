<template>
  <div class="flex flex-col h-screen">
    <div
      class="h-20 flex-shrink-0 flex items-center justify-start border-b border-gray-200 px-10 shadow-sm"
    >
      <div class="font-bold">
        {{ room.name }}
      </div>
    </div>
    <div class="overflow-y-scroll h-full">
      <div class="m-4 mx-10">
        <div
          v-for="message in messages"
          :key="message.id"
        >
          <div
            v-if="message.owner.id !== message.previousOwnerId"
            class="font-bold pt-4"
          >
            {{ message.owner.name }}
          </div>
          <div
            class="font-normal text-justify"
          >
            {{ message.content }}
          </div>
        </div>
      </div>
    </div>
    <input
      v-model="newMessage"
      type="text"
      placeholder="Type your message"
      class="m-4 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
      @keyup.enter="onEnter()"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { createMessage } from '@/api/messageApi.ts'

export default {
  name: 'Room',
  props: ['id'],
  setup(props) {
    const store = useStore();
    const newMessage = ref('');
    const currentUser = store.getters.currentUser;
    const roomId = computed(() => parseInt(props.id));

    const onEnter = () => {
      createMessage(newMessage.value, roomId.value);
      newMessage.value = '';
    }

    return {
      messages: computed(() => store.getters.roomMessages(roomId.value)),
      room: computed(() => store.getters.roomById(roomId.value)),
      onEnter,
      newMessage,
      currentUser,
    };
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/_variables.scss';

.message {
  height: auto;
  max-width: 700px;
  margin: 10px;
  padding: 10px;
  .owner-message {
    position: absolute;
    right: 0px;
  }
  .non-owner-message {
    position: absolute;
    left: 0px;
  }
}
</style>
