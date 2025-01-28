import express from "express";
import { chatController } from "../controllers/chatController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("API is working!");
});

router.post("/chat", chatController);

module.exports = router;
