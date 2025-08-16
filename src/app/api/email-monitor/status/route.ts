export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/lib/getUserFromRequest';
import { db } from '@/lib/firebaseAdmin';

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get email settings
    const emailSettingsSnap = await db.collection('emailSettings')
      .where('userId', '==', userId)
      .where('isActive', '==', true)
      .get();

    const emailSettings = emailSettingsSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Get client filters
    const clientFiltersSnap = await db.collection('clientEmailFilters')
      .where('userId', '==', userId)
      .where('isActive', '==', true)
      .get();

    const clientFilters = clientFiltersSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Get recent processed emails
    const processedEmailsSnap = await db.collection('processedEmails')
      .where('userId', '==', userId)
      .orderBy('processedAt', 'desc')
      .limit(10)
      .get();

    const processedEmails = processedEmailsSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Get AI drafts
    // First get processed emails for this user to filter drafts
    const processedEmailIds = processedEmails.map(email => email.id);
    
    // If no processed emails, return empty array for drafts
    let aiDrafts: any[] = [];
    
    if (processedEmailIds.length > 0) {
      // Firestore has a limit of 10 items for 'in' queries, so we need to handle this in batches if needed
      const batchSize = 10;
      const allDrafts: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[] = [];
      
      // Process in batches of 10
      for (let i = 0; i < processedEmailIds.length && i < batchSize; i += batchSize) {
        const batch = processedEmailIds.slice(i, i + batchSize);
        
        // Create a new query for each batch that includes the processedEmailId filter
        const batchQuery = db.collection('aiDrafts')
          .where('processedEmailId', 'in', batch)
          .where('status', '==', 'draft')
          .orderBy('createdAt', 'desc');
        
        const batchSnap = await batchQuery.get();
        allDrafts.push(...batchSnap.docs);
      }
      
      // Sort all drafts by createdAt
      allDrafts.sort((a, b) => {
        const dateA = a.data().createdAt instanceof Date ? a.data().createdAt : a.data().createdAt?.toDate?.() || new Date();
        const dateB = b.data().createdAt instanceof Date ? b.data().createdAt : b.data().createdAt?.toDate?.() || new Date();
        return dateB.getTime() - dateA.getTime(); // Most recent first
      });
      
      // Limit to 10 drafts
      const aiDraftsSnap = allDrafts.slice(0, 10);
      
      aiDrafts = aiDraftsSnap.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    }

    // aiDrafts is already defined and populated above

    return NextResponse.json({
      success: true,
      emailSettings,
      clientFilters,
      processedEmails,
      aiDrafts,
      summary: {
        emailSettingsCount: emailSettings.length,
        clientFiltersCount: clientFilters.length,
        processedEmailsCount: processedEmails.length,
        aiDraftsCount: aiDrafts.length
      }
    });
  } catch (error) {
    console.error('Error getting email monitoring status:', error);
    return NextResponse.json({ 
      error: 'Failed to get email monitoring status' 
    }, { status: 500 });
  }
}