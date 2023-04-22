import { Schema, model, ObjectId } from "mongoose";
import { imageObjectType} from "../types";

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
  coverImageUrl: {
    type: String,
    required: true,
  },
  imageArray: {
    type: Array<imageObjectType>,
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
