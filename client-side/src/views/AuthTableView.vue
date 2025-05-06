<template>
   <div class="page-container">
    <div class="d-flex justify-content-start">
      <h2 class="fw-bold">Client List</h2>
    </div>
    <div class="table-card">
      <div class="d-flex flex-row gap-3 justify-content-between align-items-center px-3">
        <h4 class="m-0 w-75">Records <span class="table-badge">{{ users.length }}</span></h4>
        <div class="position-relative flex-grow-1 w-25">
            <input type="text" class="form-control form-control-sm form-search" id="floatingInput" placeholder="Search">
        </div>
        </div>
        <div class="table-responsive table-sm">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user._id">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone || 'no contact' }} </td>
                <td>{{ user.address_id.street_no}}, {{ user.address_id.brgy }}, {{ user.address_id.city }}</td>
                <td>
                  <span class="badge bg-primary">user</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  </div>
  </template>
  
<script>
import axios from '@/axios';

export default {
  data() {
    return {
      users: []
    }
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      try {
        const response = await axios.get('/api/users')
        this.users = response.data.users
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }
  }

}
</script>
  