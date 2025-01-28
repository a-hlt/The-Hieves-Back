// // const path = require('path');
// import path, { dirname } from "path";
// // const { importEventsFromCSV } = require('../services/eventService.js');
// import { importEventsFromCSV } from "../services/eventServices.js";

// const filePath = path.join(dirname, '../data/csv/fichier_modifie.csv');
// console.log("TEST")
// importEventsFromCSV(filePath)
//     .then(() => console.log('Données importées avec succès dans la table Event !'))
//     .catch((err) => console.error('Erreur lors de l\'importation :', err));

import path from "path";
import { importEventsFromCSV } from "../services/eventServices.js";

// Convertir import.meta.url en chemin local
const fileURL = new URL('../data/csv/fichier_modifie.csv', import.meta.url);
const filePath = fileURL.pathname;  // Accéder directement au pathname de l'URL

// S'assurer que le chemin est correct en ajoutant un '/' si nécessaire
const localFilePath = path.normalize(filePath);

console.log("TEST");

importEventsFromCSV(localFilePath)
    .then(() => console.log('Données importées avec succès dans la table Event !'))
    .catch((err) => console.error('Erreur lors de l\'importation :', err));
