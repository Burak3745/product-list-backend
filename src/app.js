import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import productsRouter from "./routes/products.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
