import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';
import { getUserIdFromRequest } from '@/lib/getUserFromRequest';

export const dynamic = 'force-dynamic';

interface AIDraft {
  id: string;
  projectId: string;
  projectName: string;
  clientEmail: string;
  from: string;
  subject: string;
  content: string;
  body?: string;
  closing?: string;
  signature?: string;
  status: 'draft' | 'approved' | 'declined' | 'sent';
  createdAt: Date;
}

export async function GET(req: NextRequest) {
  try {
    console.log('[AI Drafts API] Starting request...');
    
    const userId = await getUserIdFromRequest(req);
    console.log('[AI Drafts API] User ID:', userId);
    
    if (!userId) {
      console.log('[AI Drafts API] No user ID found, returning 401');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const status = url.searchParams.get('status') || 'draft';
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const forceRefresh = url.searchParams.get('forceRefresh') === 'true';

    console.log('[AI Drafts API] Request params:', { status, limit, forceRefresh });

    // If force refresh is requested, trigger email check first
    if (forceRefresh) {
      try {
        console.log('[AI Drafts API] Force refresh requested, importing emailMonitor...');
        const { emailMonitor } = await import('@/lib/emailMonitor');
        console.log('[AI Drafts API] emailMonitor imported successfully');
        await emailMonitor.checkUserEmailsNow(userId);
        console.log(`[AI Drafts API] Force refresh triggered for user ${userId}`);
      } catch (error) {
        console.error('[AI Drafts API] Error during force refresh:', error);
        // Continue with fetching drafts even if refresh fails
      }
    }

    console.log('[AI Drafts API] Fetching projects for user:', userId);
    
    // Get all projects for this user to map project IDs to names and client emails
    const projectsSnap = await db.collection('projects').where('userId', '==', userId).get();
    console.log('[AI Drafts API] Projects found:', projectsSnap.docs.length);
    
    const projectMap = new Map<string, { name: string; clientEmail: string }>();
    
    projectsSnap.docs.forEach(doc => {
      const project = doc.data();
      projectMap.set(doc.id, {
        name: project.name || 'Project',
        clientEmail: project.clientEmail || 'Client'
      });
    });

    console.log('[AI Drafts API] Project map created:', Object.fromEntries(projectMap));

    // Fetch AI drafts from the new aiDrafts collection, filtered by userId
    console.log('[AI Drafts API] Querying aiDrafts collection...');
    
    let aiDraftsQuery = db.collection('aiDrafts')
      .where('userId', '==', userId)
      .where('status', '==', status);

    // If no specific status filter, get all drafts for this user
    if (status === 'all') {
      aiDraftsQuery = db.collection('aiDrafts')
        .where('userId', '==', userId);
    }

    // Add orderBy only if we have documents
    try {
      const aiDraftsSnap = await aiDraftsQuery.orderBy('createdAt', 'desc').limit(limit).get();
      console.log(`[AI Drafts API] Found ${aiDraftsSnap.docs.length} drafts in aiDrafts collection`);
      
      const drafts: AIDraft[] = [];

      for (const draftDoc of aiDraftsSnap.docs) {
        const draft = draftDoc.data();
        const projectInfo = draft.projectId === 'general' 
          ? { name: 'General Email', clientEmail: draft.from || 'Unknown' }
          : projectMap.get(draft.projectId) || { name: 'Project', clientEmail: 'Client' };
        
        // Log the draft data for debugging
        console.log('[AI Drafts API] Processing draft:', {
          id: draftDoc.id,
          projectId: draft.projectId,
          projectName: projectInfo.name,
          clientEmail: projectInfo.clientEmail,
          draftData: draft
        });
        
        drafts.push({
          id: draftDoc.id,
          projectId: draft.projectId,
          projectName: projectInfo.name,
          clientEmail: projectInfo.clientEmail,
          from: projectInfo.clientEmail, // Use client email as the "from" field
          subject: draft.subject || 'No Subject',
          body: draft.body || '',
          content: draft.body || '',
          closing: draft.closing || '',
          signature: draft.signature || '',
          status: draft.status,
          createdAt: draft.createdAt instanceof Date ? draft.createdAt : draft.createdAt?.toDate?.() || new Date(),
        });
      }

      // Apply limit after fetching
      const limitedDrafts = drafts.slice(0, limit);

      console.log('[AI Drafts API] Returning drafts:', limitedDrafts.length);

      return NextResponse.json({ 
        drafts: limitedDrafts,
        total: limitedDrafts.length,
        forceRefreshTriggered: forceRefresh,
        lastChecked: new Date().toISOString()
      });
      
    } catch (orderByError) {
      console.error('[AI Drafts API] Error with orderBy, trying without ordering:', orderByError);
      
      // Fallback: try without orderBy
      const aiDraftsSnap = await aiDraftsQuery.limit(limit).get();
      console.log(`[AI Drafts API] Found ${aiDraftsSnap.docs.length} drafts (without ordering)`);
      
      const drafts: AIDraft[] = [];

      for (const draftDoc of aiDraftsSnap.docs) {
        const draft = draftDoc.data();
        const projectInfo = draft.projectId === 'general' 
          ? { name: 'General Email', clientEmail: draft.from || 'Unknown' }
          : projectMap.get(draft.projectId) || { name: 'Project', clientEmail: 'Client' };
        
        drafts.push({
          id: draftDoc.id,
          projectId: draft.projectId,
          projectName: projectInfo.name,
          clientEmail: projectInfo.clientEmail,
          from: projectInfo.clientEmail,
          subject: draft.subject || 'No Subject',
          body: draft.body || '',
          content: draft.body || '',
          closing: draft.closing || '',
          signature: draft.signature || '',
          status: draft.status,
          createdAt: draft.createdAt instanceof Date ? draft.createdAt : draft.createdAt?.toDate?.() || new Date(),
        });
      }

      const limitedDrafts = drafts.slice(0, limit);

      return NextResponse.json({ 
        drafts: limitedDrafts,
        total: limitedDrafts.length,
        forceRefreshTriggered: forceRefresh,
        lastChecked: new Date().toISOString(),
        note: 'Retrieved without ordering due to createdAt field issues'
      });
    }

  } catch (error) {
    console.error('[AI Drafts API] Error fetching AI drafts:', error);
    console.error('[AI Drafts API] Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    
    return NextResponse.json({ 
      error: 'Failed to fetch AI drafts',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// POST /api/ai-drafts - Create new AI draft or trigger email check
export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    
    // If body contains draft data, create new draft
    if (body.projectId && body.subject && body.body) {
      console.log('[AI Drafts API] Creating new draft for user:', userId);
      
      const draftData = {
        userId,
        projectId: body.projectId,
        subject: body.subject,
        body: body.body,
        from: body.from || '',
        to: body.to || '',
        originalEmailId: body.originalEmailId || '',
        status: body.status || 'draft',
        createdAt: new Date(),
        closing: body.closing || '',
        signature: body.signature || ''
      };
      
      const draftRef = await db.collection('aiDrafts').add(draftData);
      
      return NextResponse.json({ 
        success: true, 
        message: 'AI draft created successfully',
        draftId: draftRef.id,
        timestamp: new Date().toISOString()
      });
    }
    
    // Otherwise, trigger manual email check for this user
    console.log('[AI Drafts API] Triggering email check for user:', userId);
    const { emailMonitor } = await import('@/lib/emailMonitor');
    await emailMonitor.checkUserEmailsNow(userId);

    return NextResponse.json({ 
      success: true, 
      message: 'Email check initiated successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in POST /api/ai-drafts:', error);
    return NextResponse.json({ 
      error: 'Failed to process request' 
    }, { status: 500 });
  }
} 