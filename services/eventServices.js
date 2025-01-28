import { PrismaClient } from "@prisma/client"; // Import correct de Prisma
import fs from "fs";
import csv from "csv-parser";
import path from "path";

const prisma = new PrismaClient(); // Initialisation de Prisma

export const importEventsFromCSV = async (filePath) => {
    const events = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                events.push({
                    temperature: parseInt(row.temperature, 10),
                    humidite: parseInt(row.humidite, 10),
                    force_moyenne_du_vecteur_de_vent: parseInt(row.force_moyenne_du_vecteur_de_vent, 10),
                    force_du_vecteur_de_vent_max: parseInt(row.force_du_vecteur_de_vent_max, 10),
                    pluie_intensite_max: parseInt(row.pluie_intensite_max, 10),
                    date: new Date(row.date),
                    quartier: row.quartier,
                    sismicite: parseInt(row.sismicite, 10),
                    concentration_gaz: parseInt(row.concentration_gaz, 10),
                    pluie_totale: parseInt(row.pluie_totale, 10),
                    seisme: row.seisme.toLowerCase() === "true",
                    inondation: row.inondation.toLowerCase() === "true",
                });
            })
            .on("end", async () => {
                try {
                    await prisma.event.createMany({
                        data: events,
                    });
                    console.log("Les événements ont été importés avec succès !");
                    resolve(events);
                } catch (err) {
                    console.error("Erreur lors de l'importation :", err);
                    reject(err);
                }
            })
            .on("error", (error) => {
                console.error("Erreur lors de la lecture du fichier CSV :", error);
                reject(error);
            });
    });
};

export const getEventsZone = async (req, res) => {
    res.status(200).json("OUI")
    // try {
    //     // const events = await prisma.event.findMany({ where: { id: 1 } }); // Récupère toutes les données de la table Event
    //     res.status(200).json("TEST result",); // Envoie les données au client
    // } catch (error) {
    //     res.status(500).json({ error: "Erreur lors de la récupération des événements." });
    // }
};

export async function checkEventsForZones() {
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
