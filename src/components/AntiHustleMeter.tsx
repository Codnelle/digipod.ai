import React, { useEffect, useState } from 'react';

function getMonday(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

const MAX_MINUTES = 1200; // 20h
const confettiThresholds = [300, 600, 1200]; // 5h, 10h, 20h

const getAntiHustleText = (minutes: number) => {
  if (minutes >= 1200) return "The system's scared of you. You're the AI now.";
  if (minutes >= 900) return "Honestly, you might be immortal now.";
  if (minutes >= 600) return "You're basically retired.";
  if (minutes >= 540) return "Untouchable. Admin who?";
  if (minutes >= 480) return "A full workday of nonsense — skipped.";
  if (minutes >= 420) return "7 hours back. Start that passion project.";
  if (minutes >= 360) return "6 hours dodged. Go touch grass.";
  if (minutes >= 300) return "5 hours saved. Nap guilt-free.";
  if (minutes >= 240) return "4 fewer hours of 'make the logo bigger'.";
  if (minutes >= 180) return "3 hrs reclaimed. Flow state incoming.";
  if (minutes >= 120) return "2 hrs saved. Your brain says thanks.";
  if (minutes >= 60) return "1 hour dodged. Welcome to the rebellion.";
  if (minutes >= 30) return `${minutes} minutes dodged. Keep it up!`;
  if (minutes >= 10) return `${minutes} minutes saved. Rebellion growing.`;
  if (minutes >= 1) return `${minutes} minute${minutes === 1 ? '' : 's'} dodged.`;
  return "Admin goblins still to slay.";
};

const milestoneMessage = (t: number) =>
  t >= 1200 ? "20 hours saved — you're the AI now 🤖"
  : t >= 600 ? "10 hours saved — basically retired 🏖️"
  : "5 hours saved — nap guilt-free 😴";

const TOOLTIP =
  "Tracks the hours of admin Digipod saved you this week.\nIt rises when AI sends replies or advances a project phase.";

export default function AntiHustleMeter({ minutesSaved }: { minutesSaved: number }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [popup, setPopup] = useState<string | null>(null);
  const [lastThreshold, setLastThreshold] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  // Fire once when a NEW highest milestone is passed (handles jumps, not just exact hits)
  useEffect(() => {
    const crossed = [...confettiThresholds].reverse().find(t => minutesSaved >= t);
    if (crossed && crossed > lastThreshold) {
      setLastThreshold(crossed);
      setShowConfetti(true);
      setPopup(milestoneMessage(crossed));
      const p = setTimeout(() => setPopup(null), 3500);
      const c = setTimeout(() => setShowConfetti(false), 2000);
      return () => { clearTimeout(p); clearTimeout(c); };
    }
  }, [minutesSaved, lastThreshold]);

  // Reset every Monday
  useEffect(() => {
    const lastReset = localStorage.getItem('digipod-minutes-reset');
    const thisMonday = getMonday(new Date()).toDateString();
    if (lastReset !== thisMonday) {
      localStorage.setItem('digipod-minutes-reset', thisMonday);
      localStorage.setItem('digipod-minutes-saved', '0');
      setLastThreshold(0);
    }
  }, []);

  const pct = Math.min(minutesSaved, MAX_MINUTES) / MAX_MINUTES;
  const hours = Math.floor(minutesSaved / 60);
  const mins = minutesSaved % 60;

  return (
    <div
      className="relative flex flex-col gap-2 w-full min-w-[220px]"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      tabIndex={0}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={MAX_MINUTES}
      aria-valuenow={Math.min(minutesSaved, MAX_MINUTES)}
      aria-label={`Anti-hustle meter: ${hours}h ${mins}m saved this week`}
    >
      {/* Label row */}
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-extrabold text-[#FFD600] tabular-nums">
          {hours}h {mins}m <span className="text-[#a18fff] font-semibold">saved</span>
        </span>
        <span className="text-[11px] text-[#cfc9e8]/70 font-medium truncate max-w-[150px] text-right">
          {getAntiHustleText(minutesSaved)}
        </span>
      </div>

      {/* Track */}
      <div className="relative w-full h-2.5 rounded-full bg-white/10 border border-white/10 overflow-hidden">
        {/* Fill — scaleX is GPU-composited, no layout on every frame */}
        <div
          className="absolute inset-0 origin-left rounded-full motion-reduce:transition-none"
          style={{
            transform: `scaleX(${pct})`,
            transition: 'transform 900ms cubic-bezier(0.22,1,0.36,1)',
            background: 'linear-gradient(90deg,#6ee7b7,#6c4ad6 55%,#FFD600)',
            boxShadow: '0 0 12px rgba(108,74,214,0.45)',
          }}
        />
      </div>

      {/* Milestone ticks (5h / 10h / 20h) sit above the track */}
      <div className="relative w-full -mt-2 h-0 pointer-events-none">
        {confettiThresholds.map(t => {
          const reached = minutesSaved >= t;
          return (
            <span
              key={t}
              className={`absolute -top-2 h-2.5 w-px ${reached ? 'bg-[#FFD600]' : 'bg-white/20'}`}
              style={{ left: `${(t / MAX_MINUTES) * 100}%` }}
            />
          );
        })}
      </div>

      {/* Confetti burst */}
      {showConfetti && (
        <div className="absolute left-1/2 -top-6 -translate-x-1/2 z-50 text-3xl animate-bounce motion-reduce:animate-none">
          🎉
        </div>
      )}

      {/* Milestone popup */}
      {popup && (
        <div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full text-sm font-bold text-[#1a1333] bg-[#FFD600] shadow-[0_8px_32px_rgba(0,0,0,0.4)] animate-fade-in"
          role="status"
        >
          {popup}
        </div>
      )}

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute left-0 -top-16 z-30 w-64 rounded-xl border border-white/10 bg-[#14122b]/95 backdrop-blur px-4 py-2.5 text-xs text-[#cfc9e8] leading-relaxed whitespace-pre-line shadow-xl animate-fade-in">
          {TOOLTIP}
        </div>
      )}
    </div>
  );
}