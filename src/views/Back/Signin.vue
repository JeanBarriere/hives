<template>
  <b-container
    id="back-auth-signin"
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
          theme="gd-aqua">
          <template slot="header">Sign in to {{ $workspace }}</template>
          <template slot="content">
            <p>Enter your identifiers to log into your workspace:</p>
            <b-input-group>
              <b-input
                id="email"
                v-model="email"
                type="email"
                size="lg"
                class="mr-5"
                placeholder="Email" />
              <b-input
                id="password"
                v-model="password"
                type="password"
                size="lg"
                class="mr-5"
                placeholder="Password" />
            </b-input-group>
            <div class="text-center mx-auto mt-20">
              <b-button
                variant="alt-primary"
                size="lg"
                @click="signin">Sign in</b-button>
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
  name: 'BackAuthSignin',
  data: () => ({
    email: '',
    password: ''
  }),
  mounted: function () {
    this.$container.header({display: true, fixed: false, modern: false, inverse: false, glass: false})
  },
  methods: {
    ...mapActions(['login']),
    signin: function () {
      this.$refs.signin.refresh(() => {
        return new Promise(resolve => {
          this.login().then((res) => {
            console.log(res)
            resolve()
            this.$router.push({ path: this.$route.query.redirect || '/' })
          }).catch((err) => {
            resolve()
            console.log(err)
          })
        })
      })
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
