import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/lib/getUserFromRequest';
import { db } from '@/lib/firebaseAdmin';
import { testImapSmtp, encrypt } from '../../../../lib/imapSmtp';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const {
      email,
      imapHost,
      imapPort,
      imapSecure,
      smtpHost,
      smtpPort,
      smtpSecure,
      username,
      password,
    } = body;
    const emailTrim = typeof email === 'string' ? email.trim() : email;
    const usernameTrim = typeof username === 'string' ? username.trim() : username;
    if (!emailTrim || !imapHost || !imapPort || !smtpHost || !smtpPort || !usernameTrim || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const toBool = (v: unknown) => v === true || v === 'true' || v === 1 || v === '1';
    const toNum = (v: unknown) => (typeof v === 'number' ? v : Number(v));

    const imapPortNum = toNum(imapPort);
    const smtpPortNum = toNum(smtpPort);
    const imapSecureBool = toBool(imapSecure);
    const smtpSecureBool = toBool(smtpSecure);

    // Validate common secure/port combos with actionable messages
    if (imapPortNum === 993 && !imapSecureBool) {
      return NextResponse.json({ error: 'IMAP port 993 requires secure=true (TLS). Set imapSecure=true or use port 143 with imapSecure=false (STARTTLS).' }, { status: 400 });
    }
    if (imapPortNum === 143 && imapSecureBool) {
      return NextResponse.json({ error: 'IMAP port 143 is typically STARTTLS (secure=false). Use imapSecure=false on 143, or use port 993 with imapSecure=true.' }, { status: 400 });
    }
    if (smtpPortNum === 465 && !smtpSecureBool) {
      return NextResponse.json({ error: 'SMTP port 465 requires secure=true (TLS). Set smtpSecure=true or use port 587 with smtpSecure=false (STARTTLS).' }, { status: 400 });
    }
    if (smtpPortNum === 587 && smtpSecureBool) {
      return NextResponse.json({ error: 'SMTP port 587 is typically STARTTLS (secure=false). Use smtpSecure=false on 587, or use port 465 with smtpSecure=true.' }, { status: 400 });
    }

    // Test connection
    await testImapSmtp({
      imapHost,
      imapPort: imapPortNum,
      imapSecure: imapSecureBool,
      smtpHost,
      smtpPort: smtpPortNum,
      smtpSecure: smtpSecureBool,
      username: usernameTrim,
      password,
    });
    // Encrypt password
    const passwordEnc = encrypt(password);
    // Upsert mailbox (one per user)
    const mailboxSnap = await db.collection('mailboxes').where('userId', '==', userId).limit(1).get();
    if (!mailboxSnap.empty) {
      // Update existing
      const mailboxRef = mailboxSnap.docs[0].ref;
      await mailboxRef.update({
        email: emailTrim,
        imapHost,
        imapPort: imapPortNum,
        imapSecure: imapSecureBool,
        smtpHost,
        smtpPort: smtpPortNum,
        smtpSecure: smtpSecureBool,
        username: usernameTrim,
        passwordEnc,
        provider: 'imap',
      });
    } else {
      // Create new
      await db.collection('mailboxes').add({
        userId,
        provider: 'imap',
        email: emailTrim,
        imapHost,
        imapPort: imapPortNum,
        imapSecure: imapSecureBool,
        smtpHost,
        smtpPort: smtpPortNum,
        smtpSecure: smtpSecureBool,
        username: usernameTrim,
        passwordEnc,
      });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
} 