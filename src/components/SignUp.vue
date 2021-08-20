<template>
  <div class="sign-up">
    <h1>Sign Up</h1>
    <span
      class="font-size-s text-danger pb-3"
      v-if="errMsg !== ''"
    >
      {{ errMsg }}
    </span>
    <input
      class="sign-up-input font-size-s"
      v-model="name"
      placeholder="Your name"
    />
    <input
      class="sign-up-input font-size-s"
      type="email"
      v-model="email"
      placeholder="Your email"
    />
    <input
      class="sign-up-input font-size-s"
      type="password"
      v-model="password"
      placeholder="Your password"
    />
    <button
      class="sign-up-btn btn-primary btn-sm mb-2"
      @click.prevent="submit"
    >
      Submit
    </button>
    <router-link
      to="/sign_in"
      @click.prevent=""
    >
    <span
      class="font-size-s text-primary"
    >
      Sign In
    </span>
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue';
import { createUser } from '@/api/userApi.ts';

export default {
  name: 'SignUp',
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
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
      errMsg.value = '';
      try {
        await createUser(name.value, email.value, password.value);
        window.location.replace('/');
      } catch (err) {
        errMsg.value = err.response.data.errors;
      }
    }

    return {
      name,
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

.sign-up {
  display: flex;
  flex-direction: column;
  align-items: center;
  .sign-up-input {
    height: 24px;
    min-width: 300px;
    margin: 0px 0px 12px 0px;
    padding: 8px;
    border-radius: 2px;
    border: 1px solid $color-primary-light-1;
    box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.04);
  }
  .sign-up-btn {
    min-width: 318px;
  }
}
</style>
