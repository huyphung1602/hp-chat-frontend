<template>
  <div v-if="isLoggedIn()">
    <room-list />
  </div>
  <div v-show="!isLoggedIn()">
    <div class="navigation">
      <router-link
        to="/sign_in"
        @click.prevent=""
      >
      <span
        class="font-size-s text-primary navigation-item"
      >
        Sign In
      </span>
      </router-link>
      <router-link
        to="/sign_up"
        @click.prevent=""
      >
      <span
        class="font-size-s text-primary navigation-item"
      >
        Sign Up
      </span>
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import RoomList from './RoomList.vue';

export default {
  name: 'Home',
  components: {
    RoomList,
  },
  setup () {
    const isLoggedIn = () => {
      if ('user' in localStorage) {
        return true;
      }
      return false;
    }
    return {
      isLoggedIn,
    }
  },
}
</script>
<style lang="scss" scoped>
@import 'src/assets/scss/_variables.scss';

.navigation {
  display: flex;
  flex-direction: row;
  align-items: center;
  .navigation-item {
    margin: 20px;
  }
}
</style>