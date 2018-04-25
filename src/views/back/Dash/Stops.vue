<template>
  <div id="back-dash-stops">
    <div class="row">
      <div class="col-12">
        <block
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
                  v-for="(item, index) of stops"
                  :key="'stop-' + index">
                  <td
                    class="font-w600 d-none d-md-table-cell text-center"
                    v-text="'#' + Math.floor(Math.random() * 900000 + 100000)" />
                  <td v-text="item" />
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
                        @click="stops.splice(index, 1)">
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
  name: 'BackDashStops',
  data: () => ({ stops: ['stop 1', 'stop bkd', 'stop rg', 'stop bkk'] })
}
</script>
