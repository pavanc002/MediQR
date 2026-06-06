import { db } from '@/db';
import { medicines } from '@/db/schema';

async function main() {
    const sampleMedicines = [
        {
            uniqueCode: 'CPX24A78',
            name: 'Ciplox',
            strength: '500mg',
            mfgDate: '2024-01-10',
            batchNumber: 'CPX24A',
            company: 'Cipla Ltd.',
            expiryDate: '2026-06-01',
            price: 120.0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            uniqueCode: 'AMX500B2',
            name: 'Amoxicillin',
            strength: '500mg',
            mfgDate: '2024-03-15',
            batchNumber: 'AMX500',
            company: 'Sun Pharmaceutical Industries Ltd.',
            expiryDate: '2026-09-15',
            price: 85.5,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            uniqueCode: 'PAR650C9',
            name: 'Paracetamol',
            strength: '650mg',
            mfgDate: '2024-02-28',
            batchNumber: 'PAR650',
            company: 'Dr. Reddy\'s Laboratories Ltd.',
            expiryDate: '2026-08-28',
            price: 45.0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    ];

    await db.insert(medicines).values(sampleMedicines);
    
    console.log('✅ Medicines seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});