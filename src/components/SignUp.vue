<template>
  <div class="sign-up">
    <h1>Sign Up</h1>
    <span
      class="font-size-s text-danger"
      v-if="isError"
      style="padding-bottom: 12px"
    >
      Submit error. Please re-check your sign-up information.
    </span>
    <input
      class="sign-up-input font-size-s"
      v-model="name"
      placeholder="Your name"
    />
    <input
      class="sign-up-input font-size-s"
      v-model="email"
      placeholder="Your email"
    />
    <input
      class="sign-up-input font-size-s"
      v-model="password"
      placeholder="Your password"
    />
    <button
      class="sign-up-btn btn-primary btn-sm"
      @click.prevent="submit"
    >
      Submit
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SignUp',
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const isError = ref(false);

    const isValid = () => {
      if (name.value && email.value && password.value) {
        return true;
      }
      return false;
    }

    const submit = () => {
      if (!isValid()) {
        isError.value = true;
        return;
      }
    }

    console.log(name);

    return {
      name,
      email,
      password,
      isError,
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
