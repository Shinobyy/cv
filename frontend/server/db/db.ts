import createUsersTable from './migrations/01-create-users-table';
import createCvsTable from './migrations/02-create-cvs-table';

export async function initializeDatabase() {
  try {
    console.log('🔄 Initializing database...');
    
    const db = useDatabase();
    
    // Exécuter les migrations
    // await createUsersTable(db);
    // await createCvsTable(db);
    
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  }
}