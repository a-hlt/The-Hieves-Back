import prisma from "./prisma.js"; // Assurez-vous que le chemin est correct

const checkEvents = async () => {
    try {
        const events = await prisma.event.findMany(); // Récupère toutes les données de la table Event
        console.log("Événements dans la base de données :", events);
    } catch (error) {
        console.error("Erreur lors de la vérification des événements :", error);
    } finally {
        await prisma.$disconnect(); // Déconnecte Prisma
    }
};

checkEvents();
