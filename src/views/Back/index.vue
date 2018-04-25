<template>
  <container
    id="hive"
    :footer-author-name="getFrontAuthorName"
    :footer-author-url="getFrontAuthorUrl"
    :footer-name="getFrontFooterName"
    :footer-navigation="getFrontFooterNavigation"
    content-boxed
    footer-display
    header-display
    header-fixed
    header-glass
    header-inverse
    sidebar-display>
    <template
      slot-scope="template"
      slot="logo">
      <i class="icon-hive text-primary font-size-xl mr-5"/><span
        class="font-size-xl"
        v-html="getFrontTitle"/>
    </template>
    <template
      slot-scope="template"
      slot="headerMenu">
      <h-menu-template
        v-for="(item, index) of getBackMenu"
        v-if="(!item.left || item.head) && (!item.publicOnly || (item.publicOnly && !isUserLoggedIn)) && (!item.privateOnly || (item.privateOnly && isUserLoggedIn))"
        :item="item"
        :key="'menu_item_' + index" />
    </template>
    <template
      slot-scope="template"
      slot="sidebarMenu">
      <h-menu-template
        v-for="(item, index) of getBackMenu"
        v-if="(item.left || item.head) && (!item.publicOnly || (item.publicOnly && !isUserLoggedIn)) && (!item.privateOnly || (item.privateOnly && isUserLoggedIn))"
        :item="item"
        :key="'menu_item_' + index" />
    </template>
    <router-view />
    <template slot="footerCompany">
      <h3
        class="h5 font-w700"
        v-text="getFrontCompanyName"/>
      <div
        class="font-size-sm mb-30"
        v-html="getFrontCompanyAddress"/>
    </template>
    <template slot="footerNavigationLeft">
      <template v-for="(block, index) of getFrontFooterNavigationLeft">
        <h3
          :key="'back_footer_navigationl_block_' + index + '_head'"
          class="h5 font-w700"
          v-text="block.name"/>
        <ul
          :key="'back_footer_navigationl_block_' + index + '_list'"
          class="list list-simple-mini font-size-sm">
          <li
            v-for="(child, idx) of block.children"
            :key="'back_footer_navigationl_block_' + index + '_list_item_' + idx">
            <a
              :href="child.link"
              class="link-effect font-w600"
              v-text="child.name"/>
          </li>
        </ul>
      </template>
    </template>
    <template slot="footerNavigationRight">
      <template v-for="(block, index) of getFrontFooterNavigationRight">
        <h3
          :key="'back_footer_navigationr_block_' + index + '_head'"
          class="h5 font-w700"
          v-text="block.name"/>
        <ul
          :key="'back_footer_navigationr_block_' + index + '_list'"
          class="list list-simple-mini font-size-sm">
          <li
            v-for="(child, idx) of block.children"
            :key="'back_footer_navigationr_block_' + index + '_list_item_' + idx">
            <a
              :href="child.link"
              class="link-effect font-w600"
              v-text="child.name"/>
          </li>
        </ul>
      </template>
    </template>
  </container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HiveBack',
  computed: mapGetters([
    'getFrontAuthorName',
    'getFrontAuthorUrl',
    'getFrontCompanyName',
    'getFrontCompanyAddress',
    'getFrontFooterName',
    'getFrontFooterNavigation',
    'getFrontFooterNavigationLeft',
    'getFrontFooterNavigationRight',
    'getBackMenu',
    'getFrontTitle',
    'isUserLoggedIn'
  ]),
  watch: {
    '$route': 'watchRoute'
  },
  methods: {
    watchRoute: function (to, from) {
      this.$container.sidebar({ openXs: false })
    },
    onSearch: function (query) {
      console.log(query)
    }
  }
}
</script>

<style media="screen">
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
