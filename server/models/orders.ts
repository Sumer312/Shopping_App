import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
    consumerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Consumer",
    },
  },
);

export default model("Order", OrderSchema);
