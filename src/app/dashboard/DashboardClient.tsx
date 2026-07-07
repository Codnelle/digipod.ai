'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { FolderIcon, EllipsisVerticalIcon, ChevronDownIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import AntiHustleMeter from '@/components/AntiHustleMeter';
import useSWR from 'swr';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { CalendarDaysIcon, EnvelopeOpenIcon } from '@heroicons/react/24/solid';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import { incrementMinutesSaved } from '@/lib/hustleMeter';
import { SparklesIcon } from '@heroicons/react/24/solid';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

// console.log('Firebase config (dashboard):', auth.app.options);

interface Project {
  id: string;
  name: string;
  clientEmail?: string;
  userId: string;
  currentPhase: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  phaseHistory?: { id: string; phase: string; timestamp: string | Date }[];
  clientMessages?: { id: string; body: string; from: string; createdAt: string | Date }[];
  phases?: string[]; // Added for edit functionality
  status: string;
  parentId?: string;
  trigger?: string;
  gmailId?: string; // Added for Gmail ID
  currency?: string; // Added for currency
  totalAmount?: number; // Added for total amount
}

interface DashboardEmail {
  id: string;
  projectId: string;
  projectName: string;
  clientEmail?: string;
  from: string;
  subject: string;
  body: string;
  closing: string;
  signature: string;
  status: string;
  createdAt: FirebaseFirestore.Timestamp | Date | string;
  parentId?: string;
  trigger?: string;
  gmailId?: string; // Added for Gmail ID
}

interface CalendarEvent {
  title: string;
  date: string;
  description?: string;
  id?: string;
  end?: string;
}

interface CalendarEventsApiResponse {
  events?: CalendarEvent[];
  error?: string;
}

interface Todo {
  task: string;
  dueDate?: string;
  type: 'project' | 'calendar';
  projectName?: string;
  confidence?: number;
  createdAt?: {
    _seconds: number;
    _nanoseconds: number;
  };
}

interface TodosApiResponse {
  todos?: Todo[];
  error?: string;
}

interface AiDraftsApiResponse {
  drafts?: DashboardEmail[];
  error?: string;
}

interface SummaryMetrics {
  phaseAdvances?: number;
  newDrafts?: number;
  newTodos?: number;
  processedEmails?: number;
  aiActivities?: number;
  highImpactChanges?: number;
}

interface DashboardSummary {
  summaryText?: string;
  summary?: SummaryMetrics;
  lastUpdated?: string;
  error?: string;
}

const fetcher = async (url: string) => {
  const user = auth.currentUser;
  if (!user) return [];
  const token = await user.getIdToken(true);
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) return [];
  const data = await res.json();
  if (!Array.isArray(data)) return [];
  return data;
};

async function createProject(name: string, clientEmail: string, clientName?: string) {
  const user = auth.currentUser;
  if (!user) return null;
  const token = await user.getIdToken();
  const res = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name, clientEmail, clientName }),
  });
  if (!res.ok) {
    // Optionally, show a toast or log the error
    return null;
  }
  const data = await res.json();
  if (!data || !data.id) return null;
  return data;
}

async function fetchGmailUser() {
  const user = auth.currentUser;
  if (!user) return null;
  const token = await user.getIdToken();
  const res = await fetch('/api/gmail-user', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return res.json();
}

// Helper to fetch with auth token
async function fetchWithAuth<T>(url: string): Promise<T> {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const token = await user.getIdToken(true);
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: `Request failed with status ${res.status}` }));
    throw new Error(errorData.message || 'Unknown error');
  }
  return res.json();
}

function ProjectCard({ project, onDelete, onEdit }: { project: Project, onDelete: (id: string) => void, onEdit: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  // Use the same date parsing logic as elsewhere
  const getDateFromEmail = (dateVal: FirebaseFirestore.Timestamp | Date | string): Date => {
    if (dateVal && typeof dateVal === 'object' && typeof (dateVal as { toDate?: unknown }).toDate === 'function') {
      return (dateVal as { toDate: () => Date }).toDate();
    }
    if (dateVal instanceof Date) return dateVal;
    if (typeof dateVal === 'string') return new Date(dateVal);
    return new Date();
  };
  return (
    <div
      className="relative rounded-2xl shadow-xl p-8 border border-blue-200/30 backdrop-blur-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-200/60 group cursor-pointer bg-white/10 overflow-hidden"
      onClick={() => router.push(`/project/${project.id}`)}
    >
      <div className="absolute inset-0 pointer-events-none rounded-2xl bg-[#6446d6]" style={{boxShadow: '-1px 128px 215px 0px rgb(35, 36, 58, .7) inset'}} />
      {/* Dots menu */}
      <div className="absolute top-4 right-4 z-20">
        <button onClick={e => { e.stopPropagation(); setMenuOpen(v => !v); }} className="p-2 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <EllipsisVerticalIcon className="h-6 w-6 text-white" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-gray-900 border border-gray-700 rounded-lg shadow-lg py-1 z-30">
            <button className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800" onClick={e => { e.stopPropagation(); setMenuOpen(false); onEdit(project.id); }}>
              Edit
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800" onClick={e => { e.stopPropagation(); setMenuOpen(false); onDelete(project.id); }}>
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3 mb-2 relative z-10">
        <FolderIcon className="h-6 w-6 text-blue-400 group-hover:text-purple-500 transition-colors animate-float-slow" />
        <span className="font-semibold text-lg text-white group-hover:text-purple-200 transition-colors">{project.name}</span>
      </div>
      <div className="text-blue-100 mb-2 relative z-10">{project.clientEmail ? `Client: ${project.clientEmail}` : 'No client email set'}</div>
      {project.totalAmount !== undefined && project.totalAmount !== null && (
        <div className="text-blue-200 text-sm mt-2">
          Payment: {project.currency ? `${project.currency} ` : ''}{project.totalAmount}
        </div>
      )}
      <div className="flex flex-col gap-2 relative z-10">
        <span className="text-xs text-blue-200">Created: {getDateFromEmail(project.createdAt).toLocaleString()}</span>
        <span className="text-xs text-blue-200">Phase: <span className="font-semibold text-blue-300">{project.currentPhase}</span></span>
      </div>
      <button
        className="mt-4 px-4 py-2 rounded-lg text-center font-semibold shadow-md bg-gradient-to-r from-blue-600 to-purple-500 text-white hover:from-purple-500 hover:to-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-300 focus:outline-none active:scale-95 relative z-10"
        onClick={e => { e.stopPropagation(); router.push(`/project/${project.id}`); }}
      >
        Open Project
      </button>
    </div>
  );
}

function ExpandableCard({ expanded, onClick, title, icon, summary, content, loading, gradientClass, isGmailConnected, onRefresh }: {
  expanded: boolean;
  onClick: () => void;
  title: React.ReactNode;
  icon: React.ReactNode;
  summary: React.ReactNode;
  content: React.ReactNode;
  loading: boolean;
  gradientClass: string;
  isGmailConnected: boolean;
  onRefresh?: () => void;
}) {
  return (
    <div
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
      aria-busy={loading}
      className={[
        gradientClass,
        "group relative flex flex-col items-start w-full cursor-pointer select-none",
        "rounded-2xl p-7 backdrop-blur-md card-bg",
        "border border-white/10 shadow-xl",
        expanded ? "h-auto min-h-0" : "min-h-[180px] h-full",
        // scoped transitions only — no `transition-all`
        "transition-[transform,box-shadow,border-color] duration-300 will-change-transform",
        "hover:-translate-y-1 hover:border-[#6c4ad6]/60 hover:shadow-[0_12px_40px_rgba(108,74,214,0.25)]",
        "motion-reduce:transform-none motion-reduce:transition-none",
        "outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600]/60",
        expanded ? "border-[#6c4ad6]/60 ring-1 ring-[#6c4ad6]/30" : "",
      ].join(" ")}
      onClick={onClick}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onClick())}
    >
      {/* Header */}
      <div className="flex w-full items-center gap-2 mb-4">
        <span className="shrink-0">{icon}</span>
        <h2 className="text-xl font-extrabold text-white flex-1 tracking-tight truncate">{title}</h2>

        {onRefresh && (
          <button
            onClick={(e) => { e.stopPropagation(); onRefresh(); }}
            className="p-1.5 rounded-full text-[#cfc9e8] hover:text-white hover:bg-white/10 transition-colors duration-200"
            title="Refresh"
            aria-label="Refresh data"
          >
            <ArrowPathIcon className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
          </button>
        )}

        <ChevronDownIcon
          className={`h-6 w-6 text-[#a18fff] transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
        />
      </div>

      {/* Body */}
      {!isGmailConnected ? (
        <div className="w-full flex flex-col items-center justify-center py-6 text-center">
          <p className="text-[#cfc9e8] text-base">Connect your Gmail account to use this feature.</p>
        </div>
      ) : loading ? (
        // Skeletons only — no full-card pulse, no extra blurred overlay
        <div className="w-full space-y-3" aria-hidden>
          <div className="space-y-2">
            <div className="h-4 w-4/5 rounded bg-white/10 animate-pulse" />
            <div className="h-4 w-3/5 rounded bg-white/10 animate-pulse" />
          </div>
          <div className="space-y-3 mt-4">
            <div className="h-6 w-full rounded bg-white/10 animate-pulse" />
            <div className="h-6 w-11/12 rounded bg-white/10 animate-pulse" />
            <div className="h-6 w-8/12 rounded bg-white/10 animate-pulse" />
          </div>
        </div>
      ) : (
        <>
          <div className="w-full">{summary}</div>
          <div className={`w-full mt-2 ${expanded ? "" : "max-h-[260px] overflow-y-auto"}`}>{content}</div>
        </>
      )}
    </div>
  );
}

function EmptyState({ icon, title, hint, action }: {
  icon: React.ReactNode;
  title: string;
  hint?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-[150px] flex flex-col items-center justify-center text-center gap-3 py-6 animate-fade-in">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.03] text-[#a18fff]">
        <div className="absolute inset-0 rounded-2xl bg-[#6c4ad6]/10 blur-md" aria-hidden />
        <span className="relative">{icon}</span>
      </div>
      <div>
        <p className="text-white font-semibold text-[15px]">{title}</p>
        {hint && <p className="text-[#a18fff]/70 text-sm mt-1 max-w-[240px] mx-auto leading-snug">{hint}</p>}
      </div>
      {action}
    </div>
  );
}
const fetchTodosWithAuth = async (url: string) => {
  // Wait for Firebase Auth to be ready and user to be logged in
  if (!auth.currentUser) return [];
  const token = await auth.currentUser.getIdToken(true);
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.todos || [];
};

export default function DashboardClient() {
  const [toast, setToast] = useState<string | null>(null);
  const [minutesSaved, setMinutesSaved] = useState(0);
  const [authChecking, setAuthChecking] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const [, forceRerender] = useState(0);
  const router = useRouter();
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [editPhases, setEditPhases] = useState<string[]>([]);
  const [editName, setEditName] = useState('');
  const [editError, setEditError] = useState<string | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const shouldFetchProjects = authReady && !!auth.currentUser;
  const { data: projectsData = [], mutate: mutateProjects } = useSWR(
    shouldFetchProjects ? '/api/projects' : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  // AI drafts state
  const [aiDraftsData, setAiDraftsData] = useState<{ drafts: DashboardEmail[] }>({ drafts: [] });
  const [loadingDrafts, setLoadingDrafts] = useState(false);

  // New state for AI-powered dashboard sections
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingCalendar, setLoadingCalendar] = useState(true);
  const [loadingTodos, setLoadingTodos] = useState(true);
  // Add state for expanded cards
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  // Add state for Gmail connection
  const [isGmailConnected, setIsGmailConnected] = useState(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState<{ date: Date; events: { title: string; start: Date; end: Date }[] } | null>(null);
  // Calendar state (must be at top level)
  const [calendarEvents, setCalendarEvents] = useState<{ title: string; date: string }[]>([]);
  const [calendarError, setCalendarError] = useState<string | null>(null);
  const [newEventsCount, setNewEventsCount] = useState(0);

  const [todos, setTodos] = useState<{ task: string; dueDate?: string; type: 'project' | 'calendar'; projectName?: string; confidence?: number }[]>([]);

  // AI Drafts state
  const [selectedDraft, setSelectedDraft] = useState<DashboardEmail | null>(null);
  const [editableDraft, setEditableDraft] = useState<DashboardEmail | null>(null);
  const [clientMessages, setClientMessages] = useState<DashboardEmail[]>([]);
  const [parentEmail, setParentEmail] = useState<DashboardEmail | null>(null);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [summaryData, setSummaryData] = useState<{
    summary?: {
      phaseAdvances?: number;
      newDrafts?: number;
      newTodos?: number;
      processedEmails?: number;
      aiActivities?: number;
      highImpactChanges?: number;
    };
    lastUpdated?: string;
  } | null>(null);

  // Modal state for creating a new project
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState('');

  // Add state for currency
  const [editCurrency, setEditCurrency] = useState(editProject?.currency || 'INR');

  const shouldFetchTodos = authReady && !!auth.currentUser;
  const { mutate: mutateTodos } = useSWR(
    shouldFetchTodos ? '/api/client-todos' : null,
    fetchTodosWithAuth,
    { revalidateOnFocus: false }
  );

  // Helper to toggle card expansion
  const handleCardToggle = (card: string) => {
    setExpandedCard(expandedCard === card ? null : card);
    
    // Clear notification count when calendar is opened
    if (card === 'calendar') {
      setNewEventsCount(0);
      // Store current timestamp as last seen
      localStorage.setItem('digipod-last-seen-calendar', Date.now().toString());
    }
  };



  // Helper: group events by date for modal
  function getEventsForDate(date: Date) {
    return calendarEvents.filter(ev => {
      const evDate = new Date(ev.date);
      return evDate.toDateString() === date.toDateString();
    });
  }

  // Helper to get date from Firestore Timestamp, Date, or string
  const getDateFromEmail = (dateVal: FirebaseFirestore.Timestamp | Date | string): Date => {
    if (dateVal && typeof dateVal === 'object' && typeof (dateVal as { toDate?: unknown }).toDate === 'function') {
      return (dateVal as { toDate: () => Date }).toDate();
    }
    if (dateVal instanceof Date) return dateVal;
    if (typeof dateVal === 'string') return new Date(dateVal);
    return new Date();
  };

  // Helper function to open draft modal
  const openDraftModal = (draft: DashboardEmail) => {
    setSelectedDraft(draft);
    setEditableDraft({ ...draft });
  };

  // Helper function to close draft modal
  const closeDraftModal = () => {
    setSelectedDraft(null);
    setEditableDraft(null);
  };

  // Check if user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthReady(true);
      console.log('onAuthStateChanged (dashboard) fired. User:', user);
      if (!user) {
        // User is not signed in, redirect to signin
        router.push('/signin');
      } else {
        // User is signed in, show dashboard
        setAuthChecking(false);
        // No need to fetchProjects here, SWR will handle it
        fetchGmailUser().then((user: { email?: string, gmailConnected?: boolean } | null) => {
          if (user) {
            setIsGmailConnected(user.gmailConnected || false);
            if (user.email && user.gmailConnected) {
              setToast(`Gmail connected: ${user.email}`);
            }
          }
        });
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const handleStorage = () => {
      const saved = parseInt(localStorage.getItem('digipod-minutes-saved') || '0', 10);
      setMinutesSaved(saved);
    };
    // Set initial value on mount
    handleStorage();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    if (toast) {
      const timeout = setTimeout(() => setToast(null), 3000); // 3 seconds
      return () => clearTimeout(timeout);
    }
  }, [toast]);

  useEffect(() => {
    // Listen for theme change event to force re-render
    const handler = () => forceRerender(v => v + 1);
    window.addEventListener('digipod-theme-change', handler);
    return () => window.removeEventListener('digipod-theme-change', handler);
  }, []);



  // Refresh functions for each card
  const refreshSummary = async () => {
    console.log('🔄 Refreshing summary data...');
    setLoadingSummary(true);
    try {
      const summaryData = await fetchWithAuth<DashboardSummary>('/api/dashboard/summary');
      setAiSummary(summaryData.summaryText || 'No AI changes detected.');
      setSummaryData(summaryData);
    } catch (error) {
      console.error('Error refreshing summary:', error);
    } finally {
      setLoadingSummary(false);
    }
  };

  const refreshTodos = async () => {
    console.log('🔄 Refreshing todos data...');
    setLoadingTodos(true);
    try {
      // Re-fetch todos data directly
      const todosData = await fetchTodosWithAuth('/api/client-todos');
      console.log('🔍 Refreshed todosData:', todosData);
      
      // Process the data the same way as in the useEffect
      const todosRaw: Todo[] = Array.isArray(todosData) ? todosData : [];
      
      // Sort todos by creation date (most recent first)
      todosRaw.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt._seconds * 1000) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt._seconds * 1000) : new Date(0);
        return dateB.getTime() - dateA.getTime(); // Most recent first
      });
      
      console.log('🔍 Refreshed and sorted todosRaw:', todosRaw);
      
      // Combine with calendar events (re-fetch calendar data too)
      const calendarData = await fetchWithAuth<CalendarEventsApiResponse>('/api/calendar-events');
      const calendarEventsRaw = calendarData.events || [];
      
      const calendarTodos = calendarEventsRaw
        .filter(ev => {
          const text = (ev.title + ' ' + (ev.description || '')).toLowerCase();
          return /call|meeting|zoom|meet/.test(text);
        })
        .map(ev => ({
          task: ev.title,
          dueDate: ev.date,
          type: 'calendar' as const,
        }));

      // Combine all tasks: backend todos, calendar events, and draft tasks
      setTodos([...todosRaw, ...calendarTodos]);
      
    } catch (error) {
      console.error('Error refreshing todos:', error);
    } finally {
      setLoadingTodos(false);
    }
  };

  const refreshDrafts = async () => {
    console.log('🔄 Refreshing drafts data...');
    setLoadingDrafts(true);
    try {
      const draftsData = await fetchWithAuth<AiDraftsApiResponse>('/api/ai-drafts?status=draft&limit=10');
      setAiDraftsData({ drafts: draftsData.drafts || [] });
    } catch (error) {
      console.error('Error refreshing drafts:', error);
    } finally {
      setLoadingDrafts(false);
    }
  };

  // Listen for todo-added events to refresh todos data
  useEffect(() => {
    const handleTodoAdded = () => {
      console.log('🔄 Todo added event received, refreshing todos...');
      mutateTodos(); // Refresh the todos data
    };
    
    const handleSummaryRefresh = () => {
      console.log('🔄 Summary refresh event received, refreshing summary...');
      refreshSummary(); // Now we can use refreshSummary since it's defined above
    };
    
    window.addEventListener('todo-added', handleTodoAdded);
    window.addEventListener('summary-refresh', handleSummaryRefresh);
    return () => {
      window.removeEventListener('todo-added', handleTodoAdded);
      window.removeEventListener('summary-refresh', handleSummaryRefresh);
    };
  }, [mutateTodos, refreshSummary]);

  useEffect(() => {
    if (!authReady) return;
    setLoadingSummary(true); setLoadingCalendar(true); setLoadingTodos(true); setLoadingDrafts(true);
    // Fetch actionable to-dos, AI drafts, and AI changes summary from backend
    console.log('Starting API calls for dashboard data...');
    Promise.all([
      fetchWithAuth<CalendarEventsApiResponse>('/api/calendar-events').catch((err): CalendarEventsApiResponse => { console.log('Calendar API error:', err); return { error: (err as Error).message || 'Failed to load calendar events', events: [] }; }),
      fetchTodosWithAuth('/api/client-todos').catch((err): TodosApiResponse => { console.log('Todos API error:', err); return { error: (err as Error).message || 'Failed to load to-dos', todos: [] }; }),
      fetchWithAuth<AiDraftsApiResponse>('/api/ai-drafts?status=draft&limit=10').catch((err): AiDraftsApiResponse => { console.log('AI drafts API error:', err); return { error: (err as Error).message || 'Failed to load AI drafts', drafts: [] }; }),
      fetchWithAuth<DashboardSummary>('/api/dashboard/summary').catch((err): DashboardSummary => { console.log('Dashboard summary API error:', err); return { error: (err as Error).message || 'Failed to load dashboard summary' }; })
    ]).then(([calendarData, todosData, aiDraftsData, summaryData]) => {
      let calendarEventsRaw: CalendarEvent[] = [];
      let todosRaw: Todo[] = [];

      if (calendarData.error) {
        if (calendarData.error.includes('Unauthorized')) {
          setCalendarError('You are not logged in or your session expired. Please log in and reconnect Google.');
          setToast('Google Calendar: Not authorized. Please log in and reconnect.');
        } else if (calendarData.error.includes('No Google token')) {
          setCalendarError('Google account not connected. Please reconnect Google.');
          setToast('Google Calendar: Not connected. Please reconnect.');
        } else if (calendarData.error.includes('Google Calendar API error')) {
          setCalendarError('Google Calendar API error. Try reconnecting Google.');
          setToast('Google Calendar: API error. Try reconnecting.');
        } else {
          setCalendarError('Failed to load Google Calendar.');
          setToast('Google Calendar: Failed to load.');
        }
        setCalendarEvents([]);
        setLoadingCalendar(false);
      } else {
        calendarEventsRaw = calendarData.events || [];
        setCalendarEvents(calendarEventsRaw);
        setCalendarError(null);
        setLoadingCalendar(false);
        
        // Calculate new events count
        const lastSeenTimestamp = localStorage.getItem('digipod-last-seen-calendar') || '0';
        const lastSeenDate = new Date(parseInt(lastSeenTimestamp));
        
        console.log('Calendar events raw:', calendarEventsRaw);
        console.log('Last seen timestamp:', lastSeenTimestamp);
        console.log('Last seen date:', lastSeenDate);
        
        // If this is the first visit (lastSeenTimestamp is 0), show all events as new
        if (lastSeenTimestamp === '0') {
          console.log('First visit - showing all events as new:', calendarEventsRaw.length);
          setNewEventsCount(calendarEventsRaw.length);
        } else {
          // Otherwise, only show events that are newer than last seen
          const newEvents = calendarEventsRaw.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate > lastSeenDate;
          });
          console.log('Subsequent visit - new events count:', newEvents.length);
          setNewEventsCount(newEvents.length);
        }
      }

      // todosData is already the array of todos from fetchTodosWithAuth
      console.log('🔍 Processing todosData:', todosData);
      todosRaw = Array.isArray(todosData) ? todosData : [];
      console.log('🔍 Processed todosRaw:', todosRaw);
      
      // Sort todos by creation date (most recent first)
      todosRaw.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt._seconds * 1000) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt._seconds * 1000) : new Date(0);
        return dateB.getTime() - dateA.getTime(); // Most recent first
      });
      
      console.log('🔍 Sorted todosRaw:', todosRaw);
        setLoadingTodos(false);

      // Combine project/client todos and calendar events
      const calendarTodos = calendarEventsRaw
        .filter(ev => {
          const text = (ev.title + ' ' + (ev.description || '')).toLowerCase();
          return /call|meeting|zoom|meet/.test(text);
        })
        .map(ev => ({
          task: ev.title,
          dueDate: ev.date,
          type: 'calendar' as const,
        }));

      // Process AI drafts data
      if (aiDraftsData.error) {
        setAiDraftsData({ drafts: [] });
        setLoadingDrafts(false);
      } else {
        const draftsData = aiDraftsData || { drafts: [] };
        setAiDraftsData({ drafts: draftsData.drafts || [] });
        setLoadingDrafts(false);
      }

      // Process AI changes summary data
      console.log('Processing summary data:', summaryData);
      if (summaryData.error) {
        console.log('Summary data has error:', summaryData.error);
        setAiSummary("Unable to load AI changes summary.");
        setLoadingSummary(false);
      } else {
        const summaryInfo = summaryData || {};
        console.log('Summary info:', summaryInfo);
        setAiSummary(summaryInfo.summaryText || "No AI changes detected.");
        setSummaryData(summaryInfo);
        setLoadingSummary(false);
      }

      // Extract tasks from AI drafts
      const draftTasks = aiDraftsData.drafts?.filter((draft: DashboardEmail) => draft.status === 'draft')
        .map((draft: DashboardEmail) => ({
          task: `Review AI draft: ${draft.subject || 'AI Draft'}`,
          type: 'project' as const,
          projectName: draft.projectName || 'Client',
          confidence: 0.7
        })) || [];
      
      // Combine all tasks: backend todos, calendar events, and draft tasks
      setTodos([...todosRaw, ...calendarTodos, ...draftTasks]);
    }).catch(() => {
      setLoadingCalendar(false);
      setLoadingTodos(false);
      setLoadingDrafts(false);
      setLoadingSummary(false);
      setCalendarError('Failed to load Google Calendar');
      setToast('Google Calendar: Failed to load.');
    });
  }, [authReady]);

  // Check Gmail connection
  const checkGmailConnection = async () => {
    const user = auth.currentUser;
    if (!user) {
      return;
    }
    const token = await user.getIdToken();
    const res = await fetch('/api/gmail-user', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      setIsGmailConnected(false);
      return;
    }
    const data = await res.json();
    setIsGmailConnected(data.gmailConnected || false);
  };

  useEffect(() => {
    checkGmailConnection();
  }, [authReady]);

  const handleDelete = async (projectId: string) => {
    // Add confirmation step
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    
    const confirmed = window.confirm(`Are you sure you want to delete "${project.name}"? This action cannot be undone.`);
    if (!confirmed) return;
    
    const user = auth.currentUser;
    if (!user) return;
    const token = await user.getIdToken();
    const res = await fetch(`/api/projects/${projectId}`, { 
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      mutateProjects();
      setToast(`Project "${project.name}" deleted successfully.`);
    } else {
      const errorData = await res.json().catch(() => ({}));
      setToast(`Failed to delete project: ${errorData.error || 'Unknown error'}`);
    }
  };

  // Edit handler
  const handleEdit = (projectId: string) => {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    setEditProject(project);
    setEditPhases(project.phases && project.phases.length > 0 ? project.phases : ['DISCOVERY', 'DESIGN', 'REVISIONS', 'DELIVERY']);
    setEditName(project.name);
    setEditCurrency(project.currency || 'INR');
    setEditError(null);
  };

  // Save handler
  const handleEditSave = async () => {
    if (!editProject) return;
    if (editPhases.length < 1 || editPhases.length > 6 || editPhases.some(p => !p.trim())) {
      setEditError('Enter 1-6 non-empty phases.');
      return;
    }
    if (!editName.trim()) {
      setEditError('Project name cannot be empty.');
      return;
    }
    setEditLoading(true);
    const user = auth.currentUser;
    if (!user) return;
    const token = await user.getIdToken();
    const res = await fetch(`/api/projects/${editProject.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ phases: editPhases, name: editName, currency: editCurrency }),
    });
    setEditLoading(false);
    if (res.ok) {
      mutateProjects();
      setEditProject(null);
    } else {
      setEditError('Failed to update project.');
    }
  };

  const handleApproveDraft = async (email: DashboardEmail) => {
    if (!email.id) return;
    const user = auth.currentUser;
    if (!user) return;
    const token = await user.getIdToken();
    const res = await fetch(`/api/emails/${email.id}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        subject: email.subject,
        body: email.body,
        closing: email.closing,
        signature: email.signature
      }),
    });
    if (res.ok) {
      setToast('Draft approved and sent!');
      setSelectedDraft(null);
      setEditableDraft(null);
      incrementMinutesSaved();
    } else {
      setToast('Failed to approve draft.');
    }
  };

  const handleDeclineDraft = async (email: DashboardEmail) => {
    if (!email.id) return;
    const user = auth.currentUser;
    if (!user) return;
    const token = await user.getIdToken();
    const res = await fetch(`/api/emails/${email.id}/decline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    });
    if (res.ok) {
      setToast('Draft declined.');
      setSelectedDraft(null);
      setEditableDraft(null);
    } else {
      setToast('Failed to decline draft.');
    }
  };



  // 2. Fetch client messages and parent email when modal opens
  useEffect(() => {
    const fetchClientMessages = async () => {
      if (!selectedDraft || !selectedDraft.projectId) return;
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();
      const res = await fetch(`/api/projects/${selectedDraft.projectId}/clientMessages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) setClientMessages(data);
      else setClientMessages([]);
    };
    fetchClientMessages();

    // Always fetch parent email directly if parentId exists
    const fetchParentEmail = async () => {
      if (!selectedDraft || !selectedDraft.parentId || !selectedDraft.projectId) {
        setParentEmail(null);
        return;
      }
      const user = auth.currentUser;
      if (!user) return;
      const token = await user.getIdToken();
      try {
        // First, get the client message using parentId
        const clientMsgRes = await fetch(`/api/projects/${selectedDraft.projectId}/clientMessages?messageId=${selectedDraft.parentId}`,
          { headers: { Authorization: `Bearer ${token}` } });
        const clientMsgData = await clientMsgRes.json();
        console.log('[DEBUG] fetchParentEmail - client message', {
          url: `/api/projects/${selectedDraft.projectId}/clientMessages?messageId=${selectedDraft.parentId}`,
          status: clientMsgRes.status,
          data: clientMsgData
        });
        
        if (clientMsgRes.ok && Array.isArray(clientMsgData) && clientMsgData.length > 0) {
          const clientMessage = clientMsgData[0];
          
          // If the client message has a gmailId, fetch the original Gmail email
          if (clientMessage.gmailId) {
            const gmailRes = await fetch(`/api/gmail/inbox?gmailId=${clientMessage.gmailId}`,
              { headers: { Authorization: `Bearer ${token}` } });
            const gmailData = await gmailRes.json();
            console.log('[DEBUG] fetchParentEmail - Gmail email', {
              url: `/api/gmail/inbox?gmailId=${clientMessage.gmailId}`,
              status: gmailRes.status,
              data: gmailData
            });
            
            if (gmailRes.ok && Array.isArray(gmailData) && gmailData.length > 0) {
              // Use the original Gmail email
              setParentEmail(gmailData[0]);
            } else {
              // Fallback to client message
              setParentEmail(clientMessage);
            }
          } else {
            // No gmailId, use the client message
            setParentEmail(clientMessage);
          }
        } else {
          setParentEmail(null);
        }
      } catch (err) {
        console.error('[DEBUG] fetchParentEmail error', err);
        setParentEmail(null);
      }
    };
    fetchParentEmail();
  }, [selectedDraft]);

  // Onboarding redirect logic
  React.useEffect(() => {
    // Only run on client
    if (typeof window !== 'undefined') {
      const onboardingComplete = localStorage.getItem('digipod-onboarding-complete');
      // Check for Gmail connection (window.gmailConnected is set by sidebar)
      if (window.gmailConnected && !onboardingComplete) {
        router.push('/onboarding');
      }
    }
  }, []);

  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }
  <style jsx global>{`
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  .animate-float { animation: float 6s ease-in-out infinite; will-change: transform; }
  .animate-float-slow { animation: float 9s ease-in-out infinite; will-change: transform; }
  @keyframes fade-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
  .animate-fade-in { animation: fade-in .5s cubic-bezier(0.22,1,0.36,1) both; }
  @media (prefers-reduced-motion: reduce) {
    .animate-float, .animate-float-slow, .animate-fade-in, .animate-pulse, .animate-spin { animation: none !important; }
  }
`}</style>

  const locales = {
    'en-US': enUS,
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
    getDay,
    locales,
  });
const generatePdfFromHtml = async () => {
  const input = document.getElementById('pdf-content');
  if (!input) {
    console.error("Element with id 'pdf-content' not found.");
    return;
  }

  const canvas = await html2canvas(input);
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF();

  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('report.pdf');
};

  return (
    <>
      <div id="pdf-content" className='absolute px-2 top-[-9999px] left-[-9999px] w-[816px] h-[1056px] text-black'>
        this is something!
        {aiDraftsData.drafts?.map((draft: DashboardEmail) => (
                      <li key={draft.id} className="bg-white/10 rounded-lg p-4 border border-blue-200/10 hover:border-blue-300/20 transition-all">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-blue-100 truncate">{draft.subject || 'AI Draft'}</span>
                              <span className="px-2 py-0.5 text-xs rounded bg-blue-700/60 text-blue-200 font-semibold">
                                {draft.projectName || 'Client'}
                              </span>
                            </div>
                            
                            {/* Clickable preview - shows first 100 chars */}
                            <div 
                              className="text-sm text-blue-200 mb-3 cursor-pointer hover:text-blue-100 transition-colors"
                              onClick={() => {
                                // Show full content in modal
                                openDraftModal(draft);
                              }}
                            >
                              {draft.body && draft.body.length > 100 
                                ? `${draft.body.substring(0, 100)}...` 
                                : draft.body || 'AI generated draft content'
                              }
                              <span className="text-blue-400 text-xs ml-2">(Click to view full)</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs text-blue-300">
                              <span>To: {draft.projectName || 'Client'}</span>
                              <span>•</span>
                              <span>Status: {draft.status}</span>
                              <span>•</span>
                              <span>
                                {getDateFromEmail(draft.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2 min-w-[120px] items-end">
                            {draft.status === 'draft' && (
                              <>
                                <button
                                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg font-semibold text-xs shadow-sm transition-all"
                                  onClick={async (e) => {
                                    e.stopPropagation();
                                    await handleApproveDraft(draft);
                                    // incrementMinutesSaved is already called in handleApproveDraft
                                  }}
                                >
                                  Approve & Send
                                </button>
                                <button
                                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-semibold text-xs shadow-sm transition-all"
                                  onClick={async (e) => {
                                    e.stopPropagation();
                                    // TODO: Implement decline functionality
                                    console.log('Decline draft:', draft.id);
                                  }}
                                >
                                  Decline
                                </button>
                              </>
                            )}
                            {draft.status === 'approved' && (
                              <span className="text-green-400 text-xs font-semibold px-2 py-1 bg-green-900/40 rounded">
                                Sent ✓
                              </span>
                            )}
                            {draft.status === 'declined' && (
                              <span className="text-red-400 text-xs font-semibold px-2 py-1 bg-red-900/40 rounded">
                                Declined ✗
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
      </div>    
    <main className="flex-1 flex flex-col min-h-screen bg-gradient-to-b from-[#0a0820] via-[#14122b] to-[#1a1333] relative overflow-x-hidden">
      {/* Animated shimmer overlay */}
      {/* Static ambient glow — GPU-composited, zero animation cost */}
<div
  aria-hidden
  className="pointer-events-none fixed inset-0 z-0"
  style={{
    background:
      'radial-gradient(60rem 40rem at 15% -10%, rgba(108,74,214,0.18), transparent 60%),' +
      'radial-gradient(55rem 40rem at 100% 0%, rgba(255,214,0,0.06), transparent 55%)',
  }}
/>
      {/* Hero Header */}
      <section className="w-full mb-12 relative z-10" style={{  }}>
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-6">
          <div className="flex flex-row items-center justify-between w-full gap-16">
            <div className="flex-1 text-left">
            {/* <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-[#FFD600] drop-shadow-lg">Dashboard</h1> */}
              <p className="text-lg text-gray-300 font-medium">Welcome back. Your anti-hustle HQ awaits.</p>
            </div>
            {/* <div className="flex-1 flex justify-center items-center"> */}
              {/* Floating Pip Avatar */}
              {/* <div className="animate-float drop-shadow-xl">
                <PipAvatar minutesSaved={minutesSaved} focusMode={focusMode} />
              </div> */}
            {/* </div> */}
            <div className="flex-1 flex justify-end items-center gap-4">
              <AntiHustleMeter minutesSaved={minutesSaved} />
              {/* Calendar Icon */}
              <div className="relative">
                <button
                  onClick={() => handleCardToggle('calendar')}
                  className="p-3 bg-purple-800 border-1 digi-btn border-digi hover:bg-blue-700 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Toggle Calendar"
                >
                  <CalendarDaysIcon className="h-6 w-6 text-white" />
                </button>
                {/* Temporary debug indicator - always visible */}
                <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-lg border-2 border-white">
                  {newEventsCount}
                </div>
                {/* Notification Badge */}
                {newEventsCount > 0 && (
  <div className="absolute -top-1 -right-1 bg-[#FFD600] text-[#1a1333] text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-lg">
    {newEventsCount > 99 ? '99+' : newEventsCount}
  </div>
)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Create a New Project Button - inside dashboard, above cards */}
      <div className="w-full flex justify-end px-20 mb-4">
        <button
          onClick={generatePdfFromHtml}
          className="px-5 py-2 bg-blue-700 mr-2 text-white font-bold rounded-xl hover:scale-105 transition flex items-center gap-2"
        >
          <span className="text-lg">+</span> Download Analytics
        </button>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2 bg-white text-black font-bold rounded-xl hover:scale-105 transition flex items-center gap-2"
        >
          <span className="text-lg">+</span> Create a New Project
        </button>
      </div>
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-[#6c4ad6] text-white px-6 py-3 rounded-full shadow-lg z-50 animate-fade-in border border-[#8f5fff]/50">
          {toast}
        </div>
      )}
      {/* AI-powered Overview Cards */}
      
      {/* Second row: To-Dos, Create Project, Drafted Replies */}
      <div id="create-project-section" className="max-w-7xl mx-auto px-6 md:px-10">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">

    {/* What's Changed */}
    <div className={`flex ${expandedCard === 'summary' ? 'h-auto' : 'h-[280px]'}`}>
      <ExpandableCard
        expanded={expandedCard === 'summary'}
        onClick={() => handleCardToggle('summary')}
        title="What's Changed"
        icon={<SparklesIcon className="h-7 w-7 text-[#FFD600]" />}
        onRefresh={refreshSummary}
        summary={
          loadingSummary ? (
            <div className="space-y-2 w-full">
              <div className="h-4 w-11/12 rounded bg-white/10 animate-pulse" />
              <div className="h-4 w-3/4 rounded bg-white/10 animate-pulse" />
              <div className="h-4 w-3/5 rounded bg-white/10 animate-pulse" />
            </div>
          ) : (!aiSummary && !(summaryData && 'summary' in summaryData)) ? (
  <EmptyState
    icon={<SparklesIcon className="h-6 w-6" />}
    title="All caught up"
    hint="No AI activity in the last 24 hours — Digipod will log changes here as they happen."
  />
) : (
  <div className="text-[#cfc9e8] text-base mt-2"> ...existing breakdown... </div>
)

        }
        content={
          loadingSummary ? (
            <div className="space-y-3 w-full">
              <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
              <div className="h-4 w-11/12 rounded bg-white/10 animate-pulse" />
              <div className="h-4 w-4/5 rounded bg-white/10 animate-pulse" />
              <div className="h-4 w-7/12 rounded bg-white/10 animate-pulse" />
            </div>
          ) : (
            <div className="text-[#cfc9e8] text-base mt-2">
              <p className="mb-4 w-full">{aiSummary || 'No AI changes detected.'}</p>
              {summaryData && typeof summaryData === 'object' && 'summary' in summaryData && (
                <div className="bg-black/20 border border-white/10 rounded-xl p-4 space-y-2">
                  <h4 className="font-semibold text-white mb-3">AI Activity — Last 24h</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-[#a18fff]">🚀 Phase Advances</span><span className="font-semibold text-[#6ee7b7]">{summaryData.summary?.phaseAdvances || 0}</span></div>
                    <div className="flex justify-between"><span className="text-[#a18fff]">📝 New Drafts</span><span className="font-semibold text-[#a18fff]">{summaryData.summary?.newDrafts || 0}</span></div>
                    <div className="flex justify-between"><span className="text-[#a18fff]">✅ New Todos</span><span className="font-semibold text-[#FFD600]">{summaryData.summary?.newTodos || 0}</span></div>
                    <div className="flex justify-between"><span className="text-[#a18fff]">📧 Processed</span><span className="font-semibold text-[#c9a5ff]">{summaryData.summary?.processedEmails || 0}</span></div>
                    <div className="flex justify-between"><span className="text-[#a18fff]">🤖 AI Actions</span><span className="font-semibold text-[#7dd3fc]">{summaryData.summary?.aiActivities || 0}</span></div>
                    <div className="flex justify-between"><span className="text-[#a18fff]">⚡ High Impact</span><span className="font-semibold text-[#ff9d9d]">{summaryData.summary?.highImpactChanges || 0}</span></div>
                  </div>
                  <div className="text-xs text-[#a18fff]/70 mt-3 pt-2 border-t border-white/10">
                    Updated {summaryData?.lastUpdated ? new Date(summaryData.lastUpdated).toLocaleString() : 'Unknown'}
                  </div>
                </div>
              )}
            </div>
          )
        }
        loading={loadingSummary}
        gradientClass="bg-white/[0.03]"
        isGmailConnected={isGmailConnected}
      />
    </div>

    {/* Upcoming To-Dos */}
    <div className={`flex ${expandedCard === 'todos' ? 'h-auto' : 'h-[280px]'}`}>
      <ExpandableCard
        expanded={expandedCard === 'todos'}
        onClick={() => handleCardToggle('todos')}
        title="Upcoming To-Dos"
        icon={<ClipboardDocumentCheckIcon className="h-7 w-7 text-[#6ee7b7]" />}
        onRefresh={refreshTodos}
        summary={
          loadingTodos ? (
            <div className="space-y-2 w-full">
              <div className="h-4 w-5/6 rounded bg-white/10 animate-pulse" />
              <div className="h-4 w-2/3 rounded bg-white/10 animate-pulse" />
            </div>
          ) : todos.length === 0 ? (
            <div className="text-[#a18fff] text-sm">No actionable to-dos found.</div>
          ) : (
            <ul className="space-y-2 w-full max-h-16 overflow-hidden">
              {todos.slice(0, 2).map((todo, i) => (
                <li key={i} className={`bg-white/5 rounded-lg p-3 text-[#cfc9e8] flex flex-col border-l-2 ${
                  todo.type === 'calendar' ? 'border-[#6c4ad6]' :
                  (todo.confidence || 0) > 0.8 ? 'border-[#ff6b6b]' :
                  (todo.confidence || 0) > 0.6 ? 'border-[#FFD600]' : 'border-[#6ee7b7]'
                }`}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-white flex-1 truncate">{todo.task}</span>
                    {todo.type === 'calendar' && <span className="text-xs">📅</span>}
                    {todo.type === 'project' && (todo.confidence || 0) > 0.8 && <span className="text-xs">⚡</span>}
                    {todo.type === 'project' && (todo.confidence || 0) > 0.6 && (todo.confidence || 0) <= 0.8 && <span className="text-xs">⏰</span>}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1 text-xs">
                    {todo.dueDate && <span className="text-[#FFD600] bg-[#FFD600]/10 px-1.5 py-0.5 rounded">{new Date(todo.dueDate).toLocaleDateString()}</span>}
                    {todo.type === 'project' && todo.projectName && <span className="text-[#a18fff] bg-white/5 px-1.5 py-0.5 rounded truncate">{todo.projectName}</span>}
                  </div>
                </li>
              ))}
              {todos.length > 2 && <li className="text-[#a18fff] text-sm">…and {todos.length - 2} more</li>}
            </ul>
          )
        }
        content={
          loadingTodos ? (
            <div className="space-y-3 w-full">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/5 rounded-lg p-3 border-l-2 border-white/10">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="h-4 flex-1 rounded bg-white/10 animate-pulse" />
                    <div className="h-4 w-8 rounded bg-white/10 animate-pulse" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-3 w-16 rounded bg-white/10 animate-pulse" />
                    <div className="h-3 w-20 rounded bg-white/10 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : todos.length === 0 ? (
            <div className="text-[#a18fff] text-base">No actionable to-dos found.</div>
          ) : (
            <ul className="space-y-2 w-full max-h-60 overflow-y-auto">
              {todos.map((todo, i) => (
                <li key={i} className={`bg-white/5 rounded-lg p-3 text-[#cfc9e8] flex flex-col border-l-2 ${
                  todo.type === 'calendar' ? 'border-[#6c4ad6]' :
                  (todo.confidence || 0) > 0.8 ? 'border-[#ff6b6b]' :
                  (todo.confidence || 0) > 0.6 ? 'border-[#FFD600]' : 'border-[#6ee7b7]'
                }`}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-white flex-1">{todo.task}</span>
                    {todo.type === 'calendar' && <span className="text-xs text-[#a18fff] bg-[#6c4ad6]/20 px-2 py-1 rounded">📅 Calendar</span>}
                    {todo.type === 'project' && (todo.confidence || 0) > 0.8 && <span className="text-xs text-[#ff9d9d] bg-red-500/15 px-2 py-1 rounded">⚡ Urgent</span>}
                    {todo.type === 'project' && (todo.confidence || 0) > 0.6 && (todo.confidence || 0) <= 0.8 && <span className="text-xs text-[#FFD600] bg-[#FFD600]/10 px-2 py-1 rounded">⏰ Due Soon</span>}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2 text-xs">
                    {todo.dueDate && <span className="text-[#FFD600] bg-[#FFD600]/10 px-2 py-1 rounded">📅 {new Date(todo.dueDate).toLocaleDateString()}</span>}
                    {todo.type === 'project' && todo.projectName && <span className="text-[#a18fff] bg-white/5 px-2 py-1 rounded">📁 {todo.projectName}</span>}
                    {todo.type === 'project' && typeof todo.confidence === 'number' && !isNaN(todo.confidence) && <span className="text-[#6ee7b7] bg-emerald-500/10 px-2 py-1 rounded">🎯 {(todo.confidence * 100).toFixed(0)}%</span>}
                  </div>
                </li>
              ))}
            </ul>
          )
        }
        loading={loadingTodos}
        gradientClass="bg-white/[0.03]"
        isGmailConnected={isGmailConnected}
      />
    </div>

    {/* AI Drafts */}
    <div className={`flex ${expandedCard === 'drafts' ? 'h-auto' : 'h-[280px]'}`}>
      <ExpandableCard
        expanded={expandedCard === 'drafts'}
        onClick={() => handleCardToggle('drafts')}
        title="AI Drafts"
        icon={<EnvelopeOpenIcon className="h-7 w-7 text-[#a18fff]" />}
        onRefresh={refreshDrafts}
        summary={
          loadingDrafts ? (
            <div className="space-y-2 w-full">
              <div className="h-4 w-3/4 rounded bg-white/10 animate-pulse" />
              <div className="h-4 w-1/2 rounded bg-white/10 animate-pulse" />
            </div>
          ) : !aiDraftsData || aiDraftsData.drafts?.length === 0 ? (
            <div className="text-[#a18fff] text-sm">No AI drafts ready for review.</div>
          ) : (
            <div className="text-[#cfc9e8] text-sm">
              {aiDraftsData.drafts?.length || 0} AI draft{(aiDraftsData.drafts?.length || 0) !== 1 ? 's' : ''} ready for review
            </div>
          )
        }
        content={
          loadingDrafts ? (
            <div className="space-y-3 w-full">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-4 w-3/5 rounded bg-white/10 animate-pulse" />
                        <div className="h-4 w-16 rounded bg-white/10 animate-pulse" />
                      </div>
                      <div className="h-3 w-11/12 rounded bg-white/10 animate-pulse mb-2" />
                      <div className="h-3 w-7/12 rounded bg-white/10 animate-pulse" />
                    </div>
                    <div className="flex flex-col gap-2 min-w-[120px] items-end">
                      <div className="h-8 w-20 rounded bg-white/10 animate-pulse" />
                      <div className="h-8 w-16 rounded bg-white/10 animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : !aiDraftsData || aiDraftsData.drafts?.length === 0 ? (
            <div className="text-[#cfc9e8] text-base">
              <div className="mb-4">No AI drafts ready for review.</div>
              <button
                onClick={async () => {
                  const user = auth.currentUser;
                  if (!user) return;
                  const token = await user.getIdToken();
                  try {
                    const res = await fetch('/api/email-monitor/status', { headers: { Authorization: `Bearer ${token}` } });
                    if (res.ok) {
                      const data = await res.json();
                      setToast(`Status: ${data.summary.emailSettingsCount} email settings, ${data.summary.clientFiltersCount} client filters, ${data.summary.processedEmailsCount} processed emails, ${data.summary.aiDraftsCount} AI drafts`);
                    } else {
                      setToast('Failed to get status');
                    }
                  } catch (err) {
                    console.error('Failed to get status:', err);
                    setToast('Error getting status');
                  }
                }}
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs transition-colors"
              >
                Check Status
              </button>
            </div>
          ) : (
            <ul className="space-y-3 w-full max-h-60 overflow-y-auto">
              {aiDraftsData.drafts?.map((draft: DashboardEmail) => (
                <li key={draft.id} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-[#6c4ad6]/40 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-white truncate">{draft.subject || 'AI Draft'}</span>
                        <span className="px-2 py-0.5 text-xs rounded bg-[#6c4ad6]/30 text-[#c9a5ff] font-semibold shrink-0">{draft.projectName || 'Client'}</span>
                      </div>
                      <div
                        className="text-sm text-[#cfc9e8] mb-3 cursor-pointer hover:text-white transition-colors"
                        onClick={() => openDraftModal(draft)}
                      >
                        {draft.body && draft.body.length > 100 ? `${draft.body.substring(0, 100)}...` : draft.body || 'AI generated draft content'}
                        <span className="text-[#a18fff] text-xs ml-2">(view full)</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#a18fff]">
                        <span>To: {draft.projectName || 'Client'}</span><span>•</span>
                        <span>{draft.status}</span><span>•</span>
                        <span>{getDateFromEmail(draft.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 min-w-[120px] items-end">
                      {draft.status === 'draft' && (
                        <>
                          <button
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg font-semibold text-xs transition-colors"
                            onClick={async (e) => { e.stopPropagation(); await handleApproveDraft(draft); }}
                          >
                            Approve & Send
                          </button>
                          <button
                            className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-lg font-semibold text-xs transition-colors"
                            onClick={async (e) => { e.stopPropagation(); console.log('Decline draft:', draft.id); }}
                          >
                            Decline
                          </button>
                        </>
                      )}
                      {draft.status === 'approved' && <span className="text-[#6ee7b7] text-xs font-semibold px-2 py-1 bg-emerald-500/15 rounded">Sent ✓</span>}
                      {draft.status === 'declined' && <span className="text-[#ff9d9d] text-xs font-semibold px-2 py-1 bg-red-500/15 rounded">Declined ✗</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )
        }
        loading={loadingDrafts}
        gradientClass="bg-white/[0.03]"
        isGmailConnected={isGmailConnected}
      />
    </div>

  </div>
</div>
      {/* Calendar Popup Modal */}
      {expandedCard === 'calendar' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-xl p-8 w-full max-w-6xl border border-blue-900 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button 
              className="absolute top-4 right-4 p-2 rounded hover:bg-gray-800 transition-colors" 
              onClick={() => handleCardToggle('calendar')} 
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-bold text-blue-200">Google Calendar</h3>
                <CalendarDaysIcon className="h-8 w-8 text-blue-100 animate-float drop-shadow-lg" />
              </div>
              
              {calendarError ? (
                <div className="text-red-400 text-sm flex flex-col gap-2 mb-4">
                  <span>{calendarError}</span>
                  <a href="/api/auth/google" className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded mt-1 text-xs font-semibold">Reconnect Google</a>
                </div>
              ) : (
                <p className="text-blue-200 text-sm mb-4">Your full calendar is below. Click any day to see all events for that day.</p>
              )}
            </div>
            
            {loadingCalendar ? (
              <div className="w-full space-y-3">
                {/* Skeleton calendar */}
                <div className="h-8 bg-blue-900/40 rounded animate-pulse mb-4"></div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }).map((_, i) => (
                    <div key={i} className="h-12 bg-blue-900/40 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full h-[600px]">
                <BigCalendar
                  localizer={localizer}
                  events={calendarEvents.map(ev => ({
                    title: ev.title,
                    start: new Date(ev.date),
                    end: new Date(ev.date),
                    allDay: true,
                  }))}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 600, background: 'rgba(30,41,59,0.97)', borderRadius: '1.5rem', color: '#fff', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.13)' }}
                  views={['month', 'week', 'day']}
                  popup
                  selectable
                  onSelectSlot={(slotInfo) => {
                    const slotDate = slotInfo.start;
                    const eventsForDate = getEventsForDate(slotDate);
                    setSelectedDateEvents({ date: slotDate, events: eventsForDate.map(ev => ({
                      title: ev.title,
                      start: new Date(ev.date),
                      end: new Date(ev.date),
                    })) });
                  }}
                  components={{
                    event: ({ event }) => (
                      <div className="custom-calendar-event">
                        <span className="font-semibold text-blue-200">{event.title}</span>
                      </div>
                    ),
                    toolbar: (toolbarProps) => (
                      <div className="custom-calendar-toolbar flex items-center justify-between mb-2 px-2 py-1 rounded-lg bg-blue-900/60">
                        <div className="flex gap-2">
                          <button className={`calendar-btn ${toolbarProps.view === 'month' ? 'active' : ''}`} onClick={() => toolbarProps.onView('month')}>Month</button>
                          <button className={`calendar-btn ${toolbarProps.view === 'week' ? 'active' : ''}`} onClick={() => toolbarProps.onView('week')}>Week</button>
                          <button className={`calendar-btn ${toolbarProps.view === 'day' ? 'active' : ''}`} onClick={() => toolbarProps.onView('day')}>Day</button>
                        </div>
                        <div className="flex gap-2 items-center">
                          <button className="calendar-btn" onClick={() => toolbarProps.onNavigate('PREV')}>&lt;</button>
                          <span className="font-bold text-blue-100 text-lg">{toolbarProps.label}</span>
                          <button className="calendar-btn" onClick={() => toolbarProps.onNavigate('NEXT')}> &gt; </button>
                        </div>
                      </div>
                    )
                  }}
                  eventPropGetter={() => ({
                    style: {
                      background: 'linear-gradient(90deg, #6366f1 0%, #a5b4fc 100%)',
                      borderRadius: '0.75rem',
                      color: '#fff',
                      border: 'none',
                      boxShadow: '0 2px 8px 0 rgba(99,102,241,0.15)',
                      padding: '2px 8px',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      transition: 'box-shadow 0.2s',
                    },
                    className: 'calendar-event-hover',
                  })}
                />
              </div>
            )}
            
            {/* Modal for selected date events */}
            {selectedDateEvents && (
              <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="bg-gray-900 rounded-xl p-8 w-full max-w-md border border-blue-900 relative shadow-2xl">
                  <button className="absolute top-3 right-3 p-2 rounded hover:bg-gray-800" onClick={() => setSelectedDateEvents(null)} aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <h3 className="text-lg font-bold mb-4 text-blue-200">Events for {selectedDateEvents.date.toLocaleDateString()}</h3>
                  {selectedDateEvents.events.length === 0 ? (
                    <div className="text-blue-100">No events scheduled for this day.</div>
                  ) : (
                    <ul className="space-y-3">
                      {selectedDateEvents.events.map((ev, idx) => (
                        <li key={idx} className="bg-blue-900/60 rounded-lg p-4 shadow text-blue-100 flex flex-col">
                          <span className="font-semibold text-blue-200">{ev.title}</span>
                          <span className="text-xs text-blue-300 mt-1">{ev.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Content */}
      <div className="flex-1 max-w-5xl mx-auto px-6">
        {/* Projects Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <FolderIcon className="h-8 w-8 text-blue-400" />
            Your Projects
          </h2>
          <p className="text-gray-300 text-lg">Manage and track all your client projects</p>
        </div>
        {/* Projects Grid */}
        <div className={editProject ? 'transition-all duration-300 filter blur-md pointer-events-none select-none' : ''}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.isArray(projectsData) && projectsData.map((project, idx) => (
              <ProjectCard
                key={project.id || idx}
                project={project}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
            {Array.isArray(projectsData) && projectsData.length === 0 && (
              <div className="col-span-full text-center text-gray-400 py-16">
                <div className="mb-4">
                  <FolderIcon className="h-12 w-12 mx-auto text-gray-200 animate-float-slow" />
                </div>
                No projects yet. Create your first project!
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Edit Project Modal */}
      {editProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">
          <div className="bg-gray-900 rounded-xl p-8 w-full max-w-md border border-blue-900 relative">
            <button className="absolute top-3 right-3 p-2 rounded hover:bg-gray-800" onClick={() => setEditProject(null)} aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-lg font-bold mb-4 text-blue-200">Edit Project</h3>
            <form onSubmit={e => { e.preventDefault(); handleEditSave(); }}>
              <div className="mb-4">
                <label className="block text-blue-100 mb-1">Project Name</label>
                <input
                  className="w-full border px-3 py-2 rounded bg-gray-800 text-white border-gray-700"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  maxLength={64}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-blue-100 mb-1">Payment Currency</label>
                <select
                  className="w-full border px-3 py-2 rounded bg-gray-800 text-white border-gray-700"
                  value={editCurrency}
                  onChange={e => setEditCurrency(e.target.value)}
                  required
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="AUD">AUD (A$)</option>
                  <option value="CAD">CAD (C$)</option>
                  <option value="SGD">SGD (S$)</option>
                  <option value="JPY">JPY (¥)</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-blue-100 mb-1">Phases</label>
                <DragDropContext
                  onDragEnd={(result: DropResult) => {
                    if (!result.destination) return;
                    const reordered = Array.from(editPhases);
                    const [removed] = reordered.splice(result.source.index, 1);
                    reordered.splice(result.destination.index, 0, removed);
                    setEditPhases(reordered);
                  }}
                >
                  <Droppable droppableId="phases-list">
                    {(provided) => (
                      <div className="space-y-2" ref={provided.innerRef} {...provided.droppableProps}>
                        {editPhases.map((phase, idx) => (
                          <Draggable key={idx} draggableId={String(idx)} index={idx}>
                            {(dragProvided, dragSnapshot) => (
                              <div
                                className={`flex gap-2 items-center bg-gray-800 rounded ${dragSnapshot.isDragging ? 'ring-2 ring-blue-400' : ''}`}
                                ref={dragProvided.innerRef}
                                {...dragProvided.draggableProps}
                                {...dragProvided.dragHandleProps}
                              >
                                <span className="cursor-move text-blue-300 font-bold px-2">≡</span>
                                <input
                                  className="flex-1 border px-3 py-2 rounded bg-gray-800 text-white border-gray-700"
                                  value={phase}
                                  onChange={e => {
                                    const arr = [...editPhases];
                                    arr[idx] = e.target.value;
                                    setEditPhases(arr);
                                  }}
                                  maxLength={32}
                                  required
                                />
                                <button type="button" className="text-red-400 hover:text-red-600" onClick={() => setEditPhases(editPhases.filter((_, i) => i !== idx))} disabled={editPhases.length <= 1}>&times;</button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        {editPhases.length < 6 && (
                          <button type="button" className="text-xs text-blue-300 hover:underline" onClick={() => setEditPhases([...editPhases, ''])}>+ Add Phase</button>
                        )}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
              {editError && <div className="text-red-400 mb-2 text-sm">{editError}</div>}
              <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded font-semibold mt-2" disabled={editLoading}>{editLoading ? 'Saving...' : 'Save Changes'}</button>
            </form>
          </div>
        </div>
      )}
      
      {/* Draft Email Modal */}
      {selectedDraft && editableDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-xl p-8 w-full max-w-2xl border border-blue-900 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button 
              className="absolute top-4 right-4 p-2 rounded hover:bg-gray-800 transition-colors" 
              onClick={closeDraftModal} 
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-bold text-blue-200">Edit Email Draft</h3>
                <span className="px-3 py-1 text-xs rounded bg-blue-700/60 text-blue-200 font-semibold">
                  {selectedDraft.projectName}
                </span>
              </div>
              
              {/* Recipient Information */}
              <div className="mb-4 p-3 bg-blue-900/40 rounded-lg border border-blue-700/50">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-blue-300 font-semibold">To:</span>
                  <span className="text-blue-100">
                    {selectedDraft.clientEmail || 'No client email set'}
                  </span>
                  {!selectedDraft.clientEmail && (
                    <span className="text-yellow-400 text-xs">(Please set client email in project settings)</span>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-blue-100 text-sm font-semibold mb-1">Subject:</label>
                  <input
                    type="text"
                    value={editableDraft.subject || ''}
                    onChange={(e) => setEditableDraft({ ...editableDraft, subject: e.target.value })}
                    className="w-full bg-gray-800 rounded p-3 text-blue-100 border border-gray-700 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter subject..."
                  />
                </div>
                
                <div>
                  <label className="block text-blue-100 text-sm font-semibold mb-1">Body:</label>
                  <textarea
                    value={editableDraft.body || ''}
                    onChange={(e) => setEditableDraft({ ...editableDraft, body: e.target.value })}
                    className="w-full bg-gray-800 rounded p-3 text-blue-100 border border-gray-700 focus:border-blue-500 focus:outline-none resize-none"
                    rows={8}
                    placeholder="Enter email body..."
                  />
                </div>
                
                <div>
                  <label className="block text-blue-100 text-sm font-semibold mb-1">Closing:</label>
                  <input
                    type="text"
                    value={editableDraft.closing || ''}
                    onChange={(e) => setEditableDraft({ ...editableDraft, closing: e.target.value })}
                    className="w-full bg-gray-800 rounded p-3 text-blue-100 border border-gray-700 focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., Best regards,"
                  />
                </div>
                
                <div>
                  <label className="block text-blue-100 text-sm font-semibold mb-1">Signature:</label>
                  <input
                    type="text"
                    value={editableDraft.signature || ''}
                    onChange={(e) => setEditableDraft({ ...editableDraft, signature: e.target.value })}
                    className="w-full bg-gray-800 rounded p-3 text-blue-100 border border-gray-700 focus:border-blue-500 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="flex items-center gap-4 text-xs text-blue-300 pt-2 border-t border-gray-700">
                  <span>From: {selectedDraft.from}</span>
                  <span>•</span>
                  <span>Status: {selectedDraft.status}</span>
                  <span>•</span>
                  <span>
                    {getDateFromEmail(selectedDraft.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            {selectedDraft.status === 'draft' && (
              <div className="flex gap-3 justify-end pt-4 border-t border-gray-700">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm transition-all"
                  onClick={async () => {
                    await handleDeclineDraft(selectedDraft);
                    closeDraftModal();
                  }}
                >
                  Decline
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm transition-all"
                  onClick={async () => {
                    // Use the edited content for approval
                    await handleApproveDraft(editableDraft);
                    closeDraftModal();
                  }}
                >
                  Approve & Send
                </button>
              </div>
            )}
            
            {selectedDraft.status === 'approved' && (
              <div className="flex justify-end pt-4 border-t border-gray-700">
                <span className="text-green-400 text-sm font-semibold px-4 py-2 bg-green-900/40 rounded">
                  Sent ✓
                </span>
              </div>
            )}
            
            {selectedDraft.status === 'declined' && (
              <div className="flex justify-end pt-4 border-t border-gray-700">
                <span className="text-red-400 text-sm font-semibold px-4 py-2 bg-red-900/40 rounded">
                  Declined ✗
                </span>
              </div>
            )}

            {/* Original Client Email Preview */}
            <div className="mb-6 p-4 bg-blue-950/60 rounded-lg border border-blue-800">
              {(() => {
                if (selectedDraft.parentId) {
                  // Prefer directly fetched parentEmail
                  if (parentEmail) {
                    return <>
                      <div className="text-xs text-blue-300 mb-1">Replying to:</div>
                      <div className="font-semibold text-blue-100 mb-1">{parentEmail.subject}</div>
                      <div className="text-blue-200 text-sm italic truncate">{parentEmail.body && parentEmail.body.length > 100 ? parentEmail.body.slice(0, 100) + '...' : parentEmail.body}</div>
                    </>;
                  }
                  // Fallback to clientMessages
                  const original = clientMessages.find(e => e.id === selectedDraft.parentId);
                  if (original) {
                    return <>
                      <div className="text-xs text-blue-300 mb-1">Replying to:</div>
                      <div className="font-semibold text-blue-100 mb-1">{original.subject}</div>
                      <div className="text-blue-200 text-sm italic truncate">{original.body.length > 100 ? original.body.slice(0, 100) + '...' : original.body}</div>
                    </>;
                  }
                  return <div className="text-xs text-yellow-400">Original client email not found for preview.</div>;
                } else {
                  return <div className="text-xs text-yellow-400">No parent email linked to this draft.</div>;
                }
              })()}
            </div>
          </div>
        </div>
      )}
      
      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gray-900 rounded-xl p-8 w-full max-w-md border border-blue-900 shadow-xl relative">
            <button onClick={() => setShowCreateModal(false)} className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-800">
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='h-6 w-6 text-gray-400'><path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' /></svg>
            </button>
            <h2 className="text-xl font-bold mb-4 text-blue-200">Create a New Project</h2>
            <div className="flex flex-col gap-4">
              <input
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
                placeholder="Project Name"
                value={newProjectName}
                onChange={e => setNewProjectName(e.target.value)}
              />
              <input
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
                placeholder="Client Name"
                value={newClientName}
                onChange={e => setNewClientName(e.target.value)}
              />
              <input
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
                placeholder="Client Email"
                value={newClientEmail}
                onChange={e => setNewClientEmail(e.target.value)}
                type="email"
              />
              {createError && <div className="text-red-400 text-sm">{createError}</div>}
              <button
                className="mt-4 px-5 py-3 text-center luminance luminance-bg text-white font-bold rounded-xl shadow-lg hover:scale-105 transition flex items-center gap-2 disabled:opacity-60"
                disabled={createLoading || !newProjectName || !newClientName || !newClientEmail}
                onClick={async () => {
                  setCreateLoading(true);
                  setCreateError('');
                  try {
                    const project = await createProject(newProjectName, newClientEmail, newClientName);
                    if (project && project.id) {
                      mutateProjects(); // Refresh project list
                      setShowCreateModal(false);
                      setNewProjectName('');
                      setNewClientName('');
                      setNewClientEmail('');
                    } else {
                      setCreateError('Failed to create project.');
                    }
                  } catch {
                    setCreateError('Failed to create project.');
                  } finally {
                    setCreateLoading(false);
                  }
                }}
              >
                {createLoading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 4s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float 5s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </main>
    </>
  );
} 