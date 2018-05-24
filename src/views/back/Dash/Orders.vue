<template>
  <div id="back-dash-orders">
    <div class="row">
      <div class="col-12">
        <b-modal
          v-model="addOrderModal"
          centered
          title="Add an order"
          @ok="okOrderModal"
          @shown="clearOrderModal">
          <b-form @submit.stop.prevent="submitOrderModal">
            <b-form-group
              label="Product:"
              label-for="form-order-product">
              <b-form-select
                id="form-order-product"
                v-model="order.productID"
                :options="getProductsAsOptions"
                required>
                <template slot="first">
                  <option
                    :value="null"
                    disabled>Select a product</option>
                </template>
              </b-form-select>
            </b-form-group>
            <b-form-group
              label="Stop:"
              label-for="form-order-stop">
              <b-form-select
                id="form-order-stop"
                v-model="order.stopID"
                :options="getStopsAsOptions"
                required>
                <template slot="first">
                  <option
                    :value="null"
                    disabled>Select a stop</option>
                </template>
              </b-form-select>
            </b-form-group>
            <b-form-group
              label="Quantity:"
              label-for="form-order-quantity">
              <b-form-input
                id="form-order-quantity"
                v-model.number="order.quantity"
                type="number"
                required
                placeholder="Quantity" />
            </b-form-group>
          </b-form>
        </b-modal>
        <b-modal
          v-if="currentOrder"
          v-model="viewOrderModal"
          :title="`Order #${currentOrder.ID} - Preview`"
          centered
          ok-only>
          <b-form-group
            label="Product:"
            label-for="form-order-product">
            <b-form-input
              id="form-order-product"
              v-model="currentOrder.product.name"
              readonly
              required
              placeholder="Product" />
          </b-form-group>
          <b-form-group
            label="Stop:"
            label-for="form-order-stop">
            <b-form-input
              id="form-order-stop"
              v-model="currentOrder.stop.Name"
              readonly
              required
              placeholder="Stop" />
          </b-form-group>
          <b-form-group
            label="Quantity:"
            label-for="form-order-quantity">
            <b-form-input
              id="form-order-quantity"
              v-model.number="currentOrder.quantity"
              readonly
              type="number"
              required
              placeholder="Quantity" />
          </b-form-group>
        </b-modal>
        <block
          :options="[{ tag: 'button', icon: 'plus', call: () => addOrderModal = true }]"
          bordered
          header
          rounded>
          <template slot="header">Orders</template>
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
                  v-for="order of getOrders"
                  :key="'order-' + order.ID">
                  <td
                    class="font-w600 d-none d-md-table-cell text-center"
                    v-text="'#' + order.ID" />
                  <td>{{ order.CreatedAt | moment('calendar') }}</td>
                  <td class="text-center">
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-secondary"
                        @click="viewOrder(order)">
                        <i class="si si-eye" />
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-danger"
                        @click="removeOrder(order)">
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
  name: 'BackDashOrders',
  data: () => ({
    addOrderModal: false,
    order: {
      quantity: 0,
      productID: null,
      stopID: null
    },
    currentOrder: null,
    viewOrderModal: false
  }),
  computed: mapGetters(['getOrders', 'getProductById', 'getStopById', 'getProductsAsOptions', 'getStopsAsOptions']),
  mounted: function () {
    this.updateOrders()
  },
  methods: {
    ...mapActions(['updateOrders', 'removeOrder', 'addOrder']),
    okOrderModal: function (event) {
      event.preventDefault()
      if (this.order.quantity > 0) {
        this.submitOrderModal()
      }
    },
    submitOrderModal: function () {
      this.addOrder(this.order).then(() => {
        this.addOrderModal = false
      }).catch((error) => {
        console.log(error)
      })
    },
    clearOrderModal: function () {
      this.order = { quantity: 0, productID: null, stopID: null }
    },
    viewOrder: function (order) {
      this.currentOrder = order
      console.log(order)
      this.viewOrderModal = true
    }
  }
}
</script>
