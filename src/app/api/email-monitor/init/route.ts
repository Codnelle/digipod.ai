import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/lib/getUserFromRequest';
import { emailMonitor } from '@/lib/emailMonitor';

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log(`[Email Monitor Init] Starting email monitoring for user ${userId}`);

    // Start the email monitoring service
    await emailMonitor.startMonitoring();

    // Also trigger an immediate check for this user
    await emailMonitor.checkUserEmailsNow(userId);

    return NextResponse.json({ 
      success: true, 
      message: 'Email monitoring service started successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error starting email monitoring:', error);
    return NextResponse.json({ 
      error: 'Failed to start email monitoring',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the current status of the email monitoring system
    const status = await emailMonitor.getProcessingStatus(userId);
    
    return NextResponse.json({ 
      success: true, 
      status,
      isRunning: true
    });
  } catch (error) {
    console.error('Error getting email monitoring status:', error);
    return NextResponse.json({ 
      error: 'Failed to get email monitoring status' 
    }, { status: 500 });
  }
}

// Manual check endpoint
export async function PATCH(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Manually check emails now
    await emailMonitor.checkUserEmailsNow(userId);

    return NextResponse.json({ 
      success: true, 
      message: 'Manual email check completed',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in manual email check:', error);
    return NextResponse.json({ 
      error: 'Failed to perform manual email check' 
    }, { status: 500 });
  }
} 