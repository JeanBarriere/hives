<template>
  <nav id="sidebar">
    <!-- Sidebar Scroll Container -->
    <div
      v-slimscroll="scrollOptions"
      id="sidebar-scroll">
      <!-- Sidebar Content -->
      <div class="sidebar-content">
        <!-- Side Header -->
        <div class="content-header content-header-fullrow">
          <div class="content-header-section text-center align-parent">
            <!-- Close Sidebar, Visible only on mobile screens -->
            <!-- Layout API, functionality initialized in Codebase() -> uiApiLayout() -->
            <button
              type="button"
              class="btn btn-circle btn-dual-secondary d-lg-none align-v-r"
              @click="$container.sidebar({ openXs: false })">
              <i class="fa fa-times text-danger"/>
            </button>
            <!-- END Close Sidebar -->

            <!-- Logo -->
            <div class="content-header-item">
              <router-link
                :to="{ path: '/' }"
                class="link-effect font-w700">
                <slot name="logo"/>
              </router-link>
            </div>
            <!-- END Logo -->
          </div>
        </div>
        <!-- END Side Header -->

        <!-- Side Main Navigation -->
        <div class="content-side content-side-full">
          <ul class="nav-main">
            <slot name="menu"/>
          </ul>
        </div>
        <!-- END Side Main Navigation -->
      </div>
      <!-- Sidebar Content -->
    </div>
    <!-- END Sidebar Scroll Container -->
  </nav>
</template>

<script>
export default {
  name: 'Sidebar',
  data: () => ({
    scrollOptions: {
      height: '100%',
      size: 3
    }
  })
}
</script>
