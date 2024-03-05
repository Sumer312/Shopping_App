"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    products: [
        {
            product: { type: mongoose_1.Schema.Types.Mixed, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    consumerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Consumer",
    },
});
exports.default = (0, mongoose_1.model)("Order", OrderSchema);
