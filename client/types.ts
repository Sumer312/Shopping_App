export interface cardPropType {
  title: string;
  snippet: string;
  description: string;
  imageObj: { publicId: string; secureUrl: string };
  price: number;
}


export interface ordersType {
  _id: string;
  products: Array<{
    product: { title: string; price: number; _id: string; snippet: string };
    quantity: number;
  }>;
  consumerId: string;
}
export interface orderCardType {
  title: string;
  snippet: string;
  quantity: number;
  id: string;
}
export interface imageArray {
  imageArray: Array<string>;
}

export interface cartCardType {
  title: string;
  snippet: string;
  quantity: number;
  maxQuantity: number;
  price: number;
  id: string;
}

export interface cardType {
  _id: string;
  title: string;
  snippet: string;
  description: string;
  quantity: number;
  price: number;
  coverImage: { publicId: string; secureUrl: string };
  imageArray: Array<{ publicId: string; secureUrl: string }>;
}

export interface prodType {
  title: string;
  snippet: string;
  description: string;
  coverImage: { publicId: string; secureUrl: string };
  imageArray: Array<{ publicId: string; secureUrl: string }>;
  price: number;
  quantity: number;
}
