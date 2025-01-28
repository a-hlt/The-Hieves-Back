// src/controllers/eventController.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkEventsForZones() {
  try {
    const eventsWithAlert = await prisma.event.findMany({
      where: {
        quartier: {
          in: ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5']  // Vérifie les quartiers spécifiés
        },
        OR: [
          { seisme: true },
          { inondation: true }
        ]
      }
    });

    if (eventsWithAlert.length > 0) {
      console.log("Événements avec alerte (seisme ou inondation) dans les zones 1 à 5 : ", eventsWithAlert);
    } else {
      console.log("Aucun événement avec alerte dans les zones 1 à 5.");
    }

    return eventsWithAlert;
  } catch (error) {
    console.error("Erreur lors de la récupération des événements : ", error);
    throw error;
  }
}

export { checkEventsForZones };
