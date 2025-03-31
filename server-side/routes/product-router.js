import express from "express";
import { getProduct, createProduct, updatedProduct, deleteProduct} from "../controllers/ProductController.js";
import { createUser, getUser } from "../controllers/UserController.js";

const router = express.Router();

router.get("/", getProduct);
router.post("/", createProduct);
router.put("/:id", updatedProduct);
router.delete("/:id", deleteProduct);

export default router;
