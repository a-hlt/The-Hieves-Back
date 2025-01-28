import express from "express";
import { getEventsZone } from "../services/eventServices.js";

const router = express.Router();

router.get("/eventsByZone", getEventsZone);

export default router;
