import mongoose, { Schema, model } from "mongoose";
import { cartType, sellerType } from "../types";

const SellerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExpirationDate: Date,
});

export default model<sellerType>("Seller", SellerSchema);
