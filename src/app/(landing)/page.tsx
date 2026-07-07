"use client";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useState, type ReactNode } from "react";

declare global {
  interface Window {
    Razorpay?: unknown;
  }
}

/* ------------------------------------------------------------------ */
/*  Small, on-theme building blocks (editorial "calm-tech" language)  */
/* ------------------------------------------------------------------ */

// A monospace section label with a hairline lead-in — used to give the
// page a consistent editorial rhythm between sections.
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.32em] text-[#a18fff]/80">
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#a18fff]/70" />
      {children}
    </span>
  );
}

export default function LandingPage() {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showPreorderModal, setShowPreorderModal] = useState(false);

  const handleRazorpay = useCallback(() => {
    if (typeof window === "undefined" || !window.Razorpay) {
      alert("Razorpay SDK not loaded yet. Please wait a moment and try again.");
      return;
    }
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
      amount: 40000,
      currency: "INR",
      name: "Digipod",
      description: "Early Access - Founders Deal",
      handler: async function (response: unknown) {
        const res = response as { razorpay_payment_id?: string };
        if (!res.razorpay_payment_id) {
          alert("Payment ID missing!");
          return;
        }
        setIsRedirecting(true);
        // Call backend to verify and get license key
        const verifyRes = await fetch("/api/verify-razorpay-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payment_id: res.razorpay_payment_id }),
        });
        const data = await verifyRes.json();
        if (data.code) {
          window.location.href = `/preorder-success?license=${encodeURIComponent(data.code)}&payment_id=${encodeURIComponent(res.razorpay_payment_id)}`;
        } else {
          setIsRedirecting(false);
          alert("Payment verified, but license key not generated. Please contact support.");
        }
      },
      prefill: {
        name: "",
        email: "",
      },
      theme: {
        color: "#6c4ad6",
      },
    };
    type RazorpayType = new (options: object) => { open: () => void };
    const RazorpayConstructor = window.Razorpay as RazorpayType;
    const rzp = new RazorpayConstructor(options);
    rzp.open();
  }, []);
  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 10);
  onScroll(); // set correct state on mount / refresh mid-page
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);

  return (
    <main className="min-h-screen w-full flex flex-col items-center text-white bg-gradient-to-b from-[#0a0820] via-[#14122b] to-[#1a1333]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Page-local styling: marquee + soft float + subtle noise. Scoped by
          unique class names so nothing here leaks into other pages. */}
      <style>{`
        @keyframes dp-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .dp-marquee-track { display: flex; width: max-content; animation: dp-marquee 32s linear infinite; }
        .dp-marquee:hover .dp-marquee-track { animation-play-state: paused; }
        @keyframes dp-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .dp-float { animation: dp-float 7s ease-in-out infinite; }
        .dp-grain::before {
          content: ""; position: absolute; inset: 0; pointer-events: none; opacity: .04;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .dp-hairline { background: linear-gradient(90deg, transparent, rgba(161,143,255,.35), transparent); }
        .dg {
	display: none;
}
      `}</style>

<nav
  className={`fixed top-0 z-30 w-full flex justify-center transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
    scrolled ? 'py-3 px-3' : 'py-0 px-0'
  }`}
>
  <div
    style={{ willChange: 'max-width, border-radius, background-color, transform' }}
    className={`flex items-center justify-between w-full backdrop-blur-xl transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
      scrolled
        ? 'max-w-4xl scale-100 rounded-full border border-white/10 bg-black/40 shadow-[0_8px_32px_rgba(0,0,0,0.55)] px-3 py-2'
        : 'max-w-[96rem] scale-[1.002] rounded-none border-b border-white/5 bg-black/0 shadow-none px-6 py-4'
    }`}
  >
    {/* Logo */}
    <Link href="/" className="flex items-center pl-1 md:pl-2 shrink-0">
      <Image src="/digipod.png" alt="Digipod Logo" height={34} width={116} style={{ height: 34, width: 'auto' }} />
    </Link>

    {/* Center nav links */}
    <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
      {[
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Reviews", href: "#reviews" },
      ].map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-[#cfc9e8]/80 hover:text-white hover:bg-white/5 transition-all"
        >
          {l.label}
        </a>
      ))}
    </div>

    {/* Auth actions */}
    <div className="flex items-center gap-2 shrink-0">
      <Link
        href="/signin"
        className="rounded-full px-5 py-2 text-sm font-bold text-[#e6e1ff] hover:text-white hover:bg-white/5 transition-all"
      >
        Sign In
      </Link>
      <Link
        href="/signup"
        className="group relative rounded-full px-5 py-2 text-sm font-bold text-white bg-[#6c4ad6] border border-[#8f5fff]/50 hover:bg-[#8f5fff] transition-all shadow-[0_2px_16px_rgba(108,74,214,0.45)]"
      >
        Sign Up
        <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">→</span>
      </Link>
    </div>
  </div>
</nav>

      {/* Pre-order Modal */}
      {showPreorderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-[#18122b] rounded-2xl shadow-lg max-w-md w-full p-8 relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold"
              onClick={() => setShowPreorderModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center text-[#FFD600]">Pre-order Digipod</h2>
            <ul className="mb-6 text-left list-disc list-inside text-lg text-[#e0d6ff] space-y-2">
              <li>✔️ Lifetime access to Digipod (no monthly fees)</li>
              <li>✔️ Early access to all new features</li>
              <li>✔️ Founders badge on your profile</li>
              <li>✔️ Priority support & feature requests</li>
              <li>✔️ Exclusive community access</li>
            </ul>
            <button
              className="w-full bg-[#FFD600] text-[#1a1333] font-bold rounded-full px-8 py-3 shadow-lg hover:bg-yellow-300 transition-transform transform hover:scale-105 focus:ring-2 focus:ring-[#FFD600] border border-[#FFD600] disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={() => { setShowPreorderModal(false); handleRazorpay(); }}
              disabled={!razorpayLoaded || isRedirecting}
              type="button"
            >
              {razorpayLoaded ? (isRedirecting ? "Redirecting..." : "Pay Now") : "Loading..."}
            </button>
          </div>
        </div>
      )}

      {/* ===================== HERO (unchanged) ===================== */}
      <section className="relative w-full flex flex-col items-center justify-center text-center py-28 px-4 overflow-hidden" style={{ minHeight: '100vh' }}>
        {/* 3JS Wave Background */}
        <div id="container" className="absolute inset-0 w-full h-full z-0" style={{ pointerEvents: 'none' }} />
        {/* Optionally, remove or darken decorative overlays for a pure midnight look */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full">
          <h2 className="text-lg font-semibold mb-4 text-[#FFD600] tracking-widest uppercase drop-shadow">Your Anti-Productivity Tool</h2>
          <h1 className="boldonse text-5xl md:text-7xl mb-6 leading-tight bg-gradient-to-r from-[#a18fff] via-[#6e3bbd] to-[#ab72ff] bg-clip-text text-transparent animate-fade-in">AI-POWERED<br />BACK OFFICE</h1>
          <p className="max-w-2xl saira-font mx-auto text-lg text-[#e0d6ff] mt-10 mb-10 animate-fade-in delay-100">
            Digipod is the first anti productivity tool for creatives.<br />We don&apos;t help hustle - we help you stop. Automate emails, invoices, updates, client chaos so you can finally get back to your craft.
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in delay-200">
            <a href="https://forms.gle/2j3DcMv9HyxzeDqi8" target="_blank" rel="noopener noreferrer" className="bg-white text-[#1a1333] font-bold rounded-full px-8 py-3 shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105 focus:ring-2 focus:ring-[#a18fff] border border-[#a18fff]">Join Waitlist →</a>
            <button
              type="button"
              onClick={handleRazorpay}
              disabled={!razorpayLoaded || isRedirecting}
              className="bg-[#FFD600] text-[#1a1333] font-bold rounded-full px-8 py-3 shadow-lg hover:bg-yellow-300 transition-transform transform hover:scale-105 focus:ring-2 focus:ring-[#FFD600] border border-[#FFD600] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {razorpayLoaded ? (isRedirecting ? "Redirecting..." : "Unlock Founders Deal") : "Loading..."}
            </button>
          </div>
          {isRedirecting && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-xl shadow-xl">
                <svg className="animate-spin h-8 w-8 text-[#6c4ad6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span className="text-[#1a1333] font-semibold text-lg">Redirecting to success page...</span>
              </div>
            </div>
          )}
          <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="afterInteractive"
            onLoad={() => setRazorpayLoaded(true)}
          />
        </div>
      </section>

      {/* ===================== SHOWCASE: the command center ===================== */}
      <section className="relative w-full flex flex-col items-center px-4 pt-8 pb-24 bg-gradient-to-b  from-[#402291] ">
        <div className="w-full max-w-6xl flex flex-col items-center">
          <div className="flex flex-col items-center text-center gap-5 mb-14">
            <Eyebrow>01 — The command center</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight max-w-3xl">
              Everything client-facing, in one <span className="text-[#FFD600]">calm</span> view.
            </h2>
            <p className="text-[#bcb8d8] max-w-xl text-base md:text-lg">
              No twelve tabs. No “where did that message go”. Just the one screen that runs the boring half of your business.
            </p>
          </div>

          {/* Browser-frame mockup */}
          <div className="dp-float relative w-full max-w-5xl">
            {/* ambient glow */}
            <div className="absolute -inset-6 rounded-[2rem] bg-[#6c4ad6]/25 blur-3xl" aria-hidden />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0d0b1e] shadow-2xl">
              {/* fake browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <div className="mx-auto flex items-center gap-2 rounded-md bg-black/40 px-4 py-1 text-xs font-mono text-[#a18fff]/70 border border-white/5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
                  app.digipod.studio
                </div>
              </div>
              <Image
                src="/showcase-latest.png"
                width={1100}
                height={760}
                alt="Digipod dashboard"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Stat strip beneath the mockup */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-14 w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 bg-white/5">
            {[
              { k: "90%", v: "of client emails handled" },
              { k: "10 hrs", v: "reclaimed every week" },
              { k: "0", v: "status updates typed by hand" },
              { k: "3 min", v: "average check-in, not 4 hours" },
            ].map((s) => (
              <div key={s.v} className="bg-[#0d0b1e] px-6 py-8 text-center">
                <div className="boldonse text-2xl md:text-3xl text-[#FFD600]">{s.k}</div>
                <div className="mt-2 text-xs md:text-sm text-[#bcb8d8]">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== THE SHIFT: before / after ===================== */}
      <section className="w-full flex flex-col items-center px-4 py-24">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col items-center text-center gap-5 mb-16">
            <Eyebrow>02 — The shift</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight max-w-3xl">
              From 4-hour inboxes to <span className="text-[#6ee7b7]">4-minute</span> check-ins.
            </h2>
          </div>

          <div className="relative grid md:grid-cols-2 gap-6 md:gap-10 items-stretch">
            {/* BEFORE — desaturated, heavy, tired */}
            <div className="relative rounded-3xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#ff9d9d]/80">Before</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <ul className="space-y-6">
                {[
                  "4 hours a day searching and replying to emails that could have been one sentence.",
                  "Projects only move when you manually nudge them, remind clients and update timelines.",
                  "Clients derail your flow with random requests, scope creep, and 17 follow-ups.",
                ].map((t) => (
                  <li key={t} className="flex gap-4 text-[#c9c3df]/80">
                    <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-[#ff9d9d]/40 text-[10px] text-[#ff9d9d]">✕</span>
                    <span className="text-[15px] leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* center connector */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#FFD600]/40 bg-[#14122b] text-[#FFD600] text-xl shadow-[0_0_30px_rgba(255,214,0,0.25)]">
                →
              </div>
            </div>

            {/* AFTER — alive, gold/green glow */}
            <div className="relative rounded-3xl p-8 md:p-10 border border-[#3a1c8d] bg-gradient-to-br from-[#221a44] to-[#2d186a] shadow-[0_0_60px_rgba(108,74,214,0.25)]">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#6ee7b7]">After</span>
                <span className="h-px flex-1 bg-[#6ee7b7]/20" />
              </div>
              <ul className="space-y-6">
                {[
                  "AI handles 90% of client emails while you sip coffee and design in peace.",
                  "Digipod auto-advances projects based on smart email parsing and intent detection.",
                  "Clients are onboarded, communicated with, and filtered automatically — no interruptions.",
                ].map((t) => (
                  <li key={t} className="flex gap-4 text-[#e6e1ff]">
                    <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#6ee7b7]/15 text-[11px] text-[#6ee7b7]">✓</span>
                    <span className="text-[15px] leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section id="features" className="w-full flex flex-col items-center py-24 px-4">
        <div className="flex flex-col items-center text-center gap-5 mb-20">
          <Eyebrow>03 — Inside Digipod</Eyebrow>
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight max-w-3xl">
            The work you dread, running quietly in the background.
          </h2>
        </div>

        <div className="flex flex-col gap-24 md:gap-28 w-full max-w-5xl">
          {[
            {
              n: "01",
              kicker: "Client comms",
              title: "AI-powered Client Inbox",
              body: "Your chaotic inbox, reimagined. Let AI triage, respond and organise client comms so you never miss a beat.",
              img: "/inbox.png",
              alt: "Inbox",
            },
            {
              n: "02",
              kicker: "Momentum",
              title: "Automatic phase detection & progression",
              body: "No more manually updating project statuses. Digipod tracks progress and nudges phases forward — automatically.",
              img: "/progression.png",
              alt: "Progression",
            },
            {
              n: "03",
              kicker: "Learning loop",
              title: "Intelligence that gets smarter",
              body: "Our AI learns from every project, client message and edge case. Fewer fumbles. Sharper suggestions. Always levelling up.",
              img: "/AI.png",
              alt: "AI",
            },
            {
              n: "04",
              kicker: "Boundaries",
              title: "No more scope marathons",
              body: "Detect scope creep before it becomes a crisis. Digipod sets, defends and enforces boundaries — without the awkward convos.",
              img: "/marathon.png",
              alt: "Marathon",
            },
            {
              n: "05",
              kicker: "Your stack",
              title: "Built to integrate, not isolate",
              body: "Digipod plugs into your existing workflows — from Gmail to Notion to Slack. No rip-and-replace required.",
              img: "/mail.png",
              alt: "Mail",
            },
          ].map((f, i) => (
            <div
              key={f.n}
              className={`group relative flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-16`}
            >
              {/* ghost index */}
              <span className="boldonse pointer-events-none absolute -top-14 md:-top-16 select-none text-[6rem] md:text-[9rem] leading-none text-white/[0.035]"
                style={i % 2 === 1 ? { right: 0 } : { left: 0 }}>
                {f.n}
              </span>

              {/* text */}
              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-xs text-[#FFD600] border border-[#FFD600]/40 rounded-full px-3 py-1">{f.n}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#a18fff]/80">{f.kicker}</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-extrabold mb-4 text-white leading-tight">{f.title}</h3>
                <p className="text-[#bcb8d8] text-lg font-medium max-w-md">{f.body}</p>
              </div>

              {/* image in a ticked frame */}
              <div className="flex-1 relative z-10 w-full">
                <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-2 transition-all duration-500 group-hover:border-[#6c4ad6]/50 group-hover:shadow-[0_0_50px_rgba(108,74,214,0.25)]">
                  {/* corner ticks */}
                  <span className="absolute -top-px -left-px h-4 w-4 border-t-2 border-l-2 border-[#FFD600]/60 rounded-tl-lg" />
                  <span className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-[#FFD600]/60 rounded-br-lg" />
                  <Image
                    src={f.img}
                    alt={f.alt}
                    width={520}
                    height={340}
                    className="rounded-xl w-full h-auto"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== INTEGRATIONS MARQUEE ===================== */}
      <section className="w-full flex flex-col items-center py-16 px-4">
        <Eyebrow>Plays well with your stack</Eyebrow>
        <div className="dp-marquee relative mt-10 w-full max-w-5xl overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="dp-marquee-track gap-4">
            {[...Array(2)].flatMap((_, dup) =>
              ["Gmail", "Google Calendar", "Notion", "Slack", "Stripe", "Razorpay", "Drive", "WhatsApp"].map((name) => (
                <span
                  key={`${dup}-${name}`}
                  className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 font-mono text-sm text-[#cfc9e8]"
                >
                  {name}
                </span>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ===================== PRICING ===================== */}
      <section id="pricing" className="w-full flex justify-center py-24 px-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* left: the pitch */}
          <div className="flex flex-col gap-6">
            <Eyebrow>04 — Founders deal</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Be one of the first <span className="text-[#FFD600]">100</span> to own your AI back office.
            </h2>
            <p className="text-[#bcb8d8] text-lg max-w-md">
              One payment, locked forever. The founders who join now shape what Digipod becomes — and never pay launch pricing.
            </p>
            {/* scarcity meter */}
            <div className="mt-2 max-w-sm">
              <div className="flex justify-between text-xs font-mono text-[#a18fff]/80 mb-2">
                <span>Founder seats claimed</span>
                <span>68 / 100</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#FFD600] to-[#6c4ad6]" style={{ width: "68%" }} />
              </div>
            </div>
          </div>

          {/* right: the card */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-[#6c4ad6]/20 blur-2xl" aria-hidden />
            <div className="relative rounded-3xl p-9 border border-[#3a1c8d] bg-gradient-to-br from-[#221a44] to-[#2d186a] shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#1a1333] bg-gradient-to-r from-[#FFD600] to-[#ffe57a] px-4 py-1.5 rounded-full font-bold">
                  Limited — 100 seats
                </span>
                <span className="text-xs font-mono text-[#a18fff]">Early Access</span>
              </div>

              <div className="flex items-end gap-3 mb-1">
                <span className="boldonse text-5xl text-[#FFD600]">₹400</span>
                <span className="text-lg line-through text-[#a18fff]/70 mb-2">₹3,500</span>
              </div>
              <p className="text-sm text-[#bcb8d8] mb-7">one-time · billed once · yours to keep</p>

              <ul className="space-y-4 mb-8">
                {[
                  "Early access + 3 months free",
                  "Lifetime discount post-launch",
                  "Your feature requests get top priority",
                  "Founders badge + private community",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[#e6e1ff]">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#FFD600]/15 text-[11px] text-[#FFD600]">✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={handleRazorpay}
                disabled={!razorpayLoaded || isRedirecting}
                className="w-full bg-[#FFD600] text-[#1a1333] font-bold rounded-full px-10 py-4 shadow-lg hover:bg-yellow-300 transition-transform transform hover:scale-[1.02] text-center focus:ring-2 focus:ring-[#FFD600] border border-[#FFD600] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {razorpayLoaded ? (isRedirecting ? "Redirecting..." : "Claim your founder seat") : "Loading..."}
              </button>
              <p className="mt-4 text-center text-xs text-[#a18fff]/70 font-mono">🔒 Secure checkout via Razorpay · instant license key</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== EARLY REACTIONS (bento) ===================== */}
      <section id="reviews" className="w-full flex flex-col items-center py-24 px-4">
        <div className="flex flex-col items-center text-center gap-5 mb-16">
          <Eyebrow>05 — Early reactions</Eyebrow>
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight max-w-2xl">
            Creatives are already lining up.
          </h2>
        </div>

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[minmax(0,1fr)]">
          {[
            { name: "Tumusiime Elijah", role: "Founder, Stealth Startup", quote: "The life of a creative is genuinely simplified.", init: "TE", span: "md:col-span-2", accent: true },
            { name: "Dewashish Mehta", role: "Full-Stack JS Developer", quote: "Absolutely amazing.", init: "DM", span: "" },
            { name: "TheLinuxGuy", role: "Server Administrator", quote: "Would love to try it out! 🤩 Very excited!!!", init: "TL", span: "" },
            { name: "Adam West", role: "Developer @ Stealth", quote: "Looks seriously promising.", init: "AW", span: "" },
            { name: "Urjah Goel", role: "Creative Freelancer", quote: "Take my money.", init: "UG", span: "", accent: true },
          ].map((c) => (
            <figure
              key={c.name}
              className={`${c.span} flex flex-col justify-between rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
                c.accent
                  ? "border-[#FFD600]/30 bg-gradient-to-br from-[#2d186a] to-[#3a1c8d]"
                  : "border-white/10 bg-white/[0.03] hover:border-[#6c4ad6]/40"
              }`}
            >
              <blockquote className="text-xl md:text-2xl font-bold text-white leading-snug">
                &ldquo;{c.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-4 mt-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#a18fff] to-[#6c4ad6] font-bold text-sm text-white">
                  {c.init}
                </span>
                <span className="flex flex-col">
                  <span className="font-semibold text-white text-sm">{c.name}</span>
                  <span className="text-xs text-[#a18fff]">{c.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ===================== CLOSING CTA BAND ===================== */}
      <section className="w-full flex justify-center px-4 pb-24">
        <div className="dp-grain relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#3a1c8d] bg-gradient-to-br from-[#1a1333] via-[#2d186a] to-[#1a1333] px-8 py-16 md:py-20 text-center">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[36rem] max-w-full rounded-full bg-[#6c4ad6]/30 blur-3xl" aria-hidden />
          <div className="relative">
            <h2 className="boldonse text-3xl md:text-5xl leading-tight bg-gradient-to-r from-[#a18fff] via-[#e6e1ff] to-[#FFD600] bg-clip-text text-transparent">
              STOP HUSTLING.<br />START CREATING.
            </h2>
            <p className="text-[#d8d2f0] max-w-lg mx-auto mt-6 mb-10">
              Put the busywork on autopilot and get your hours — and your craft — back.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                type="button"
                onClick={handleRazorpay}
                disabled={!razorpayLoaded || isRedirecting}
                className="bg-[#FFD600] text-[#1a1333] font-bold rounded-full px-8 py-3 shadow-lg hover:bg-yellow-300 transition-transform transform hover:scale-105 border border-[#FFD600] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {razorpayLoaded ? (isRedirecting ? "Redirecting..." : "Unlock Founders Deal") : "Loading..."}
              </button>
              <a href="https://forms.gle/2j3DcMv9HyxzeDqi8" target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#a18fff]/50 px-8 py-3 font-bold text-white hover:bg-white/5 transition">
                Join the waitlist →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="w-full border-t border-white/10 mt-auto">
        <div className="mx-auto max-w-6xl px-6 py-16 grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2 flex flex-col gap-4">
            <Image src="/digipod.png" alt="Digipod" height={32} width={110} />
            <p className="text-[#a18fff] text-sm max-w-xs leading-relaxed">
              The first anti-productivity tool for creatives. We don&apos;t help you hustle — we help you stop.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/40">Product</span>
            <a href="#features" className="text-sm text-[#cfc9e8] hover:text-white transition">Features</a>
            <a href="#pricing" className="text-sm text-[#cfc9e8] hover:text-white transition">Pricing</a>
            <a href="#reviews" className="text-sm text-[#cfc9e8] hover:text-white transition">Reviews</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/40">Get started</span>
            <Link href="/signin" className="text-sm text-[#cfc9e8] hover:text-white transition">Sign in</Link>
            <Link href="/signup" className="text-sm text-[#cfc9e8] hover:text-white transition">Sign up</Link>
            <a href="https://forms.gle/2j3DcMv9HyxzeDqi8" target="_blank" rel="noopener noreferrer" className="text-sm text-[#FFD600] hover:text-yellow-300 transition">Join waitlist →</a>
          </div>
        </div>
        <div className="dp-hairline h-px w-full" />
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#a18fff]">
          <span>&copy; {new Date().getFullYear()} Digipod. All rights reserved.</span>
          <a href="/privacy-policy.html" target="_blank" className="underline hover:text-white transition">Privacy Policy</a>
        </div>
      </footer>
    </main>
  );
}