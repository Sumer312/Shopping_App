import { Router } from "express";
import { buyProduct, sendDataByCategory, sendDataById } from "../controller/consumer";
import isAuth from "../middleware/isAuth";

const router = Router();

router.get("/get/:category", sendDataByCategory)
router.get("/getById/:prodID", sendDataById)
router.get("/buy/:prodID", isAuth, buyProduct)

export default router
