"use client";

import React from "react";
import { Sparkles, Briefcase, Code, Heart, Layers } from "lucide-react";

// ─── Projects Animation ────────────────────────────────────────────────────────
export function ProjectsAnimation() {
  return (
    <div className="w-full max-w-sm aspect-square flex items-center justify-center relative p-6 bg-white border border-neutral-100 rounded-3xl shadow-sm">
      <style>{`
        @keyframes drawWireframe {
          0% { stroke-dashoffset: 400; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes floatBlock {
          0% { transform: translateY(15px) scale(0.92); opacity: 0; }
          50% { transform: translateY(-5px) scale(1.02); opacity: 0.8; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .draw-path {
          stroke-dasharray: 400;
          animation: drawWireframe 2.5s ease-out forwards;
        }
        .block-1 { animation: floatBlock 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards 0.2s; opacity: 0; }
        .block-2 { animation: floatBlock 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards 0.5s; opacity: 0; }
        .block-3 { animation: floatBlock 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards 0.8s; opacity: 0; }
      `}</style>

      <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[220px]">
        {/* Main Canvas Frame */}
        <rect x="20" y="20" width="200" height="200" rx="20" stroke="#E6E6E6" strokeWidth="2" className="draw-path" />
        <line x1="20" y1="56" x2="220" y2="56" stroke="#E6E6E6" strokeWidth="2" className="draw-path" />
        
        {/* Header Circles */}
        <circle cx="45" cy="38" r="5" fill="#E45A5A" opacity="0.6" />
        <circle cx="60" cy="38" r="5" fill="#BFE7A9" opacity="0.6" />
        <circle cx="75" cy="38" r="5" fill="#8DB8FF" opacity="0.6" />

        {/* Project Block 1 */}
        <g className="block-1">
          <rect x="36" y="76" width="168" height="38" rx="8" fill="#FBFBFB" stroke="#E6E6E6" strokeWidth="1.5" />
          <rect x="48" y="86" width="24" height="18" rx="4" fill="#8DB8FF" opacity="0.3" />
          <line x1="82" y1="90" x2="160" y2="90" stroke="#2A2A2F" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="82" y1="98" x2="130" y2="98" stroke="#A3A3A3" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Project Block 2 */}
        <g className="block-2">
          <rect x="36" y="126" width="168" height="38" rx="8" fill="#FBFBFB" stroke="#E6E6E6" strokeWidth="1.5" />
          <rect x="48" y="136" width="24" height="18" rx="4" fill="#8DFFB3" opacity="0.3" />
          <line x1="82" y1="140" x2="150" y2="140" stroke="#2A2A2F" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="82" y1="148" x2="120" y2="148" stroke="#A3A3A3" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Project Block 3 */}
        <g className="block-3">
          <rect x="36" y="176" width="168" height="38" rx="8" fill="#FBFBFB" stroke="#E6E6E6" strokeWidth="1.5" />
          <rect x="48" y="186" width="24" height="18" rx="4" fill="#E6E6E6" />
          <line x1="82" y1="190" x2="135" y2="190" stroke="#2A2A2F" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="82" y1="198" x2="110" y2="198" stroke="#A3A3A3" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>

      <div className="absolute bottom-4 flex items-center gap-1.5 text-xs font-semibold text-neutral-400 font-mono">
        <Code className="w-3.5 h-3.5 text-blue-500" /> Building Works grid
      </div>
    </div>
  );
}

// ─── Interests Animation ───────────────────────────────────────────────────────
export function InterestsAnimation() {
  return (
    <div className="w-full max-w-sm aspect-square flex items-center justify-center relative p-6 bg-white border border-neutral-100 rounded-3xl shadow-sm">
      <style>{`
        @keyframes pulseGlow {
          0% { transform: scale(0.95); opacity: 0.4; filter: drop-shadow(0 0 4px rgba(59,130,246,0.2)); }
          50% { transform: scale(1.05); opacity: 0.8; filter: drop-shadow(0 0 16px rgba(59,130,246,0.6)); }
          100% { transform: scale(0.95); opacity: 0.4; filter: drop-shadow(0 0 4px rgba(59,130,246,0.2)); }
        }
        @keyframes travelDot {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        .pulse-bulb {
          animation: pulseGlow 3s ease-in-out infinite;
        }
        .travel-line {
          stroke-dasharray: 200;
          animation: travelDot 4s linear infinite;
        }
      `}</style>

      <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[220px]">
        {/* Connections Network */}
        <path d="M120 120 L50 80 M120 120 L190 80 M120 120 L60 170 M120 120 L180 170" stroke="#8DB8FF" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6" />
        
        {/* Pulsing Dots */}
        <circle cx="50" cy="80" r="8" fill="#8DFFB3" opacity="0.8" className="pulse-bulb" />
        <circle cx="190" cy="80" r="10" fill="#8DB8FF" opacity="0.8" className="pulse-bulb" style={{ animationDelay: "0.5s" }} />
        <circle cx="60" cy="170" r="7" fill="#8DB8FF" opacity="0.7" className="pulse-bulb" style={{ animationDelay: "1s" }} />
        <circle cx="180" cy="170" r="9" fill="#BFE7A9" opacity="0.8" className="pulse-bulb" style={{ animationDelay: "1.5s" }} />

        {/* Center Node (Core Bulb/Mind) */}
        <g className="pulse-bulb">
          <circle cx="120" cy="120" r="28" fill="#2A2A2F" />
          <path d="M120 106v28M106 120h28" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </svg>

      <div className="absolute bottom-4 flex items-center gap-1.5 text-xs font-semibold text-neutral-400 font-mono">
        <Heart className="w-3.5 h-3.5 text-red-500" /> Mapping Interests
      </div>
    </div>
  );
}

// ─── Skills Animation ──────────────────────────────────────────────────────────
export function SkillsAnimation() {
  return (
    <div className="w-full max-w-sm aspect-square flex items-center justify-center relative p-6 bg-white border border-neutral-100 rounded-3xl shadow-sm">
      <style>{`
        @keyframes floatTag {
          0% { transform: translateY(12px) scale(0.95); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .tag-row-1 { animation: floatTag 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards 0.1s; opacity: 0; }
        .tag-row-2 { animation: floatTag 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards 0.3s; opacity: 0; }
        .tag-row-3 { animation: floatTag 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards 0.5s; opacity: 0; }
        .tag-row-4 { animation: floatTag 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards 0.7s; opacity: 0; }
      `}</style>

      <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[220px]">
        {/* Stacking Skill Tags Grid */}
        <g className="tag-row-1">
          <rect x="40" y="50" width="70" height="26" rx="13" fill="#DCEAFF" stroke="#8DB8FF" strokeWidth="1" />
          <line x1="56" y1="63" x2="94" y2="63" stroke="#1A4A8A" strokeWidth="2.5" strokeLinecap="round" />
          
          <rect x="120" y="50" width="80" height="26" rx="13" fill="#FAFAFA" stroke="#E6E6E6" strokeWidth="1" />
          <line x1="136" y1="63" x2="184" y2="63" stroke="#2A2A2F" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        <g className="tag-row-2">
          <rect x="30" y="92" width="90" height="26" rx="13" fill="#FAFAFA" stroke="#E6E6E6" strokeWidth="1" />
          <line x1="46" y1="105" x2="104" y2="105" stroke="#2A2A2F" strokeWidth="2.5" strokeLinecap="round" />

          <rect x="130" y="92" width="80" height="26" rx="13" fill="#EEFDF5" stroke="#8DFFB3" strokeWidth="1" />
          <line x1="146" y1="105" x2="194" y2="105" stroke="#369762" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        <g className="tag-row-3">
          <rect x="50" y="134" width="70" height="26" rx="13" fill="#FAFAFA" stroke="#E6E6E6" strokeWidth="1" />
          <line x1="66" y1="147" x2="104" y2="147" stroke="#2A2A2F" strokeWidth="2.5" strokeLinecap="round" />

          <rect x="130" y="134" width="60" height="26" rx="13" fill="#DCEAFF" stroke="#8DB8FF" strokeWidth="1" />
          <line x1="146" y1="147" x2="174" y2="147" stroke="#1A4A8A" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        <g className="tag-row-4">
          <rect x="40" y="176" width="160" height="26" rx="13" fill="#2A2A2F" />
          <line x1="66" y1="189" x2="174" y2="189" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </svg>

      <div className="absolute bottom-4 flex items-center gap-1.5 text-xs font-semibold text-neutral-400 font-mono">
        <Layers className="w-3.5 h-3.5 text-indigo-500" /> Stacking Skills chips
      </div>
    </div>
  );
}

// ─── Experience Animation ──────────────────────────────────────────────────────
export function ExperienceAnimation() {
  return (
    <div className="w-full max-w-sm aspect-square flex items-center justify-center relative p-6 bg-white border border-neutral-100 rounded-3xl shadow-sm">
      <style>{`
        @keyframes drawTimeline {
          0% { stroke-dashoffset: 300; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes pulseNode {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .timeline-axis {
          stroke-dasharray: 300;
          animation: drawTimeline 2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        .node-1 { animation: pulseNode 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards 0.4s; opacity: 0; transform-origin: 60px 70px; }
        .node-2 { animation: pulseNode 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards 0.9s; opacity: 0; transform-origin: 60px 130px; }
        .node-3 { animation: pulseNode 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards 1.4s; opacity: 0; transform-origin: 60px 190px; }
      `}</style>

      <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[220px]">
        {/* Timeline Axis Line */}
        <line x1="60" y1="30" x2="60" y2="210" stroke="#E6E6E6" strokeWidth="3" strokeLinecap="round" className="timeline-axis" />
        
        {/* Node 1 */}
        <g className="node-1">
          <circle cx="60" cy="70" r="10" fill="#8DB8FF" />
          <circle cx="60" cy="70" r="5" fill="#2A2A2F" />
          <rect x="85" y="55" width="115" height="30" rx="6" fill="#FAFAFA" stroke="#E6E6E6" strokeWidth="1" />
          <line x1="95" y1="70" x2="160" y2="70" stroke="#2A2A2F" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Node 2 */}
        <g className="node-2">
          <circle cx="60" cy="130" r="10" fill="#8DFFB3" />
          <circle cx="60" cy="130" r="5" fill="#369762" />
          <rect x="85" y="115" width="115" height="30" rx="6" fill="#FAFAFA" stroke="#E6E6E6" strokeWidth="1" />
          <line x1="95" y1="130" x2="145" y2="130" stroke="#2A2A2F" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Node 3 */}
        <g className="node-3">
          <circle cx="60" cy="190" r="10" fill="#E6E6E6" />
          <circle cx="60" cy="190" r="5" fill="#A3A3A3" />
          <rect x="85" y="175" width="115" height="30" rx="6" fill="#FAFAFA" stroke="#E6E6E6" strokeWidth="1" />
          <line x1="95" y1="190" x2="130" y2="190" stroke="#2A2A2F" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>

      <div className="absolute bottom-4 flex items-center gap-1.5 text-xs font-semibold text-neutral-400 font-mono">
        <Briefcase className="w-3.5 h-3.5 text-amber-500" /> Drawing Timeline
      </div>
    </div>
  );
}

// ─── Generating Mesh Animation ────────────────────────────────────────────────
export function GeneratingAnimation() {
  return (
    <div className="w-full max-w-sm aspect-square flex items-center justify-center relative p-6 bg-white border border-neutral-100 rounded-3xl shadow-sm">
      <style>{`
        @keyframes spinMesh {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes breathScale {
          0% { transform: scale(0.9); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(0.9); opacity: 0.3; }
        }
        .spin-mesh-inner {
          animation: spinMesh 12s linear infinite;
          transform-origin: 120px 120px;
        }
        .breath-mesh {
          animation: breathScale 4s ease-in-out infinite;
        }
      `}</style>

      <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[220px] spin-mesh-inner">
        <circle cx="120" cy="120" r="70" stroke="#E6E6E6" strokeWidth="1.5" className="breath-mesh" />
        <circle cx="120" cy="120" r="50" stroke="#8DB8FF" strokeWidth="1.5" opacity="0.6" />
        <circle cx="120" cy="120" r="30" stroke="#8DFFB3" strokeWidth="1.5" opacity="0.8" className="breath-mesh" />
        
        {/* Orbiting nodes */}
        <circle cx="120" cy="50" r="5" fill="#8DB8FF" />
        <circle cx="120" cy="190" r="5" fill="#8DFFB3" />
        <circle cx="50" cy="120" r="4" fill="#BFE7A9" />
        <circle cx="190" cy="120" r="6" fill="#2A2A2F" />
      </svg>

      <div className="absolute bottom-4 flex items-center gap-1.5 text-xs font-semibold text-neutral-400 font-mono">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: "3s" }} /> AI Refinement
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
