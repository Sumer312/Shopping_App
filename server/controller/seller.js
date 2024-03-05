"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.getProductById = exports.getProducts = exports.signup = exports.login = exports.updateProduct = exports.addProduct = void 0;
const products_1 = __importDefault(require("../models/products"));
const seller_1 = __importDefault(require("../models/seller"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const auth_1 = require("./auth");
require("dotenv/config");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const prevEmail = yield seller_1.default.findOne({ email: email });
    if (prevEmail) {
        res.status(400).json({ message: "Email already in use" });
        return;
    }
    yield seller_1.default.findOne({ name: name, email: email, password: password }).then((seller) => {
        if (seller) {
            res.status(409).json({ message: "Seller account already exists" });
        }
    });
    const saltRounds = yield bcrypt_1.default.genSalt(12);
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    const seller = yield seller_1.default.create({
        name: name,
        email: email,
        password: hashedPassword,
    });
    try {
        const accessToken = yield (0, auth_1.createAccessToken)(seller._id, "seller");
        res
            .status(201)
            .json({ message: "cookie sent", token: accessToken, id: seller._id });
    }
    catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    yield seller_1.default.findOne({ email: email }).then((seller) => {
        if (!seller) {
            res
                .status(404)
                .json({ message: "No account with these credentials found" });
        }
        else {
            try {
                bcrypt_1.default.compare(password, seller.password, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
                    if (err) {
                        throw err;
                    }
                    else if (data) {
                        const accessToken = yield (0, auth_1.createAccessToken)(seller._id, "seller");
                        res.status(200).json({
                            message: "token sent",
                            token: accessToken,
                            id: seller._id,
                        });
                    }
                    else {
                        res.status(400).json({ message: "Invalid password" });
                    }
                }));
            }
            catch (err) {
                console.log(err);
            }
        }
    });
});
exports.login = login;
const cloudinaryUploadFunction = (file) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        cloudinary_1.default.uploader.upload(file, (err, res) => {
            if (res) {
                if (err) {
                    console.log(err);
                }
                resolve({
                    publicId: res.public_id,
                    secureUrl: res.secure_url,
                });
            }
        });
    });
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, snippet, description, quantity, price, coverImage, imageArray, category, } = req.body;
    try {
        console.log(req.seller);
        const coverImageUpload = yield cloudinaryUploadFunction(coverImage);
        if (imageArray !== undefined) {
            const imageUrlArray = [];
            for (let i = 0; i < imageArray.length; i++) {
                cloudinaryUploadFunction(imageArray[i]).then((image) => {
                    imageUrlArray.push(image);
                    if (i === imageArray.length - 1) {
                        const product = new products_1.default({
                            title: title,
                            snippet: snippet,
                            description: description,
                            quantity: quantity,
                            price: price,
                            coverImage: coverImageUpload,
                            imageArray: imageUrlArray,
                            category: category,
                            sellerId: req.seller,
                        });
                        product.save();
                        console.log(product);
                        if (product) {
                            res.status(200).json({
                                message: "Product added",
                                category: category,
                            });
                        }
                    }
                });
            }
        }
        else {
            const product = new products_1.default({
                title: title,
                snippet: snippet,
                description: description,
                quantity: quantity,
                price: price,
                coverImage: coverImageUpload,
                imageArray: [],
                category: category,
                sellerId: req.seller,
            });
            product.save();
            console.log(product);
            if (product) {
                res.status(200).json({
                    message: "Product added",
                    category: category,
                });
            }
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.addProduct = addProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, snippet, description, quantity, price, sellerId, prodId } = req.body;
    try {
        products_1.default.findOneAndUpdate({ sellerId: sellerId, _id: prodId }, {
            title: title,
            snippet: snippet,
            description: description,
            quantity: quantity,
            price: price,
        }).then(() => {
            res.status(200).json({ message: "Product updated" });
        });
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
        console.log(err);
    }
});
exports.updateProduct = updateProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sellerId } = req.params;
    const products = yield products_1.default.find({ sellerId: sellerId });
    res
        .status(products ? 200 : 404)
        .json(products
        ? { message: "Products found", products: products }
        : { message: "No products found" });
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prodId } = req.params;
    const product = yield products_1.default.findById(prodId);
    res
        .status(product ? 200 : 404)
        .json(product
        ? { message: "Product found", product: product }
        : { message: "No product found" });
});
exports.getProductById = getProductById;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sellerId, prodId } = req.body;
    try {
        products_1.default.findOne({ sellerId: sellerId, _id: prodId })
            .then((res) => {
            if (res) {
                const { imageArray, coverImage } = res;
                cloudinary_1.default.uploader.destroy(coverImage.publicId).then(() => {
                    if (imageArray.length > 0) {
                        for (let i = 0; i < imageArray.length; i++) {
                            if (imageArray[i]) {
                                cloudinary_1.default.uploader.destroy(imageArray[i].publicId);
                            }
                        }
                    }
                });
                console.log(coverImage, "  ", imageArray);
            }
        })
            .then(() => {
            return products_1.default.findOneAndDelete({ sellerId: sellerId, _id: prodId });
        })
            .then(() => {
            res.status(200).json({ message: "Product deleted" });
        });
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
        console.log(err);
    }
});
exports.deleteProduct = deleteProduct;
