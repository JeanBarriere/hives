<template>
  <container
    id="hive"
    loaded-on-mounted>
    <div class="hero bg-white">
      <div class="hero-inner">
        <div class="content content-full">
          <div class="py-30 text-center">
            <div class="display-3 text-warning">{{ code }}</div>
            <h1 class="h2 font-w700 mt-30 mb-10">Oops.. You just found an error page..</h1>
            <h2 class="h3 font-w400 text-muted mb-50">We are sorry but your request contains bad syntax and cannot be fulfilled..</h2>
            <router-link
              :to="{ name: 'home' }"
              class="btn btn-hero btn-rounded btn-alt-primary">
              <i class="fa fa-arrow-left mr-10"/> Back to home
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </container>
</template>

<script>
export default {
  name: 'HiveError',
  props: {
    code: {
      type: String,
      default: 'XXX'
    }
  }
}
</script>
