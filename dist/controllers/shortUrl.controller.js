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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUrl = exports.getUrl = exports.getAllUrl = exports.createUrl = void 0;
const shortUrl_model_1 = require("../model/shortUrl.model");
const createUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullUrl } = req.body;
        const urlFound = yield shortUrl_model_1.urlModel.find({ fullUrl: fullUrl });
        if (urlFound.length > 0) {
            return res.status(409).json(urlFound);
        }
        const url = yield shortUrl_model_1.urlModel.create({ fullUrl });
        return res.status(201).json(url);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.createUrl = createUrl;
const getAllUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = yield shortUrl_model_1.urlModel.find();
        if (url.length == 0) {
            return res.status(200).json({ message: "No url found" });
        }
        return res.status(200).json(url);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getAllUrl = getAllUrl;
const getUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const url = yield shortUrl_model_1.urlModel.findOne({ shortUrl: id });
        if (!url) {
            return res.status(404).json({ message: "Url not found" });
        }
        url.clicks++;
        url.save();
        return res.status(200).json(url);
        // res.redirect(url.fullUrl);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getUrl = getUrl;
const deleteUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const url = yield shortUrl_model_1.urlModel.findByIdAndDelete(id);
        if (url) {
            return res.status(200).json({ message: "Url deleted successfully" });
        }
        return res.status(404).json({ message: "Url not found" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.deleteUrl = deleteUrl;
