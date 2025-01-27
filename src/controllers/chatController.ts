import { Request, Response } from "express";

export const chatController = (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  res.json({ message: `Message received: ${message}` });
};
