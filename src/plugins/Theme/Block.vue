<template>
  <wrap
    v-show="display"
    ref="self"
    :tag="tag"
    :href="tag === 'a' ? 'javascript:void(0)' : null"
    :class="{ 'block-bordered': bordered, 'block-transparent': transparent, 'block-rounded': rounded, 'block-themed': theme !== null, 'block-link-rotate': linkRotate, 'block-link-pop': linkPop, 'block-link-shadow': linkShadow }"
    class="block"
    @click="onClick">
    <div
      v-if="header"
      :class="[{'block-header-default': headerBg},{'border-b': headerBordered},{'block-header-rtl': headerRtl}, (theme && theme.length > 0 ? 'bg-' + theme : '')]"
      class="block-header">
      <h3 class="block-title"><slot name="header"/></h3>
      <div
        v-if="options.length > 0"
        class="block-options">
        <template v-for="(option, index) of options">
          <button
            v-if="option === 'fullscreen'"
            :key="'option_' + _uid + '_item_' + index"
            type="button"
            class="btn-block-option icon si si-size-fullscreen"
            @click.stop="fullscreenToggle"/>
          <button
            v-else-if="option === 'pin'"
            :key="'option_' + _uid + '_item_' + index"
            type="button"
            class="btn-block-option icon si si-pin"
            @click.stop="pinToggle"/>
          <button
            v-else-if="option === 'refresh'"
            :key="'option_' + _uid + '_item_' + index"
            type="button"
            class="btn-block-option icon si si-refresh"
            @click.stop="refreshToggle"/>
          <button
            v-else-if="option === 'toggle'"
            :key="'option_' + _uid + '_item_' + index"
            type="button"
            class="btn-block-option icon si si-arrow-up"
            @click.stop="contentToggle"/>
          <button
            v-else-if="option === 'close'"
            :key="'option_' + _uid + '_item_' + index"
            type="button"
            class="btn-block-option icon si si-close"
            @click.stop="hide"/>
          <wrap
            v-else
            :key="'option_' + _uid + '_item_' + index"
            :tag="option.tag"
            :class="[{'btn-block-option': option.tag === 'button' && option.icon}, {'block-options-item': option.tag !== 'button'}, option.icon ? 'icon si si-' + option.icon : '', option.btn ? 'btn btn-sm btn-' + option.btn : '']"
            @click.stop="onClickOptionHandler(option)"
            v-html="option.content"
          />
        </template>
      </div>
    </div>
    <div
      v-if="content"
      class="block-content block-content-full">
      <slot/>
      <slot name="content"/>
    </div>
    <div
      v-if="footer"
      class="block-content block-content-full block-content-sm bg-body-light font-size-sm">
      <slot name="footer">Footer content..</slot>
    </div>
  </wrap>
</template>

<script>
export default {
  name: 'Block',
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
  mounted: function () {},
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
    },
    refresh: function (handler) {
      this.$refs.self.$el.classList.toggle('block-mode-loading')
      handler().then(() => {
        this.$refs.self.$el.classList.remove('block-mode-loading')
      })
    }
  }
}
</script>
