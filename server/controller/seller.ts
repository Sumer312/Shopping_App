import { Request, Response, NextFunction } from "express";
import Product from "../models/products";
import Seller from "../models/seller";
import bcrypt from "bcrypt";
import { imageObjectType } from "../types";
import cloudinary from "../config/cloudinary";
import { createAccessToken } from "./auth";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = await req.body;
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
    res.status(201).json({
      id: seller._id,
      name: seller.name,
      email: seller.email,
      token: accessToken,
      message: "seller account created",
      role: "seller",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  await Seller.findOne({ email: email, password: password }).then(
    async (seller) => {
      if (!seller) {
        res
          .status(404)
          .json({ message: "No account with these credentials found" });
      } else {
        try {
          const accessToken = await createAccessToken(seller._id, "seller");
          res.status(200).json({
            _id: seller._id,
            name: seller.name,
            email: seller.email,
            token: accessToken,
            message: "Successfully logged in",
            role: "seller",
          });
        } catch (err) {
          console.log(err);
        }
      }
    }
  );
};

const handleData = async (req: Request, res: Response, next: NextFunction) => {
  const {
    title,
    snippet,
    description,
    quantity,
    price,
    coverImage,
    imageArray,
    category,
  } = await req.body;
  try {
    const imageUrlArray: Array<imageObjectType> = [];
    const coverImageUpload = await cloudinary.uploader.upload(coverImage);
    for (let i = 0; i < imageArray.length; i++) {
      await cloudinary.uploader.upload(imageArray[i]).then((result) => {
        imageUrlArray.push({
          publicId: result.public_id,
          secureUrl: result.secure_url,
        });
      });
    }
    console.log(req.seller)
    const product = await Product.create({
      title: title,
      snippet: snippet,
      description: description,
      quantity: quantity,
      price: price,
      coverImageUrl: coverImageUpload.secure_url,
      imageArray: imageUrlArray,
      category: category,
      sellerId: req.seller,
    });
    console.log(product);
    if (product) {
      res.status(200).json({ message: "Product added" });
    }
  } catch (err) {
    console.log(err);
  }
};

export { handleData, login, signup };
