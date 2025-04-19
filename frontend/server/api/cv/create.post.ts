/// <reference types="uuid" />
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        console.log('Received CV data:', body);
        
        // Générer un ID unique pour le CV
        const cvId = uuidv4();
        
        // Créer le dossier de stockage s'il n'existe pas
        const storageDir = path.resolve('./server/data/cvs');
        if (!fs.existsSync(storageDir)) {
            fs.mkdirSync(storageDir, { recursive: true });
        }
        
        // Chemin du fichier
        const filePath = path.join(storageDir, `${cvId}.json`);
        
        // Stocker les données du CV dans un fichier JSON
        const cvData = {
            id: cvId,
            createdAt: new Date().toISOString(),
            ...body
        };
        
        fs.writeFileSync(
            filePath,
            JSON.stringify(cvData, null, 2)
        );

        // Obtenir la session utilisateur pour l'ID (si connecté)
        const session = await getUserSession(event);
        let userId = null;

        // Si l'utilisateur est connecté, récupérer son ID depuis la base de données
        if (session?.user) {
            try {
                const db = useDatabase();
                let userQuery;
                
                // Utiliser l'email si disponible, sinon utiliser le nom
                if (session.user.email) {
                    userQuery = `SELECT id FROM users WHERE email = '${session.user.email.replace(/'/g, "''")}'`;
                } else if (session.user.name) {
                    userQuery = `SELECT id FROM users WHERE name = '${session.user.name.replace(/'/g, "''")}'`;
                } else {
                    console.log('No email or name available in session');
                    userQuery = null;
                }
                
                if (userQuery) {
                    const userResult = await db.exec(userQuery);
                    console.log('User query result:', userResult);
                    
                    const rows = Array.isArray(userResult) ? userResult : (userResult.rows || []);
                    if (rows.length > 0) {
                        userId = rows[0].id;
                        console.log('Found user ID:', userId);
                    } else {
                        console.log('User not found in database with criteria from session:', session.user);
                    }
                }
            } catch (userError) {
                console.error('Error getting user ID:', userError);
            }
        }
        
        // Titre du CV (pour l'affichage dans la liste)
        const title = body.titleAndSub?.title || "CV sans titre";
        
        try {
            // Enregistrer dans la base de données
            const db = useDatabase();
            const relativePath = path.relative(process.cwd(), filePath);
            
            // Préparer les données pour la requête SQL
            const dataForDb = JSON.stringify(cvData);
            const query = `
                INSERT INTO cvs (id, user_id, title, file_path, data)
                VALUES ('${cvId}', ${userId ? userId : 'NULL'}, '${title.replace(/'/g, "''")}', '${relativePath.replace(/\\/g, '/')}', '${dataForDb.replace(/'/g, "''")}')
            `;
            
            await db.exec(query);
            console.log('CV saved to database successfully with user_id:', userId || 'NULL');
            
        } catch (dbError) {
            console.error('Error saving CV to database:', dbError);
            // On continue même si la sauvegarde en BDD échoue
        }
        
        // Retourner l'ID pour la redirection
        return {
            status: 200,
            message: 'CV created successfully',
            cvId: cvId,
            viewUrl: `/cv/${cvId}`
        };
    } catch (error) {
        console.error('Error creating CV:', error);
        return {
            status: 500,
            message: 'Error creating CV',
            error: error.message
        };
    }
});