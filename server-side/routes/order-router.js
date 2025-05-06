import express from "express";

import { createOrder, getOrders, getOrderById, getOrdersByUserId, updateOrderStatus, deleteOrder} from "../controllers/OrderController.js";
const router = express.Router();

router.get('/', getOrders);
router.post('/', createOrder);
router.get('/:id', getOrderById);
router.get('/user/:userId', getOrdersByUserId);
router.patch('/:id/status', updateOrderStatus);
router.delete('/:id', deleteOrder);

export default router;