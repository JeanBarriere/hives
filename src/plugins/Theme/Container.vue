<template>
  <div
    v-if="isMounted"
    id="hive"
    :class="[{'sidebar-r': mSidebar.right},{'sidebar-mini': mSidebar.mini},{'sidebar-o': mSidebar.open},
             {'sidebar-o-xs': mSidebar.openXs},{'sidebar-inverse': mSidebar.inverse},{'side-scroll': !mNativeScroll},
             {'side-overlay-hover': mSide.hover},{'side-overlay-o': mSide.open},{'page-header-fixed': mHeader.fixed},
             {'page-header-scroll': mHeader.scroll},{'page-header-modern': mHeader.modern},{'page-header-inverse': mHeader.inverse},
             {'page-header-glass': mHeader.glass},{'main-content-boxed': mContent.boxed},{'main-content-narrow': mContent.narrow}]">
    <h-sidebar
      v-if="mSidebar.display"
      ref="sidebar">
      <template slot="logo"><slot
        scope="template"
        name="logo"/></template>
      <template slot="menu"><slot
        scope="template"
        name="sidebarMenu"/></template>
    </h-sidebar>
    <h-header
      v-if="mHeader.display"
      ref="header"
      :logo="mHeader.logo">
      <template slot="logo"><slot
        scope="template"
        name="logo"/></template>
      <template slot="menu"><slot
        scope="template"
        name="headerMenu"/></template>
    </h-header>
    <main
      id="main-container"
      ref="mainContainer">
      <div
        id="page-loader"
        ref="pageLoader"
        :class="{ show: mContent.load }" />
      <slot v-if="!mContent.load" />
    </main>
    <h-footer
      v-if="mFooter.display"
      ref="footer"
      :name="mFooter.name"
      :author-name="mFooter.authorName"
      :author-url="mFooter.authorUrl"
      :navigation="mFooter.navigation">
      <template slot="company"><slot name="footerCompany"/></template>
      <template slot="navigationLeft"><slot name="footerNavigationLeft"/></template>
      <template slot="navigationRight"><slot name="footerNavigationRight"/></template>
    </h-footer>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Container',
  props: {
    sidebarDisplay: { type: Boolean, default: false },
    sidebarOpen: { type: Boolean, default: false },
    sidebarOpenXs: { type: Boolean, default: false },
    sidebarRight: { type: Boolean, default: false },
    sidebarMini: { type: Boolean, default: false },
    sidebarInverse: { type: Boolean, default: false },
    sideOpen: { type: Boolean, default: false },
    sideHover: { type: Boolean, default: false },
    nativeScroll: { type: Boolean, default: false },
    headerDisplay: { type: Boolean, default: false },
    headerFixed: { type: Boolean, default: false },
    headerModern: { type: Boolean, default: false },
    headerInverse: { type: Boolean, default: false },
    headerGlass: { type: Boolean, default: false },
    headerSearch: { type: Boolean, default: false },
    headerLogo: { type: Boolean, default: true },
    contentBoxed: { type: Boolean, default: false },
    contentNarrow: { type: Boolean, default: false },
    footerName: { type: String, default: '' },
    footerAuthorName: { type: String, default: '' },
    footerAuthorUrl: { type: String, default: '' },
    footerNavigation: { type: Boolean, default: false },
    footerDisplay: { type: Boolean, default: false },
    loadedOnMounted: { type: Boolean, default: false }
  },
  data: () => ({
    isMounted: false,
    mSidebar: {
      display: false,
      right: false,
      mini: false,
      open: false,
      openXs: false,
      inverse: false
    },
    mSide: {
      open: false,
      hover: false
    },
    mNativeScroll: false,
    mHeader: {
      display: false,
      fixed: false,
      logo: true,
      modern: false,
      inverse: false,
      glass: false,
      search: false,
      scroll: false
    },
    mContent: {
      boxed: false,
      narrow: false,
      load: true
    },
    mFooter: {
      name: '',
      authorName: '',
      authorUrl: '',
      navigation: false,
      display: false
    }
  }),
  mounted: function () {
    this.mSidebar.display = this.sidebarDisplay
    this.mSidebar.open = this.sidebarOpen
    this.mSidebar.openXs = this.sidebarOpenXs
    this.mSidebar.right = this.sidebarRight
    this.mSidebar.mini = this.sidebarMini
    this.mSidebar.inverse = this.sidebarInverse
    this.mSide.open = this.sideOpen
    this.mSide.hover = this.sideHover
    this.mNativeScroll = this.nativeScroll
    this.mHeader.display = this.headerDisplay
    this.mHeader.fixed = this.headerFixed
    this.mHeader.modern = this.headerModern
    this.mHeader.inverse = this.headerInverse
    this.mHeader.glass = this.headerGlass
    this.mHeader.logo = this.headerLogo
    this.mHeader.search = this.headerSearch
    this.mContent.boxed = this.contentBoxed
    this.mContent.narrow = this.contentNarrow
    this.mFooter.name = this.footerName
    this.mFooter.authorName = this.footerAuthorName
    this.mFooter.authorUrl = this.footerAuthorUrl
    this.mFooter.navigation = this.footerNavigation
    this.mFooter.display = this.footerDisplay
    Vue.prototype.$container = this
    this.isMounted = true
    this.$nextTick().then(() => {
      this.handleScroll()
      this.handleResize()
      if (this.loadedOnMounted) {
        this.contentLoad(false)
      }
    })
  },
  created: function () {
    document.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  },
  destroyed: function () {
    document.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    sidebar: function ({display = null, open = null, openXs = null, reverse = null, mini = null, inverse = null}) {
      this.mSidebar.display = typeof display === typeof true ? display : this.mSidebar.display
      this.mSidebar.open = typeof open === typeof true ? open : this.mSidebar.open
      this.mSidebar.openXs = typeof openXs === typeof true ? openXs : this.mSidebar.openXs
      this.mSidebar.right = typeof reverse === typeof true ? reverse : this.mSidebar.right
      this.mSidebar.mini = typeof mini === typeof true ? mini : this.mSidebar.mini
      this.mSidebar.inverse = typeof inverse === typeof true ? inverse : this.mSidebar.inverse
      return this
    },
    side: function ({open = null, hover = null}) {
      this.mSide.open = typeof open === typeof true ? open : this.mSide.open
      this.mSide.hover = typeof hover === typeof true ? hover : this.mSide.hover
      return this
    },
    scroll: function ({native = null}) {
      this.mNativeScroll = typeof native === typeof true ? native : this.mNativeScroll
      return this
    },
    header: function ({display = null, logo = null, fixed = null, modern = null, inverse = null, glass = null, search = null}) {
      this.mHeader.display = typeof display === typeof true ? display : this.mHeader.display
      this.mHeader.logo = typeof logo === typeof true ? logo : this.mHeader.logo
      this.mHeader.fixed = typeof fixed === typeof true ? fixed : this.mHeader.fixed
      this.mHeader.modern = typeof modern === typeof true ? modern : this.mHeader.modern
      this.mHeader.inverse = typeof inverse === typeof true ? inverse : this.mHeader.inverse
      this.mHeader.glass = typeof glass === typeof true ? glass : this.mHeader.glass
      this.mHeader.search = typeof search === typeof true ? search : this.mHeader.search
      this.handleScroll()
      this.handleResize()
      return this
    },
    headerLoad: function (load) {
      this.$refs.header.load(load)
      return this
    },
    headerSearchSubmit: function (query) {
      this.$emit('search-submit', query)
    },
    content: function ({boxed = null, narrow = null}) {
      this.mContent.boxed = typeof boxed === typeof true ? boxed : this.mContent.boxed
      this.mContent.narrow = typeof narrow === typeof true ? narrow : this.mContent.narrow
      return this
    },
    contentLoad: function (load) {
      this.mContent.load = load
      return this
    },
    footer: function (display, name = '', authorName = '', authorUrl = '', navigation = false) {
      this.mFooter.name = name
      this.mFooter.authorName = authorName
      this.mFooter.authorUrl = authorUrl
      this.mFooter.navigation = navigation
      this.mFooter.display = display
      this.handleResize()
      return this
    },
    handleScroll: function () {
      if (this.$refs.header && document.documentElement.scrollTop > this.$refs.header.$el.clientHeight && !this.mHeader.scroll && this.mHeader.glass) {
        this.mHeader.scroll = true
      } else if (this.$refs.header && document.documentElement.scrollTop < this.$refs.header.$el.clientHeight && this.mHeader.scroll && this.mHeader.glass) {
        this.mHeader.scroll = false
      }
    },
    handleResize: function () {
      if (this.$refs.mainContainer) {
        let mainContainerHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - (this.$refs.header || {'$el': {clientHeight: 0}}).$el.clientHeight - (this.$refs.footer || {'$el': {clientHeight: 0}}).$el.clientHeight
        this.$refs.mainContainer.style.minHeight = `${mainContainerHeight}px`
      }
    }
  }
}
</script>
