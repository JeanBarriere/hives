<template>
  <div id="page-container" class="main-content-boxed side-trans-enabled">
    <main id="main-container" style="min-height: 642px;">
      <div class="bg-image" :style="'background-image: url(' + background + ')'">
        <div class="hero bg-black-op">
          <div class="hero-inner">
            <div class="content content-full">
              <div class="row justify-content-center">
                <div class="col-12 py-30 text-center">
                  <h1 class="display-4 font-w700 text-white mb-10 d-flex align-items-center justify-content-center"><img src="../../../assets/logo.png" class="h-48 w-48 mr-15" alt="logo" />Hives</h1>
                  <h2 class="h4 font-w400 text-white-op">We're working on it! Coming soon..</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Try from '%/Front/Try'
import Background from '@/assets/img/photos/photo34@2x.jpg'

export default {
  name: 'front-home',
  components: { Try },
  data: () => ({
    background: Background
  })
}
</script>
