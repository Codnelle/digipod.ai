import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/lib/getUserFromRequest';
import { db } from '@/lib/firebaseAdmin';
import { decrypt, fetchImapEmails } from '@/lib/imapSmtp';
import { fetchUnreadEmails } from '@/lib/gmail';

export const dynamic = 'force-dynamic';

interface DashboardEmail {
  id: string;
  from: string;
  to: string;
  subject: string;
  date: string;
  snippet: string;
  body: string;
}

export async function GET(req: NextRequest) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Look for an IMAP mailbox first
    const snap = await db.collection('mailboxes').where('userId', '==', userId).limit(1).get();
    if (!snap.empty) {
      const mailbox = snap.docs[0].data() as {
        provider?: string;
        email?: string;
        imapHost?: string;
        imapPort?: number;
        imapSecure?: boolean;
        smtpHost?: string;
        smtpPort?: number;
        smtpSecure?: boolean;
        username?: string;
        passwordEnc?: string;
      };
      if (mailbox.provider === 'imap') {
        // Fetch from IMAP
        const messages = await fetchImapEmails({
          imapHost: mailbox.imapHost!,
          imapPort: mailbox.imapPort!,
          imapSecure: mailbox.imapSecure!,
          username: mailbox.username!,
          password: decrypt(mailbox.passwordEnc!),
          mailbox: 'INBOX',
          limit: 20,
        });
        const normalized: DashboardEmail[] = (messages || []).map((m: {
          id?: string | number;
          from?: string;
          subject?: string;
          date?: string | number | Date;
          snippet?: string;
          body?: string;
        }) => ({
          id: String(m.id),
          from: m.from || '',
          to: mailbox.email || '',
          subject: m.subject || '',
          date: (m.date ? new Date(m.date).toISOString() : new Date().toISOString()),
          snippet: m.snippet || m.subject || '',
          body: m.body || '',
        }));
        // Sort by date desc
        normalized.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return NextResponse.json(normalized);
      }
    }

    // Fallback to Gmail if token exists
    const userSnap = await db.collection('users').doc(userId).get();
    const user = userSnap.data();
    if (user && user.gmailToken) {
      const emails = await fetchUnreadEmails(userId);
      const list = (emails || []) as DashboardEmail[];
      const sorted = list
        .filter((e) => !!e.date)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return NextResponse.json(sorted);
    }

    // Nothing connected
    return NextResponse.json([]);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
} 