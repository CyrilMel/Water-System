import Expense from "../models/expenses.js";
import mongoose from "mongoose";

const calculateSubTotal = (data) => {
  return (
    data.water +
    data.electricity +
    data.internet +
    data.salaries_expenses +
    data.advertising_expenses +
    data.repairs_and_maintenance +
    data.supplies_expenses
  );
};

// GET: Get all expenses with date and month
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });

    const formatted = expenses.map((expense) => ({
      ...expense._doc,
      date: expense.createdAt.toISOString().split("T")[0],
      month: expense.createdAt.toLocaleString("default", { month: "long" }),
    }));

    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const createExpense = async (req, res) => {
  try {
    const {
      water,
      electricity,
      internet,
      salaries_expenses,
      advertising_expenses,
      repairs_and_maintenance,
      supplies_expenses,
      sales
    } = req.body;

    const sub_total = calculateSubTotal(req.body);
    const total = sub_total - sales;

    const newExpense = await Expense.create({
      water,
      electricity,
      internet,
      salaries_expenses,
      advertising_expenses,
      repairs_and_maintenance,
      supplies_expenses,
      sales,
      sub_total,
      total
    });

    // Add date and month fields
    res.status(201).json({
      ...newExpense._doc,
      date: newExpense.createdAt.toISOString().split("T")[0],
      month: newExpense.createdAt.toLocaleString("default", { month: "long" }),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Expense Id" });
  }

  const {
    water,
    electricity,
    internet,
    salaries_expenses,
    advertising_expenses,
    repairs_and_maintenance,
    supplies_expenses,
    sales
  } = req.body;

  const sub_total = calculateSubTotal(req.body);
  const total = sub_total - sales;

  const updatedData = {
    water,
    electricity,
    internet,
    salaries_expenses,
    advertising_expenses,
    repairs_and_maintenance,
    supplies_expenses,
    sales,
    sub_total,
    total
  };

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(id, updatedData, { new: true });
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
