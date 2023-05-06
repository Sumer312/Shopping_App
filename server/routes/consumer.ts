import { Router } from "express";
import {
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

export default router;
