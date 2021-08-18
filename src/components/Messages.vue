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
        {{ message.owner_name }}
      </div>
      <div
        class="message-body"
      >
        {{ message.body }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      messages: [
        { id: 1, owner_name: 'Huy Phung', body: 'Nuoc mat em lau bang tinh yeu moi' },
        { id: 2, owner_name: 'Huy Phung', body: 'Ngay mai em di' },
        { id: 3, owner_name: 'Huy Phung', body: 'Co dieu gi sao khong noi cung anh?' },
      ]
    }
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
  .message-body {
    font-weight: $font-weight;
  }

}
</style>
