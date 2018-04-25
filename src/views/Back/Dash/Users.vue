<template>
  <div id="back-dash-users">
    <div class="row">
      <div class="col-12">
        <block
          bordered
          rounded>
          This is the users page
        </block>
        <widget />
      </div>
    </div>
  </div>
</template>

<script>
import Widget from '&/Widget'

export default {
  name: 'BackDashUsers',
  components: { Widget }
}
</script>
