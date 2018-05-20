<template>
  <div id="back-dash-stops">
    <div class="row">
      <div class="col-12">
        <b-modal
          v-model="addStopModal"
          centered
          title="Add a stop"
          @ok="okStopModal"
          @shown="clearStopModal">
          <b-form @submit.stop.prevent="submitStopModal">
            <b-form-group
              label="Name:"
              label-for="form-stop-name">
              <b-form-input
                id="form-stop-name"
                v-model="stop.name"
                required
                placeholder="Name" />
            </b-form-group>
            <b-form-group
              label="Location:"
              label-for="form-stop-loc">
              <gmap-autocomplete
                :value="search"
                class="form-control"
                @place_changed="setPlace" />
            </b-form-group>
            <b-form-group
              label="Preview:"
              label-for="form-stop-map">
              <gmap-map
                id="form-stop-map"
                ref="addStopModalMap"
                :center="location"
                :zoom="11"
                :options="{ streetViewControl: false, fullscreenControl: false, mapTypeControl: false }"
                class="medium">
                <gmap-marker
                  :draggable="true"
                  :position="location"
                  @dragend="setPlace" />
              </gmap-map>
            </b-form-group>
          </b-form>
        </b-modal>
        <b-modal
          v-if="currentStop"
          v-model="viewStopModal"
          :title="`${currentStop.Name} - Preview`"
          centered
          ok-only>
          <b-form-group
            label="Preview:"
            label-for="view-stop-map">
            <gmap-map
              id="view-stop-map"
              ref="viewStopModalMap"
              :center="{ lat: currentStop.Latitude, lng: currentStop.Longitude }"
              :zoom="11"
              :options="{ streetViewControl: false, fullscreenControl: false, mapTypeControl: false }"
              class="large">
              <gmap-marker :position="{ lat: currentStop.Latitude, lng: currentStop.Longitude }" />
            </gmap-map>
          </b-form-group>
        </b-modal>
        <block
          :options="[{ tag: 'button', icon: 'plus', call: () => addStopModal = true }]"
          bordered
          header
          rounded>
          <template slot="header">Stops</template>
          <div>
            <table class="table table-striped table-vcenter">
              <thead>
                <tr>
                  <th
                    class="text-center d-none d-md-table-cell"
                    style="width: 100px;">
                    <i class="si si-tag" />
                  </th>
                  <th>Name</th>
                  <th
                    class="text-center"
                    style="width: 100px;">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="stop of getStops"
                  :key="'stop-' + stop.ID">
                  <td
                    class="font-w600 d-none d-md-table-cell text-center"
                    v-text="'#' + stop.ID" />
                  <td v-text="stop.Name" />
                  <td class="text-center">
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-secondary"
                        @click="viewStop(stop)">
                        <i class="si si-eye" />
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-secondary"
                        @click="editStop(stop)">
                        <i class="si si-pencil" />
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-danger"
                        @click="removeStop(stop)">
                        <i class="si si-close" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </block>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'BackDashStops',
  data: () => ({
    addStopModal: false,
    search: 'Singapore',
    location: {
      lat: 1.352083,
      lng: 103.81983600000001
    },
    stop: {
      latitude: undefined,
      longitude: undefined,
      name: ''
    },
    currentStop: null,
    viewStopModal: false
  }),
  computed: mapGetters(['getStops']),
  mounted: function () {
    this.updateStops()
  },
  methods: {
    ...mapActions(['updateStops', 'removeStop', 'addStop']),
    okStopModal: function (event) {
      event.preventDefault()
      if (this.stop.name.trim().length > 0) {
        this.submitStopModal()
      }
    },
    setPlace: function (place) {
      if (place && (place.geometry || place.latLng)) {
        this.location.lat = (place.latLng || place.geometry.location).lat()
        this.location.lng = (place.latLng || place.geometry.location).lng()
      }
    },
    submitStopModal: function () {
      this.stop.latitude = this.location.lat
      this.stop.longitude = this.location.lng
      this.addStop(this.stop).then(() => {
        this.addStopModal = false
      }).catch((error) => {
        console.log(error)
      })
    },
    clearStopModal: function () {
      this.stop = { name: '' }
    },
    viewStop: function (stop) {
      this.currentStop = stop
      this.viewStopModal = true
    },
    editStop: function (stop) {
      // this.currentStop = stop
      // this.editStopModal = true
    }
  }
}
</script>
