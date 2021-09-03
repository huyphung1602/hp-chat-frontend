<template>
  <body>
    <router-view />
  </body>
</template>

<script>

export default {
  name: 'App',
  setup() {
    document.title = import.meta.env.VITE_APP_TITLE;
  }
}
</script>
