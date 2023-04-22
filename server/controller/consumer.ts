import { Request, Response, NextFunction } from "express";
import Product from "../models/products";
import mongoose from "mongoose";

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

const buyProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export { sendDataByCategory, sendDataById, buyProduct };
