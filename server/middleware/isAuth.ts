import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Seller from "../models/seller";
import Consumer from "../models/consumers";
import * as dotenv from "dotenv";
import { Schema } from "mongoose";
dotenv.config();

interface JwtPayload {
  _id: Schema.Types.ObjectId | string;
  role: string;
}

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization?.split(" ")[1];
      console.log(token);
      const decodesToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN ? process.env.ACCESS_TOKEN : "secret"
      ) as JwtPayload;
      req.seller = await Seller.findById(decodesToken._id);
      req.consumer = await Consumer.findById(decodesToken._id);
      next();
    } else {
      console.log("not logged in");
      return res.status(401).json({ message: "unauthorized" });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "user not found" });
  }
};

export default isAuth;
