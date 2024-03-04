import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Schema } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export const createAccessToken = async (
  _id: Schema.Types.ObjectId | string,
  role: string
) => {
  return jwt.sign(
    { _id, role },
    process.env.ACCESS_TOKEN ? process.env.ACCESS_TOKEN : "secret",
    { expiresIn: "7d" }
  );
};

const createRefreshToken = async (id: any) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN!.toString(), {
    expiresIn: "7d",
  });
};

export const logout = async (
  req: Request,
  res: Response,
) => {
  if (req.seller) {
    req.seller = null;
  } else if (req.consumer) {
    req.consumer = null;
  }
  res.status(200).json({ message: "Logged Out" });
};
