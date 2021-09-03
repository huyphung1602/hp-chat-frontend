<template>
  <div>
    <h1>Invitation</h1>
  </div>
</template>

<script>
  import { get } from 'lodash';
  import { onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import { acceptInvitation } from '@/api/invitationApi.ts';

  export default {
    name: 'Invitation',
    setup() {
      const route = useRoute();
      const router = useRouter();
      const store = useStore();

      const code = get(route.query, 'code', '');
      const id = get(route.query, 'id', '');
      store.dispatch('setInvitation', { code, id });

      onMounted(async () => {
        const isLoggedIn = store.getters.isLoggedIn;
        console.log(isLoggedIn);

        if (isLoggedIn) {
          const data = await acceptInvitation({code, id});
          if (data.room_id) {
            store.commit('setActiveRoomId', data.room_id);
            router.push({path: '/'});
          }
        } else {
          router.push({path: '/sign_in'});
        }
      });
    }
  };
</script>
