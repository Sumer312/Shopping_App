import { Schema, model, Types } from "mongoose";
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
        productId: {
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

ConsumerSchema.methods.addToCart = function (productId: Types.ObjectId, quantity: number): void {
  const productIndex: number = this.cart.items.findIndex((cp: cartType) => {
    return JSON.stringify(cp.productId) === JSON.stringify(productId);
  });
  let newQuantity: number = quantity;
  const updatedCartItems: Array<cartType> = [...this.cart.items];
  if (productIndex === -1) {
    updatedCartItems.push({
      productId: productId,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

ConsumerSchema.methods.incrementProductInCart = function (
  productId: Types.ObjectId
): void {
  const productIndex: number = this.cart.items.findIndex((cp: cartType) => {
    return JSON.stringify(cp.productId) === JSON.stringify(productId);
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

ConsumerSchema.methods.decrementProductInCart = function (
  productId: Types.ObjectId
): void {
  const productIndex: number = this.cart.items.findIndex((cp: cartType) => {
    return JSON.stringify(cp.productId) == JSON.stringify(productId);
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
  productId: Types.ObjectId
): void {
  const updatedCartItems = this.cart.items.filter((item: cartType) => {
    return JSON.stringify(item.productId) !== JSON.stringify(productId);
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

ConsumerSchema.methods.clearCart = function (): void {
  this.cart = { };
  return this.save();
};

export default model<consumerType>("Consumer", ConsumerSchema);
