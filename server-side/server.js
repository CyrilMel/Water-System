import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product-router.js";
import userRouter from "./routes/user-router.js";
import addressRouter from "./routes/address-router.js"
import cartRouter from "./routes/cart-router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors());

app.use(express.json());

app.use("/api/addresses", addressRouter);
app.use("/api/products", productRoutes);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
