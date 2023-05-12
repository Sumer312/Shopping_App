import { Document, Schema, HydratedDocument, Types } from "mongoose";

interface cartType {
  productId: Schema.Types.ObjectId | Types.ObjectId;
  quantity: number;
}

interface sellerType extends Document {
  name: string;
  email: string;
  password: string;
  resetToken: string;
  resetTokenExpirationDate: Date;
}

interface consumerType extends Document {
  name: string;
  email: string;
  password: string;
  resetToken: string;
  resetTokenExpirationDate: Date;
  rating: {
    items: [
      {
        productId: Schema.Types.ObjectId;
      }
    ];
  };
  cart: {
    items: Array<cartType>;
  };
  addToCart(productId: Types.ObjectId, quantity: number): void;
  decrementProductInCart(productId: Types.ObjectId): void;
  incrementProductInCart(productId: Types.ObjectId): void;
  removeFromCart(productId: Types.ObjectId): void;
  clearCart(): void;
}

interface imageObjectType {
  publicId: string;
  secureUrl: string;
}

interface FileFilterCallback {
  error: null | Error;
  filename: string;
}

declare module "express-serve-static-core" {
  interface Request {
    seller: HydratedDocument<sellerType> | null;
    consumer: HydratedDocument<consumerType> | null;
  }
}
