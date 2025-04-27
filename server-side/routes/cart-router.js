import express from "express";
import { getCart, addToCart, updateCartItemQuantity, clearCart, removeFromCart } from "../controllers/CartController.js";

const router = express.Router();

router.get("/:userId", getCart);
router.post("/", addToCart);
router.put('/:userId/:productId', updateCartItemQuantity);
router.delete("/:userId", clearCart);
router.delete("/:userId/:productId", removeFromCart);

export default router;