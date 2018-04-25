<template>
  <div id="back-dash-users">
    <div class="row">
      <div class="col-12">
        <block
          bordered
          header
          rounded>
          <template slot="header">Users</template>
          <div>
            <table class="table table-striped table-vcenter">
              <thead>
                <tr>
                  <th
                    class="text-center"
                    style="width: 100px;">
                    <i class="si si-user" />
                  </th>
                  <th>Name</th>
                  <th class="d-none d-sm-table-cell">Email</th>
                  <th class="d-none d-md-table-cell">Role</th>
                  <th
                    class="text-center"
                    style="width: 100px;">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(user, index) of users"
                  :key="'user-' + index">
                  <td class="text-center">
                    <img
                      class="img-avatar img-avatar48"
                      src="@/assets/img/avatars/avatar14.jpg"
                      alt="">
                  </td>
                  <td class="font-w600">{{ user.name }}</td>
                  <td class="d-none d-sm-table-cell">{{ user.email }}</td>
                  <td class="d-none d-md-table-cell">
                    <span
                      :class="'badge-' + user.roleBadge"
                      class="badge"
                      v-text="user.role" />
                  </td>
                  <td class="text-center">
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-alt-secondary">
                        <i class="si si-pencil" />
                      </button>
                      <button
                        :disabled="user.role === 'Administrator'"
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
  name: 'BackDashUsers',
  data: () => ({
    users: [
      { name: 'John Smith', email: 'john.smith@example.com', role: 'Administrator', roleBadge: 'danger' },
      { name: 'Henry Jackson', email: 'henry.jackson@hello.app', role: 'Manager', roleBadge: 'info' },
      { name: 'Ryan Helwis', email: 'ryan.helwis@gmail.com', role: 'Manager', roleBadge: 'info' }
    ]
  })
}
</script>
