import Order from '../models/order.js';
import OrderItem from '../models/orderItem.js'; 
import mongoose from 'mongoose';
export const createOrder = async (req, res) => {
  try {
    const { orderItems, user, total, paymentMethod } = req.body;
    const orderId = 'ORD-' + Date.now();

    // Step 1: Create and save OrderItem documents
    const orderItemIds = await Promise.all(
      orderItems.map(async (item) => {
        const orderItem = new OrderItem({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          gallonType: item.gallonType,
        });

        const savedItem = await orderItem.save();
        return savedItem._id;
      })
    );

    // Step 2: Create and save the Order
    const newOrder = new Order({
      orderId,
      orderItems: orderItemIds,
      user,
      total,
      paymentMethod,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    console.log("Error creating order:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
    .populate({
      path: 'orderItems',
      populate: { path: 'productId', select: 'container_type' } // only fetch the product name
    })
    .populate('user');

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log("Error fetching orders:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get a single order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('orderItems')
      .populate('user');

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.log("Error fetching order by ID:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get orders by user ID
export const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId })
      .populate({
        path: 'orderItems',
        populate: {
          path: 'productId',
          select: 'product_name product_image price'
        }
      })
      .populate('user', 'name email');

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    console.log("Error updating order status:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.log("Error deleting order:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};