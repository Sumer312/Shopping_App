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
  await Seller.findOne({ name: name, email: email, password: password }).then(
    (seller) => {
      if (seller) {
        res.status(409).json({ message: "seller account already exists" });
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
    // cloudinary.api
    //   .ping()
    //   .then((res) => {
    //     console.log(`Cloudinary connection ${res.status}`);
    //   })
    //   .catch((err) => console.log(err + " OH NO!!!!"));

    const imageUrlArray: Array<imageObjectType> = [];
    const coverImageUpload = { public_id: "", secure_url: "" };
    // await cloudinary.uploader.upload(coverImage);
    if (imageArray !== undefined) {
      for (let i = 0; i < imageArray.length; i++) {
        const image = await cloudinary.uploader.upload(imageArray[i]);
        imageUrlArray.push({
          publicId: image.public_id,
          secureUrl: image.secure_url,
        });
      }
    }
    console.log(req.seller);
    const product = await Product.create({
      title: title,
      snippet: snippet,
      description: description,
      quantity: quantity,
      price: price,
      coverImage: {
        publicId: coverImageUpload.public_id,
        secureUrl: coverImageUpload.secure_url,
      },
      imageArray: imageUrlArray,
      category: category,
      sellerId: req.seller,
    });
    console.log(product);
    if (product) {
      res.status(200).json({
        message: "Product added",
        category: category,
      });
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
      res.status(200).json({ message: "product updated" });
    });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
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
        : { message: "no products found" }
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
        : { message: "no product found" }
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
      .then(async (res) => {
        try {
          if (res) {
            const { imageArray, coverImage } = res;
            console.log(coverImage, "  ", imageArray);
            await cloudinary.uploader.destroy(coverImage.public_id);
            for (let i = 0; i < imageArray.length; i++) {
              if (imageArray[i]) {
                await cloudinary.uploader.destroy(imageArray[i].publicId!);
              }
            }
          }
        } catch (err) {
          console.log(err);
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
