import Image from "next/image";
import Link from "next/link";
import ClaimBadgeButton from "./ClaimBadgeButton";

export const metadata = {
  title: "What is Digipod? | Pre-order",
  description: "Learn what Digipod is, how it helps agencies manage client communication, and why you should pre-order.",
};

export default function WhatIsDigipodPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(closest-side, #6c4ad6, transparent)' }} />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(closest-side, #0ea5e9, transparent)' }} />

      {/* Navbar */}
      <nav className="w-full flex flex-col items-center py-3 px-2 bg-transparent sticky top-0 z-30">
        <div className="flex w-full max-w-3xl items-center justify-between bg-black/90 rounded-2xl border border-[#666] px-5 py-2" style={{ boxShadow: '0 2px 16px 0 #0008' }}>
          <div className="flex flex-col items-center">
            <Image src="/digipod.png" alt="Digipod Logo" height={36} width={120} style={{ height: 36, width: 'auto' }} />
          </div>
          <div className="flex gap-2">
            <Link href="/signin" className="rounded-full px-5 py-2 bg-[#2d186a] text-white font-bold text-base shadow border border-[#3a1c8d] hover:bg-[#3a1c8d] transition-all" style={{ boxShadow: '0 2px 8px 0 #2d186a44' }}>Sign In</Link>
            <Link href="/signup" className="rounded-full px-5 py-2 bg-[#6c4ad6] text-white font-bold text-base shadow border border-[#6c4ad6] hover:bg-[#8f5fff] transition-all" style={{ boxShadow: '0 2px 8px 0 #6c4ad644' }}>Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase bg-white/5 border border-white/10 text-blue-200/80 rounded-full px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Live for early adopters
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-[#a18fff] via-[#6e3bbd] to-[#4b217a] bg-clip-text text-transparent">
            Become the World’s First AI-Powered Creative Agency
          </h1>
          <p className="mt-5 text-lg md:text-xl text-blue-100/90 max-w-3xl mx-auto">
            We’ve built the full-stack AI back office so you can eliminate admin chaos and win more clients.
          </p>
          <div className="mt-8 inline-flex gap-3">
            <ClaimBadgeButton />
          </div>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6c4ad6] to-[#8f5fff] text-white text-xs font-semibold px-4 py-2 shadow">
              <span className="text-base">🔒</span> Exclusive Early Adopter Badge Included
            </span>
            <span className="text-blue-200/80 text-xs">Limited cohort. Display on your site.</span>
          </div>
          <p className="mt-3 text-blue-200/80 text-sm">Use now, pay later. It’s free to join the waitlist. Paid plans start when you’re ready.</p>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-[92%] max-w-6xl h-px bg-gradient-to-r from-transparent via-[#3a1c8d] to-transparent opacity-50" />

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#6c4ad6] transition-colors" style={{ boxShadow: '0 10px 30px -10px rgba(108,74,214,0.25)' }}>
            <h3 className="text-xl font-bold mb-2">🚀 Close projects 30% faster</h3>
            <p className="text-blue-100/80">Zero admin. Automated follow-ups, updates, and nudges keep momentum.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#6c4ad6] transition-colors" style={{ boxShadow: '0 10px 30px -10px rgba(108,74,214,0.25)' }}>
            <h3 className="text-xl font-bold mb-2">🏆 Position yourself as tech-first</h3>
            <p className="text-blue-100/80">Stand out with AI-backed operations and consistent client experience.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#6c4ad6] transition-colors" style={{ boxShadow: '0 10px 30px -10px rgba(108,74,214,0.25)' }}>
            <h3 className="text-xl font-extrabold mb-2 flex items-center gap-2">🔒 Exclusive Early Adopter Badge <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">Limited</span></h3>
            <p className="text-blue-100/80">Showcase innovation on your site with a verified badge and priority case study placement.</p>
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="w-full flex justify-center py-6 md:py-10">
        <div className="relative">
          <div className="absolute -inset-1 rounded-[26px] bg-gradient-to-r from-[#6c4ad6] via-[#8f5fff] to-[#0ea5e9] opacity-30 blur" />
          <div className="relative rounded-[22px] bg-gradient-to-br from-[#0f0b2b] to-[#1a1333] p-2 border border-[#3a1c8d]/60">
            <Image src="/showcase-latest.png" width={1100} height={720} alt="Dashboard Screenshot" className="rounded-xl shadow-2xl max-w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Why join early */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">Why join early?</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h4 className="font-semibold mb-2">Early adopter pricing</h4>
            <p className="text-blue-100/80">Lock in a lower lifetime rate before public launch.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h4 className="font-semibold mb-2">Direct product influence</h4>
            <p className="text-blue-100/80">Your feedback shapes workflows, templates, and integrations.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h4 className="font-semibold mb-2">Priority onboarding</h4>
            <p className="text-blue-100/80">White-glove setup to tailor Digipod to your agency in minutes.</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <a
            href="/signup?waitlist=1"
            className="rounded-full px-8 py-3 font-bold bg-emerald-500 text-[#0b0a1a] hover:bg-emerald-400 transition shadow-lg"
          >
            Join the AI Agency Revolution
          </a>
          <p className="text-blue-200/70 mt-3 text-sm">Limited early adopters will be featured as case studies.</p>
        </div>
      </section>

      {/* How it works + Differentiators */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-3">How it works</h3>
            <ol className="list-decimal list-inside space-y-3 text-blue-100/85">
              <li>Connect your Gmail in minutes.</li>
              <li>Choose workflows (onboarding, weekly updates, payments, scope, handoff).</li>
              <li>Approve or edit AI-drafted emails before they’re sent.</li>
              <li>Track status and replies from your dashboard.</li>
            </ol>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-3">What makes Digipod different</h3>
            <ul className="space-y-3 text-blue-100/85">
              <li>Purpose-built for agencies and client operations.</li>
              <li>Human-in-the-loop approvals so you stay in control.</li>
              <li>Opinionated templates that save time but remain flexible.</li>
              <li>Privacy-first: connects to your existing inbox, no lock-in.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 pb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Frequently asked questions</h2>
        <div className="mt-8 space-y-4">
          <details className="group bg-white/5 border border-white/10 rounded-xl p-5">
            <summary className="cursor-pointer list-none font-semibold">Is there a free trial?</summary>
            <p className="mt-2 text-blue-100/80">Joining the waitlist is free. Early adopters get special pricing at launch.</p>
          </details>
          <details className="group bg-white/5 border border-white/10 rounded-xl p-5">
            <summary className="cursor-pointer list-none font-semibold">Do I have to switch tools?</summary>
            <p className="mt-2 text-blue-100/80">No. Digipod connects to your Gmail and fits into your current workflow.</p>
          </details>
          <details className="group bg-white/5 border border-white/10 rounded-xl p-5">
            <summary className="cursor-pointer list-none font-semibold">Can I approve emails before they’re sent?</summary>
            <p className="mt-2 text-blue-100/80">Yes—nothing goes out without your approval unless you enable auto-send.</p>
          </details>
        </div>
      </section>

      {/* Badge spotlight */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Badge visual - prominent, no rectangle */}
          <div className="order-1 flex items-center justify-center">
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 -z-20 rounded-full blur-3xl opacity-40" style={{ background: 'radial-gradient(closest-side, rgba(140,102,230,0.45), transparent 70%)' }} />
              <div
                aria-label="Digipod : AI powered Agency"
                style={{ backgroundImage: 'url(/badge.png)' }}
                className="relative z-10 select-none w-[380px] h-[380px] md:w-[520px] md:h-[520px] lg:w-[640px] lg:h-[640px] bg-contain bg-no-repeat bg-center"
              />
              <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
                <span className="select-none text-white/15 text-2xl md:text-3xl font-extrabold tracking-widest uppercase" style={{ transform: 'rotate(-16deg)', letterSpacing: '0.2em' }}>
                  DIGIPOD VERIFIED
                </span>
              </div>
            </div>
          </div>

          {/* Copy column */}
          <div className="order-2 md:order-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Wear the Early Adopter Badge</h2>
            <p className="text-blue-100/85">Signal trust and forward-thinking to prospects. Your badge links to a verified profile and can unlock case study features for select early adopters.</p>
            <ul className="mt-6 space-y-3 text-blue-100/85">
              <li>• Verified link to your Digipod profile</li>
              <li>• Optional inclusion in public case studies</li>
              <li>• Agency-grade, brand-safe design</li>
            </ul>
            <div className="mt-8">
              <ClaimBadgeButton />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full flex flex-col items-center justify-center py-14 border-t border-[#3a1c8d] mt-auto relative overflow-hidden">
        <a href="https://forms.gle/2j3DcMv9HyxzeDqi8" target="_blank" rel="noopener noreferrer" className="bg-white text-[#1a1333] font-bold rounded-full px-8 py-3 shadow-lg hover:bg-gray-200 transition mb-6 border border-[#a18fff]">Get Early Access →</a>
        <div className="text-[#a18fff] text-base">&copy; {new Date().getFullYear()} Digipod. All rights reserved. <a href="/privacy-policy.html" target="_blank" className="underline ml-2">Privacy Policy</a></div>
      </footer>
    </main>
  );
} 