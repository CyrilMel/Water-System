<template>
  <div class="page-container">
    <div class="d-flex justify-content-start">
      <h2 class="fw-bold">Expense Tracker</h2>
    </div>

    <div class="table-card p-3">
      <!-- Action Buttons -->
      <div class="d-flex justify-content-end gap-2">
        <button class="btn btn-primary" @click="openAddModal">Add New Expense</button>
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="monthlyTransactionsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            Monthly Transactions
          </button>
          <ul class="dropdown-menu" aria-labelledby="monthlyTransactionsDropdown">
            <li><a class="dropdown-item" href="#" @click="showMonthlyExpenses('January')">January 2025</a></li>
            <li><a class="dropdown-item" href="#" @click="showMonthlyExpenses('February')">February 2025</a></li>
            <li><a class="dropdown-item" href="#" @click="showMonthlyExpenses('March')">March 2025</a></li>
            <li><a class="dropdown-item" href="#" @click="showMonthlyExpenses('April')">April 2025</a></li>
          </ul>
        </div>
      </div>

      <!-- Today's Expenses Table -->
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

      <!-- Monthly Tracker Section -->
      <div v-show="monthlyTransactionsVisible">
        <h3 class="mb-3">{{ selectedMonth }} 2025 Expenses</h3>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
              <!-- <th scope="col">Actions</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="expense in monthlyExpenses" :key="expense.id">
              <td>{{ expense.description }}</td>
              <td>₱{{ expense.amount.toFixed(2) }}</td>
              <!-- <td class="actions">
                <button class="btn btn-warning" @click="editExpense(expense.id)">Edit</button>
                <button class="btn btn-danger" @click="deleteExpense(expense.id)">Delete</button>
              </td> -->
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add Expense Modal -->
      <div v-if="showModal" class="modal fade show" style="display: block;" @click.self="showModal = false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ isEditing ? 'Edit Expense' : 'Add New Expense' }}</h5>
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

      <!-- Modal Backdrop -->
      <div v-if="showModal" class="modal-backdrop fade show"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      isEditing: false,
      editingId: null,
      selectedMonth: '',
      newExpense: {
        description: '',
        amount: 0,
      },
      expensesToday: [],
      monthlyExpenses: [],
      monthlyTransactionsVisible: false,
    };
  },
  methods: {
    // Open the modal to add a new expense
    openAddModal() {
      this.resetForm();
      this.showModal = true;
    },

    // Add or update an expense
    addExpense() {
      if (!this.newExpense.description || isNaN(this.newExpense.amount) || this.newExpense.amount <= 0) {
        alert('Please enter a valid description and amount.');
        return;
      }

      if (this.isEditing) {
        // Update existing expense
        const index = this.expensesToday.findIndex(exp => exp.id === this.editingId);
        if (index !== -1) {
          this.expensesToday[index] = {
            id: this.editingId,
            description: this.newExpense.description,
            amount: this.newExpense.amount,
          };
        }
      } else {
        // Add new expense
        const expense = { ...this.newExpense, id: Date.now() };
        this.expensesToday.push(expense);
      }

      // Save to localStorage
      localStorage.setItem('expensesToday', JSON.stringify(this.expensesToday));

      // Reset and close modal
      this.resetForm();
      this.showModal = false;
    },

    // Edit an existing expense
    editExpense(id) {
      const expense = this.expensesToday.find((exp) => exp.id === id);
      if (expense) {
        this.newExpense.description = expense.description;
        this.newExpense.amount = expense.amount;
        this.editingId = id;
        this.isEditing = true;
        this.showModal = true;
      }
    },

    // Delete an expense
    deleteExpense(id) {
      this.expensesToday = this.expensesToday.filter((exp) => exp.id !== id);
      localStorage.setItem('expensesToday', JSON.stringify(this.expensesToday));
    },

    // Show expenses by month (static for Jan–Apr, dynamic for May)
    showMonthlyExpenses(month) {
      this.selectedMonth = month;
      this.monthlyTransactionsVisible = true;

      const staticData = {
        January: [
          { id: 101, description: "Utilities Expense", amount: 1500 },
          { id: 102, description: "Salaries Expense", amount: 1500 },
          { id: 103, description: "Advertising Expense", amount: 500 },
          { id: 104, description: "Repairs and Maintenance", amount: 1500 },
          { id: 105, description: "Miscellaneous Expense", amount: 250 },
        ],
        February: [
          { id: 201, description: "Utilities Expense", amount: 1850 },
          { id: 202, description: "Salaries Expense", amount: 1500 },
          { id: 203, description: "Advertising Expense", amount: 0 },
          { id: 204, description: "Repairs and Maintenance", amount: 1000 },
          { id: 205, description: "Repairs and Maintenance", amount: 100 },
        ],
        March: [
          { id: 301, description: "Utilities Expense", amount: 1500 },
          { id: 302, description: "Salaries Expense", amount: 1500 },
          { id: 303, description: "Advertising Expense", amount: 0 },
          { id: 304, description: "Repairs and Maintenance", amount: 1200 },
          { id: 305, description: "Miscellaneous Expense", amount: 100 },
        ],
        April: [
          { id: 401, description: "Utilities Expense", amount: 2000 },
          { id: 402, description: "Salaries Expense", amount: 1500 },
          { id: 403, description: "Advertising Expense", amount: 800 },
          { id: 404, description: "Repairs and Maintenance", amount: 2500 },
          { id: 405, description: "Miscellaneous Expense", amount: 500 },
        ],
        May: this.expensesToday,
        // June: [
        //   { id: 601, description: "Water Bill", amount: 500 },
        //   { id: 602, description: "Transport", amount: 1500 },
        // ],
      };

      this.monthlyExpenses = staticData[month] || [];
    },

    // Reset form fields
    resetForm() {
      this.newExpense = {
        description: '',
        amount: 0,
      };
      this.isEditing = false;
      this.editingId = null;
    },
  },
  mounted() {
    const savedExpenses = localStorage.getItem('expensesToday');
    this.expensesToday = savedExpenses ? JSON.parse(savedExpenses) : [];
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