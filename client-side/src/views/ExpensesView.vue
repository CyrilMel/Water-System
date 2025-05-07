<template>
  <div class="page-container">
    <div class="d-flex justify-content-start">
      <h2 class="fw-bold">Expense Tracker</h2>
    </div>
    <!-- Button to trigger modal -->
    <div class="table-card p-3">
      <div class="d-flex justify-content-end gap-2">
          <button class="btn btn-primary" @click="showModal = true">Add New Expense</button>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="monthlyTransactionsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              Monthly Transactions
            </button>
            <ul class="dropdown-menu" aria-labelledby="monthlyTransactionsDropdown">
              <li><a class="dropdown-item" href="#" @click="showMonthlyExpenses('May')">May 2025</a></li>
              <li><a class="dropdown-item" href="#" @click="showMonthlyExpenses('June')">June 2025</a></li>
              <li><a class="dropdown-item" href="#">July 2025</a></li>
              <li><a class="dropdown-item" href="#">August 2025</a></li>
            </ul>
          </div>
      </div>

    <!-- Table for Today's Expenses -->
    <h3 class="mb-3">Today's Expenses</h3>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Description</th>
          <th scope="col">Amount</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="expense in expensesToday" :key="expense.id">
          <td>{{ expense.description }}</td>
          <td>₱{{ expense.amount.toFixed(2) }}</td>
          <td class="actions">
            <button class="btn btn-warning" @click="editExpense(expense.id)">Edit</button>
            <button class="btn btn-danger" @click="deleteExpense(expense.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Monthly Transactions (hidden initially) -->
    <div v-show="monthlyTransactionsVisible">
      <h3 class="mb-3">Monthly Tracker</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="expense in monthlyExpenses" :key="expense.id">
            <td>{{ expense.description }}</td>
            <td>₱{{ expense.amount.toFixed(2) }}</td>
            <td class="actions">
              <button class="btn btn-warning" @click="editExpense(expense.id)">Edit</button>
              <button class="btn btn-danger" @click="deleteExpense(expense.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal for Adding Expense (using v-if to control visibility) -->
    <div v-if="showModal" class="modal fade show" style="display: block;" @click.self="showModal = false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Expense</h5>
            <button type="button" class="btn-close" @click="showModal = false"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addExpense">
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <input v-model="newExpense.description" type="text" class="form-control" id="description" required />
              </div>
              <div class="mb-3">
                <label for="amount" class="form-label">Amount (₱)</label>
                <input v-model.number="newExpense.amount" type="number" class="form-control" id="amount" required />
              </div>
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-primary">Add Expense</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Background (optional) -->
    <div v-if="showModal" class="modal-backdrop fade show"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      newExpense: {
        description: '',
        amount: 0,
      },
      expensesToday: [],
      expensesMonthlyMay: [
        { id: 1, description: "Expense 1", amount: 500 },
        { id: 2, description: "Expense 2", amount: 1000 },
        { id: 3, description: "Expense 3", amount: 1500 },
      ],
      monthlyExpenses: [],
      monthlyTransactionsVisible: false,
    };
  },
  methods: {
    addExpense() {
      // Check if the description and amount are valid
      if (!this.newExpense.description || isNaN(this.newExpense.amount) || this.newExpense.amount <= 0) {
        alert('Please enter a valid description and amount.');
        return;
      }

      // Create a new expense with a unique ID based on timestamp
      const expense = { ...this.newExpense, id: Date.now() };

      // Add the expense to the "Today" expenses array
      this.expensesToday.push(expense);

      // Reset the input fields
      this.newExpense.description = '';
      this.newExpense.amount = 0;

      // Close the modal
      this.showModal = false;
    },
    editExpense(id) {
      const expense = this.expensesToday.find((exp) => exp.id === id);
      if (expense) {
        this.newExpense.description = expense.description;
        this.newExpense.amount = expense.amount;
        this.showModal = true;
      }
    },
    deleteExpense(id) {
      this.expensesToday = this.expensesToday.filter((exp) => exp.id !== id);
    },
    showMonthlyExpenses(month) {
      this.monthlyTransactionsVisible = true;
      if (month === 'May') {
        this.monthlyExpenses = this.expensesToday; // Use today's expenses for May
      } else if (month === 'June') {
        this.monthlyExpenses = [
          { id: 4, description: "Expense A", amount: 200 },
          { id: 5, description: "Expense B", amount: 400 },
        ]; // Static expenses for June
      }
    },
  },
  mounted() {
    // Initialize with today's expenses if any
    this.expensesToday = [];
  },
};
</script>

<style scoped>
/* Custom styles for modal */
.modal.fade.show {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
}

.modal-backdrop.fade.show {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1040;
}
    .container {
      max-width: 1200px;
      padding: 30px;
    }
    h1 {
      font-size: 2.5rem;
      font-weight: bold;
      text-align: center;
      margin-bottom: 30px;
      color: #007bff;
    }
    .btn-primary {
      background-color: #007bff;
      border: none;
      padding: 12px 24px;
      border-radius: 25px;
      font-weight: 600;
      transition: background-color 0.3s ease;
    }
    .btn-primary:hover {
      background-color: #0056b3;
    }
    .btn-secondary {
      background-color: #03171c;
      border: none;
      padding: 12px 24px;
      border-radius: 25px;
      font-weight: 600;
      transition: background-color 0.3s ease;
    }
    .btn-secondary:hover {
      background-color: #525050;
    }
    .btn-warning,
    .btn-danger {
      border-radius: 50%;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 600;
    }
    .table {
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .table thead {
      background-color: #007bff;
      color: #fff;
    }
    .table th,
    .table td {
      vertical-align: middle;
    }
    .actions {
      display: flex;
      justify-content: flex-start;
      gap: 12px;
    }
    .actions button {
      background-color: #0303fa;
      border: none;
      padding: 6px 12px;
      border-radius: 50px;
      color: #f3f3f3;
      font-weight: 500;
    }
    .actions button:hover {
      background-color: #0677e9;
    }
    .modal-content {
      border-radius: 15px;
    }
    .modal-header {
      background-color: #007bff;
      color: white;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      padding: 20px;
    }
    .modal-footer {
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      padding: 15px;
    }
    .dropdown-menu {
      border-radius: 12px;
    }
    #monthlyTransactions {
      display: none;
    }
    .pagination .page-link {
      border-radius: 50px;
      background-color: #f7f7f7;
      color: #007bff;
      font-weight: 500;
    }
    .pagination .page-link:hover {
      background-color: #e7f1ff;
    }
    .pagination .active .page-link {
      background-color: #007bff;
      color: white;
    }
</style>