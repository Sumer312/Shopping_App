import { Router } from "express";
import {
  cancelOrder,
  getOrders,
  login,
  placeOrder,
  sendDataByCategory,
  sendDataById,
} from "../controller/consumer";
import isAuth from "../middleware/isAuth";
import { signup } from "../controller/consumer";

const router = Router();

router.get("/get/:category", sendDataByCategory);
router.get("/getById/:prodID", sendDataById);
router.post("/login", login);
router.post("/signup", signup);
router.post("/place-order", isAuth, placeOrder);
router.get("/my-orders/:consumerId", getOrders);
router.delete("/cancel-order/:orderId", cancelOrder);

export default router;
