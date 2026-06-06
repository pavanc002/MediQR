import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '@/db/schema';

const url = process.env.TURSO_CONNECTION_URL || 'file:./local.db';
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!process.env.TURSO_CONNECTION_URL) {
  console.warn('[MediQr] TURSO_CONNECTION_URL not set. Falling back to local SQLite at file:./local.db');
}

export const db = drizzle(
  createClient({
    url,
    ...(authToken ? { authToken } : {}),
  }),
  { schema }
);

export type Database = typeof db;