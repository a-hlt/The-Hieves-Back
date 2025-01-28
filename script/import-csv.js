const path = require('path');
const { importEventsFromCSV } = require('../services/eventService.js');

const filePath = path.join(__dirname, '../data/csv/fichier_modifie.csv');

importEventsFromCSV(filePath)
    .then(() => console.log('Données importées avec succès dans la table Event !'))
    .catch((err) => console.error('Erreur lors de l\'importation :', err));
