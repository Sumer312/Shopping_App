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
exports.clearCart = exports.removeFromCart = exports.decrementCart = exports.incrementCart = exports.addToCart = exports.getCart = exports.cancelOrder = exports.getOrders = exports.signup = exports.login = exports.placeOrder = exports.sendDataById = exports.sendDataByCategory = void 0;
const products_1 = __importDefault(require("../models/products"));
const consumers_1 = __importDefault(require("../models/consumers"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("./auth");
const orders_1 = __importDefault(require("../models/orders"));
const sendDataByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.params;
    const data = yield products_1.default.find({ category: category });
    res.status(200).send(JSON.stringify(data));
});
exports.sendDataByCategory = sendDataByCategory;
const sendDataById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prodID } = req.params;
    console.log(prodID);
    const data = yield products_1.default.findOne({ _id: prodID });
    res.status(200).json(JSON.stringify(data));
});
exports.sendDataById = sendDataById;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    yield consumers_1.default.findOne({ email: email }).then((consumer) => {
        if (!consumer) {
            res
                .status(404)
                .json({ message: "No account with these credentials found" });
        }
        else {
            try {
                bcrypt_1.default.compare(password, consumer.password, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
                    if (err) {
                        throw err;
                    }
                    else if (data) {
                        const accessToken = yield (0, auth_1.createAccessToken)(consumer._id, "Consumer");
                        res.status(200).json({
                            message: "token sent",
                            role: "consumer",
                            token: accessToken,
                            id: consumer._id,
                        });
                    }
                }));
            }
            catch (err) {
                console.log(err);
                res.status(404).json(err);
            }
        }
    });
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const prevEmail = yield consumers_1.default.findOne({ email: email });
    if (prevEmail) {
        res.status(400).json({ message: "Email already taken" });
        return;
    }
    yield consumers_1.default.findOne({ name: name, email: email, password: password }).then((consumer) => {
        if (consumer) {
            res.status(409).json({ message: "Consumer account already exists" });
        }
    });
    const saltRounds = yield bcrypt_1.default.genSalt(12);
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    const consumer = yield consumers_1.default.create({
        name: name,
        email: email,
        password: hashedPassword,
    });
    try {
        const accessToken = yield (0, auth_1.createAccessToken)(consumer._id, "Consumer");
        res.status(201).json({
            message: "token sent",
            role: "consumer",
            token: accessToken,
            id: consumer._id,
        });
    }
    catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
});
exports.signup = signup;
const placeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity, prodId, consumerId } = req.body;
    const prod = yield products_1.default.findById(prodId);
    if (!prod) {
        res.status(404).json({ message: "No such product exists" });
        return;
    }
    else if (prod.quantity < quantity) {
        res.status(400).json({ message: "Not enough quantity" });
        return;
    }
    orders_1.default.create({
        consumerId: consumerId,
        products: [
            {
                product: {
                    title: prod.title,
                    snippet: prod.snippet,
                    price: prod.price,
                    _id: prod._id,
                },
                quantity: quantity,
            },
        ],
    }).then(() => {
        prod.quantity -= quantity;
        prod.save();
        res.status(200).json({ message: "New order added" });
    });
});
exports.placeOrder = placeOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { consumerId } = req.params;
    orders_1.default.find({ consumerId: consumerId }).then((orders) => {
        if (orders.length > 0) {
            res.status(200).json({ message: "Orders found", orders: orders });
        }
        else {
            res.status(404).json({ message: "No orders found" });
        }
    });
});
exports.getOrders = getOrders;
const cancelOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    orders_1.default.findById(orderId)
        .then((order) => {
        if (order) {
            for (let i = 0; i < order.products.length; i++) {
                products_1.default.findById(order.products[i].product._id).then((product) => {
                    if (product) {
                        product.quantity += order.products[i].quantity;
                        product.save();
                    }
                    else {
                        console.log("No product found");
                    }
                });
            }
        }
        else {
            res.status(404).json({ message: "No such order" });
        }
    })
        .then(() => {
        orders_1.default.deleteOne({ _id: orderId }).then(() => {
            res.status(200);
        });
    })
        .catch((err) => {
        console.log(err);
    });
});
exports.cancelOrder = cancelOrder;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { consumerId } = req.params;
    let prodArray = [];
    consumers_1.default.findById(consumerId)
        .then((consumer) => {
        if (consumer) {
            for (let i = 0; i < consumer.cart.items.length; i++) {
                products_1.default.findById(consumer.cart.items[i].productId).then((product) => {
                    if (product) {
                        prodArray.push({
                            title: product.title,
                            snippet: product.snippet,
                            maxQuantity: product.quantity,
                            price: product.price,
                            quantity: consumer.cart.items[i].quantity,
                            id: product._id,
                        });
                        if (i === consumer.cart.items.length - 1) {
                            res.status(200).json({
                                message: "Cart found",
                                cart: prodArray,
                            });
                        }
                    }
                });
            }
        }
    })
        .catch((err) => {
        console.log(err);
    });
});
exports.getCart = getCart;
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prodId, consumerId, quantity } = req.body;
    try {
        consumers_1.default.findById(consumerId).then((consumer) => {
            if (consumer) {
                products_1.default.findById(prodId).then((product) => {
                    if (product) {
                        consumer.addToCart(product._id, quantity);
                        res.status(200).json({ message: "Product successfully added" });
                    }
                });
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
});
exports.addToCart = addToCart;
const incrementCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prodId, consumerId } = req.body;
    try {
        consumers_1.default.findById(consumerId).then((consumer) => {
            if (consumer) {
                products_1.default.findById(prodId).then((product) => {
                    if (product) {
                        consumer.incrementProductInCart(product === null || product === void 0 ? void 0 : product._id);
                        res
                            .status(200)
                            .json({ message: "Quantity successfully incremented" });
                    }
                });
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
});
exports.incrementCart = incrementCart;
const decrementCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prodId, consumerId } = req.body;
    try {
        consumers_1.default.findById(consumerId).then((consumer) => {
            if (consumer) {
                products_1.default.findById(prodId).then((product) => {
                    if (product) {
                        consumer.decrementProductInCart(product._id);
                        res
                            .status(200)
                            .json({ message: "Quantity successfully decremented" });
                    }
                });
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
});
exports.decrementCart = decrementCart;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prodId, consumerId } = req.body;
    try {
        consumers_1.default.findById(consumerId).then((consumer) => {
            if (consumer) {
                products_1.default.findById(prodId).then((product) => {
                    if (product) {
                        consumer.removeFromCart(product._id);
                        res.status(200).json({ message: "Product successfully removed" });
                    }
                });
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
});
exports.removeFromCart = removeFromCart;
const clearCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { consumerId } = req.params;
    consumers_1.default.findById(consumerId).then((consumer) => {
        if (consumer) {
            consumer.clearCart();
            res.status(200).json({ message: "Cart cleared" });
        }
    });
});
exports.clearCart = clearCart;
