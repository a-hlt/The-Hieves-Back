import * as eventService from "../services/eventServices.js";
import { Prisma } from "@prisma/client";
import * as eventService from "../services/eventServices.js";

import { getEventsByZoneService } from '../services/eventServices.js';

// import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const importEventsController = async (req, res) => {
    try {
        const filePath = req.file.path; // Assurez-vous que le fichier a été uploadé
        const importedEvents = await eventService.importEventsFromCSV(filePath);

        res.status(200).json({
            message: "Les événements ont été importés avec succès !",
            data: importedEvents,
        });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'importation des événements." });
    }
};


export const getEventsByZone = async (req, res, next) => {
    try {
        // console.log('Zone param:', req.params.zone); // Log la zone reçue
        const { zone } = req.params;
        if (!zone) {
            // console.log('Zone is missing');
            return res.status(400).json({
                success: false,
                message: 'Zone is required',
            });
        }

        const events = await getEventsByZoneService(zone);
        // console.log('Events found:', events);
        if (!events || events.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No events found for this zone',
            });
        }

        res.status(200).json({
            success: true,
            data: events,
        });
    } catch (error) {
        console.error('Error:', error);
        next(error);
    }
};



export { checkEventsForZones };