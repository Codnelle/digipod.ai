import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';
import { getGeminiReply } from '@/lib/gemini';
import { sendPushToUser } from '@/lib/pushNotifications';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

interface Project {
  id: string;
  currentPhase: string;
  userId?: string;
  name?: string;
  // Add other fields as needed
}

// Helper: find project by client email (from)
async function findProjectByClientEmail(email: string): Promise<Project | null> {
  const projectsSnap = await db.collection('projects').where('clientEmail', '==', email).limit(1).get();
  if (projectsSnap.empty) return null;
  const data = projectsSnap.docs[0].data();
  return { id: projectsSnap.docs[0].id, currentPhase: data.currentPhase, userId: data.userId, name: data.name };
}

export async function POST(req: NextRequest) {
  const { from, subject, body, gmailId } = await req.json();
  if (!from || !body) {
    return NextResponse.json({ error: 'Missing from or body' }, { status: 400 });
  }
  // Find project (customize as needed)
  const project = await findProjectByClientEmail(from);
  if (!project) {
    return NextResponse.json({ error: 'Project not found for this client' }, { status: 404 });
  }
  // Store incoming email as client message
  await db.collection('projects').doc(project.id).collection('clientMessages').add({
    body: `Subject: ${subject || ''}\n${body}`,
    from: 'CLIENT',
    createdAt: new Date(),
    ...(gmailId ? { gmailId } : {}),
  });
  // Get Gemini AI reply
  const geminiRes = await getGeminiReply(body);
  // Store AI reply
  await db.collection('projects').doc(project.id).collection('clientMessages').add({
    body: geminiRes.body,
    subject: geminiRes.subject || 'AI Reply',
    from: 'AI',
    status: 'draft',
    createdAt: new Date(),
  });

  if (project.userId) {
    await sendPushToUser({
      userId: project.userId,
      title: 'New AI draft generated',
      body: geminiRes.subject || 'AI draft is ready',
      data: {
        changeType: 'new_draft',
        projectId: project.id,
        projectName: project.name || 'Project',
        description: geminiRes.subject || subject || 'AI draft',
      },
      silent: false,
      category: 'EMAIL_NOTIFICATION',
    });
  }

  // Handle trigger
  let updatedProject = project;
  if (geminiRes.trigger === 'client_approved') {
    const phases = ['DISCOVERY', 'DESIGN', 'REVISIONS', 'DELIVERY'];
    const idx = phases.indexOf(project.currentPhase);
    if (idx >= 0 && idx < phases.length - 1) {
      const nextPhase = phases[idx + 1];
      await db.collection('projects').doc(project.id).update({ currentPhase: nextPhase, updatedAt: new Date() });
      await db.collection('projects').doc(project.id).collection('phaseHistory').add({ phase: nextPhase, timestamp: new Date() });
      updatedProject = { ...project, currentPhase: nextPhase };

      if (project.userId) {
        await sendPushToUser({
          userId: project.userId,
          title: 'Project phase advanced',
          body: `${project.name || 'Project'} moved to ${nextPhase}`,
          data: {
            changeType: 'phase_advance',
            projectId: project.id,
            projectName: project.name || 'Project',
            description: `Phase advanced to ${nextPhase}`,
          },
          silent: false,
          category: 'PROJECT_NOTIFICATION',
        });
      }
    }
  }
  // Send AI reply to client (Resend or Nodemailer)
  // await resend.emails.send({
  //   from: 'studio@digipod.ai',
  //   to: from,
  //   subject: `Re: ${subject}`,
  //   text: geminiRes.body,
  // });
  return NextResponse.json({ success: true, aiReply: geminiRes.body, trigger: geminiRes.trigger, project: updatedProject });
} 