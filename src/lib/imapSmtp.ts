import { ImapFlow } from 'imapflow';
import nodemailer from 'nodemailer';
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.IMAP_ENCRYPTION_KEY || 'changeme';

export function encrypt(text: string) {
  return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
}

export function decrypt(cipher: string) {
  return CryptoJS.AES.decrypt(cipher, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
}

export async function testImapSmtp({
  imapHost, imapPort, imapSecure, smtpHost, smtpPort, smtpSecure, username, password
}: {
  imapHost: string, imapPort: number, imapSecure: boolean,
  smtpHost: string, smtpPort: number, smtpSecure: boolean,
  username: string, password: string
}) {
  // Test IMAP
  const imapClient = new ImapFlow({
    host: imapHost,
    port: imapPort,
    secure: imapSecure,
    auth: { user: username, pass: password },
  });
  try {
    await imapClient.connect();
    await imapClient.logout();
  } catch (e) {
    const err = e as { message?: string; code?: string; command?: string; response?: unknown; source?: string };
    const details = [
      err?.code ? `code=${err.code}` : '',
      err?.command ? `command=${err.command}` : '',
      err?.response ? `response=${String(err.response)}` : '',
      err?.source ? `source=${err.source}` : '',
    ].filter(Boolean).join(' ');
    throw new Error('IMAP connection failed: ' + (err?.message || String(err)) + (details ? ` (${details})` : ''));
  }
  // Test SMTP
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user: username, pass: password },
  });
  try {
    await transporter.verify();
  } catch (e) {
    const err = e as { message?: string; code?: string; response?: unknown };
    const details = [
      err?.code ? `code=${err.code}` : '',
      err?.response ? `response=${String(err.response)}` : '',
    ].filter(Boolean).join(' ');
    throw new Error('SMTP connection failed: ' + (err?.message || String(err)) + (details ? ` (${details})` : ''));
  }
  return true;
}

export async function fetchImapEmails({
  imapHost, imapPort, imapSecure, username, password, mailbox = 'INBOX', limit = 20
}: {
  imapHost: string, imapPort: number, imapSecure: boolean,
  username: string, password: string, mailbox?: string, limit?: number
}) {
  const client = new ImapFlow({
    host: imapHost,
    port: imapPort,
    secure: imapSecure,
    auth: { user: username, pass: password },
  });
  await client.connect();
  const lock = await client.getMailboxLock(mailbox);
  const messages = [];
  try {
    for await (const msg of client.fetch({
      seen: false,
      limit,
      source: true,
      envelope: true,
      flags: true,
      uid: true,
      internalDate: true,
    })) {
      messages.push({
        id: msg.uid,
        from: msg.envelope.from?.[0]?.address,
        subject: msg.envelope.subject,
        date: msg.internalDate,
        snippet: msg.envelope.subject,
        body: '', // Optionally fetch body
      });
    }
  } finally {
    lock.release();
    await client.logout();
  }
  return messages;
}

export async function sendSmtpEmail({
  smtpHost, smtpPort, smtpSecure, username, password, from, to, subject, text, html
}: {
  smtpHost: string, smtpPort: number, smtpSecure: boolean,
  username: string, password: string,
  from: string, to: string, subject: string, text?: string, html?: string
}) {
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user: username, pass: password },
  });
  const info = await transporter.sendMail({ from, to, subject, text, html });
  return info;
} 