import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product-router.js";
import userRouter from "./routes/user-router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors());

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
