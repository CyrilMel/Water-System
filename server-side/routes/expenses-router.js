import express from "express";
import {getExpenses,createExpense,updateExpense,deleteExpense,} from "../controllers/ExpensesController.js";

const router = express.Router();

router.get("/", getExpenses);
router.post("/", createExpense);
router.patch("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
