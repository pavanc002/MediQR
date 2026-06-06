import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';

// TypeScript types for Medicine entity
export interface Medicine {
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

export interface CreateMedicineRequest {
  name: string;
  strength: string;
  mfgDate: string;
  batchNumber: string;
  company: string;
  expiryDate: string;
  price: number;
}

export interface UpdateMedicineRequest {
  name?: string;
  strength?: string;
  mfgDate?: string;
  batchNumber?: string;
  company?: string;
  expiryDate?: string;
  price?: number;
}

export interface MedicineListResponse {
  items: Medicine[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  error: string;
  code?: string;
}

export interface MedicineDeleteResponse {
  message: string;
  data: Medicine;
}