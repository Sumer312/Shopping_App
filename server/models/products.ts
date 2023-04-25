import { Schema, model, ObjectId } from "mongoose";

const imageSchema = new Schema({
  publicId: String,
  secureUrl: String,
});

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverImage: {
    type: Schema.Types.Mixed,
    required: true,
  },
  imageArray: {
    type: Array<{ publicId: String; secureUrl: String }>,
  },
  category: {
    type: String,
    required: true,
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "seller",
    required: true,
  },
});

export default model("Product", ProductSchema);
