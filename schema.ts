import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const medicines = sqliteTable('medicines', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  uniqueCode: text('unique_code').notNull().unique(),
  name: text('name').notNull(),
  strength: text('strength').notNull(),
  mfgDate: text('mfg_date').notNull(),
  batchNumber: text('batch_number').notNull(),
  company: text('company').notNull(),
  expiryDate: text('expiry_date').notNull(),
  price: real('price').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});