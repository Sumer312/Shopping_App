import { Router } from "express";
import { handleData, login, signup } from "../controller/seller";
import isAuth from "../middleware/isAuth";

const router = Router();

router.post("/post", isAuth, handleData);
router.post("/signup", signup);
router.post("/login", login);

export default router;
