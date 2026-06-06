import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { medicines } from '@/db/schema';

export { db, medicines };

// Utility functions for common database operations
export const dbUtils = {
  // Check if a unique code exists
  async uniqueCodeExists(uniqueCode: string): Promise<boolean> {
    const result = await db.select({ id: medicines.id })
      .from(medicines)
      .where(eq(medicines.uniqueCode, uniqueCode))
      .limit(1);
    return result.length > 0;
  },

  // Generate a unique code with retry logic
  async generateUniqueCode(generator: () => string, maxAttempts = 3): Promise<string> {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const code = generator();
      const exists = await this.uniqueCodeExists(code);
      if (!exists) {
        return code;
      }
    }
    throw new Error('Failed to generate unique code after maximum attempts');
  },

  // Get current timestamp
  getCurrentTimestamp(): string {
    return new Date().toISOString();
  },

  // Validate date format
  isValidISODate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && dateString.includes('-');
  },

  // Check if expiry date is after manufacturing date
  isValidDateRange(mfgDate: string, expiryDate: string): boolean {
    return new Date(expiryDate) > new Date(mfgDate);
  }
};

// Import eq for use in utility functions
import { eq } from 'drizzle-orm';