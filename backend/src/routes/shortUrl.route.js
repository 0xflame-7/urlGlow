import { Router } from "express";
import { createShortUrl } from "../controller/shortUrl.controller.js";
const router = Router();

router.post("/", createShortUrl);
// router.get("/:id", getShortUrl);

export default router;
