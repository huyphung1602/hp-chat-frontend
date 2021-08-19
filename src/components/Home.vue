<template>
  <router-view />
</template>

<script>
import { onMounted } from 'vue';
import Messages from './Messages.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Home',
  components: {
    Messages,
  },
  setup () {
    const router = useRouter();
    const isLoggedIn = () => {
      if ('user' in localStorage) {
        router.push('/messages');
        return;
      }
      router.push('/sign_in');
    }

    onMounted(() => {
      isLoggedIn();
    });
  },
}
</script>
