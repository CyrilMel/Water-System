import Cart from "../models/cart.js";
import Product from "../models/product.js";

export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const addToCart = async (req, res) => {
  const { userId, productId } = req.body;  // Only pass userId and productId

  try {
    // Find the cart for the given user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product exists in the Product model
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Check if the product already exists in the cart
    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (existingItemIndex > -1) {
      // If it exists, increment the quantity
      cart.items[existingItemIndex].quantity += 1;
    } else {
      // If it's a new item, add it to the cart
      cart.items.push({
        productId,
        quantity: 1,  // Set initial quantity to 1
      });
    }

    // Save the updated cart
    await cart.save();

    // Return success response with updated cart
    res.status(200).json({ success: true, message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const updateCartItemQuantity = async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) return res.status(404).json({ success: false, message: "Product not in cart" });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (err) {
    console.error("Error updating quantity:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    await cart.save();

    res.status(200).json({ success: true, message: "Item removed from cart", cart });
  } catch (error) {
    console.error("Error removing from cart:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}