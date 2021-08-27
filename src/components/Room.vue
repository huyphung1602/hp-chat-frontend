<template>
  <div class="flex flex-col justify-between h-full">
    <div>
      <div
        class="message"
        v-for="message in messages"
        :key="message.id"
      >
        <div
          class="message-owner pb-2"
        >
          {{ message.owner }}
        </div>
        <div
          class="message-content"
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
      @keyup.enter="onEnter(newMessage)"
    />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { createMessage } from '@/api/messageApi.ts'

export default {
  name: 'Room',
  props: ['id'],
  setup(props) {
    const store = useStore();
    const fetchRoomMessages = roomId => store.dispatch('fetchMessages', roomId);
    onMounted(() => {
      fetchRoomMessages(props.id);
    })

    const onEnter = newMessage => {
      createMessage(newMessage, props.id);
    }

    return {
      messages: computed(() => store.getters.roomMessages(props.id)),
      onEnter,
    };
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/_variables.scss';

.message {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: auto;
  max-width: 400px;
  background: $color-white;
  margin: 10px;
  padding: 10px;
  border-radius: 2px;
  border: 1px solid $color-primary-light-2;
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.04);
  .message-owner {
    font-weight: $font-weight-bold;
  }
  .message-content {
    font-weight: $font-weight;
  }
}
</style>
