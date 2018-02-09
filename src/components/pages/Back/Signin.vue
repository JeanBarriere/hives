<template>
  <div id="front-auth">
    <p>This is Authentication in your workspace</p>
    <button type="button" @click="login">Login</button>
  </div>
</template>

<script>
export default {
  name: 'front-auth',
  methods: {
    login: function () {
      console.log('clicked')
    }
  }
}
</script>
