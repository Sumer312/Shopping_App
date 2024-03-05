"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seller_1 = require("../controller/seller");
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const router = (0, express_1.Router)();
router.post("/add-product", isAuth_1.default, seller_1.addProduct);
router.post("/signup", seller_1.signup);
router.post("/login", seller_1.login);
router.post("/edit-product", isAuth_1.default, seller_1.updateProduct);
router.get("/get-products/:sellerId", isAuth_1.default, seller_1.getProducts);
router.get("/get-product/:prodId", isAuth_1.default, seller_1.getProductById);
router.post("/delete-product", isAuth_1.default, seller_1.deleteProduct);
exports.default = router;
