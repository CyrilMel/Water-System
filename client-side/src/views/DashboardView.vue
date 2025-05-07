<template>
  <div class="page-container">
  <div class="container-fluid ">
    <div class="row">
      <div class="col-md-3">
        <div class="card p-3">
          <h6>BOTTLES SOLD</h6>
            <h3>136,712</h3>
            <small class="text-secondary"><vue-feather class="text-success" type="arrow-up-right" :size="15" ></vue-feather>
            2.4% From Last Month</small>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card p-3">
          <h6>TOTAL CUSTOMERS</h6>
          <h3>250,615</h3>
          <small class="text-secondary"><vue-feather class="text-danger" type="arrow-down-right" :size="15" ><small></small></vue-feather> 3.6% From Last Month</small>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card p-3">
          <h6>TOTAL ORDERS</h6>
          <h3>871,812</h3>
          <small class="text-success">⬆ 1.5% From Last Month</small>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card p-3">
          <h6>GALLONS SOLD</h6>
          <h3>1,982</h3>
          <small class="text-danger">⬇ 5.6% From Last Month</small>
        </div>
      </div>
    </div>
    
    <div class="row mt-4">
      <div class="col-lg-8">
        <div class="card p-3">
          <h5>Total Revenue</h5>
          <h2 class="text-primary">₱106,720</h2>
          <!-- Placeholder for chart -->
          <canvas id="balanceChart"></canvas>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card p-3 mb-4">
          <h6>Expenses</h6>
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between">
                Employee Salary <span>₱670</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                Marketing <span>₱140</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                Bottle Packaging <span>₱100</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                Delivery Service <span>₱50</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                Other <span>₱350</span>
              </li>
            </ul>
        </div>
        <div class="card p-3">
           <h6>Utilities Expenses</h6>
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between">
                Water <span>₱900</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                Electricity <span>₱1,500</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                Internet <span>₱1,2000</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                Gasoline <span>₱600</span>
              </li>
            </ul>
        </div>
      </div>
    </div>
    
    <div class="row mt-4">
      <div class="col-lg-8">
        <div class="card p-3">
          <div class="d-flex justify-content-between">
            <h5>Shipment Monitoring</h5>
            <p>See all <vue-feather type="arrow-up-right" :size="15" ></vue-feather> </p>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>Tracking Number</th>
                <th>Item</th>
                <th>Total</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Estimated Arrival</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>251287128</td>
                <td>5-Gallon Water Jug</td>
                <td>10</td>
                <td>₱2,500</td>
                <td><span class="badge bg-primary">Delivery</span></td>
                <td>April 28, 2023</td>
              </tr>
              <tr>
                <td>168272812</td>
                <td>500ml Bottled Water</td>
                <td>7</td>
                <td>₱1,400</td>
                <td><span class="badge bg-primary">Delivery</span></td>
                <td>April 27, 2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card p-3">
          <h6>Inventory</h6>
          <table class="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Sales</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>5-Gallon Water Jug</td>
                <td>50</td>
                <td>₱40</td>
                <td>150</td>
              </tr>
              <tr>
                <td>500ml Bottled Water</td>
                <td>106</td>
                <td>₱24</td>
                <td>90</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "DashboardView",
  mounted() {
    const ctx = document.getElementById("balanceChart").getContext("2d");

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue (₱)',
          data: [20000, 25000, 22000, 27000, 30000, 32000],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          tension: 0.4,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
</script>

<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
