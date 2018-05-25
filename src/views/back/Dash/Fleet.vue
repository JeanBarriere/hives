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
        <b-modal
          v-model="addVehicleModal"
          centered
          title="Add a vehicle"
          @ok="okVehicleModal"
          @shown="clearVehicleModal">
          <b-form @submit.stop.prevent="submitVehicleModal">
            <b-form-group
              label="Name:"
              label-for="form-vehicle-name">
              <b-form-input
                id="form-vehicle-name"
                v-model="vehicle.name"
                required
                placeholder="Name" />
            </b-form-group>
            <b-form-group
              label="Immatriculation:"
              label-for="form-vehicle-immatriculation">
              <b-form-input
                id="form-vehicle-immatriculation"
                v-model="vehicle.immatriculation"
                required
                placeholder="11-CC00-Z1" />
            </b-form-group>
            <b-form-group
              label="Brand:"
              label-for="form-vehicle-brand">
              <b-form-input
                id="form-vehicle-brand"
                v-model="vehicle.brand"
                required
                placeholder="Nissan" />
            </b-form-group>
            <b-form-group
              label="Model:"
              label-for="form-vehicle-model">
              <b-form-input
                id="form-vehicle-model"
                v-model="vehicle.model"
                required
                placeholder="Corola" />
            </b-form-group>
            <b-form-group
              label="Color:"
              label-for="form-vehicle-color">
              <b-form-input
                id="form-vehicle-color"
                v-model="vehicle.color"
                required
                placeholder="Black" />
            </b-form-group>
            <b-form-group
              label="Space:"
              label-for="form-vehicle-space">
              <b-form-input
                id="form-vehicle-space"
                v-model.number="vehicle.space"
                type="number"
                required
                placeholder="Space" />
            </b-form-group>
          </b-form>
        </b-modal>
        <b-modal
          v-if="currentVehicle"
          v-model="viewVehicleModal"
          :title="`${currentVehicle.name} - Preview`"
          centered
          ok-only>
          <b-form-group
            label="Name:"
            label-for="form-vehicle-name">
            <b-form-input
              id="form-vehicle-name"
              v-model="currentVehicle.name"
              required
              readonly />
          </b-form-group>
          <b-form-group
            label="Immatriculation:"
            label-for="form-vehicle-immatriculation">
            <b-form-input
              id="form-vehicle-immatriculation"
              v-model="currentVehicle.immatriculation"
              required
              readonly />
          </b-form-group>
          <b-form-group
            label="Brand:"
            label-for="form-vehicle-brand">
            <b-form-input
              id="form-vehicle-brand"
              v-model="currentVehicle.brand"
              required
              readonly />
          </b-form-group>
          <b-form-group
            label="Model:"
            label-for="form-vehicle-model">
            <b-form-input
              id="form-vehicle-model"
              v-model="currentVehicle.model"
              required
              readonly />
          </b-form-group>
          <b-form-group
            label="Color:"
            label-for="form-vehicle-color">
            <b-form-input
              id="form-vehicle-color"
              v-model="currentVehicle.color"
              required
              readonly />
          </b-form-group>
          <b-form-group
            label="Space:"
            label-for="form-vehicle-space">
            <b-form-input
              id="form-vehicle-space"
              v-model.number="currentVehicle.space"
              type="number"
              required
              readonly />
          </b-form-group>
          <b-form-group
            label="Warehouse:"
            label-for="form-vehicle-warehouse">
            <b-form-select
              id="form-vehicle-warehouse"
              v-model="warehouseID"
              :options="getWarehousesAsOptions"
              required>
              <template slot="first">
                <option
                  :value="null"
                  disabled>Select a warehouse</option>
              </template>
            </b-form-select>
          </b-form-group>
        </b-modal>
        <block
          :options="[{ tag: 'button', icon: 'plus', call: () => addVehicleModal = true }]"
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
                  <th
                    class="text-center"
                    style="width: 100px;">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="vehicle of getVehicles"
                  :key="'vehicle-' + vehicle.ID">
                  <td
                    class="font-w600 d-none d-md-table-cell text-center"
                    v-text="'#' + vehicle.ID" />
                  <td v-text="vehicle.name" />
                  <td class="text-center">
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-secondary"
                        @click="viewVehicle(vehicle)">
                        <i class="si si-eye" />
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-secondary"
                        @click="editVehicle(vehicle)">
                        <i class="si si-pencil" />
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-danger"
                        @click="removeVehicle(vehicle)">
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
    addVehicleModal: false,
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
    vehicle: {
      name: '',
      immatriculation: '',
      brand: '',
      space: 1,
      model: '',
      color: ''
    },
    currentWarehouse: null,
    warehouseID: null,
    currentVehicle: null,
    viewVehicleModal: false
  }),
  computed: mapGetters(['getWarehouses', 'getVehicles', 'getWarehousesAsOptions']),
  watch: {
    warehouseID: function (val) {
      this.linkVehicleToWarehouse({ vehicleID: this.currentVehicle.ID, warehouseID: this.warehouseID })
    }
  },
  mounted: function () {
    this.updateWarehouses()
    this.updateVehicles()
  },
  methods: {
    ...mapActions(['updateWarehouses', 'removeWarehouse', 'addWarehouse', 'updateVehicles', 'removeVehicle', 'addVehicle', 'linkVehicleToWarehouse']),
    okWarehouseModal: function (event) {
      event.preventDefault()
      if (this.warehouse.name.trim().length > 0) {
        this.submitWarehouseModal()
      }
    },
    okVehicleModal: function (event) {
      event.preventDefault()
      if (this.vehicle.name.trim().length > 0 && this.vehicle.immatriculation.trim().length > 0 &&
          this.vehicle.brand.trim().length > 0 && this.vehicle.model.trim().length > 0 && this.vehicle.color.trim().length > 0) {
        this.submitVehicleModal()
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
      this.warehouse = { name: '', latitude: undefined, longitude: undefined }
    },
    viewWarehouse: function (warehouse) {
      this.currentWarehouse = warehouse
      this.viewWarehouseModal = true
    },
    editWarehouse: function (warehouse) {
      // this.currentWarehouse = warehouse
      // this.editWarehouseModal = true
    },
    submitVehicleModal: function () {
      this.addVehicle(this.vehicle).then(() => {
        this.addVehicleModal = false
      }).catch((error) => {
        console.log(error)
      })
    },
    clearVehicleModal: function () {
      this.vehicle = { name: '', immatriculation: '', brand: '', space: 1, model: '', color: '' }
    },
    viewVehicle: function (vehicle) {
      this.currentVehicle = vehicle
      this.warehouseID = this.currentVehicle.Warehouse.ID
      this.viewVehicleModal = true
    },
    editVehicle: function (vehicle) {
      // this.currentVehicle = vehicle
      // this.editVehicleModal = true
    }
  }
}
</script>
