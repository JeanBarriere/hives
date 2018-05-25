<template>
  <div id="back-dash-products">
    <div class="row">
      <div class="col-12">
        <b-modal
          v-model="addProductModal"
          centered
          title="Add a product"
          @ok="okProductModal"
          @shown="clearProductModal">
          <b-form @submit.stop.prevent="submitProductModal">
            <b-form-group
              label="Name:"
              label-for="form-product-name">
              <b-form-input
                id="form-product-name"
                v-model="product.name"
                required
                placeholder="Name" />
            </b-form-group>
            <b-form-group
              label="Identifier:"
              label-for="form-product-identifier">
              <b-form-input
                id="form-product-identifier"
                v-model="product.identifier"
                required
                placeholder="Identifier" />
            </b-form-group>
            <b-form-group
              label="Weight: (length x width x height)"
              label-for="form-product-weight">
              <b-form-input
                id="form-product-weight"
                v-model.number="product.weight"
                type="number"
                required
                placeholder="length x width x height" />
            </b-form-group>
          </b-form>
        </b-modal>
        <b-modal
          v-if="currentProduct"
          v-model="viewProductModal"
          :title="`${currentProduct.name} - Preview`"
          centered
          ok-only>
          <b-form-group
            label="Name:"
            label-for="form-product-name">
            <b-form-input
              id="form-product-name"
              v-model="currentProduct.name"
              readonly
              required
              placeholder="Name" />
          </b-form-group>
          <b-form-group
            label="Identifier:"
            label-for="form-product-identifier">
            <b-form-input
              id="form-product-identifier"
              v-model="currentProduct.Identifier"
              readonly
              required
              placeholder="Identifier" />
          </b-form-group>
          <b-form-group
            label="Weight:"
            label-for="form-product-weight">
            <b-form-input
              id="form-product-weight"
              v-model.number="currentProduct.weight"
              readonly
              type="number"
              required
              placeholder="length x width x height" />
          </b-form-group>
        </b-modal>
        <block
          :options="[{ tag: 'button', icon: 'plus', call: () => addProductModal = true }]"
          bordered
          header
          rounded>
          <template slot="header">Products</template>
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
                  v-for="product of getProducts"
                  :key="'product-' + product.ID">
                  <td
                    class="font-w600 d-none d-md-table-cell text-center"
                    v-text="'#' + product.ID" />
                  <td v-text="product.name" />
                  <td class="text-center">
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-secondary"
                        @click="viewProduct(product)">
                        <i class="si si-eye" />
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-secondary"
                        @click="editProduct(product)">
                        <i class="si si-pencil" />
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-danger"
                        @click="removeProduct(product)">
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
  name: 'BackDashProducts',
  data: () => ({
    addProductModal: false,
    product: {
      name: '',
      identifier: '',
      weight: 0,
      picture: 'none'
    },
    currentProduct: null,
    viewProductModal: false
  }),
  computed: mapGetters(['getProducts']),
  mounted: function () {
    this.updateProducts()
  },
  methods: {
    ...mapActions(['updateProducts', 'removeProduct', 'addProduct']),
    okProductModal: function (event) {
      event.preventDefault()
      if (this.product.name.trim().length > 0) {
        this.submitProductModal()
      }
    },
    submitProductModal: function () {
      this.addProduct(this.product).then(() => {
        this.addProductModal = false
      }).catch((error) => {
        console.log(error)
      })
    },
    clearProductModal: function () {
      this.product = { name: '', identifier: '', weight: 0, picture: 'none' }
    },
    viewProduct: function (product) {
      this.currentProduct = product
      this.viewProductModal = true
    },
    editProduct: function (product) {
      // this.currentProduct = product
      // this.editProductModal = true
    }
  }
}
</script>
