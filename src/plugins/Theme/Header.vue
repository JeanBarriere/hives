<template>
  <!-- Header -->
  <header id="page-header">
    <!-- Header Content -->
    <div class="content-header">
      <!-- Left Section -->
      <div class="content-header-section">
        <!-- Logo -->
        <div
          v-if="logo"
          class="content-header-item">
          <router-link
            :to="{ path: '/' }"
            class="link-effect font-w700 mr-5">
            <slot name="logo"/>
          </router-link>
        </div>
        <div
          v-else
          class="content-header-item d-block d-lg-none">
          <router-link
            :to="{ path: '/' }"
            class="link-effect font-w700 mr-5">
            <slot name="logo"/>
          </router-link>
        </div>
        <!-- END Logo -->
      </div>
      <!-- END Left Section -->

      <!-- Right Section -->
      <div class="content-header-section">
        <!-- Header Navigation -->
        <!--
              Desktop Navigation, mobile navigation can be found in #sidebar

              If you would like to use the same navigation in both mobiles and desktops, you can use exactly the same markup inside sidebar and header navigation ul lists
              If your sidebar menu includes headings, they won't be visible in your header navigation by default
              If your sidebar menu includes icons and you would like to hide them, you can add the class 'nav-main-header-no-icons'
              -->
        <ul class="nav-main-header nav-main-header-no-icons">
          <slot name="menu"/>
        </ul>
        <!-- END Header Navigation -->

        <!-- Open Search Section -->
        <!-- Layout API, functionality initialized in Codebase() -> uiApiLayout() -->
        <button
          v-if="$container.mHeader.search"
          type="button"
          class="btn btn-circle btn-dual-secondary"
          @click="searchDisplay(true)">
          <i class="fa fa-search"/>
        </button>
        <!-- END Open Search Section -->

        <!-- Toggle Sidebar -->
        <!-- Layout API, functionality initialized in Codebase() -> uiApiLayout() -->
        <button
          v-if="$container.mSidebar.display"
          type="button"
          class="btn btn-circle btn-dual-secondary d-lg-none"
          @click="$container.sidebar({ openXs: !$container.mSidebar.openXs })">
          <i class="fa fa-navicon"/>
        </button>
        <!-- END Toggle Sidebar -->
      </div>
      <!-- END Right Section -->
    </div>
    <!-- END Header Content -->

    <!-- Header Search -->
    <div
      id="page-header-search"
      :class="{ show: searchDisplaying }"
      class="overlay-header">
      <div class="content-header content-header-fullrow">
        <form @submit.prevent="search">
          <div class="input-group">
            <div class="input-group-prepend">
              <!-- Close Search Section -->
              <!-- Layout API, functionality initialized in Codebase() -> uiApiLayout() -->
              <button
                type="button"
                class="btn btn-secondary px-15"
                @click="searchDisplay(false)">
                <i class="fa fa-times"/>
              </button>
              <!-- END Close Search Section -->
            </div>
            <input
              id="page-header-search-input"
              v-model="searchText"
              type="text"
              class="form-control"
              placeholder="Search or hit ESC.."
              name="page-header-search-input"
              @keydown.esc="searchDisplay(false)">
            <div class="input-group-append">
              <button
                type="submit"
                class="btn btn-secondary px-15">
                <i class="fa fa-search"/>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- END Header Search -->

    <!-- Header Loader -->
    <div
      id="page-header-loader"
      :class="{ show: loading }"
      class="overlay-header bg-primary">
      <div class="content-header content-header-fullrow text-center">
        <div class="content-header-item">
          <i class="fa fa-sun-o fa-spin text-white"/>
        </div>
      </div>
    </div>
    <!-- END Header Loader -->
  </header>
  <!-- END Header -->
</template>

<script>
export default {
  name: 'ThemeHeader',
  props: {
    logo: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    searchDisplaying: false,
    searchText: '',
    loading: false
  }),
  methods: {
    searchDisplay: function (display) {
      this.searchDisplaying = display
    },
    search: function (submit) {
      this.$container.headerSearchSubmit(this.searchText)
    },
    load: function (loading) {
      this.loading = loading
    }
  }
}
</script>
