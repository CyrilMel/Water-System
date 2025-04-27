<template>
   <div class="page-container">
    <div class="container my-5">
      <div class="card border-0 shadow-lg rounded-4">
        <!-- Header -->
        <div class="card-header bg-dark text-white text-center fw-bold fs-3 rounded-top-4">
           Expense Tracker
        </div>
  
        <!-- Body -->
        <div class="card-body bg-light rounded-bottom-4">
          <!-- Add/Edit Expense Form -->
          <form @submit.prevent="handleSubmit" class="row g-3 align-items-end mb-4">
            <div class="col-md-6">
              <label class="form-label fw-semibold">Expense Name</label>
              <input
                v-model="form.name"
                type="text"
                class="form-control form-control-lg rounded-3"
                placeholder="e.g., Water"
                required
              />
            </div>
            <div class="col-md-4">
              <label class="form-label fw-semibold">Amount (₱)</label>
              <input
                v-model.number="form.amount"
                type="number"
                class="form-control form-control-lg rounded-3"
                placeholder="e.g., 15000"
                required
              />
            </div>
            <div class="col-md-2 d-grid">
              <button
                type="submit"
                class="btn btn-lg btn-success rounded-3"
              >
                {{ editIndex !== null ? 'Update' : 'Add' }}
              </button>
            </div>
          </form>
  
          <!-- Expense List -->
          <div class="list-group mb-4">
            <div
              v-for="(expense, index) in expenses"
              :key="index"
              class="list-group-item list-group-item-action d-flex justify-content-between align-items-center rounded-3 mb-2 shadow-sm"
            >
              <div>
                <h6 class="mb-0">{{ expense.name }}</h6>
                <small class="text-muted">₱ {{ expense.amount.toLocaleString() }}</small>
              </div>
              <div>
                <button
                  class="btn btn-sm btn-outline-warning me-2 rounded-pill"
                  @click="editExpense(index)"
                >
                  Edit
                </button>
                <button
                  class="btn btn-sm btn-outline-danger rounded-pill"
                  @click="deleteExpense(index)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
  
          <!-- Total -->
          <div class="text-end">
            <div class="alert alert-primary rounded-4 fs-5 fw-bold shadow-sm d-inline-block px-4 py-2">
              Total: ₱ {{ totalExpenses.toLocaleString() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const expenses = ref([
    { name: 'Water', amount: 15000 },
    { name: 'Electricity', amount: 15000 }
  ])
  
  const form = ref({ name: '', amount: '' })
  const editIndex = ref(null)
  
  const handleSubmit = () => {
    if (editIndex.value !== null) {
      expenses.value[editIndex.value] = { ...form.value }
      editIndex.value = null
    } else {
      expenses.value.push({ ...form.value })
    }
    form.value = { name: '', amount: '' }
  }
  
  const editExpense = (index) => {
    form.value = { ...expenses.value[index] }
    editIndex.value = index
  }
  
  const deleteExpense = (index) => {
    expenses.value.splice(index, 1)
    if (editIndex.value === index) {
      form.value = { name: '', amount: '' }
      editIndex.value = null
    }
  }
  
  const totalExpenses = computed(() =>
    expenses.value.reduce((sum, exp) => sum + Number(exp.amount), 0)
  )
  </script>
  