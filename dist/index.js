"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
dotenv_1.default.config();
(0, dbConfig_1.default)();
const port = process.env.PORT || 5000;
// routes
const shortUrl_routes_1 = __importDefault(require("./routes/shortUrl.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
// test api
app.get("/ping", (req, res) => {
    res.send("pong");
});
app.use("/api/", shortUrl_routes_1.default);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
