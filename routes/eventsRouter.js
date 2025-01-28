import express from "express";
// import { getEventsZone, getEventsByZone } from "../services/eventServices.js";
import { getEventsByZone } from "../controllers/eventsController.js";


const router = express.Router();

// router.get("/eventsByZone", getEventsZone);

router.get('/events/zone/:zone', getEventsByZone);

export default router;
