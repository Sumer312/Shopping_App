import { Router } from "express";
import { buyProduct, login, sendDataByCategory, sendDataById } from "../controller/consumer";
import isAuth from "../middleware/isAuth";
import { signup } from "../controller/consumer";

const router = Router();

router.get("/get/:category", sendDataByCategory)
router.get("/getById/:prodID", sendDataById)
router.get("/login", login)
router.get("/signup", signup)
router.get("/buy/:prodID", isAuth, buyProduct)

export default router
