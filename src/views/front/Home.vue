<template>
  <div>
    <div
      :style="'background-image: url(' + background + ')'"
      class="bg-image">
      <div
        id="page-hero"
        class="hero bg-black-op">
        <div class="hero-inner">
          <div class="content content-full">
            <div class="row justify-content-center">
              <div class="col-12 py-30 text-center">
                <h1 class="display-2 font-w700 text-white mb-10 d-flex align-items-center justify-content-center"><i class="icon-hive text-primary mr-30"/><span v-html="getFrontTitle"/></h1>
                <h2
                  class="h4 font-w400 text-white-op"
                  v-text="getFrontSlogan"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white">
      <div class="content content-full">
        <div class="py-50 text-center">
          <h4 class="font-w700 mb-10">What is Hive ?</h4>
          <h4 class="font-w400 text-muted mb-0">Hive is a fleet management system that helps companies to enhance their productivity by providing a tool to manage their fleet in order to deliver better and faster</h4>
        </div>
      </div>
    </div>
    <div class="bg-body-light">
      <div class="content content-full">
        <div class="py-50 text-center">
          <h3 class="font-w700 mb-30">Our process</h3>
          <div class="row">
            <div class="col-md-6 col-xl-3">
              <block
                tag="a"
                rounded
                bordered
                link-shadow>
                <div class="item item-circle bg-pulse text-pulse-lighter mx-auto my-20">
                  <i class="fa fa-briefcase"/>
                </div>
                <div class="font-size-sm text-muted">
                  1. Register your workspace
                </div>
              </block>
            </div>
            <div class="col-md-6 col-xl-3">
              <block
                tag="a"
                rounded
                bordered
                link-shadow>
                <div class="item item-circle bg-info text-info-light mx-auto my-20">
                  <i class="fa fa-id-card-o"/>
                </div>
                <div class="font-size-sm text-muted">
                  2. Setup your team
                </div>
              </block>
            </div>
            <div class="col-md-6 col-xl-3">
              <block
                tag="a"
                rounded
                bordered
                link-shadow>
                <div class="item item-circle bg-corporate text-corporate-lighter mx-auto my-20">
                  <i class="fa fa-magic"/>
                </div>
                <div class="font-size-sm text-muted">
                  3. Process your timeline
                </div>
              </block>
            </div>
            <div class="col-md-6 col-xl-3">
              <block
                tag="a"
                rounded
                bordered
                link-shadow>
                <div class="item item-circle bg-success text-success-light mx-auto my-20">
                  <i class="fa fa-rocket"/>
                </div>
                <div class="font-size-sm text-muted">
                  4. Deliver faster
                </div>
              </block>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Background from '@/assets/img/photos/bg_hero_landing.jpg'

export default {
  name: 'FrontHome',
  data: () => ({
    background: Background
  }),
  computed: mapGetters(['getFrontTitle', 'getFrontSlogan']),
  mounted: function () {
    this.$container.header({display: true, fixed: true, modern: false, inverse: true, glass: true})
  }
}
</script>
