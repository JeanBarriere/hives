<template>
  <div id="back-dash-home">
    <div class="row">
      <div class="col-12">
        <block
          ref="mBlock"
          :options="['fullscreen', 'refresh', 'pin', 'close']"
          bordered
          rounded
          header
          theme="gd-aqua">
          <template slot="header">Welcome to {{ $t('hive.name') }}</template>
          This is your dashboard and your first widget
        </block>
      </div>
      <div class="col-12 col-md-4">
        <block
          :options="['close']"
          bordered
          rounded
          header
          theme="gd-aqua">
          <template slot="header">Welcome to {{ $t('hive.name') }}</template>
          This is your dashboard and your first widget
        </block>
      </div>
      <div class="col-12 col-md-4">
        <block
          :options="['close']"
          bordered
          rounded
          header
          theme="gd-primary">
          <template slot="header">Welcome to {{ $t('hive.name') }}</template>
          This is your dashboard and your first widget
        </block>
      </div>
      <div class="col-12 col-md-4">
        <block
          :options="['close']"
          bordered
          rounded
          header
          theme="gd-aqua">
          <template slot="header">Welcome to {{ $t('hive.name') }}</template>
          This is your dashboard and your first widget
        </block>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackDashHome'
}
</script>
