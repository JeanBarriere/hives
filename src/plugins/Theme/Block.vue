<template>
  <wrap :tag="tag" :href="tag === 'a' ? '#' : null" ref="self" class="block" :class="{ 'block-bordered': bordered, 'block-transparent': transparent, 'block-rounded': rounded, 'block-themed': theme !== null, 'block-link-rotate': linkRotate, 'block-link-pop': linkPop, 'block-link-shadow': linkShadow }" v-show="display" @click="onClick">
    <div class="block-header" v-if="header" :class="[{'block-header-default': headerBg},{'border-b': headerBordered},{'block-header-rtl': headerRtl}, (theme && theme.length > 0 ? 'bg-' + theme : '')]">
      <h3 class="block-title"><slot name="header"></slot></h3>
      <div class="block-options" v-if="options.length > 0">
        <template v-for="option of options">
          <button v-if="option === 'fullscreen'" type="button" class="btn-block-option icon si si-size-fullscreen" @click.stop="fullscreenToggle"></button>
          <button v-else-if="option === 'pin'" type="button" class="btn-block-option icon si si-pin" @click.stop="pinToggle"></button>
          <button v-else-if="option === 'refresh'" type="button" class="btn-block-option icon si si-refresh" @click.stop="refreshToggle"></button>
          <button v-else-if="option === 'toggle'" type="button" class="btn-block-option icon si si-arrow-up" @click.stop="contentToggle"></button>
          <button v-else-if="option === 'close'" type="button" class="btn-block-option icon si si-close" @click.stop="hide"></button>
          <wrap v-else
            :tag="option.tag"
            v-html="option.content"
            @click.stop="onClickOptionHandler(option)"
            :class="[{'btn-block-option': option.tag === 'button' && option.icon}, {'block-options-item': option.tag !== 'button'}, option.icon ? 'icon si si-' + option.icon : '', option.btn ? 'btn btn-sm btn-' + option.btn : '']"
          />
        </template>
      </div>
    </div>
    <div class="block-content" v-if="content">
      <slot name="content"></slot>
    </div>
    <div class="block-content block-content-full block-content-sm bg-body-light font-size-sm" v-if="footer">
      <slot name="footer">Footer content..</slot>
    </div>
  </wrap>
</template>

<script>
export default {
  name: 'block',
  props: {
    tag: { type: String, default: 'div' },
    bordered: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    transparent: { type: Boolean, default: false },
    header: { type: Boolean, default: false },
    headerBg: { type: Boolean, default: false },
    headerBordered: { type: Boolean, default: false },
    headerRtl: { type: Boolean, default: false },
    content: { type: Boolean, default: true },
    footer: { type: Boolean, default: false },
    theme: { type: String, default: null },
    linkRotate: { type: Boolean, default: false },
    linkPop: { type: Boolean, default: false },
    linkShadow: { type: Boolean, default: false },
    refreshHandler: { type: Function, default: () => new Promise(resolve => setTimeout(() => resolve(), 1500)) },
    options: { type: Array, default: () => ([]) }
  },
  data: () => ({
    display: true
  }),
  methods: {
    fullscreenToggle: function (event) {
      this.$refs.self.$el.classList.remove('block-mode-pinned')
      this.$refs.self.$el.classList.toggle('block-mode-fullscreen')
      if (this.$refs.self.$el.classList.contains('block-mode-fullscreen')) {
        event.target.classList.remove('si-size-fullscreen')
        event.target.classList.add('si-size-actual')
      } else {
        event.target.classList.remove('si-size-actual')
        event.target.classList.add('si-size-fullscreen')
      }
    },
    contentToggle: function (event) {
      this.$refs.self.$el.classList.toggle('block-mode-hidden')
      if (this.$refs.self.$el.classList.contains('block-mode-hidden')) {
        event.target.classList.remove('si-arrow-up')
        event.target.classList.add('si-arrow-down')
      } else {
        event.target.classList.remove('si-arrow-down')
        event.target.classList.add('si-arrow-up')
      }
    },
    refreshToggle: function (event) {
      this.$refs.self.$el.classList.toggle('block-mode-loading')
      this.refreshHandler().then(() => {
        this.$refs.self.$el.classList.remove('block-mode-loading')
      })
    },
    pinToggle: function (event) {
      this.$refs.self.$el.classList.remove('block-mode-fullscreen')
      this.$refs.self.$el.classList.toggle('block-mode-pinned')
    },
    hide: function () { this.display = false },
    show: function () { this.display = true },
    toggle: function () { this.display = !this.display },
    onClick: function () {
      if (!this.$refs.self.$el.classList.contains('block-mode-loading')) {
        this.$emit('click')
      }
    },
    onClickOptionHandler: function (option) {
      if (option.call && {}.toString.call(option.call) === '[object Function]') {
        option.call()
      } else {
        this.onClick()
      }
    }
  },
  mounted: function () {}
}
</script>
