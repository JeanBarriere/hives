<template>
  <b-container
    id="front-auth"
    class="content content-full">
    <b-row align-h="center">
      <b-col
        cols="12"
        md="8"
        lg="6">
        <block
          ref="signin"
          :options="[{ tag: 'button', icon: 'question', call: help }]"
          bordered
          rounded
          header
          theme="primary">
          <template slot="header">Sign in to your workspace</template>
          <template slot="content">
            <p>Enter your workspace's name to access it:</p>
            <b-form-group
              label="Name:"
              label-for="form-name">
              <b-input-group :append="`.${hostname}`">
                <b-form-input
                  id="form-name"
                  v-model.lazy="workspace"
                  class="text-right"
                  required
                  placeholder="your-workspace"
                  @change="checkWorkspace" />
              </b-input-group>
            </b-form-group>
            <div class="text-center mx-auto">
              <b-button
                :disabled="btnLoad"
                variant="alt-primary"
                size="lg"
                @click="redirect">
                {{ btnLoad ? 'Searching...' : exists ? 'Continue' : 'Create' }}
                <i
                  :class="{ 'fa-spinner': btnLoad, 'fa-spin': btnLoad, 'fa-arrow-right': !btnLoad }"
                  class="fa ml-15" />
              </b-button>
            </div>
          </template>
        </block>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FrontAuth',
  data: () => ({
    btnLoad: false,
    exists: false,
    hostname: window.location.host,
    workspace: ''
  }),
  mounted: function () {
    this.$container.header({display: true, fixed: false, modern: false, inverse: false, glass: false})
  },
  methods: {
    ...mapActions(['workspaceExists']),
    redirect: function () {
      if (!this.btnLoad && this.workspace.trim().length > 0) {
        window.location.href = '//' + this.workspace + '.' + window.location.host + '/' + window.location.hash
      }
    },
    checkWorkspace: function () {
      if (!this.btnLoad) {
        this.btnLoad = true
        this.workspaceExists(this.workspace).then(() => {
          this.exists = true
          this.btnLoad = false
        }).catch(() => {
          this.exists = false
          this.btnLoad = false
        })
      }
    },
    help: function () {
      console.log('TODO: help the user')
      this.$router.push('/help')
    }
  }
}
</script>
