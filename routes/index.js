const express = require("express");
const { chatController } = require("../controllers/chatController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("API is working!");
});

router.post("/chat", chatController);

module.exports = router;
