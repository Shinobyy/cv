export default defineEventHandler(async (event) => {
  try {
    // Afficher la session pour déboguer
    const session = await getUserSession(event);

    if (!session || !session.user) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized'
      });
    }

    try {
      // Tester la connexion à la base de données
      const db = useDatabase();

      // Déterminer le champ de recherche
      let searchField = 'name'; // Valeur par défaut
      let searchValue = session.user.name;

      if (session.user.email) {
        searchField = 'email';
        searchValue = session.user.email;
      } else if (session.user.id) {
        searchField = 'id';
        searchValue = session.user.id;
      }

      try {
        // Rechercher l'utilisateur avec une requête simple pour tester
        const testQuery = 'SELECT 1 as test';
        const testResult = await db.exec(testQuery);

        // Pour MariaDB: Utilisez des valeurs littérales au lieu des paramètres préparés
        // Échapper les valeurs pour éviter les injections SQL
        const escapedValue = typeof searchValue === 'string'
          ? `'${searchValue.replace(/'/g, "''")}'`
          : searchValue;

        // Construction de la requête avec la valeur échappée
        const query = `SELECT * FROM users WHERE ${searchField} = ${escapedValue}`;

        const result = await db.exec(query);

        const rows = Array.isArray(result) ? result : (result.rows || []);

        if (rows.length === 0) {
          return {
            id: 0,
            name: session.user.name,
            email: session.user.email || 'test@example.com',
            role: session.user.role || 'user',
            created_at: new Date().toISOString()
          };
        }

        // Utiliser le premier utilisateur trouvé
        const userData = rows[0];
        if (userData.password) {
          delete userData.password;
        }
        return userData;
      } catch (sqlError) {
        console.error('SQL execution error:', sqlError);
        // Journaliser plus de détails sur l'erreur
        console.error('Error details:', {
          code: sqlError.code,
          errno: sqlError.errno,
          sqlState: sqlError.sqlState,
          sqlMessage: sqlError.sqlMessage
        });

        return {
          id: 0,
          name: session.user.name,
          email: session.user.email || 'test@example.com',
          role: session.user.role || 'user',
          created_at: new Date().toISOString(),
          note: "Utilisateur fictif (la table n'existe probablement pas encore)",
          sqlError: sqlError.message
        };
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
      return {
        id: 0,
        name: session.user.name,
        email: session.user.email || 'test@example.com',
        role: session.user.role || 'user',
        created_at: new Date().toISOString(),
        dbErrorMessage: dbError.message
      };
    }
  } catch (globalError) {
    console.error('Global API error:', globalError);
    return {
      error: true,
      message: globalError.message,
      stack: process.env.NODE_ENV === 'development' ? globalError.stack : undefined
    };
  }
});