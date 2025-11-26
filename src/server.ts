import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRouter from "./routes/product.routes";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/products", productRouter);
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Server is running!");
});

// 404 fallback
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Invalid route!");
});

const PORT = process.env.PORT || 3000;
const CONN_STRING = process.env.DATABASE_URL;

if (!PORT || !CONN_STRING) {
  throw new Error("Missing port or connection string!");
}

mongoose
  .connect(CONN_STRING, { dbName: "store" })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("Failed to connect to MongoDB", err));
