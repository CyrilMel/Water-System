<template>
   <div class="page-container">
    <div class="d-flex justify-content-start">
      <h2 class="fw-bold">Client List</h2>
    </div>
    <div class="table-card">
      <div class="d-flex flex-row gap-3 justify-content-between align-items-center px-3">
        <h4 class="m-0 w-75">Records <span class="table-badge">0</span></h4>
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
                <th>Address</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in userOnly" :key="index">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.address }}</td>
                <td>
                  <span class="badge bg-primary">{{ user.role }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const users = ref([
    { name: 'Juan Dela Cruz', email: 'juan@example.com', address: 'Pinagbuhatan Pasig City', role: 'user' },
    { name: 'Maria Clara', email: 'maria@example.com', address: 'Rosario Pasig City', role: 'user' },
    { name: 'Pedro Penduko', email: 'pedro@example.com', address: 'Kalawaan Pasig City', role: 'user' },
    { name: 'Andres Bonifacio', email: 'andres@example.com', address: 'Malinao Pasig City', role: 'user' },
    { name: 'Jose Rizal', email: 'rizal@example.com', address: 'Bambang Pasig City', role: 'user' }
  ])
  
  const userOnly = computed(() => users.value.filter(user => user.role === 'user'))
  </script>
  