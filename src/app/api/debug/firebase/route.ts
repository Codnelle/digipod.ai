import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('[Firebase Debug] Testing Firebase Admin connection...');
    
    // Test basic Firestore operations
    const testCollection = db.collection('_test_connection');
    
    // Try to read from a collection (this should work even if empty)
    await testCollection.limit(1).get();
    console.log('[Firebase Debug] Firestore read test successful');
    
    // Check environment variables
    const envCheck = {
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ? 'Set' : 'Missing',
      FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL ? 'Set' : 'Missing',
      FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY ? 'Set (length: ' + process.env.FIREBASE_PRIVATE_KEY.length + ')' : 'Missing',
      NODE_ENV: process.env.NODE_ENV || 'Not set'
    };
    
    console.log('[Firebase Debug] Environment variables:', envCheck);
    
    return NextResponse.json({
      success: true,
      message: 'Firebase Admin connection successful',
      timestamp: new Date().toISOString(),
      environment: envCheck
    });
    
  } catch (error) {
    console.error('[Firebase Debug] Firebase Admin connection failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Firebase Admin connection failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 