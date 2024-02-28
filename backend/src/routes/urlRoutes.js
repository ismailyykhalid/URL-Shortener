import express from "express";
import {
  handelGenerateShortURL,
  handelRedirect,
  handelClicks,
} from "../controllers/urlController.js";

const router = express.Router();

router.get("/:shortId", handelRedirect);
router.get("/analytics/:shortId", handelClicks);
router.post("/", handelGenerateShortURL);

export default router;
