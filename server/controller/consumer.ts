import { Request, Response, NextFunction } from "express";
import Product from "../models/products";
import Consumer from "../models/consumers";
import bcrypt from "bcrypt";
import { createAccessToken } from "./auth";
const sendDataByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { category } = req.params;
  const data = await Product.find({ category: category });
  res.status(200).send(JSON.stringify(data));
};

const sendDataById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { prodID } = req.params;
  console.log(prodID);
  const data = await Product.findOne({ _id: prodID });
  res.status(200).json(JSON.stringify(data));
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  await Consumer.findOne({ name: name, email: email, password: password }).then(
    async (consumer) => {
      if (!consumer) {
        res
          .status(404)
          .json({ message: "No account with these credentials found" });
      } else {
        try {
          const accessToken = await createAccessToken(consumer._id, "Consumer");
          res
            .status(201)
            .cookie("consumer", accessToken, {
              httpOnly: true,
              sameSite: "none",
              secure: true,
              path: "/",
            })
            .json({ message: "cookie sent", role: "consumer" });
        } catch (err) {
          console.log(err);
          res.status(404).json(err);
        }
      }
    }
  );
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  await Consumer.findOne({ name: name, email: email, password: password }).then(
    (consumer) => {
      if (consumer) {
        res.status(409).json({ message: "Consumer account already exists" });
      }
    }
  );
  const saltRounds = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const consumer = await Consumer.create({
    name: name,
    email: email,
    password: hashedPassword,
  });
  try {
    const accessToken = await createAccessToken(consumer._id, "Consumer");
    res
      .status(201)
      .cookie("consumer", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
      })
      .json({ message: "cookie sent", role: "consumer" });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

const buyProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export { sendDataByCategory, sendDataById, buyProduct, login, signup };
