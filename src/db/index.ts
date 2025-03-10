import { drizzle } from 'drizzle-orm/postgres-js';
import { dbClient } from './client';
import * as schema from './schema';


export * as schema from './schema';


console.log('[DB] Connect Drizzle ORM to Embedded Postgres');
export const orm = drizzle(dbClient, { schema });
