import express from "express";
import { getAllEvents } from "../controllers/eventController.js";

const router = express.Router();

router.get("/events", getAllEvents);

export default router;
