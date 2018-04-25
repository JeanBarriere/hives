<template>
  <b-container
    id="back-auth-logout"
    class="content content-full">
    <b-row align-h="center">
      <b-col
        cols="12"
        md="8"
        lg="6">
        <block
          bordered
          rounded>
          <template slot="content">
            <h3 class="font-w300 text-center mb-0 py-20 text-muted">
              <i class="si si-settings d-inline-block fa-spin mr-10"/>Logging you out...
            </h3>
          </template>
        </block>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'BackAuthLogout',
  mounted: function () {
    this.$container.header({display: true, fixed: false, modern: false, inverse: false, glass: false})
    this.perform()
  },
  methods: {
    ...mapActions(['logout']),
    perform: function () {
      this.logout().then((res) => {
        this.$router.push({ name: 'signin' })
      })
    }
  }
}
</script>
