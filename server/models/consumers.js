"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ConsumerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetToken: String,
    resetTokenExpirationDate: Date,
    cart: {
        items: [
            {
                productId: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
});
ConsumerSchema.methods.addToCart = function (productId, quantity) {
    const productIndex = this.cart.items.findIndex((cp) => {
        return JSON.stringify(cp.productId) === JSON.stringify(productId);
    });
    let newQuantity = quantity;
    const updatedCartItems = [...this.cart.items];
    if (productIndex === -1) {
        updatedCartItems.push({
            productId: productId,
            quantity: newQuantity,
        });
    }
    const updatedCart = {
        items: updatedCartItems,
    };
    this.cart = updatedCart;
    return this.save();
};
ConsumerSchema.methods.incrementProductInCart = function (productId) {
    const productIndex = this.cart.items.findIndex((cp) => {
        return JSON.stringify(cp.productId) === JSON.stringify(productId);
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (productIndex >= 0) {
        newQuantity = this.cart.items[productIndex].quantity + 1;
        updatedCartItems[productIndex].quantity = newQuantity;
    }
    const updatedCart = {
        items: updatedCartItems,
    };
    this.cart = updatedCart;
    return this.save();
};
ConsumerSchema.methods.decrementProductInCart = function (productId) {
    const productIndex = this.cart.items.findIndex((cp) => {
        return JSON.stringify(cp.productId) == JSON.stringify(productId);
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (productIndex >= 0) {
        newQuantity =
            this.cart.items[productIndex].quantity >= 1
                ? this.cart.items[productIndex].quantity - 1
                : 0;
        updatedCartItems[productIndex].quantity = newQuantity;
    }
    const updatedCart = {
        items: updatedCartItems,
    };
    this.cart = updatedCart;
    return this.save();
};
ConsumerSchema.methods.removeFromCart = function (productId) {
    const updatedCartItems = this.cart.items.filter((item) => {
        return JSON.stringify(item.productId) !== JSON.stringify(productId);
    });
    this.cart.items = updatedCartItems;
    return this.save();
};
ConsumerSchema.methods.clearCart = function () {
    this.cart = {};
    return this.save();
};
exports.default = (0, mongoose_1.model)("Consumer", ConsumerSchema);
