<template>
  <div v-if="true">
    <sign-up />
  </div>
  <div v-else>
    <div
      id="nav"
    >
        <router-link to="/">Home</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import SignUp from '@/components/SignUp.vue';

export default {
  name: 'App',
  components: {
    SignUp,
  }
}
</script>
