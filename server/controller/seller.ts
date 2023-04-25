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
    // res.status(201).json({
    //   id: seller._id,
    //   name: seller.name,
    //   email: seller.email,
    //   token: accessToken,
    //   message: "seller account created",
    //   role: "seller",
    // });
    res
      .status(201)
      .cookie("seller", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
      })
      .json({ message: "cookie sent", role: "seller" });
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
  } = req.body;
  try {
    cloudinary.api
      .ping()
      .then((res) => {
        console.log(`Cloudinary connection ${res.status}`);
      })
      .catch((err) => console.log(err + "OH NOOOOOO!!!!"));

    const imageUrlArray: Array<imageObjectType> = [];
    const coverImageUpload = await cloudinary.uploader.upload(coverImage);
    if (imageArray !== undefined) {
      const sleep = (time: number) => {
        return new Promise((resolve) => setTimeout(resolve, time));
      };
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

export { handleData, login, signup };
