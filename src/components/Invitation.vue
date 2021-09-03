<template>
  <div>
    <h1>Invitation</h1>
  </div>
</template>

<script>
  import { get } from 'lodash';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from 'vuex';

  export default {
    name: 'Invitation',
    setup() {
      const route = useRoute();
      const router = useRouter();
      const store = useStore();
      const code = get(route.query, 'code', '');
      const id = get(route.query, 'id', '');
      store.dispatch('setInvitation', { code, id });

      const isLoggedIn = store.getters.isLoggedIn;
      if (isLoggedIn) {
        router.push({path: '/'});
      } else {
        router.push({path: '/sign_in'});
      }
    }
  };
</script>
