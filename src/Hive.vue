<template>
  <transition name="fade">
    <router-view />
  </transition>
</template>

<script>
export default {
  name: 'Hive'
}
</script>

<style lang="sass">
  @import "~@/assets/scss/main"
</style>
