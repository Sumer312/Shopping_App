import { Router } from "express";
import {
  addToCart,
  cancelOrder,
  clearCart,
  decrementCart,
  getCart,
  getOrders,
  incrementCart,
  login,
  placeOrder,
  removeFromCart,
  sendDataByCategory,
  sendDataById,
} from "../controller/consumer";
import isAuth from "../middleware/isAuth";
import { signup } from "../controller/consumer";

const router = Router();

router.get("/get/:category", sendDataByCategory);
router.get("/get-by-Id/:prodID", sendDataById);
router.post("/login", login);
router.post("/signup", signup);
router.post("/place-order", isAuth, placeOrder);
router.get("/my-orders/:consumerId", isAuth, getOrders);
router.delete("/cancel-order/:orderId", isAuth, cancelOrder);
router.post("/add-to-cart", isAuth, addToCart);
router.post("/increment-cart", isAuth, incrementCart);
router.post("/decrement-cart", isAuth, decrementCart);
router.post("/delete-from-cart", isAuth, removeFromCart);
router.get("/get-cart/:consumerId", isAuth, getCart);
router.delete("/clear-cart/:consumerId", isAuth, clearCart);

export default router;
