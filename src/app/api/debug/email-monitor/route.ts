import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/lib/getUserFromRequest';
import { db } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all projects for this user
    const projectsSnap = await db.collection('projects').where('userId', '==', userId).get();
    const projects = projectsSnap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || 'Unknown',
        clientEmail: data.clientEmail || 'Unknown',
        userId: data.userId || 'Unknown'
      };
    });

    // Get all AI drafts
    const aiDraftsSnap = await db.collection('aiDrafts').get();
    const aiDrafts = aiDraftsSnap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        projectId: data.projectId || 'Unknown',
        subject: data.subject || 'No Subject',
        status: data.status || 'Unknown',
        createdAt: data.createdAt || 'Unknown'
      };
    });

    // Get all processed emails
    const processedEmailsSnap = await db.collection('processedEmails').where('userId', '==', userId).get();
    const processedEmails = processedEmailsSnap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        from: data.from || 'Unknown',
        subject: data.subject || 'No Subject',
        status: data.status || 'Unknown',
        projectId: data.projectId || 'Unknown',
        processedAt: data.processedAt || 'Unknown'
      };
    });

    // Get email settings
    const emailSettingsSnap = await db.collection('emailSettings').where('userId', '==', userId).get();
    const emailSettings = emailSettingsSnap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        provider: data.provider || 'Unknown',
        email: data.email || 'Unknown',
        isActive: data.isActive || false,
        checkInterval: data.checkInterval || 0,
        lastChecked: data.lastChecked || 'Never'
      };
    });

    return NextResponse.json({
      success: true,
      debug: {
        userId,
        projects: {
          count: projects.length,
          data: projects.map(p => ({
            id: p.id,
            name: p.name,
            clientEmail: p.clientEmail,
            userId: p.userId
          }))
        },
        aiDrafts: {
          count: aiDrafts.length,
          data: aiDrafts.map(d => ({
            id: d.id,
            projectId: d.projectId,
            subject: d.subject,
            status: d.status,
            createdAt: d.createdAt
          }))
        },
        processedEmails: {
          count: processedEmails.length,
          data: processedEmails.map(e => ({
            id: e.id,
            from: e.from,
            subject: e.subject,
            status: e.status,
            projectId: e.projectId,
            processedAt: e.processedAt
          }))
        },
        emailSettings: {
          count: emailSettings.length,
          data: emailSettings.map(s => ({
            id: s.id,
            provider: s.provider,
            email: s.email,
            isActive: s.isActive,
            checkInterval: s.checkInterval,
            lastChecked: s.lastChecked
          }))
        }
      }
    });

  } catch (error) {
    console.error('Error in debug endpoint:', error);
    return NextResponse.json({ 
      error: 'Failed to get debug info',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 