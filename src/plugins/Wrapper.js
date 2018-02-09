const Wrapper = {
  install (Vue) {
    Vue.component('wrap', {
      name: 'wrap',
      props: { tag: { type: String, required: true } },
      render (createElement) {
        return createElement(this.tag, { on: { click: (event) => this.$emit('click', event) } }, this.$slots.default)
      }
    })
  }
}

export default Wrapper
