const Wrapper = {
  install (Vue) {
    Vue.component('wrap', {
      name: 'Wrap',
      props: { tag: { type: String, required: true } },
      render (createElement) {
        return createElement(this.tag, { on: { click: (event) => this.$emit('click', event) } }, this.$slots.default)
      }
    })
  }
}

export default Wrapper
