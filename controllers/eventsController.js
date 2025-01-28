import * as eventService from "../services/eventServices.js";
import { PrismaClient } from '@prisma/client';

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



  export { checkEventsForZones };