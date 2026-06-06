import { headers } from 'next/headers';
import { db } from '@/db';
import { medicines } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface Medicine {
  id: number;
  uniqueCode: string;
  name: string;
  strength: string;
  mfgDate: string;
  batchNumber: string;
  company: string;
  expiryDate: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  qrUrl?: string;
}

async function getMedicine(uniqueCode: string): Promise<Medicine | null> {
  // Sanitize incoming code from URL scans: decode and trim
  const safeCode = decodeURIComponent(uniqueCode).trim();
  try {
    const h = headers();
    const proto = h.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
    const host = h.get('x-forwarded-host') || h.get('host');
    const base = `${proto}://${host}`;
    const response = await fetch(`${base}/api/medicines/${encodeURIComponent(safeCode)}`, { cache: 'no-store' });
    
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch medicine via API, trying DB fallback:', error);
  }

  // Fallback: query DB directly (server component only)
  try {
    const rows = await db
      .select()
      .from(medicines)
      .where(sql`lower(trim(${medicines.uniqueCode})) = lower(trim(${safeCode}))`)
      .limit(1);
    if (rows.length > 0) return rows[0] as unknown as Medicine;
  } catch (err) {
    console.error('DB fallback failed:', err);
  }

  return null;
}

export default async function MedicinePage({ 
  params 
}: { 
  params: { uniqueCode: string } 
}) {
  const medicine = await getMedicine(params.uniqueCode);

  if (!medicine) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Medicine Not Found</h1>
          <p className="text-gray-600 mb-4">
            The medicine with code <code className="bg-gray-100 px-2 py-1 rounded">{decodeURIComponent(params.uniqueCode).trim()}</code> could not be found.
          </p>
          <p className="text-sm text-gray-500">
            Please check the QR code or contact the pharmacy for assistance.
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isExpired = new Date(medicine.expiryDate) < new Date();
  const daysToExpiry = Math.ceil(
    (new Date(medicine.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{medicine.name}</h1>
                <p className="text-blue-100">Strength: {medicine.strength}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-100">Code</div>
                <div className="font-mono text-lg">{medicine.uniqueCode}</div>
              </div>
            </div>
          </div>

          {/* Medicine Details */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <p className="mt-1 text-lg text-gray-900">{medicine.company}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Batch Number</label>
                  <p className="mt-1 text-lg font-mono text-gray-900">{medicine.batchNumber}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <p className="mt-1 text-2xl font-bold text-green-600">₹{Number(medicine.price).toFixed(2)}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Manufacturing Date</label>
                  <p className="mt-1 text-lg text-gray-900">{formatDate(medicine.mfgDate)}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <p className={`${
                    isExpired ? 'text-red-600' : daysToExpiry <= 90 ? 'text-orange-600' : 'text-green-600'
                  } mt-1 text-lg font-semibold`}>
                    {formatDate(medicine.expiryDate)}
                  </p>
                  {isExpired && (
                    <p className="text-sm text-red-500 font-medium">⚠️ This medicine has expired</p>
                  )}
                  {!isExpired && daysToExpiry <= 90 && (
                    <p className="text-sm text-orange-600">
                      ⏰ Expires in {daysToExpiry} days
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Status Banner */}
            <div className="mt-6 p-4 rounded-lg border-l-4 bg-gray-50">
              {isExpired ? (
                <div className="border-l-red-500">
                  <div className="flex">
                    <div className="text-red-500 text-xl mr-3">🚫</div>
                    <div>
                      <h3 className="font-semibold text-red-800">Expired Medicine</h3>
                      <p className="text-red-700 text-sm">
                        This medicine expired on {formatDate(medicine.expiryDate)}. Do not use.
                      </p>
                    </div>
                  </div>
                </div>
              ) : daysToExpiry <= 90 ? (
                <div className="border-l-orange-500">
                  <div className="flex">
                    <div className="text-orange-500 text-xl mr-3">⚠️</div>
                    <div>
                      <h3 className="font-semibold text-orange-800">Expiring Soon</h3>
                      <p className="text-orange-700 text-sm">
                        This medicine will expire in {daysToExpiry} days.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-l-green-500">
                  <div className="flex">
                    <div className="text-green-500 text-xl mr-3">✅</div>
                    <div>
                      <h3 className="font-semibold text-green-800">Valid Medicine</h3>
                      <p className="text-green-700 text-sm">
                        This medicine is valid for {daysToExpiry} more days.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Additional Information</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• Always check expiry date before consumption</p>
                <p>• Store medicines in cool, dry place away from direct sunlight</p>
                <p>• Keep medicines out of reach of children</p>
                <p>• Consult your doctor or pharmacist for proper usage</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Medicine information verified • Code: {medicine.uniqueCode}</p>
        </div>
      </div>
    </div>
  );
}