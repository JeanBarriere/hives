<template>
  <div id="back-home" class="container">
    <h2 v-text="$t('hives.name') + ' back-office'"></h2>
    <p>{{ getHivesVersion }}</p>
    <button type="button" class="btn btn-primary" @click="toggleBlock">Toggle block</button>
    <block tag="a" ref="mBlock" bordered rounded header theme="gd-sun"
      :options="['fullscreen', 'refresh', 'pin', { tag: 'button', icon: 'wrench', call: wrenchHandler }, 'close', { tag: 'span', content: 'title' }, { tag: 'button', content: 'Hello world', btn: 'primary' }]"
      :refresh-handler="refreshHandler"
      @click="helloworld"
      link-shadow>
      <template slot="header">Hello world</template>
      <template slot="content"></template>
    </block>
    <block ref="mBlock2" bordered rounded>
      <template slot="content">
        <p>Heyyy</p>
      </template>
    </block>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'back-home',
  computed: mapGetters(['getHivesVersion']),
  methods: {
    toggleBlock: function () {
      this.$refs.mBlock.toggle()
    },
    wrenchHandler: function () {
      console.log('wrench setting clicked')
    },
    refreshHandler: function () {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 5000)
      })
    },
    helloworld: function () {
      console.log('hello world')
    }
  }
}
</script>
