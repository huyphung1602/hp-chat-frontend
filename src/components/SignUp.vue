<template>
  <div class="flex items-center justify-center h-screen">
    <div class="sign-up-form flex flex-col border rounded shadow-md p-10">
      <div class="text-4xl font-bold text-left text-green-600 pb-2">
        Sign Up
      </div>
      <span
        class="text-base text-red-600 pb-4"
        v-if="errMsg !== ''"
      >
        {{ errMsg }}
      </span>
      <input
        class="p-2 my-5 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
        v-model="name"
        placeholder="Your name"
      />
      <input
        class="p-2 mb-5 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
        type="email"
        v-model="email"
        placeholder="Your email"
      />
      <input
        class="p-2 mb-5 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
        type="password"
        v-model="password"
        placeholder="Your password"
      />
      <input
        class="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
        type="password"
        v-model="confirmPassword"
        placeholder="Your password"
      />
      <button
        class="rounded-md bg-green-600 font-extrabold text-white hover:bg-green-900 focus::bg-green-900 focus:outline-none p-2 mt-8 mb-5"
        @click.prevent="submit"
      >
        Sign Up
      </button>
        <button
          class="rounded-md bg-indigo-600 font-extrabold text-white hover:bg-indigo-900 focus::bg-indigo-900 focus:outline-none p-2"
          @click.prevent="goToSignIn"
        >
          Sign In
        </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { createUser } from '@/api/userApi.ts';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { acceptInvitation } from '@/services/invitationService.ts';

export default {
  name: 'SignUp',
  setup() {
    const store = useStore();
    const router = useRouter();
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const errMsg = ref('');

    const isValid = () => {
      if (name.value && email.value && password.value) {
        return true;
      }
      return false;
    }

    const submit = async () => {
      if (!isValid()) {
        errMsg.value = 'Fields are required';
        return;
      }
      if (password.value !== confirmPassword.value) {
        errMsg.value = 'Passwords must be same';
        return;
      }
      errMsg.value = '';
      try {
        await createUser(name.value, email.value, password.value);
        await acceptInvitation(store);
        router.push({ path: '/' });
      } catch (err) {
        errMsg.value = err.response.data.errors;
      }
    }

    const goToSignIn = () => {
      router.push({ path: '/sign_in' });
    }

    return {
      name,
      email,
      password,
      confirmPassword,
      errMsg,
      submit,
      goToSignIn,
    }
  }
}
</script>
