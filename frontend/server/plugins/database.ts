import { initializeDatabase } from '../db/db';

export default defineNitroPlugin(async (nitroApp) => {
  console.log('🚀 Starting database initialization...');
  await initializeDatabase();
});