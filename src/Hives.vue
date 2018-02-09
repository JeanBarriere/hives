<template>
  <div id="hives">
    <transition name="fade">
      <router-view  />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'hives'
}
</script>
