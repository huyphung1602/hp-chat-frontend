<template>
  <div class="flex flex-col justify-between h-full">
    <div class="m-4 mx-10">
      <div
        v-for="message in messages"
        :key="message.id"
      >
        <div
          v-if="message.owner.id !== message.previousOwnerId"
          class="font-bold pt-4 pb-2"
        >
          {{ message.owner.name }}
        </div>
        <div
          class="font-normal text-justify pb-2"
        >
          {{ message.content }}
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
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { createMessage } from '@/api/messageApi.ts'

export default {
  name: 'Room',
  props: ['id'],
  setup(props) {
    const store = useStore();
    const newMessage = ref('');
    const currentUser = store.getters.currentUser;
    const fetchRoomMessages = roomId => store.dispatch('fetchMessages', roomId);
    onMounted(() => {
      fetchRoomMessages(props.id);
    })

    const onEnter = () => {
      createMessage(newMessage.value, props.id);
      newMessage.value = '';
    }

    return {
      messages: computed(() => store.getters.roomMessages(props.id)),
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
