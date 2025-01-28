import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { importEventsFromCSV } from "../services/eventServices.js";

// Convertir l'URL en chemin de fichier absolu
const fileURL = new URL('../data/csv/fichier_modifie.csv', import.meta.url);
const filePath = path.normalize(fileURLToPath(fileURL));

console.log("Chemin du fichier :", filePath);

if (fs.existsSync(filePath)) {
    importEventsFromCSV(filePath)
        .then(() => console.log('Données importées avec succès dans la table Event !'))
        .catch((err) => console.error('Erreur lors de l\'importation :', err));
} else {
    console.error("Erreur : le fichier est introuvable :", filePath);
}
