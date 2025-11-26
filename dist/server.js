"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/products", product_routes_1.default);
app.get("/", (req, res) => {
    res.status(200).send("Server is running!");
});
// 404 fallback
app.use((req, res, next) => {
    res.status(404).send("Invalid route!");
});
const PORT = process.env.PORT || 3000;
const CONN_STRING = process.env.DATABASE_URL;
if (!PORT || !CONN_STRING) {
    throw new Error("Missing port or connection string!");
}
mongoose_1.default
    .connect(CONN_STRING, { dbName: "store" })
    .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
})
    .catch((err) => console.error("Failed to connect to MongoDB", err));
