<template>
  <div class="content p-3 flex-grow-1">
    <h1>Orders</h1>

    <div v-if="barangays.length">
      <h2>Barangays in Pasig</h2>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Barangay</th>
            <th>Orders</th>
            <th>Riders Needed</th>
            <th>Vehicles Required</th>
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
            <td>{{ calculateRiders(barangay.orders) }}</td>
            <td>{{ calculateVehicles(barangay.orders) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="selectedBarangay">
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
</template>

<script>
export default {
  data() {
    return {
      barangays: [
        {
          id: 101,
          name: "Bagong Ilog",
          orders: 12,
          ordersList: [
            {
              id: 1,
              client: "Juan Dela Cruz",
              details: "5 gallons",
              deliveryTime: "10:00 AM",
            },
            {
              id: 2,
              client: "Maria Santos",
              details: "3 gallons",
              deliveryTime: "11:30 AM",
            },
          ],
        },
        {
          id: 102,
          name: "Caniogan",
          orders: 18,
          ordersList: [
            {
              id: 3,
              client: "Pedro Reyes",
              details: "8 gallons",
              deliveryTime: "9:00 AM",
            },
            {
              id: 4,
              client: "Ana Dela Cruz",
              details: "4 gallons",
              deliveryTime: "12:00 PM",
            },
          ],
        },
        {
          id: 103,
          name: "Kalawaan",
          orders: 25,
          ordersList: [
            {
              id: 5,
              client: "Carlos Mendoza",
              details: "6 gallons",
              deliveryTime: "2:00 PM",
            },
          ],
        },
        {
          id: 104,
          name: "Manggahan",
          orders: 30,
          ordersList: [
            {
              id: 6,
              client: "Luis Perez",
              details: "10 gallons",
              deliveryTime: "3:00 PM",
            },
          ],
        },
        {
          id: 105,
          name: "Pinagbuhatan",
          orders: 22,
          ordersList: [
            {
              id: 7,
              client: "Elena Cruz",
              details: "7 gallons",
              deliveryTime: "5:00 PM",
            },
          ],
        },
      ],
      selectedBarangay: null,
    };
  },
  methods: {
    calculateRiders(orders) {
      return Math.ceil(orders / 10); // Assume 1 rider can handle 10 orders
    },
    calculateVehicles(orders) {
      return Math.ceil(orders / 20); // Assume 1 vehicle can carry 20 orders
    },
    selectBarangay(barangay) {
      this.selectedBarangay = barangay;
    },
  },
};
</script>
<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  border-bottom-right-radius: 20px;
  background-color: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.nav-link {
  color: #333;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}
.nav-link:hover {
  background-color: #6c63ff;
  color: white;
}
.logo-img {
  width: 120px;
  height: auto;
}
.logout-container {
  text-align: center;
  padding: 10px;
}
.logout-link {
  font-size: 24px;
  color: #333;
  transition: color 0.3s;
}
.logout-link:hover {
  color: #ff4d4d;
}
</style>
