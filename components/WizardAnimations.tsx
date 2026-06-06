"use client";

import React from "react";
import { Sparkles, Briefcase, Code, Heart, Layers } from "lucide-react";

// ─── Projects Animation ────────────────────────────────────────────────────────
export function ProjectsAnimation() {
  return (
    <div className="w-full max-w-[480px] aspect-square flex flex-col items-center justify-center relative">
      <style>{`
        @keyframes floatCard1 {
          0% { transform: translate(-30px, 40px) scale(0.95); opacity: 0; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }
        @keyframes floatCard2 {
          0% { transform: translate(30px, 60px) scale(0.95); opacity: 0; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }
        @keyframes logoPulse {
          0% { transform: scale(1); filter: drop-shadow(0 4px 12px rgba(0,0,0,0.08)); }
          50% { transform: scale(1.06); filter: drop-shadow(0 8px 20px rgba(141,184,255,0.3)); }
          100% { transform: scale(1); filter: drop-shadow(0 4px 12px rgba(0,0,0,0.08)); }
        }
        .anim-card-1 {
          animation: floatCard1 1s cubic-bezier(0.23, 1, 0.32, 1) forwards 0.2s;
          opacity: 0;
        }
        .anim-card-2 {
          animation: floatCard2 1s cubic-bezier(0.23, 1, 0.32, 1) forwards 0.5s;
          opacity: 0;
        }
        .anim-logo {
          animation: logoPulse 3s ease-in-out infinite;
        }
      `}</style>

      {/* Main Glass Browser Frame */}
      <div className="w-full max-w-[400px] bg-white/80 backdrop-blur-md border border-neutral-200/80 rounded-2xl shadow-xl flex flex-col relative overflow-hidden p-4">
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E45A5A]/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#BFE7A9]/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#8DB8FF]/80"></span>
          </div>
          <div className="bg-neutral-100/80 text-[10px] text-neutral-500 font-mono px-3 py-1 rounded-full flex items-center gap-1.5">
            <img src="/logoicon.png" alt="Webild" className="w-3.5 h-3.5 object-contain" />
            <span>webild.com/projects</span>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Central Logo Grid Background */}
        <div className="flex-1 flex flex-col gap-3.5 relative min-h-[180px] justify-center items-center">
          {/* Logo element behind/pulsing */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.07] anim-logo">
            <img src="/logoicon.png" alt="Webild Background Logo" className="w-32 h-32 object-contain" />
          </div>

          {/* Project Block 1 */}
          <div className="w-full bg-white border border-neutral-200/60 rounded-xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-3.5 anim-card-1 relative z-10 hover:border-blue-400 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#8DB8FF]/10 flex items-center justify-center shrink-0">
              <Code className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="h-2.5 bg-neutral-800 rounded-full w-24"></div>
              <div className="h-1.5 bg-neutral-400 rounded-full w-36"></div>
            </div>
          </div>

          {/* Project Block 2 */}
          <div className="w-full bg-white border border-neutral-200/60 rounded-xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-3.5 anim-card-2 relative z-10 hover:border-green-400 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#8DFFB3]/10 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="h-2.5 bg-neutral-800 rounded-full w-28"></div>
              <div className="h-1.5 bg-neutral-400 rounded-full w-20"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1.5 flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono tracking-wide">
        <Code className="w-4 h-4 text-blue-500" /> Building Projects Grid
      </div>
    </div>
  );
}

// ─── Interests Animation ───────────────────────────────────────────────────────
export function InterestsAnimation() {
  return (
    <div className="w-full max-w-[480px] aspect-square flex items-center justify-center relative">
      <style>{`
        @keyframes floatPill {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes pulseLine {
          0% { stroke-dashoffset: 0; opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { stroke-dashoffset: -20; opacity: 0.4; }
        }
        .float-pill-1 { animation: floatPill 5s ease-in-out infinite; }
        .float-pill-2 { animation: floatPill 6s ease-in-out infinite 0.5s; }
        .float-pill-3 { animation: floatPill 5.5s ease-in-out infinite 1s; }
        .float-pill-4 { animation: floatPill 6.5s ease-in-out infinite 1.5s; }
        .pulse-line {
          stroke-dasharray: 8 6;
          animation: pulseLine 3s linear infinite;
        }
        @keyframes centerPulse {
          0% { transform: scale(1); box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
          50% { transform: scale(1.08); box-shadow: 0 10px 30px rgba(141,184,255,0.4); }
          100% { transform: scale(1); box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
        }
        .center-node {
          animation: centerPulse 4s ease-in-out infinite;
        }
      `}</style>

      {/* SVG Network Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 480 480" fill="none">
        {/* Draw lines from center 240,240 to pills */}
        <line x1="240" y1="240" x2="110" y2="110" stroke="#8DB8FF" strokeWidth="2.5" className="pulse-line" />
        <line x1="240" y1="240" x2="370" y2="125" stroke="#8DFFB3" strokeWidth="2.5" className="pulse-line" />
        <line x1="240" y1="240" x2="125" y2="355" stroke="#8DB8FF" strokeWidth="2.5" className="pulse-line" />
        <line x1="240" y1="240" x2="355" y2="345" stroke="#BFE7A9" strokeWidth="2.5" className="pulse-line" />
        
        {/* Outer connection nodes */}
        <circle cx="110" cy="110" r="5" fill="#8DB8FF" />
        <circle cx="370" cy="125" r="5" fill="#8DFFB3" />
        <circle cx="125" cy="355" r="5" fill="#8DB8FF" />
        <circle cx="355" cy="345" r="5" fill="#BFE7A9" />
      </svg>

      {/* Central Brand Node */}
      <div className="center-node w-20 h-20 rounded-full bg-white border border-neutral-200/80 flex items-center justify-center z-20 shadow-lg relative">
        <img src="/logoicon.png" alt="Webild" className="w-10 h-10 object-contain" />
        <div className="absolute inset-0 rounded-full border border-blue-100 animate-ping opacity-25"></div>
      </div>

      {/* Floating Interest Pills */}
      <div className="absolute top-20 left-10 float-pill-1 z-10">
        <div className="px-4 py-2 bg-white/95 border border-neutral-200/80 shadow-md rounded-full text-xs font-semibold text-neutral-800 flex items-center gap-1.5 hover:border-blue-400 transition-colors">
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          <span>Product Design</span>
        </div>
      </div>

      <div className="absolute top-24 right-10 float-pill-2 z-10">
        <div className="px-4 py-2 bg-white/95 border border-neutral-200/80 shadow-md rounded-full text-xs font-semibold text-neutral-800 flex items-center gap-1.5 hover:border-green-400 transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>AI Development</span>
        </div>
      </div>

      <div className="absolute bottom-24 left-12 float-pill-3 z-10">
        <div className="px-4 py-2 bg-white/95 border border-neutral-200/80 shadow-md rounded-full text-xs font-semibold text-neutral-800 flex items-center gap-1.5 hover:border-blue-400 transition-colors">
          <span>Creative Writing</span>
        </div>
      </div>

      <div className="absolute bottom-20 right-12 float-pill-4 z-10">
        <div className="px-4 py-2 bg-white/95 border border-neutral-200/80 shadow-md rounded-full text-xs font-semibold text-neutral-800 flex items-center gap-1.5 hover:border-neutral-400 transition-colors">
          <span>Startup Growth</span>
        </div>
      </div>

      <div className="absolute bottom-1.5 flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono tracking-wide">
        <Heart className="w-4 h-4 text-red-500" /> Mapping Interests
      </div>
    </div>
  );
}

// ─── Skills Animation ──────────────────────────────────────────────────────────
export function SkillsAnimation() {
  return (
    <div className="w-full max-w-[480px] aspect-square flex flex-col items-center justify-center relative">
      <style>{`
        @keyframes snapSkill {
          0% { transform: scale(0.95) translateY(15px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .anim-skill-1 { animation: snapSkill 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards 0.1s; opacity: 0; }
        .anim-skill-2 { animation: snapSkill 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards 0.3s; opacity: 0; }
        .anim-skill-3 { animation: snapSkill 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards 0.5s; opacity: 0; }
        .anim-skill-4 { animation: snapSkill 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards 0.7s; opacity: 0; }
      `}</style>

      {/* Grid mapping panel */}
      <div className="w-full max-w-[320px] grid grid-cols-2 gap-4 p-4 border-2 border-dashed border-neutral-200/80 rounded-3xl bg-neutral-50/40 relative">
        {/* Column & Row Indicators */}
        <div className="absolute -top-6 left-4 text-[9px] font-mono text-neutral-400">COL 01 / COL 02</div>
        <div className="absolute -left-8 top-8 text-[9px] font-mono text-neutral-400 rotate-90 origin-left">ROW 01/02/03</div>

        {/* Anchor Card (Webild Logo) */}
        <div className="bg-[#2A2A2F] text-white p-3 rounded-2xl flex flex-col justify-between aspect-square shadow-lg border border-neutral-800 anim-skill-1">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Anchor</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8DFFB3] animate-pulse"></span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/logoicon.png" alt="Webild" className="w-6 h-6 object-contain invert brightness-0" />
            <span className="text-xs font-bold tracking-wide">Webild</span>
          </div>
        </div>

        {/* Skill Card 1 (React) */}
        <div className="bg-white border border-neutral-200/80 rounded-2xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between aspect-square anim-skill-2 hover:border-blue-400 transition-colors">
          <span className="text-[9px] text-neutral-400 font-mono uppercase tracking-wider">Node 01</span>
          <div className="space-y-1">
            <span className="text-xs font-bold text-neutral-800 block">React</span>
            <div className="w-8 h-1 bg-[#8DB8FF] rounded-full"></div>
          </div>
        </div>

        {/* Skill Card 2 (Tailwind) */}
        <div className="bg-white border border-neutral-200/80 rounded-2xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between aspect-square anim-skill-3 hover:border-green-400 transition-colors">
          <span className="text-[9px] text-neutral-400 font-mono uppercase tracking-wider">Node 02</span>
          <div className="space-y-1">
            <span className="text-xs font-bold text-neutral-800 block">Tailwind</span>
            <div className="w-10 h-1 bg-[#8DFFB3] rounded-full"></div>
          </div>
        </div>

        {/* Skill Card 3 (TypeScript) */}
        <div className="bg-white border border-neutral-200/80 rounded-2xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between aspect-square anim-skill-4 hover:border-blue-400 transition-colors">
          <span className="text-[9px] text-neutral-400 font-mono uppercase tracking-wider">Node 03</span>
          <div className="space-y-1">
            <span className="text-xs font-bold text-neutral-800 block">TypeScript</span>
            <div className="w-12 h-1 bg-[#8DB8FF] rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1.5 flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono tracking-wide">
        <Layers className="w-4 h-4 text-indigo-500" /> Stacking Skills Chips
      </div>
    </div>
  );
}

// ─── Experience Animation ──────────────────────────────────────────────────────
export function ExperienceAnimation() {
  return (
    <div className="w-full max-w-[480px] aspect-square flex flex-col items-center justify-center relative">
      <style>{`
        @keyframes drawLine {
          0% { height: 0%; }
          100% { height: 80%; }
        }
        @keyframes slideInLeft {
          0% { transform: translateX(-20px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          0% { transform: translateX(20px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes scaleNode {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .anim-line {
          animation: drawLine 2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        .anim-node-1 { animation: scaleNode 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 0.4s; opacity: 0; }
        .anim-node-2 { animation: scaleNode 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 1.0s; opacity: 0; }
        .anim-card-l { animation: slideInLeft 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards 0.6s; opacity: 0; }
        .anim-card-r { animation: slideInRight 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards 1.2s; opacity: 0; }
      `}</style>

      <div className="relative w-full max-w-[340px] h-[260px] flex flex-col items-center">
        {/* Timeline Path Line */}
        <div className="absolute top-10 w-[4px] bg-neutral-200/80 anim-line rounded-full" style={{ left: "calc(50% - 2px)" }}>
          <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-400 to-green-400 animate-pulse h-full rounded-full"></div>
        </div>

        {/* Top Anchor: Webild Logo */}
        <div className="absolute top-0 z-10 w-12 h-12 rounded-full bg-white border-2 border-neutral-200/80 shadow-md flex items-center justify-center">
          <img src="/logoicon.png" alt="Webild" className="w-6 h-6 object-contain" />
        </div>

        {/* Mid-1: Node and Card Right */}
        <div className="absolute top-[100px] w-full flex items-center justify-center">
          <div className="absolute w-4 h-4 rounded-full bg-white border-4 border-blue-500 z-10 anim-node-1"></div>
          <div className="absolute left-[58%] w-[140px] bg-white border border-neutral-200/80 rounded-xl p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] anim-card-r hover:border-blue-400 transition-colors">
            <span className="text-[9px] font-mono text-neutral-400 block">2024 - PRESENT</span>
            <span className="text-xs font-bold text-neutral-800 block leading-tight mt-0.5">Senior Designer</span>
            <span className="text-[10px] text-neutral-500 block leading-none mt-0.5">Webild Cloud</span>
          </div>
        </div>

        {/* Mid-2: Node and Card Left */}
        <div className="absolute top-[180px] w-full flex items-center justify-center">
          <div className="absolute w-4 h-4 rounded-full bg-white border-4 border-green-500 z-10 anim-node-2"></div>
          <div className="absolute right-[58%] w-[140px] bg-white border border-neutral-200/80 rounded-xl p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] text-right anim-card-l hover:border-green-400 transition-colors">
            <span className="text-[9px] font-mono text-neutral-400 block">2022 - 2024</span>
            <span className="text-xs font-bold text-neutral-800 block leading-tight mt-0.5">Freelancer</span>
            <span className="text-[10px] text-neutral-500 block leading-none mt-0.5">Product Dev</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1.5 flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono tracking-wide">
        <Briefcase className="w-4 h-4 text-amber-500" /> Drawing Timeline
      </div>
    </div>
  );
}

// ─── Generating Mesh Animation ────────────────────────────────────────────────
export function GeneratingAnimation() {
  return (
    <div className="w-full max-w-[480px] aspect-square flex items-center justify-center relative">
      <style>{`
        @keyframes spinRing1 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spinRing2 {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes pulseGlowRing {
          0% { transform: scale(0.95); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.6; }
          100% { transform: scale(0.95); opacity: 0.3; }
        }
        .spin-ring-1 {
          animation: spinRing1 15s linear infinite;
          transform-origin: 150px 150px;
        }
        .spin-ring-2 {
          animation: spinRing2 10s linear infinite;
          transform-origin: 150px 150px;
        }
        .pulse-glow-ring {
          animation: pulseGlowRing 4s ease-in-out infinite;
          transform-origin: 150px 150px;
        }
        @keyframes mainLogoPulse {
          0% { transform: scale(1); filter: drop-shadow(0 4px 12px rgba(0,0,0,0.06)); }
          50% { transform: scale(1.08); filter: drop-shadow(0 12px 28px rgba(141,184,255,0.45)); }
          100% { transform: scale(1); filter: drop-shadow(0 4px 12px rgba(0,0,0,0.06)); }
        }
        .main-logo-glow {
          animation: mainLogoPulse 3s ease-in-out infinite;
        }
      `}</style>

      {/* Rotating Mesh Rings */}
      <svg className="absolute w-[300px] h-[300px] pointer-events-none" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer Ring */}
        <circle cx="150" cy="150" r="110" stroke="#E6E6E6" strokeWidth="2.5" strokeDasharray="6 6" className="spin-ring-1" />
        
        {/* Mid Ring with glowing particles */}
        <g className="spin-ring-2">
          <circle cx="150" cy="150" r="80" stroke="#8DB8FF" strokeWidth="2" strokeDasharray="20 40" opacity="0.8" />
          <circle cx="230" cy="150" r="6" fill="#8DFFB3" />
          <circle cx="70" cy="150" r="5" fill="#8DB8FF" />
        </g>

        {/* Inner Ring pulsing */}
        <circle cx="150" cy="150" r="50" stroke="#8DFFB3" strokeWidth="3" opacity="0.6" className="pulse-glow-ring" />
        
        {/* Orbit nodes */}
        <circle cx="150" cy="40" r="6" fill="#2A2A2F" className="spin-ring-1" />
        <circle cx="150" cy="260" r="4" fill="#BFE7A9" className="spin-ring-1" />
      </svg>

      {/* Central Pulsing Webild Logo */}
      <div className="main-logo-glow w-24 h-24 rounded-full bg-white border border-neutral-200/80 shadow-2xl flex items-center justify-center z-10 relative">
        <img src="/logoicon.png" alt="Webild" className="w-12 h-12 object-contain" />
        <div className="absolute inset-0 rounded-full border border-blue-200/60 animate-ping opacity-20"></div>
      </div>

      <div className="absolute bottom-1.5 flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono tracking-wide">
        <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: "4s" }} /> AI Refinement
      </div>
    </div>
  );
}

// ─── Main Animation Dispatcher ────────────────────────────────────────────────
interface WizardAnimationsProps {
  step: number;
}

export default function WizardAnimations({ step }: WizardAnimationsProps) {
  if (step === 2) return <ProjectsAnimation />;
  if (step === 3) return <InterestsAnimation />;
  if (step === 4) return <SkillsAnimation />;
  if (step === 5) return <ExperienceAnimation />;
  return <GeneratingAnimation />;
}
