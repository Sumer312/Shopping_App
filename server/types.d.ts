import { Document, Schema } from "mongoose";

interface cartType {
  productID: Schema.Types.ObjectId;
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
        productID: Schema.Types.ObjectId;
      }
    ];
  };
  cart: {
    items: Array<cartType>;
  };
  addToCart(product: productType): void;
  removeFromCart(productId: Schema.Types.ObjectId): void;
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
    seller: HydratedDocument<sellerType>;
    consumer: HydratedDocument<consumerType>;
  }
}
