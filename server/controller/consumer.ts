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
  } else if (prod.quantity < quantity) {
    res.status(400).json({ message: "not enough quantity" });
    return;
  }
  Order.create({
    consumerId: consumerId,
    products: [
      {
        product: {
          title: prod.title,
          snippet: prod.snippet,
          price: prod.price,
          _id: prod._id,
        },
        quantity: quantity,
      },
    ],
  }).then(() => {
    prod!.quantity -= quantity;
    prod.save();
    res.status(200).json({ message: "New order added" });
  });
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  const { consumerId } = req.params;
  Order.find({ consumerId: consumerId }).then((orders) => {
    if (orders.length > 0) {
      res.status(200).json({ message: "Orders found", orders: orders });
    } else {
      res.status(404).json({ message: "no orders found" });
    }
  });
};

const cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { orderId } = req.params;
  Order.findById(orderId)
    .then((order) => {
      if (order) {
        for (let i = 0; i < order.products.length; i++) {
          Product.findById(order.products[i].product._id).then((product) => {
            if (product) {
              product.quantity += order.products[i].quantity;
              product.save()
            } else {
              console.log("no product found");
            }
          });
        }
      } else {
        res.status(404).json({ message: "No such order" });
      }
    })
    .then(() => {
      Order.deleteOne({ _id: orderId }).then(() => {
        res.status(200);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export {
  sendDataByCategory,
  sendDataById,
  placeOrder,
  login,
  signup,
  getOrders,
  cancelOrder,
};
