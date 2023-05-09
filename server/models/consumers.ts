import mongoose, { Schema, model } from "mongoose";
import { cartType, consumerType } from "../types";

const ConsumerSchema = new Schema({
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
  cart: {
    items: [
      {
        productID: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

ConsumerSchema.methods.addToCart = function (product: any): void {
  const productIndex: number = this.cart.items.findIndex((cp: cartType) => {
    return cp.productID == product._id;
  });
  let newQuantity: number = 1;
  const updatedCartItems: Array<cartType> = [...this.cart.items];
  if (productIndex === -1) {
    updatedCartItems.push({
      productID: product._id,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

ConsumerSchema.methods.incrementProductInCart = function (product: any): void {
  const productIndex: number = this.cart.items.findIndex((cp: cartType) => {
    return cp.productID == product._id;
  });
  let newQuantity: number = 1;
  const updatedCartItems: Array<cartType> = [...this.cart.items];
  if (productIndex >= 0) {
    newQuantity = this.cart.items[productIndex].quantity + 1;
    updatedCartItems[productIndex].quantity = newQuantity;
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

ConsumerSchema.methods.decrementProductInCart = function (product: any): void {
  const productIndex: number = this.cart.items.findIndex((cp: cartType) => {
    return cp.productID == product._id;
  });
  let newQuantity: number = 1;
  const updatedCartItems: Array<cartType> = [...this.cart.items];
  if (productIndex >= 0) {
    newQuantity =
      this.cart.items[productIndex].quantity >= 1
        ? this.cart.items[productIndex].quantity - 1
        : 0;
    updatedCartItems[productIndex].quantity = newQuantity;
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

ConsumerSchema.methods.removeFromCart = function (
  productID: Schema.Types.ObjectId
): void {
  const updatedCartItems = this.cart.items.filter((item: cartType) => {
    return item.productID.toString() !== productID.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

export default model<consumerType>("Consumer", ConsumerSchema);
