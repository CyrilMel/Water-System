import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import path from "path";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product-router.js";
import userRouter from "./routes/user-router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

const __dirname = path.resolve();
app.use(cors());

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRouter);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/client-side/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client-side", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
