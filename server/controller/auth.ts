import jwt from "jsonwebtoken";
import { Schema } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export const createAccessToken = async (
  _id: Schema.Types.ObjectId | string,
  role: string
) => {
  console.log(process.env.ACCESS_TOKEN);
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
