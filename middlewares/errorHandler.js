export const errorHandler = (err, req, res, next) => {
    // Log l'erreur dans la console pour le suivi
    console.error(`[Error] ${err.message}`);

    // Définit un code d'état par défaut si aucun n'est fourni
    const statusCode = err.status || 500;

    // Définit un message d'erreur par défaut si aucun n'est fourni
    const message = err.message || 'An unexpected error occurred';

    // En mode développement, ajoute les détails du stack
    const response = {
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    };

    // Renvoie la réponse
    res.status(statusCode).json(response);
};