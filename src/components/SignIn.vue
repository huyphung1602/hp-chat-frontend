<template>
  <div class="flex items-center justify-center h-screen">
    <div class="sign-in-form flex flex-col border rounded shadow-md p-10">
      <div class="text-4xl font-bold text-left text-indigo-700 pb-2">
        Sign In
      </div>
      <span
        class="text-base text-red-600 pb-4"
        v-if="errMsg !== ''"
      >
        {{ errMsg }}
      </span>
      <input
        class="p-2 my-5 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
        type="email"
        v-model="email"
        placeholder="Your email"
      />
      <input
        class="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
        type="password"
        v-model="password"
        placeholder="Your password"
        @keyup.enter="submit"
      />
      <button
        class="rounded-md bg-indigo-600 font-extrabold text-white hover:bg-indigo-900 focus::bg-indigo-900 focus:outline-none p-2 mt-6 mb-4"
        @click.prevent="submit"
      >
        Login
      </button>
        <button
          class="rounded-md bg-green-600 font-extrabold text-white hover:bg-green-900 focus::bg-green-900 focus:outline-none p-2"
          @click.prevent="goToSignUp"
        >
          Sign Up
        </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { createSession } from '@/api/sessionApi.ts';
import { useRouter } from 'vue-router';

export default {
  name: 'SignIn',
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const errMsg = ref('');

    const isValid = () => {
      if (email.value && password.value) {
        return true;
      }
      return false;
    }

    const submit = async () => {
      if (!isValid()) {
        errMsg.value = 'Fields are required';
        return;
      }
      errMsg.value = '';
      try {
        await createSession(email.value, password.value);
        window.location.replace('/');
      } catch (err) {
        errMsg.value = err.response.data.errors;
      }
    }

    const goToSignUp = () => {
      router.push({ path: '/sign_up' });
    }

    return {
      email,
      password,
      errMsg,
      submit,
      goToSignUp,
    }
  }
}
</script>
