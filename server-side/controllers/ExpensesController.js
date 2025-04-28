import Expense from "../models/expense.js";
import mongoose from "mongoose";

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({});
    res.status(200).json({ success: true, expenses: expenses });
  } catch (error) {
    console.error("Error in fetching expenses:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createExpense = async (req, res) => {
  const expense = req.body;

  if (
    expense.water == null ||
    expense.electricity == null ||
    expense.internet == null ||
    expense.salaries_expenses == null ||
    expense.advertising_expenses == null ||
    expense.repairs_and_maintenance == null ||
    expense.supplies_expenses == null ||
    expense.sales == null ||
    expense.total_expenses == null
  ) {
    
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }

  const newExpense = new Expense(expense);

  try {
    await newExpense.save();
    res.status(201).json({ success: true, expense: newExpense });
  } catch (error) {
    console.error("Error in creating expense:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const expense = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Expense Id" });
  }

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(id, expense, { new: true });
    res.status(200).json({ success: true, expense: updatedExpense });
  } catch (error) {
    console.error("Error in updating expense:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Expense Id" });
  }

  try {
    await Expense.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Expense Deleted" });
  } catch (error) {
    console.error("Error in deleting expense:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
