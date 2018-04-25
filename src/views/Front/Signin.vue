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
          :options="[{ tag: 'button', icon: 'question', call: help }, { tag: 'button', icon: 'plus', call: newWorkspace }]"
          bordered
          rounded
          header
          theme="primary">
          <template slot="header">Sign in to your workspace</template>
          <template slot="content">
            <p>Enter your workspace's URL to access it:</p>
            <div class="d-flex flex-row justify-content-end align-items-center mb-20 mt-10">
              <label
                class="sr-only"
                for="workspace">Name</label>
              <b-input
                id="workspace"
                v-model="workspace"
                size="lg"
                class="text-right mr-5"
                placeholder="your-workspace" />
              <span class="font-size-lg">.{{ hostname }}</span>
            </div>
            <div class="text-center mx-auto">
              <b-button
                variant="alt-primary"
                size="lg"
                @click="redirect">Continue<i class="fa fa-arrow-right ml-15"/></b-button>
            </div>
          </template>
        </block>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'FrontAuth',
  data: () => ({
    workspace: '',
    hostname: window.location.host
  }),
  mounted: function () {
    this.$container.header({display: true, fixed: false, modern: false, inverse: false, glass: false})
  },
  methods: {
    redirect: function () {
      window.location.href = '//' + this.workspace + '.' + window.location.host + '/' + window.location.hash
    },
    newWorkspace: function () {
      console.log('TODO: redirect to new workspace')
      this.$router.push('/signup')
    },
    help: function () {
      console.log('TODO: help the user')
      this.$router.push('/help')
    }
  }
}
</script>
