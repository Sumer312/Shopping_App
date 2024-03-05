"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const imageSchema = new mongoose_1.Schema({
    publicId: String,
    secureUrl: String,
});
const ProductSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    coverImage: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true,
    },
    imageArray: {
        type: [{ publicId: String, secureUrl: String }],
    },
    category: {
        type: String,
        required: true,
    },
    sellerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "seller",
        required: true,
    },
});
exports.default = (0, mongoose_1.model)("Product", ProductSchema);
