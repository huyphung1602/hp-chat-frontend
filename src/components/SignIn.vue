<template>
  <div class="sign-in">
    <h1>Sign In</h1>
    <span
      class="font-size-s text-danger"
      v-if="errMsg !== ''"
      style="padding-bottom: 12px"
    >
      {{ errMsg }}
    </span>
    <input
      class="sign-in-input font-size-s"
      type="email"
      v-model="email"
      placeholder="Your email"
    />
    <input
      class="sign-in-input font-size-s"
      type="password"
      v-model="password"
      placeholder="Your password"
    />
    <button
      class="sign-in-btn btn-primary btn-sm"
      @click.prevent="submit"
    >
      Login
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { createSession } from '@/api/sessionApi.ts';

export default {
  name: 'SignIn',
  setup() {
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
        window.location.replace('/rooms');
      } catch (err) {
        errMsg.value = err.response.data.errors;
      }
    }

    return {
      email,
      password,
      errMsg,
      submit,
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/_variables.scss';

.sign-in {
  display: flex;
  flex-direction: column;
  align-items: center;
  .sign-in-input {
    height: 24px;
    min-width: 300px;
    margin: 0px 0px 12px 0px;
    padding: 8px;
    border-radius: 2px;
    border: 1px solid $color-primary-light-1;
    box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.04);
  }
  .sign-in-btn {
    min-width: 318px;
  }
}
</style>
