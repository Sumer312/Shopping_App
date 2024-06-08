"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const seller_1 = __importDefault(require("./routes/seller"));
const consumer_1 = __importDefault(require("./routes/consumer"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./controller/auth");
const isAuth_1 = __importDefault(require("./middleware/isAuth"));
require("dotenv/config");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
app.use("/seller", seller_1.default);
app.use("/consumer", consumer_1.default);
app.delete("/logout", isAuth_1.default, auth_1.logout);
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
    .catch((err) => {
    console.log(err);
});
