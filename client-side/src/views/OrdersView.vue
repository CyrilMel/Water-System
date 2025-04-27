<template>
  <div class="page-container">
    <div class="d-flex justify-content-start">
      <h2 class="fw-bold">Orders</h2>
    </div>
  <div class="table-card">
    <div class="city-selection mb-1">
      <label for="city" class="form-label mx-3 fw-bold">Select City</label>
      <select id="city" v-model="selectedCity" @change="loadBarangays" class="custom-dropdown refined-dropdown">
        <option v-for="city in cities" :key="city.id" :value="city.id">
          {{ city.name }}
        </option>
      </select>
    </div>

    <div class="table-responsive table-sm">
      <div v-if="barangays.length" class="barangays-list">
        <h2>Barangays in {{ selectedCityName }}</h2>
        <table class="table table-striped table-hover">
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
              class="clickable-row"
            >
              <td>{{ barangay.name }}</td>
              <td>{{ barangay.orders }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="selectedBarangay" class="orders-list">
      <div class="table-responsive table-sm">
      <h2>Orders for {{ selectedBarangay.name }}</h2>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Order Details</th>
            <th>Container Type</th>
            <th>Refill</th>
            <th>Delivery Time</th>
            <th>Date</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in selectedBarangay.ordersList" :key="order.id">
            <td>{{ order.client }}</td>
            <td>{{ order.details }}</td>
            <td>{{ order.containerType }}</td>
            <td>{{ order.refill ? 'Yes' : 'No' }}</td>
            <td>{{ order.deliveryTime }}</td>
            <td>{{ order.date }}</td>
            <td>{{ order.address }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
              { id: 1, client: "Juan Dela Cruz", details: "5 gallons", containerType: "Rounded", refill: true, deliveryTime: "10:00 AM", date: "March 19, 2025", address: "123 Bagong Ilog, Pasig" },
              { id: 2, client: "Maria Santos", details: "3 gallons", containerType: "Normal", refill: false, deliveryTime: "11:30 AM", date: "March 19, 2025", address: "456 Bagong Ilog, Pasig" },
            ],
          },
          {
            id: 102,
            name: "Pineda",
            orders: 8,
            ordersList: [
              { id: 3, client: "Jose Ramirez", details: "2 gallons", containerType: "Rounded", refill: true, deliveryTime: "9:00 AM", date: "March 19, 2025", address: "789 Pineda, Pasig" },
              { id: 4, client: "Ana Dela Cruz", details: "4 gallons", containerType: "Normal", refill: false, deliveryTime: "12:00 PM", date: "March 19, 2025", address: "101 Pineda, Pasig" },
            ],
          },
          {
            id: 102,
            name: "Rosario",
            orders: 2,
            ordersList: [
              { id: 3, client: "Jose Ramirez", details: "2 gallons", containerType: "Rounded", refill: true, deliveryTime: "9:00 AM", date: "March 19, 2025", address: "789 Pineda, Pasig" },
              { id: 4, client: "Ana Dela Cruz", details: "4 gallons", containerType: "Normal", refill: false, deliveryTime: "12:00 PM", date: "March 19, 2025", address: "101 Pineda, Pasig" },
            ],
          },
        ],
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
      this.selectedBarangay = null;
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

.custom-dropdown {
  width: 250px;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.1);
}

.refined-dropdown:hover, .refined-dropdown:focus {
  background: #ffffff;
  box-shadow: 2px 6px 8px rgba(0, 0, 0, 0.15);
}



.barangays-list, .orders-list {
  flex: 1;
  padding: 20px;
  border-radius: 12px;
}

.orders-list {
  margin-top: 20px;
}


</style>
