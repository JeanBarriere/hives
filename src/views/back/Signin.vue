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
          <template slot="header">{{ isExistingWorkspace ? 'Sign in to' : 'Create' }} {{ getWorkspaceName }}'s workspace</template>
          <template slot="content">
            <b-alert
              :show="failed"
              dismissible
              variant="danger"
              @dismissed="failed = false">Invalid credentials</b-alert>
            <b-form @submit.prevent="onSubmit">
              <b-form-group
                v-if="!isExistingWorkspace"
                label="Full name:"
                label-for="form-name">
                <b-form-input
                  id="form-name"
                  v-model="name"
                  required
                  placeholder="John Smith" />
              </b-form-group>
              <b-form-group
                label="Email address:"
                label-for="form-email">
                <b-form-input
                  id="form-email"
                  v-model="email"
                  type="email"
                  required
                  placeholder="john.smith@hive.tools" />
              </b-form-group>
              <b-form-group
                label="Password:"
                label-for="form-password">
                <b-form-input
                  id="form-password"
                  v-model="password"
                  type="password"
                  required
                  placeholder="P4$$w0rd" />
              </b-form-group>
              <div class="text-center">
                <b-button
                  type="submit"
                  variant="alt-primary"
                  v-text="isExistingWorkspace ? 'Login' : 'Sign up'" />
              </div>
            </b-form>
          </template>
        </block>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'BackAuthSignin',
  data: () => ({
    name: '',
    email: '',
    password: '',
    failed: false
  }),
  computed: mapGetters(['isExistingWorkspace', 'getWorkspaceName']),
  mounted: function () {
    this.$container.header({display: true, fixed: false, modern: false, inverse: false, glass: false})
  },
  methods: {
    ...mapActions(['signin', 'signup']),
    onSubmit: function () {
      this.failed = false
      if (this.isExistingWorkspace) {
        this.onSubmitSignin()
      } else {
        this.onSubmitSignup()
      }
    },
    onSubmitSignin: function () {
      this.signin({ workspace: this.$workspace, email: this.email, password: this.password }).then((res) => {
        if (this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect)
        } else {
          this.$router.push({ name: 'dash-home' })
        }
      }).catch(() => {
        this.failed = true
      })
    },
    onSubmitSignup: function () {
      this.signup({ workspace: this.getWorkspaceName, name: this.name, email: this.email, password: this.password }).then((res) => {
        if (this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect)
        } else {
          this.$router.push({ name: 'dash-home' })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    help: function () {
      console.log('TODO: help the user')
      this.$router.push('/help')
    }
  }
}
</script>
