export default async function createCvsTable(db: any) {
    try {
      console.log('Vérification de la table cvs...');
      
      // Vérifier si la table existe déjà
      const tableCheckResult = await db.exec(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = DATABASE() 
        AND table_name = 'cvs'
      `);
      
      const tableExists = tableCheckResult.rows && tableCheckResult.rows.length > 0;
      
      if (!tableExists) {
        console.log('✨ Création de la table cvs...');
        
        // Créer la table cvs
        await db.exec(`
          CREATE TABLE cvs (
            id VARCHAR(36) PRIMARY KEY,
            user_id INT,
            title VARCHAR(255),
            file_path VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            data JSON,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
          )
        `);
        
        console.log('✅ Table cvs créée avec succès');
      } else {
        console.log('ℹ️ La table cvs existe déjà');
      }
    } catch (error) {
      console.error('❌ Erreur lors de la création de la table cvs:', error);
      console.error('Code d\'erreur:', error.code);
      console.error('État SQL:', error.sqlState);
      throw error;
    }
  }