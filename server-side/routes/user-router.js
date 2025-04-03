import express from "express";
import { createUser, deleteUser, getUser, updatedUser } from "../controllers/UserController.js";


const router = express.Router();

router.get("/", getUser);
router.post("/", createUser);
router.put("/:id", updatedUser);
router.delete("/:id", deleteUser);

export default router;