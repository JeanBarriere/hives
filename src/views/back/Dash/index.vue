<template>
  <div id="back-dash">
    <div class="content content-full">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackDash',
  mounted: function () {
    this.$container.sidebar({ display: true, open: true })
    this.$container.header({ display: true, fixed: false, modern: false, inverse: false, glass: false, logo: false })
    this.$container.content({ boxed: false, narrow: true })
  },
  beforeDestroy: function () {
    this.$container.sidebar({ display: false, open: false })
    this.$container.header({ logo: true })
    this.$container.content({ boxed: true, narrow: false })
  }
}
</script>

<style lang="sass">
  .pac-container
    z-index: 1060
  .vue-map-container
    width: 100%
    height: 100%
    border: 1px solid #dcdfe3
    border-radius: 0.25rem
    overflow: hidden
    &.medium
      height: 300px
    &.large
      height: 400px
    &.screen
      height: calc(100vh - 237px)
</style>
