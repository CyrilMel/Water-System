<template>
  <div class=" card d-flex flex-column h-100 overflow-hidden p-4 rounded-4">
    <h3>Status</h3>
    <div class="d-flex flex-wrap gap-2 mt-5 tabs">
      <button 
        v-for="status in statuses" 
        :key="status.name" 
        @click="selectedStatus = status.name"
        :class="{ active: selectedStatus === status.name }"
      >
        {{ status.name }} <span v-if="status.count" class="fs-12 fw-medium bg-white text-dark px-2 py-1 rounded-5">{{ status.count }}</span>
      </button>
    </div>

    <div class="orders flex-grow-1 overflow-auto mt-2">
      <table class="shadow-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Address</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in filteredOrders" :key="order.id">
            <td>#{{ index + 1 }}</td>
            <td class="customer">{{ order.customer }}</td>
            <td>{{ order.date }}</td>
            <td>{{ order.address }}</td>
            <td>{{ order.product }}</td>
            <td>{{ order.quantity }}</td>
            <td>
              <span :class="['badge px-3 py-1 rounded-4 text-white', order.status.toLowerCase()]">{{ order.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>       
    </div>
    <nav aria-label="Page navigation example">
          <ul class="pagination mt-5">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const statuses = ref([
  { name: "All", count: 6 },
  { name: "Pending", count: 2 },
  { name: "In-Transit", count: 2 },
  { name: "Completed", count: 2 },
]);

const selectedStatus = ref("All");

const orders = ref([
  { id: 1, date: "02/01/25", customer: "Jalique, Kistelle", orderId: "S201983443", address: "117 Deliima",  product: "Round", quantity: 35, status: "Pending" },
  { id: 2, date: "02/01/25", customer: "Jalique, Kistelle", orderId: "S201983444", address: "117 Deliima",  product: "Round", quantity: 35, status: "In-Transit" },
  { id: 3, date: "02/01/25", customer: "Jalique, Kistelle", orderId: "S201983445", address: "117 Deliima",  product: "Round", quantity: 35, status: "Completed" },
]);

const filteredOrders = computed(() => {
  if (selectedStatus.value === "All") return orders.value;
  return orders.value.filter(order => order.status === selectedStatus.value);
});
</script>

<style scoped>
/* Full height inside the layout */
.tabs button {
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  background: #eee;
  transition: background 0.3s ease;
}

.tabs button.active {
  background: #5fdcff;
  color: white;
}

.fs-12 {
  font-size: 12px;
}

.orders table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.orders th, .orders td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.badge.pending { background: blue; }
.badge.in-transit { background: pink; }
.badge.completed { background: green; }
</style>
