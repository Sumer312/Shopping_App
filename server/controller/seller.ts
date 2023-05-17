import { Request, Response, NextFunction } from "express";
import Product from "../models/products";
import Seller from "../models/seller";
import bcrypt from "bcrypt";
import { imageObjectType } from "../types";
import cloudinary from "../config/cloudinary";
import { createAccessToken } from "./auth";
import "dotenv/config";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  const prevEmail = await Seller.findOne({ email: email });
  if (prevEmail) {
    res.status(400).json({ message: "Email already in use" });
    return;
  }
  await Seller.findOne({ name: name, email: email, password: password }).then(
    (seller) => {
      if (seller) {
        res.status(409).json({ message: "Seller account already exists" });
      }
    }
  );
  const saltRounds = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const seller = await Seller.create({
    name: name,
    email: email,
    password: hashedPassword,
  });
  try {
    const accessToken = await createAccessToken(seller._id, "seller");
    res
      .status(201)
      .json({ message: "cookie sent", token: accessToken, id: seller._id });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  await Seller.findOne({ email: email }).then((seller) => {
    if (!seller) {
      res
        .status(404)
        .json({ message: "No account with these credentials found" });
    } else {
      try {
        bcrypt.compare(password, seller.password, async (err, data) => {
          if (err) {
            throw err;
          } else if (data) {
            const accessToken = await createAccessToken(seller._id, "seller");
            res.status(200).json({
              message: "token sent",
              token: accessToken,
              id: seller._id,
            });
          } else {
            res.status(400).json({ message: "Invalid password" });
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  });
};

const cloudinaryUploadFunction = async (
  file: string
): Promise<imageObjectType> => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (err, res) => {
      if (res) {
        if (err) {
          console.log(err);
        }
        resolve({
          publicId: res.public_id,
          secureUrl: res.secure_url,
        });
      }
    });
  });
};


const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {
    title,
    snippet,
    description,
    quantity,
    price,
    coverImage,
    imageArray,
    category,
  } = req.body;
  try {
    console.log(req.seller);
    const coverImageUpload = await cloudinaryUploadFunction(coverImage);
    if (imageArray !== undefined) {
      const imageUrlArray: Array<imageObjectType> = [];
      for (let i = 0; i < imageArray.length; i++) {
        cloudinaryUploadFunction(imageArray[i]).then((image) => {
          imageUrlArray.push(image);
          if (i === imageArray.length - 1) {
            const product = new Product({
              title: title,
              snippet: snippet,
              description: description,
              quantity: quantity,
              price: price,
              coverImage: coverImageUpload,
              imageArray: imageUrlArray,
              category: category,
              sellerId: req.seller,
            });
            product.save();
            console.log(product);
            if (product) {
              res.status(200).json({
                message: "Product added",
                category: category,
              });
            }
          }
        });
      }
    } else {
      const product = new Product({
        title: title,
        snippet: snippet,
        description: description,
        quantity: quantity,
        price: price,
        coverImage: coverImageUpload,
        imageArray: [],
        category: category,
        sellerId: req.seller,
      });
      product.save();
      console.log(product);
      if (product) {
        res.status(200).json({
          message: "Product added",
          category: category,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, snippet, description, quantity, price, sellerId, prodId } =
    req.body;
  try {
    Product.findOneAndUpdate(
      { sellerId: sellerId, _id: prodId },
      {
        title: title,
        snippet: snippet,
        description: description,
        quantity: quantity,
        price: price,
      }
    ).then(() => {
      res.status(200).json({ message: "Product updated" });
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
    console.log(err);
  }
};

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const { sellerId } = req.params;
  const products = await Product.find({ sellerId: sellerId });
  res
    .status(products ? 200 : 404)
    .json(
      products
        ? { message: "Products found", products: products }
        : { message: "No products found" }
    );
};

const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { prodId } = req.params;
  const product = await Product.findById(prodId);
  res
    .status(product ? 200 : 404)
    .json(
      product
        ? { message: "Product found", product: product }
        : { message: "No product found" }
    );
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sellerId, prodId } = req.body;
  try {
    Product.findOne({ sellerId: sellerId, _id: prodId })
      .then((res) => {
        if (res) {
          const { imageArray, coverImage } = res;
          cloudinary.uploader.destroy(coverImage.publicId).then(() => {
            if (imageArray.length > 0) {
              for (let i = 0; i < imageArray.length; i++) {
                if (imageArray[i]) {
                  cloudinary.uploader.destroy(imageArray[i].publicId!);
                }
              }
            }
          });
          console.log(coverImage, "  ", imageArray);
        }
      })
      .then(() => {
        return Product.findOneAndDelete({ sellerId: sellerId, _id: prodId });
      })
      .then(() => {
        res.status(200).json({ message: "Product deleted" });
      });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
    console.log(err);
  }
};

export {
  addProduct,
  updateProduct,
  login,
  signup,
  getProducts,
  getProductById,
  deleteProduct,
};
