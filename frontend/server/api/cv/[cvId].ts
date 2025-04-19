import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
    // Important: Le nom du paramètre doit correspondre au nom du fichier [cvId].ts
    const cvId = event.context.params.cvId;
    console.log(`Fetching CV with ID: ${cvId}`);
    
    try {
        // Utilisons un chemin absolu plus sûr
        const storageDir = path.resolve(process.cwd(), 'server/data/cvs');
        const cvPath = path.join(storageDir, `${cvId}.json`);
        
        // Liste des fichiers pour le débogage
        const files = fs.existsSync(storageDir) ? fs.readdirSync(storageDir) : [];
        console.log(`Files in directory: ${files.join(', ')}`);
        
        // Vérifier si le fichier existe
        if (!fs.existsSync(cvPath)) {
            console.log(`CV file not found at: ${cvPath}`);
            return {
                status: 404,
                message: 'CV not found'
            };
        }
        
        // Lire et renvoyer les données du CV
        const cvData = JSON.parse(fs.readFileSync(cvPath, 'utf-8'));
        console.log('CV data retrieved successfully');
        return cvData;
    } catch (error) {
        console.error(`Error retrieving CV ${cvId}:`, error);
        return {
            status: 500,
            message: 'Error retrieving CV',
            error: error.message
        };
    }
});