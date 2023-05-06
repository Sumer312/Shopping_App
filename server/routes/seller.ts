import { Router } from "express";
import {
  addProduct,
  updateProduct,
  getProducts,
  getProductById,
  login,
  signup,
  deleteProduct,
} from "../controller/seller";
import isAuth from "../middleware/isAuth";

const router = Router();

router.post("/add-product", isAuth, addProduct);
router.post("/signup", signup);
router.post("/login", login);
router.post("/edit-product", updateProduct);
router.get("/get-products/:sellerId", getProducts);
router.get("/get-product/:prodId", getProductById);
router.post("/delete-product", deleteProduct );

export default router;
