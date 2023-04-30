export interface cardPropType {
  title: string;
  snippet: string;
  description: string;
  imageObj: { publicId: string; secureUrl: string };
  price: number;
}

export interface imageArray {
  imageArray: Array<string>;
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
