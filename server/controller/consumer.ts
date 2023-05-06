import { Request, Response, NextFunction } from "express";
import Product from "../models/products";
import Consumer from "../models/consumers";
import bcrypt from "bcrypt";
import { createAccessToken } from "./auth";
import Order from "../models/orders";

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
          res.status(200).json({
            message: "token sent",
            role: "consumer",
            token: accessToken,
            id: consumer._id,
          });
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
    res.status(201).json({
      message: "token sent",
      role: "consumer",
      token: accessToken,
      id: consumer._id,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

const placeOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { quantity, prodId, consumerId } = req.body;
  const prod = await Product.findById(prodId);
  if (!prod) {
    res.status(404).json({ message: "No such product exists" });
    return;
  }
  let flag: boolean = false;
  Order.findOne({ consumerId: consumerId }).then((order) => {
    if (order) {
      if (order.products.length != 0) {
        for (let i = 0; i < order.products.length; i++) {
          if (order.products[i].product._id === prodId) {
            order.products[i].quantity += quantity;
            flag = true;
            prod!.quantity -= quantity
            prod.save()
            res.status(200).json({ message: "New order added" });
          }
        }
      }
      if (flag === false) {
        order.products.push({ product: prod, quantity: quantity });
        prod!.quantity -= quantity
        prod.save()
        res.status(200).json({ message: "New order added" });
      }
    } else {
      Order.create({
        consumerId: consumerId,
        products: [{ product: prod, quantity: quantity }],
      }).then(() => {
        prod!.quantity -= quantity
        prod.save()
        res.status(200).json({ message: "New order added" });
      });
    }
  });
};

export { sendDataByCategory, sendDataById, placeOrder, login, signup };
