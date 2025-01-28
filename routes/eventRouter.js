import express from 'express';
import { checkEventsForZones } from '../controllers/eventController.js';

const router = express.Router();

router.get('/check-alerts', async (req, res) => {
  try {
    const events = await checkEventsForZones();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
});

export default router;