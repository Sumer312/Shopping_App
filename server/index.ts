import express, { Express, Request, Response, NextFunction } from "express";
import { default as sellerRouter } from "./routes/seller";
import { default as consumerRouter } from "./routes/consumer";
import mongoose from "mongoose";
import cors from "cors";
import { logout } from "./controller/auth";
import isAuth from "./middleware/isAuth";

const app: Express = express();
const PORT = process.env.PORT || 5000;

const MONGODB_URI: string = "mongodb://mongo:27017/PMS";

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/seller", sellerRouter);
app.use("/consumer", consumerRouter);
app.delete("/logout", isAuth, logout);

mongoose
  .connect(MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((err) => {
    console.log(err);
  });
