import { Router } from "express";
import {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} from "../controllers/url.js";

const router = Router();

router.post("/", handleGenerateNewShortURL);

router.post("/analytics/:shortId", handleGetAnalytics);

export default router;
