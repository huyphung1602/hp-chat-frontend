<template>
  <div v-if="isLoggedIn()">
    <div
      id="nav"
    >
        <router-link to="/">Home</router-link>
    </div>
    <router-view />
  </div>
  <div v-else>
    <sign-up />
  </div>
</template>

<script>
import SignUp from '@/components/SignUp.vue';

export default {
  name: 'App',
  components: {
    SignUp,
  },
  setup() {
    const isLoggedIn = () => {
      if ('user' in localStorage) {
        return true;
      }
      return false;
    }

    return {
      isLoggedIn,
    }
  }
}
</script>
