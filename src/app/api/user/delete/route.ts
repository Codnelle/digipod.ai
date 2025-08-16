import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/lib/getUserFromRequest';
import { db } from '@/lib/firebaseAdmin';

export async function DELETE(req: NextRequest) {
  try {
    // Get authenticated user ID
    const authenticatedUserId = await getUserIdFromRequest(req);
    if (!authenticatedUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user ID from request body
    const { userId } = await req.json();
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Verify the user is deleting their own account
    if (authenticatedUserId !== userId) {
      return NextResponse.json({ error: 'Unauthorized to delete this account' }, { status: 403 });
    }

    console.log(`🗑️ Deleting user account and all data for user: ${userId}`);

    // Delete all user data from Firestore
    const batch = db.batch();

    // Delete user's projects
    const projectsSnapshot = await db.collection('projects').where('userId', '==', userId).get();
    projectsSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Delete user's todos
    const todosSnapshot = await db.collection('todos').where('userId', '==', userId).get();
    todosSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Delete user's AI drafts
    const draftsSnapshot = await db.collection('aiDrafts').where('userId', '==', userId).get();
    draftsSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Delete user's email settings
    const emailSettingsSnapshot = await db.collection('emailSettings').where('userId', '==', userId).get();
    emailSettingsSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Delete user's device tokens
    const deviceTokensDoc = db.collection('deviceTokens').doc(userId);
    batch.delete(deviceTokensDoc);

    // Delete user's processed emails
    const processedEmailsSnapshot = await db.collection('processedEmails').where('userId', '==', userId).get();
    processedEmailsSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Delete user's client filters
    const clientFiltersSnapshot = await db.collection('clientFilters').where('userId', '==', userId).get();
    clientFiltersSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Delete user's calendar events
    const calendarEventsSnapshot = await db.collection('calendarEvents').where('userId', '==', userId).get();
    calendarEventsSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Delete user's push notification registrations
    const pushNotificationsSnapshot = await db.collection('pushNotifications').where('userId', '==', userId).get();
    pushNotificationsSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Delete user's hustle meter data
    const hustleMeterSnapshot = await db.collection('hustleMeter').where('userId', '==', userId).get();
    hustleMeterSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Delete user's notes
    const notesSnapshot = await db.collection('notes').where('userId', '==', userId).get();
    notesSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Delete user's universal license data
    const universalLicenseSnapshot = await db.collection('universalLicense').where('userId', '==', userId).get();
    universalLicenseSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Commit all deletions
    await batch.commit();

    console.log(`✅ Successfully deleted all data for user: ${userId}`);

    return NextResponse.json({
      success: true,
      message: 'User account and all associated data deleted successfully'
    });

  } catch (error) {
    console.error('❌ Error deleting user account:', error);
    return NextResponse.json(
      { error: 'Failed to delete user account' },
      { status: 500 }
    );
  }
} 