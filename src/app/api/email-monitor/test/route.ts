import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/lib/getUserFromRequest';
import { db } from '@/lib/firebaseAdmin';

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has email settings
    const emailSettingsSnap = await db.collection('emailSettings')
      .where('userId', '==', userId)
      .where('isActive', '==', true)
      .get();

    // Check if user has projects with client emails
    const projectsSnap = await db.collection('projects')
      .where('userId', '==', userId)
      .get();

    const projects = projectsSnap.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      clientEmail: doc.data().clientEmail
    }));

    // Check existing AI drafts
    const aiDraftsSnap = await db.collection('aiDrafts')
      .where('userId', '==', userId)
      .get();

    // Check processed emails
    const processedEmailsSnap = await db.collection('processedEmails')
      .where('userId', '==', userId)
      .get();

    return NextResponse.json({
      userId,
      emailSettings: {
        count: emailSettingsSnap.docs.length,
        settings: emailSettingsSnap.docs.map(doc => ({
          id: doc.id,
          provider: doc.data().provider,
          email: doc.data().email,
          isActive: doc.data().isActive
        }))
      },
      projects: {
        count: projects.length,
        projects: projects
      },
      aiDrafts: {
        count: aiDraftsSnap.docs.length,
        drafts: aiDraftsSnap.docs.map(doc => ({
          id: doc.id,
          subject: doc.data().subject,
          status: doc.data().status,
          createdAt: doc.data().createdAt
        }))
      },
      processedEmails: {
        count: processedEmailsSnap.docs.length,
        emails: processedEmailsSnap.docs.map(doc => ({
          id: doc.id,
          from: doc.data().from,
          subject: doc.data().subject,
          status: doc.data().status,
          processedAt: doc.data().processedAt
        }))
      }
    });

  } catch (error) {
    console.error('Error in email monitor test:', error);
    return NextResponse.json({ 
      error: 'Failed to test email monitoring' 
    }, { status: 500 });
  }
} 