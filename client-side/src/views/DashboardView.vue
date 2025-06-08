<template>
  <div class="page-container">
  <div class="container-fluid ">
    <div class="row">
      <div class="col-md-3">
        <div class="card p-3">
          <h6 class="fw-semibold">TOTAL INCOME - APRIL</h6>
            <h3 class="text-primary fw-semibold">₱36,840</h3>
            <small class="text-secondary fw-semibold"><vue-feather class="text-success" type="arrow-up-right" :size="15" ></vue-feather>
            2.40% From Last Month</small>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card p-3">
          <h6 class="fw-semibold">TOTAL EXPENSES - APRIL</h6>
          <h3 class="text-primary fw-semibold">₱7,300</h3>
          <small class="text-secondary fw-semibold"><vue-feather class="text-success" type="arrow-up-right" :size="15" ><small></small></vue-feather> 3.60% From Last Month</small>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card p-3">
          <h6 class="fw-semibold">TOTAL REFILLS - APRIL</h6>
          <h4 class="text-primary fw-semibold">984</h4>
          <small class="text-success fw-semibold">⬆ 1.75% From Last Month</small>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card p-3">
          <h6 class="fw-semibold">TOTAL GALLONS SOLD</h6>
          <h3 class="text-primary fw-semibold">240 </h3>
          <small class="text-success fw-semibold">⬆ 16 Increased this Month</small>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-lg-7">
        <div class="card p-3">
          <h5 class="fw-bold">Total Income for Year 2025</h5>
          <h2 class="text-primary fw-bold">₱134,195</h2>
          <!-- Placeholder for chart -->
          <canvas id="balanceChart"></canvas>
        </div>
      </div>
      <div class="col-lg-5">
          <div class="card p-3 mb-4">
            <div style="max-height: 200px; min-height: 100px; overflow-y: auto;">
              <ul class="list-group">
                  <li class="list-group-item d-flex text-muted justify-content-between">
                    Customers (Last Month) <span>77</span>
                  </li>
                  <li class="list-group-item d-flex text-muted justify-content-between">
                    New Customers <span>3</span>
                  </li>
                  <li class="list-group-item d-flex text-muted justify-content-between">
                    Total Customers <span>80</span>
                  </li>
                  <li class="list-group-item d-flex text-muted justify-content-between">
                    Refills per month <span>984</span>
                  </li>
                  <li class="list-group-item d-flex text-muted justify-content-between">
                    Refills per week <span>246</span>
                  </li>
                  <li class="list-group-item d-flex text-muted justify-content-between">
                    Refills per day <span>35</span>
                  </li>
                </ul>
            </div>
          </div>
        <div class="card p-3">
          <table class="table">
            <thead>
              <tr>
                <th>Product Description</th>
                <th>Cost</th>
                <th>Selling Price</th>
                <th>Mark-Up</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Round</td>
                <td>₱100</td>
                <td>₱150</td>
                <td>₱50</td>
              </tr>
              <tr>
                <td>w/ Faucet</td>
                <td>₱100</td>
                <td>₱150</td>
                <td>₱50</td>
              </tr>
            </tbody>
          </table> 
        </div>
      </div>
    </div>
    <!-- <div class="row mt-4">
      <div class="col-lg-8">
        <div class="card p-3">
          <div class="d-flex justify-content-between">
            <h5 class="text-primary fw-bold">COSTING</h5>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>Product Description</th>
                <th>Cost</th>
                <th>Selling Price</th>
                <th>Mark-Up</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Round Gallon</td>
                <td>100</td>
                <td>₱150</td>
                <td>₱50</td>
              </tr>
              <tr>
                <td>Gallon w/ Faucet</td>
                <td>100</td>
                <td>₱120</td>
                <td>₱20</td>
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
    </div> -->
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
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
          label: 'Revenue (₱)',
          data: [30965, 31550, 34840, 36840],
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
