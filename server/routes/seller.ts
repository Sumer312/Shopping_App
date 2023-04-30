import { Router } from "express";
import { handleData, login, logoOut, signup } from "../controller/seller";
import isAuth from "../middleware/isAuth";

const router = Router();

router.post("/post", isAuth, handleData);
router.post("/signup", signup);
router.post("/login", login);
router.delete("/logout", logoOut)

export default router;
