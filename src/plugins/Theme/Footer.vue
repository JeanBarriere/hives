<template>
  <!-- Footer -->
  <footer
    id="page-footer"
    class="bg-white">
    <div class="content content-full">
      <!-- Footer Navigation -->
      <div
        v-if="navigation"
        class="row items-push-2x mt-30">
        <div class="col-6 col-md-4">
          <slot name="navigationLeft"/>
        </div>
        <div class="col-6 col-md-4">
          <slot name="navigationRight"/>
        </div>
        <div class="col-md-4">
          <slot name="company"/>
          <template v-if="newsletter">
            <h3 class="h5 font-w700">Our Newsletter</h3>
            <form @submit.prevent="">
              <div class="input-group">
                <input
                  id="ld-subscribe-email"
                  type="email"
                  class="form-control"
                  name="ld-subscribe-email"
                  placeholder="Your email..">
                <div class="input-group-append">
                  <button
                    type="submit"
                    class="btn btn-secondary">Subscribe</button>
                </div>
              </div>
            </form>
          </template>
        </div>
      </div>
      <!-- END Footer Navigation -->

      <!-- Copyright Info -->
      <div
        :class="{ 'border-t': navigation }"
        class="font-size-xs clearfix pt-20 pb-10">
        <div class="float-right">
          Crafted with <i class="fa fa-heart text-pulse"/> by <a
            :href="authorUrl"
            class="font-w600"
            target="_blank"
            v-text="authorName"/><i class="fa fa-2x fa-creative-commons ml-5"/><i class="fa fa-2x fa-heartbeat ml-5"/>
        </div>
        <div class="float-left">
          <router-link
            :to="{ path: '/' }"
            class="font-w600"
            v-text="name"/> &copy; <span v-text="new Date().getFullYear()"/>
        </div>
      </div>
      <!-- END Copyright Info -->
    </div>
  </footer>
  <!-- END Footer -->
</template>

<script>
export default {
  name: 'ThemeFooter',
  props: {
    name: {
      type: String,
      required: true
    },
    authorName: {
      type: String,
      required: true
    },
    authorUrl: {
      type: String,
      required: true
    },
    newsletter: {
      type: Boolean,
      default: false
    },
    navigation: {
      type: Boolean,
      default: false
    }
  }
}
</script>
