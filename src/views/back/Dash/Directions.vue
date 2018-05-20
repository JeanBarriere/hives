<template>
  <div id="back-dash-directions">
    <div class="row">
      <div class="col-12">
        <b-modal
          v-if="currentDirection"
          v-model="viewDirectionModal"
          title="Direction preview"
          centered
          ok-only>
          <div
            v-for="(vehicle, vIndex) of currentRoutes.Result"
            :key="'direction-' + currentRoutes.id + '-vehicle-' + vIndex"
            class="mb-20">
            <div v-text="'ID: ' + vehicle.DriverID" />
            <div v-text="'Immatriculation: ' + vehicle.Immatriculation" />
            <div v-text="'Brand: ' + vehicle.Brand" />
            <div v-text="'Model: ' + vehicle.Model" />
            <div v-text="'Color: ' + vehicle.Color" />
            <div
              v-for="(stop, sIndex) of vehicle.Stops"
              :key="'direction-' + currentRoutes.id + '-vehicle-' + vIndex + '-stop-' + sIndex">
              <div>[STOP#{{ sIndex }}]Name: {{ stop.Name }}</div>
              <div>[STOP#{{ sIndex }}]LatLng: {{ stop.Lat }}-{{ stop.Long }}</div>
              <div>[STOP#{{ sIndex }}]Address: {{ stop.Address }}</div>
              <template v-if="stop.Products">
                <div
                  v-for="(product, pIndex) of stop.Products"
                  :key="'direction-' + currentRoutes.id + '-vehicle-' + vIndex + '-stop-' + sIndex + '-product-' + pIndex">[STOP#{{ sIndex }}]Product #{{ idx }}: {{ product }}</div>
              </template>
              <div v-else>[STOP#{{ sIndex }}]No products</div>
            </div>
          </div>
        </b-modal>
        <block
          :options="[{ tag: 'button', icon: 'plus', call: addDirection }]"
          bordered
          header
          rounded>
          <template slot="header">Directions</template>
          <div>
            <table class="table table-striped table-vcenter">
              <thead>
                <tr>
                  <th
                    class="text-center d-none d-md-table-cell"
                    style="width: 100px;">
                    <i class="si si-tag" />
                  </th>
                  <th>Date</th>
                  <th
                    class="text-center"
                    style="width: 100px;">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="direction of getDirectionsSorted"
                  :key="'direction-' + direction.ID">
                  <td
                    class="font-w600 d-none d-md-table-cell text-center"
                    v-text="'#' + direction.ID" />
                  <td>{{ direction.CreatedAt | moment('calendar') }}</td>
                  <td class="text-center">
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-secondary"
                        @click="viewDirection(direction)">
                        <i class="si si-eye" />
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-danger"
                        @click="removeDirection(direction)">
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
  name: 'BackDashDirections',
  data: () => ({
    addDirectionModal: false,
    search: 'Singapore',
    location: {
      lat: 1.352083,
      lng: 103.81983600000001
    },
    direction: {
      latitude: undefined,
      longitude: undefined,
      name: ''
    },
    currentDirection: null,
    currentRoutes: null,
    viewDirectionModal: false
  }),
  computed: {
    ...mapGetters(['getDirections']),
    getDirectionsSorted: function () {
      return this.getDirections.slice(0).sort((a, b) => a.ID < b.ID)
    }
  },
  mounted: function () {
    this.updateDirections()
  },
  methods: {
    ...mapActions(['updateDirections', 'removeDirection', 'addDirection']),
    okDirectionModal: function (event) {
      event.preventDefault()
      if (this.direction.name.trim().length > 0) {
        this.submitDirectionModal()
      }
    },
    setPlace: function (place) {
      if (place && (place.geometry || place.latLng)) {
        this.location.lat = (place.latLng || place.geometry.location).lat()
        this.location.lng = (place.latLng || place.geometry.location).lng()
      }
    },
    submitDirectionModal: function () {
      this.direction.latitude = this.location.lat
      this.direction.longitude = this.location.lng
      this.addDirection(this.direction).then(() => {
        this.addDirectionModal = false
      }).catch((error) => {
        console.log(error)
      })
    },
    clearDirectionModal: function () {
      this.direction = { name: '' }
    },
    viewDirection: function (direction) {
      this.currentDirection = direction
      this.currentRoutes = JSON.parse(direction.routes)
      this.viewDirectionModal = true
    }
  }
}
</script>
