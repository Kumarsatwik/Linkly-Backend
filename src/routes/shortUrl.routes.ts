import express from "express";
import { createUrl, deleteUrl, getAllUrl, getUrl } from "../controllers/shortUrl.controller";

const router = express.Router();

router.post("/short-url", createUrl);
router.get("/short-url", getAllUrl);
router.get("/short-url/:id", getUrl);
router.delete("/short-url/:id", deleteUrl);

export default router;
