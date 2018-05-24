<template>
  <div id="back-dash-map">
    <div class="row">
      <div class="col-12">
        <gmap-map
          id="dash-map-map"
          :center="location"
          :zoom="11"
          :options="{ streetViewControl: false, fullscreenControl: false, mapTypeControl: false }"
          class="screen" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackDashMap',
  data: () => ({ location: { lat: 1.352083, lng: 103.81983600000001 } })
}
</script>
