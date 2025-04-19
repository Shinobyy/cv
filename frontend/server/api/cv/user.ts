export default defineEventHandler(async (event) => {
    try {
        // Afficher la session pour déboguer
        const session = await getUserSession(event);
        console.log('Current user session:', session);
    
        if (!session || !session.user) {
            throw createError({
                statusCode: 401,
                message: 'Unauthorized'
            });
        }

        // Récupérer l'ID de l'utilisateur depuis la base de données
        const db = useDatabase();
        
        // 1. D'abord récupérer l'ID numérique de l'utilisateur
        const userQuery = `SELECT * FROM users WHERE id = ${session.user.id}`;
        // Échapper les valeurs pour éviter les injections SQL
        const escapedValue = typeof session.user.id === 'string'
            ? `'${session.user.id.replace(/'/g, "''")}'`
            : session.user.id;
        const userResult = await db.exec(userQuery);
        console.log('User query result:', userResult);
        
        // Vérifier si l'utilisateur existe
        const rows = Array.isArray(userResult) ? userResult : (userResult.rows || []);
        if (rows.length === 0) {
            console.log('User not found in database');
            return { cvs: [] };
        }
        
        // Récupérer l'ID numérique
        const userId = rows[0].id;
        console.log('Database user ID:', userId);
        
        // 2. Maintenant récupérer les CVs avec cet ID
        const cvsQuery = `SELECT * FROM cvs WHERE user_id = ${userId}`;
        const cvsResult = await db.exec(cvsQuery);
        
        // Traiter les résultats
        const cvsRows = Array.isArray(cvsResult) ? cvsResult : (cvsResult.rows || []);
        console.log(`Found ${cvsRows.length} CVs for user ${userId}`);
        
        // Transformer les données pour l'affichage
        const cvs = cvsRows.map(row => {
            // Parsez les données JSON si nécessaire
            let parsedData = row.data;
            if (typeof row.data === 'string') {
                try {
                    parsedData = JSON.parse(row.data);
                } catch (e) {
                    console.error('Error parsing CV data:', e);
                }
            }
            
            return {
                id: row.id,
                title: row.title,
                createdAt: row.created_at,
                updatedAt: row.updated_at,
                filePath: row.file_path,
                data: parsedData
            };
        });
        
        return { cvs };
        
    } catch (error) {
        console.error('Error in user API:', error);
        return {
            error: true,
            message: error.message
        };
    }
});