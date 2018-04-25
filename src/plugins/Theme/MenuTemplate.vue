<template>
  <li :class="{ 'nav-main-heading': item.head }">
    <router-link
      v-if="item.route"
      :to="item.route"
      exact-active-class="active"><i
        v-if="item.icon"
        :class="item.iconType ? item.iconType + ' ' + item.iconType + '-' + item.icon : 'si si-' + item.icon"/>{{ item.name }}</router-link>
    <template v-else-if="item.head"><i
      v-if="item.icon"
      :class="item.iconType ? item.iconType + ' ' + item.iconType + '-' + item.icon : 'si si-' + item.icon"/>{{ item.name }}</template>
    <template v-else-if="item.dropdown">
      <a
        href="javascript:void(0)"
        class="nav-submenu"
        data-toggle="nav-submenu"
        @click.stop="openSubmenu"><i
          v-if="item.icon"
          :class="item.iconType ? item.iconType + ' ' + item.iconType + '-' + item.icon : 'si si-' + item.icon"/>{{ item.name }}</a>
      <ul>
        <template v-for="(child, index) of item.children">
          <h-menu-template
            :key="'item_' + _uid + '_child_' + index"
            :item="child" />
        </template>
      </ul>
    </template>
  </li>
</template>

<script>
export default {
  name: 'MenuTemplate',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    openSubmenu: function (event) {
      event.target.parentElement.classList.toggle('open')
    }
  }
}
</script>
