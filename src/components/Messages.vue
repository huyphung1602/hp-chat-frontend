<template>
  <div>
    <h1>Messages</h1>
    <div
      class="message"
      v-for="message in messages"
      :key="message.id"
    >
      <div
        class="message-owner"
        style="padding-bottom: 8px;"
      >
        {{ message.username }}
      </div>
      <div
        class="message-content"
      >
        {{ message.content }}
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { fetchMessages } from '@/api/messageApi.ts';

export default {
  name: 'Messages',
  setup() {
    const messages = ref([]);
    onMounted(async () => {
      const data = await fetchMessages();
      messages.value = data;
    });

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
  height: 48px;
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
