<template>
  <div id="front-auth">
    <p>Go to your workspace from here</p>
    <button type="button" class="btn btn-primary mr-5 mb-5" @click="goToSub">Continue <i class="material-icons ml-15">arrow_forward</i></button>
  </div>
</template>

<script>
export default {
  name: 'front-auth',
  methods: {
    goToSub: function () {
      window.location.href = '//sub.' + window.location.host
    }
  }
}
</script>
