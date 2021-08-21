<template>
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
</template>

<script>
import { ref, onMounted } from 'vue';
import { createConsumer } from '@rails/actioncable';
import { onBeforeRouteUpdate } from 'vue-router';
import { fetchMessages } from '@/api/roomApi.ts';

export default {
  name: 'Messages',
  props: ['id'],
  setup(props) {
    const messages = ref([]);
    const fetchMessagesApi = id => fetchMessages(id).then(data => messages.value = data);
    const consumer = createConsumer('ws://localhost:3000/cable');
    consumer.subscriptions.create({ channel: 'RoomChannel', room_id: props.id });

    onMounted(() => {
      fetchMessagesApi(props.id);
    }), 
    onBeforeRouteUpdate((to, from, next) => {
      fetchMessagesApi(to.params.id);
      next();
    })

    return {
      messages,
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
