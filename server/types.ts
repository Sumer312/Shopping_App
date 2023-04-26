import { Document, Schema, HydratedDocument } from "mongoose";

export interface cartType {
  productID: Schema.Types.ObjectId;
  quantity: number;
}

export interface sellerType extends Document {
  name: string;
  email: string;
  password: string;
  resetToken: string;
  resetTokenExpirationDate: Date;
}

export interface consumerType extends Document {
  name: string;
  email: string;
  password: string;
  resetToken: string;
  resetTokenExpirationDate: Date;
  rating: {
    items: [
      {
        productID: Schema.Types.ObjectId;
      }
    ];
  };
  cart: {
    items: Array<cartType>;
  };
  addToCart(product: any): void;
  removeFromCart(productId: Schema.Types.ObjectId): void;
  clearCart(): void;
}

export interface imageObjectType {
  publicId: string;
  secureUrl: string;
}

export interface FileFilterCallback {
  error: null | Error;
  filename: string;
}

declare module "express-serve-static-core" {
  export interface Request {
    seller: HydratedDocument<sellerType>;
    consumer: HydratedDocument<consumerType>;
  }
}
