"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shortUrl_controller_1 = require("../controllers/shortUrl.controller");
const router = express_1.default.Router();
router.post("/short-url", shortUrl_controller_1.createUrl);
router.get("/short-url", shortUrl_controller_1.getAllUrl);
router.get("/short-url/:id", shortUrl_controller_1.getUrl);
router.delete("/short-url/:id", shortUrl_controller_1.deleteUrl);
exports.default = router;
