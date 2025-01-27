import { Request, Response, NextFunction } from "express";

export const chatController = (req: Request, res: Response,) =>  {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  return res.status(200).json({ message: `Message received: ${message}` });
};

  