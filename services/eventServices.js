import prisma from "prisma";

import fs from "fs";
import csv from "csv-parser";
import prisma from "prisma";

const path = require('path');

const filePath = path.join(__dirname, 'data/csv/fichier_modifie.csv');

export const importEventsFromCSV = async (filePath) => {
    const events = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                // Transformer les données du CSV en objets adaptés au modèle Prisma
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
                    // Insertion en lot dans la table `Event`
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

export const getAllEvents = async (req, res) => {
    try {
        const events = await prisma.event.findMany(); // Récupère toutes les données de la table Event
        res.status(200).json(events); // Envoie les données au client
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des événements." });
    }
};

