<template>
  <div class="content p-3 flex-grow-1">
    <h1>Orders</h1>
    <!-- Dropdown for city selection -->
    <div class="city-selection">
      <label for="city" class="form-label">Select City</label>
      <select id="city" v-model="selectedCity" @change="loadBarangays" class="form-select">
        <option v-for="city in cities" :key="city.id" :value="city.id">
          {{ city.name }}
        </option>
      </select>
    </div>

    <!-- Barangays list and Orders for selected barangay -->
    <div class="flex-container">
      <!-- Barangays list -->
      <div v-if="barangays.length" class="barangays-list">
        <h2>Barangays in {{ selectedCityName }}</h2>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Barangay</th>
              <th>Orders</th> 
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="barangay in barangays"
              :key="barangay.id"
              @click="selectBarangay(barangay)"
            >
              <td>{{ barangay.name }}</td>
              <td>{{ barangay.orders }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Orders for selected barangay -->
      <div v-if="selectedBarangay" class="orders-list">
        <h2>Orders for {{ selectedBarangay.name }}</h2>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Order Details</th>
              <th>Delivery Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in selectedBarangay.ordersList" :key="order.id">
              <td>{{ order.client }}</td>
              <td>{{ order.details }}</td>
              <td>{{ order.deliveryTime }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cities: [
        { id: 1, name: 'Pasig' },
        { id: 2, name: 'Mandaluyong' },
        { id: 3, name: 'Makati' },
      ],
      barangaysData: {
        1: [
          {
            id: 101,
            name: "Bagong Ilog",
            orders: 12,
            ordersList: [
              { id: 1, client: "Juan Dela Cruz", details: "5 gallons", deliveryTime: "10:00 AM" },
              { id: 2, client: "Maria Santos", details: "3 gallons", deliveryTime: "11:30 AM" },
            ],
          },
          {
            id: 102,
            name: "Caniogan",
            orders: 18,
            ordersList: [
              { id: 3, client: "Pedro Reyes", details: "8 gallons", deliveryTime: "9:00 AM" },
              { id: 4, client: "Ana Dela Cruz", details: "4 gallons", deliveryTime: "12:00 PM" },
            ],
          },
        ],
        // Add other city barangay data here as needed
      },
      selectedCity: 1,
      selectedCityName: 'Pasig',
      barangays: [],
      selectedBarangay: null,
    };
  },
  methods: {
    loadBarangays() {
      this.selectedCityName = this.cities.find(city => city.id === this.selectedCity).name;
      this.barangays = this.barangaysData[this.selectedCity] || [];
      this.selectedBarangay = null; // Reset selected barangay when city changes
    },
    selectBarangay(barangay) {
      this.selectedBarangay = barangay;
    },
  },
  created() {
    this.loadBarangays();
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 8px;
  border: 2px solid rgb(152, 152, 152);
}

.city-selection {
  margin-bottom: 20px;
}

.city-selection .form-label {
  font-weight: bold;
}

.table {
  width: 100%;
  margin-bottom: 20px;
}

.barangays-list {
  flex: 1; /* This allows the barangays list to take up available space */
}

.orders-list {
  flex: 1; /* This allows the orders list to take up available space */
  margin-left: 20px; /* Add space between the two sections */
}

.table th, .table td {
  text-align: center;
}

h1, h2 {
  margin-bottom: 20px;
}

.form-select {
  width: 200px;
}

.flex-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

@media (min-width: 768px) {
  .content {
    flex-direction: column;
  }
  
  .flex-container {
    display: flex;
    justify-content: space-between;
  }

  .barangays-list {
    width: 45%;
  }

  .orders-list {
    width: 45%;
  }
}
</style>
