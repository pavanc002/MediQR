// src/app/api/qr/[uniqueCode]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { medicines } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import QRCode from 'qrcode';
import { PDFDocument } from 'pdf-lib';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, { params }: { params: { uniqueCode: string } }) {
  try {
    // Extract uniqueCode from dynamic route params
    const rawCode = params.uniqueCode;
    const uniqueCode = decodeURIComponent(rawCode || '').trim();
    
    // Check if link should be included
    const includeLink = request.nextUrl.searchParams.get('includeLink') === 'true';
    
    if (!uniqueCode) {
      return NextResponse.json({ 
        error: 'Unique code is required',
        code: 'MISSING_UNIQUE_CODE'
      }, { status: 400 });
    }

    // Query medicines table for record with matching uniqueCode
    const medicine = await db
      .select({
        id: medicines.id,
        uniqueCode: medicines.uniqueCode,
        name: medicines.name,
        strength: medicines.strength,
        expiryDate: medicines.expiryDate
      })
      .from(medicines)
      .where(sql`lower(trim(${medicines.uniqueCode})) = lower(trim(${uniqueCode}))`)
      .limit(1);

    if (medicine.length === 0) {
      return NextResponse.json(
        { error: 'Medicine not found' },
        { status: 404 }
      );
    }

    const med = medicine[0];

    // Format expiry date as YYYY-MM
    const expiry = (med.expiryDate ? new Date(med.expiryDate).toISOString().slice(0, 7) : "");
    
    // Compose QR text based on includeLink parameter
    let qrText: string;
    if (includeLink) {
      // With link: Original format with clickable URL
      const publicUrl = `https://mediqr-admin-portal.vercel.app/p/${med.uniqueCode}`;
      const titleLine = `${med.name} (${med.strength}) Expiry: ${expiry}`;
      qrText = `${titleLine}\nMore: ${publicUrl}`;
    } else {
      // Without link: Only tablet info
      qrText = `${med.name} (${med.strength}) Expiry: ${expiry}`;
    }

    // Generate PDF with 2400x2400px QR code
    const qrPngBuffer = await QRCode.toBuffer(qrText, {
      type: 'png',
      width: 2400,
      errorCorrectionLevel: 'M',
      margin: 2,
      color: { dark: '#000000', light: '#FFFFFF' },
    });

    // Create PDF with pdf-lib
    const pdfDoc = await PDFDocument.create();
    
    // Set page size to match QR code dimensions (2400x2400 pixels at 72 DPI)
    const page = pdfDoc.addPage([2400, 2400]);
    
    // Embed PNG image
    const qrImage = await pdfDoc.embedPng(qrPngBuffer);
    
    page.drawImage(qrImage, {
      x: 0,
      y: 0,
      width: 2400,
      height: 2400,
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = Buffer.from(pdfBytes);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="medicine-${uniqueCode}.pdf"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Content-Length': pdfBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('QR generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate QR code', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}