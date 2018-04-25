<template>
  <div id="back-dash-fleet">
    <div class="row">
      <div class="col-lg-12 col-xl-6">
        <block
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
                  v-for="(item, index) of warehouses"
                  :key="'warehouse-' + index">
                  <td
                    class="font-w600 d-none d-sm-table-cell text-center"
                    v-text="'#' + (index + 1)" />
                  <td v-text="item" />
                  <td class="text-center">
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-secondary">
                        <i class="si si-eye" />
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-secondary">
                        <i class="si si-pencil" />
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-danger"
                        @click="warehouses.splice(index, 1)">
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
export default {
  name: 'BackDashFleet',
  data: () => ({ warehouses: ['SIIT BKD', 'SIIT Rangsit', 'BKK 1', 'BKK 2'], vehicles: ['Toyota 1', 'Toyota 2', 'Toyota 3', 'Toyota 4'] })
}
</script>
