import { Request, Response } from "express";
import Product from "../models/products";
import Consumer from "../models/consumers";
import bcrypt from "bcrypt";
import { createAccessToken } from "./auth";
import Order from "../models/orders";
import { Types } from "mongoose";

const sendDataByCategory = async (
  req: Request,
  res: Response
) => {
  const { category } = req.params;
  const data = await Product.find({ category: category });
  res.status(200).send(JSON.stringify(data));
};

const sendDataById = async (
  req: Request,
  res: Response
) => {
  const { prodID } = req.params;
  console.log(prodID);
  const data = await Product.findOne({ _id: prodID });
  res.status(200).json(JSON.stringify(data));
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  await Consumer.findOne({ email: email }).then((consumer) => {
    if (!consumer) {
      res
        .status(404)
        .json({ message: "No account with these credentials found" });
    } else {
      try {
        bcrypt.compare(password, consumer.password, async (err, data) => {
          if (err) {
            throw err;
          } else if (data) {
            const accessToken = await createAccessToken(
              consumer._id,
              "Consumer"
            );
            res.status(200).json({
              message: "token sent",
              role: "consumer",
              token: accessToken,
              id: consumer._id,
            });
          }
        });
      } catch (err) {
        console.log(err);
        res.status(404).json(err);
      }
    }
  });
};

const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const prevEmail = await Consumer.findOne({ email: email });
  if (prevEmail) {
    res.status(400).json({ message: "Email already taken" });
    return;
  }
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

const placeOrder = async (req: Request, res: Response) => {
  const { quantity, prodId, consumerId } = req.body;
  const prod = await Product.findById(prodId);
  if (!prod) {
    res.status(404).json({ message: "No such product exists" });
    return;
  } else if (prod.quantity < quantity) {
    res.status(400).json({ message: "Not enough quantity" });
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

const getOrders = async (req: Request, res: Response) => {
  const { consumerId } = req.params;
  Order.find({ consumerId: consumerId }).then((orders) => {
    if (orders.length > 0) {
      res.status(200).json({ message: "Orders found", orders: orders });
    } else {
      res.status(404).json({ message: "No orders found" });
    }
  });
};

const cancelOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  Order.findById(orderId)
    .then((order) => {
      if (order) {
        for (let i = 0; i < order.products.length; i++) {
          Product.findById(order.products[i].product._id).then((product) => {
            if (product) {
              product.quantity += order.products[i].quantity;
              product.save();
            } else {
              console.log("No product found");
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

const getCart = async (req: Request, res: Response) => {
  const { consumerId } = req.params;
  let prodArray: Array<{
    title: string;
    snippet: string;
    maxQuantity: number;
    quantity: number;
    price: number;
    id: Types.ObjectId;
  }> = [];
  Consumer.findById(consumerId)
    .then((consumer) => {
      if (consumer) {
        for (let i = 0; i < consumer.cart.items.length; i++) {
          Product.findById(consumer.cart.items[i].productId).then((product) => {
            if (product) {
              prodArray.push({
                title: product.title,
                snippet: product.snippet,
                maxQuantity: product.quantity,
                price: product.price,
                quantity: consumer.cart.items[i].quantity,
                id: product._id,
              });
              if (i === consumer.cart.items.length - 1) {
                res.status(200).json({
                  message: "Cart found",
                  cart: prodArray,
                });
              }
            }
          });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const addToCart = async (req: Request, res: Response) => {
  const { prodId, consumerId, quantity } = req.body;
  try {
    Consumer.findById(consumerId).then((consumer) => {
      if (consumer) {
        Product.findById(prodId).then((product) => {
          if (product) {
            consumer.addToCart(product._id, quantity);
            res.status(200).json({ message: "Product successfully added" });
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const incrementCart = async (
  req: Request,
  res: Response
) => {
  const { prodId, consumerId } = req.body;
  try {
    Consumer.findById(consumerId).then((consumer) => {
      if (consumer) {
        Product.findById(prodId).then((product) => {
          if (product) {
            consumer.incrementProductInCart(product?._id);
            res
              .status(200)
              .json({ message: "Quantity successfully incremented" });
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const decrementCart = async (
  req: Request,
  res: Response
) => {
  const { prodId, consumerId } = req.body;
  try {
    Consumer.findById(consumerId).then((consumer) => {
      if (consumer) {
        Product.findById(prodId).then((product) => {
          if (product) {
            consumer.decrementProductInCart(product._id);
            res
              .status(200)
              .json({ message: "Quantity successfully decremented" });
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const removeFromCart = async (
  req: Request,
  res: Response
) => {
  const { prodId, consumerId } = req.body;
  try {
    Consumer.findById(consumerId).then((consumer) => {
      if (consumer) {
        Product.findById(prodId).then((product) => {
          if (product) {
            consumer.removeFromCart(product._id);
            res.status(200).json({ message: "Product successfully removed" });
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const clearCart = async (req: Request, res: Response) => {
  const { consumerId } = req.params;
  Consumer.findById(consumerId).then((consumer) => {
    if (consumer) {
      consumer.clearCart();
      res.status(200).json({ message: "Cart cleared" });
    }
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
  getCart,
  addToCart,
  incrementCart,
  decrementCart,
  removeFromCart,
  clearCart,
};
