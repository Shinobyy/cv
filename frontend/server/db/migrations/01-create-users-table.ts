export default async function createUsersTable(db: any) {
  try {
    console.log('Vérification de la connexion à la base de données...');
    
    // Vérifier si la table existe déjà
    const tableCheckResult = await db.exec(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE() 
      AND table_name = 'users'
    `);
    
    const tableExists = tableCheckResult.rows && tableCheckResult.rows.length > 0;
    
    if (!tableExists) {
      console.log('✨ Création de la table users...');
      
      // Créer la table users
      await db.exec(`
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(50) DEFAULT 'user',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      console.log('✅ Table users créée avec succès');
      
      // Insérer un utilisateur test - utiliser exec au lieu de execute
      await db.exec(`
        INSERT INTO cv_builder.users (name, email, password, role) VALUES ('Test User', 'test@test.fr', 'test', 'admin')
      `);

      console.log('🌱 Utilisateur test créé avec succès');
    } else {
      console.log('ℹ️ La table users existe déjà');
    }
  } catch (error) {
    // Améliorer le message d'erreur pour afficher plus de détails
    console.error('❌ Erreur lors de la création de la table users:', error.message);
    console.error('Code d\'erreur:', error.code || 'Inconnu');
    console.error('État SQL:', error.sqlState || 'Inconnu');
    throw error;
  }
}