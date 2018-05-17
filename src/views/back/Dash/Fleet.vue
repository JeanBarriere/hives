<template>
  <div id="back-dash-fleet">
    <div class="row">
      <div class="col-lg-12 col-xl-6">
        <b-modal
          v-model="addWarehouseModal"
          centered
          title="Add a warehouse"
          @ok="okWarehouseModal"
          @shown="clearWarehouseModal">
          <b-form @submit.stop.prevent="submitWarehouseModal">
            <b-form-group
              label="Name:"
              label-for="form-warehouse-name">
              <b-form-input
                id="form-warehouse-name"
                v-model="warehouse.name"
                required
                placeholder="Name" />
            </b-form-group>
            <b-form-group
              label="Location:"
              label-for="form-warehouse-loc">
              <gmap-autocomplete
                :value="search"
                class="form-control"
                @place_changed="setPlace" />
            </b-form-group>
            <b-form-group
              label="Preview:"
              label-for="form-warehouse-map">
              <gmap-map
                id="form-warehouse-map"
                ref="addWarehouseModalMap"
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
          v-if="currentWarehouse"
          v-model="viewWarehouseModal"
          :title="`${currentWarehouse.Name} - Preview`"
          centered
          ok-only>
          <b-form-group
            label="Preview:"
            label-for="view-warehouse-map">
            <gmap-map
              id="view-warehouse-map"
              ref="viewWarehouseModalMap"
              :center="{ lat: currentWarehouse.Latitude, lng: currentWarehouse.Longitude }"
              :zoom="11"
              :options="{ streetViewControl: false, fullscreenControl: false, mapTypeControl: false }"
              class="large">
              <gmap-marker :position="{ lat: currentWarehouse.Latitude, lng: currentWarehouse.Longitude }" />
            </gmap-map>
          </b-form-group>
        </b-modal>
        <block
          :options="[{ tag: 'button', icon: 'plus', call: () => addWarehouseModal = true }]"
          bordered
          header
          rounded>
          <template slot="header">Warehouses</template>
          <div>
            <table class="table table-striped table-vcenter">
              <thead>
                <tr>
                  <th
                    class="text-center d-none d-sm-table-cell"
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
                  v-for="warehouse of getWarehouses"
                  :key="'warehouse-' + warehouse.ID">
                  <td
                    class="font-w600 d-none d-sm-table-cell text-center"
                    v-text="'#' + warehouse.ID" />
                  <td v-text="warehouse.Name" />
                  <td class="text-center">
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-secondary"
                        @click="viewWarehouse(warehouse)">
                        <i class="si si-eye" />
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-secondary"
                        @click="editWarehouse(warehouse)">
                        <i class="si si-pencil" />
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-danger"
                        @click="removeWarehouse(warehouse)">
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
      <div class="col-lg-12 col-xl-6">
        <block
          bordered
          header
          rounded>
          <template slot="header">Vehicles</template>
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
                  <th class="d-none d-sm-table-cell">Driver</th>
                  <th
                    class="text-center"
                    style="width: 100px;">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) of vehicles"
                  :key="'vehicle-' + index">
                  <td
                    class="font-w600 d-none d-md-table-cell text-center"
                    v-text="'#' + Math.floor(Math.random() * 900000 + 100000)" />
                  <td v-text="item" />
                  <td class="d-none d-sm-table-cell">John Smith</td>
                  <td class="text-center">
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-secondary">
                        <i class="si si-pencil" />
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-danger"
                        @click="vehicles.splice(index, 1)">
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
  name: 'BackDashFleet',
  data: () => ({
    vehicles: ['Toyota 1', 'Toyota 2', 'Toyota 3', 'Toyota 4'],
    addWarehouseModal: false,
    search: 'Singapore',
    location: {
      lat: 1.352083,
      lng: 103.81983600000001
    },
    warehouse: {
      latitude: undefined,
      longitude: undefined,
      name: ''
    },
    currentWarehouse: null,
    viewWarehouseModal: false
  }),
  computed: mapGetters(['getWarehouses']),
  mounted: function () {
    this.updateWarehouses()
  },
  methods: {
    ...mapActions(['updateWarehouses', 'removeWarehouse', 'addWarehouse']),
    okWarehouseModal: function (event) {
      event.preventDefault()
      if (this.warehouse.name.trim().length > 0) {
        this.submitWarehouseModal()
      }
    },
    setPlace: function (place) {
      if (place && (place.geometry || place.latLng)) {
        this.location.lat = (place.latLng || place.geometry.location).lat()
        this.location.lng = (place.latLng || place.geometry.location).lng()
      }
    },
    submitWarehouseModal: function () {
      this.warehouse.latitude = this.location.lat
      this.warehouse.longitude = this.location.lng
      this.addWarehouse(this.warehouse).then(() => {
        this.addWarehouseModal = false
      }).catch((error) => {
        console.log(error)
      })
    },
    clearWarehouseModal: function () {
      this.warehouse = { name: '' }
    },
    viewWarehouse: function (warehouse) {
      this.currentWarehouse = warehouse
      this.viewWarehouseModal = true
    },
    editWarehouse: function (warehouse) {
      // this.currentWarehouse = warehouse
      // this.editWarehouseModal = true
    }
  }
}
</script>

<style lang="sass">
  .pac-container
    z-index: 1060
  .vue-map-container
    width: 100%
    height: 100%
    border: 1px solid #dcdfe3
    border-radius: 0.25rem
    overflow: hidden
    &.medium
      height: 300px
    &.large
      height: 400px
</style>
