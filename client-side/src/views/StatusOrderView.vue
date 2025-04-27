<template>
  <div class="page-container">
    <div class="d-flex justify-content-start">
      <h2 class="fw-bold">Status Orders</h2>
    </div>
  <div class="table-card">
    <div class="d-flex flex-row gap-3 justify-content-between align-items-center px-3">
        <h4 class="m-0 w-75">Records <span class="table-badge">0</span></h4>
        <div class="position-relative flex-grow-1 w-25">
            <input type="text" class="form-control form-control-sm form-search" id="floatingInput" placeholder="Search">
        </div>
    </div>
    <div class="table-responsive table-sm">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Customer</th>
            <th scope="col">Date</th>
            <th scope="col">Address</th>
            <th scope="col">Product</th>
            <th scope="col">Quantity</th>
            <th scope="col">Status</th>
            <th scope="col" width="1"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in filteredOrders" :key="order.id">
            <td scope="row">#{{ index + 1 }}</td>
            <td scope=" row customer">{{ order.customer }}</td>
            <td scope="row" >{{ order.date }}</td>
            <td scope="row">{{ order.address }}</td>
            <td scope="row">{{ order.product }}</td>
            <td scope="row">{{ order.quantity }}</td>
            <td>
              <span :class="['badge px-3 py-1 rounded-4 text-white', order.status.toLowerCase()]">{{ order.status }}</span>
            </td>
            <td scope="row">
              <i class="fa-solid fa-ellipsis cursor-pointer" data-bs-toggle="dropdown" aria-expanded="false"></i>
              <div data-bs-toggle="dropdown" aria-expanded="false">

              </div>
              <ul class="dropdown-menu">
                  <li class="dropdown-item">View</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>       

    </div>
  
</div>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const orders = ref([]);
const selectedStatus = ref("All");
const loading = ref(true);

// Fetch orders from backend
const fetchOrders = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/orders"); // adjust URL if needed
    const rawOrders = res.data.orders;

    // Flatten and map necessary fields
    orders.value = rawOrders.map(order => ({
      id: order._id,
      date: new Date(order.createdAt).toLocaleDateString(),
      customer: order.user?.name || 'Unknown',
      address: order.user?.address_id || 'No Address',
      product: order.orderItems.map(i => i.productId.container_type).join(', '), // This assumes productId is the name or ID
      quantity: order.orderItems.reduce((sum, i) => sum + i.quantity, 0),
      status: order.status,
    }));

    loading.value = false;
  } catch (error) {
    console.error("Error fetching orders:", error);
    loading.value = false;
  }
};

onMounted(() => {
  fetchOrders();
});

const filteredOrders = computed(() => {
  if (selectedStatus.value === "All") return orders.value;
  return orders.value.filter(order => order.status === selectedStatus.value);
});
</script>


<style scoped>

.badge.pending { background: blue; }
.badge.in-transit { background: pink; }
.badge.completed { background: green; }
</style>
