import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
  water: {
    type: Number,
    required: true,
  },
  electricity: {
    type: Number,
    required: true,
  },
  internet: {
    type: Number,
    required: true,
  },
  salaries_expenses: {
    type: Number,
    required: true,
  },
  advertising_expenses: {
    type: Number,
    required: true,
  },
  repairs_and_maintenance: {
    type: Number,
    required: true,
  },
  supplies_expenses: {
    type: Number,
    required: true,
  },
  sales: {
    type: Number,
    required: true,
  },
  sub_total: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
