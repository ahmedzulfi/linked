"use client";

import React from "react";
import { Sparkles, Briefcase, Code, Heart, Layers } from "lucide-react";

// ─── Projects Animation ────────────────────────────────────────────────────────
export function ProjectsAnimation() {
  return (
    <div className="w-full max-w-[480px] aspect-square flex flex-col items-center justify-center relative">
      <style>{`
        @keyframes browserFloat {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(0.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes blockFloat1 {
          0% { transform: translate(-30px, 30px) scale(0.92); opacity: 0; }
          70% { transform: translate(3px, -2px) scale(1.03); opacity: 0.9; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }
        @keyframes blockFloat2 {
          0% { transform: translate(30px, 40px) scale(0.92); opacity: 0; }
          70% { transform: translate(-3px, -2px) scale(1.03); opacity: 0.9; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }
        @keyframes blockFloat3 {
          0% { transform: translate(0px, 50px) scale(0.92); opacity: 0; }
          70% { transform: translate(0px, -4px) scale(1.03); opacity: 0.9; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }
        @keyframes pulseLogo {
          0% { transform: scale(1); opacity: 0.08; }
          50% { transform: scale(1.08); opacity: 0.15; }
          100% { transform: scale(1); opacity: 0.08; }
        }
        @keyframes drawGridPath {
          0% { stroke-dashoffset: 400; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0.7; }
        }
        .anim-browser {
          animation: browserFloat 6s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .anim-card-1 {
          animation: blockFloat1 1.2s cubic-bezier(0.25, 0.8, 0.25, 1) forwards 0.2s;
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }
        .anim-card-2 {
          animation: blockFloat2 1.2s cubic-bezier(0.25, 0.8, 0.25, 1) forwards 0.5s;
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }
        .anim-card-3 {
          animation: blockFloat3 1.2s cubic-bezier(0.25, 0.8, 0.25, 1) forwards 0.8s;
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }
        .anim-bg-logo {
          animation: pulseLogo 4s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .draw-grid {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: drawGridPath 2.5s ease-out forwards;
        }
      `}</style>

      <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[380px] anim-browser">
        <defs>
          {/* Card Shadows */}
          <filter id="shadowFilter" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.06" />
          </filter>
          <filter id="glowFilter" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          {/* Accent Gradients */}
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8DB8FF" />
            <stop offset="100%" stop-color="#4B89FF" />
          </linearGradient>
          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8DFFB3" />
            <stop offset="100%" stop-color="#369762" />
          </linearGradient>
          <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#DCEAFF" />
            <stop offset="100%" stop-color="#9d8dfa" />
          </linearGradient>
          
          {/* Dotted Grid Pattern for Browser Interior */}
          <pattern id="innerGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#EAEAEA" />
          </pattern>
        </defs>

        {/* Browser Mockup Window */}
        <rect x="20" y="30" width="360" height="320" rx="20" fill="white" stroke="#E6E6E6" strokeWidth="2" filter="url(#shadowFilter)" />
        
        {/* Browser Topbar Controls */}
        <g>
          <circle cx="45" cy="52" r="6" fill="#E45A5A" opacity="0.8" />
          <circle cx="61" cy="52" r="6" fill="#BFE7A9" opacity="0.8" />
          <circle cx="77" cy="52" r="6" fill="#8DB8FF" opacity="0.8" />
          
          {/* Browser Address Bar */}
          <rect x="110" y="40" width="180" height="24" rx="12" fill="#F3F3F3" />
          <image href="/logoicon.png" x="120" y="44" width="16" height="16" />
          <text x="142" y="56" fill="#888888" fontFamily="monospace" fontSize="9" fontWeight="bold">webild.com/projects</text>
        </g>
        
        {/* Separator */}
        <line x1="20" y1="76" x2="380" y2="76" stroke="#E6E6E6" strokeWidth="1.5" />

        {/* Editor Grid Area */}
        <rect x="21" y="77" width="358" height="272" fill="url(#innerGrid)" rx="19" />
        
        {/* Axis Guides */}
        <path d="M 60 90 L 60 330 M 40 310 L 360 310" stroke="#E6E6E6" strokeWidth="1.5" strokeDasharray="4 4" className="draw-grid" />
        
        {/* Large pulsing background brand logo */}
        <image href="/logoicon.png" x="140" y="130" width="120" height="120" className="anim-bg-logo" />

        {/* Dynamic Project Cards */}
        {/* Card 1 */}
        <g className="anim-card-1" filter="url(#shadowFilter)">
          <rect x="48" y="100" width="304" height="64" rx="14" fill="white" stroke="#E6E6E6" strokeWidth="1.5" />
          <rect x="60" y="112" width="40" height="40" rx="10" fill="url(#blueGrad)" />
          <path d="M 74 124 L 74 140 M 68 132 L 80 132" stroke="white" strokeWidth="3" strokeLinecap="round" />
          
          <rect x="114" y="118" width="90" height="10" rx="5" fill="#2A2A2F" />
          <rect x="114" y="134" width="160" height="7" rx="3.5" fill="#A3A3A3" />
          <circle cx="320" cy="132" r="5" fill="#8DB8FF" />
        </g>

        {/* Card 2 */}
        <g className="anim-card-2" filter="url(#shadowFilter)">
          <rect x="48" y="180" width="304" height="64" rx="14" fill="white" stroke="#E6E6E6" strokeWidth="1.5" />
          <rect x="60" y="192" width="40" height="40" rx="10" fill="url(#greenGrad)" />
          <path d="M 72 206 L 80 206 M 72 212 L 80 212 M 72 218 L 77 218" stroke="white" strokeWidth="3" strokeLinecap="round" />
          
          <rect x="114" y="198" width="110" height="10" rx="5" fill="#2A2A2F" />
          <rect x="114" y="214" width="130" height="7" rx="3.5" fill="#A3A3A3" />
          <circle cx="320" cy="212" r="5" fill="#8DFFB3" />
        </g>

        {/* Card 3 */}
        <g className="anim-card-3" filter="url(#shadowFilter)">
          <rect x="48" y="260" width="304" height="64" rx="14" fill="white" stroke="#E6E6E6" strokeWidth="1.5" />
          <rect x="60" y="272" width="40" height="40" rx="10" fill="url(#purpleGrad)" />
          <path d="M 72 284 L 80 292 M 80 284 L 72 292" stroke="white" strokeWidth="3" strokeLinecap="round" />
          
          <rect x="114" y="278" width="80" height="10" rx="5" fill="#2A2A2F" />
          <rect x="114" y="294" width="150" height="7" rx="3.5" fill="#A3A3A3" />
          <circle cx="320" cy="292" r="5" fill="#DCEAFF" />
        </g>
      </svg>

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
        @keyframes floatPill1 {
          0% { transform: translate(70px, 70px) rotate(0deg); }
          50% { transform: translate(70px, 62px) rotate(1deg); }
          100% { transform: translate(70px, 70px) rotate(0deg); }
        }
        @keyframes floatPill2 {
          0% { transform: translate(310px, 80px) rotate(0deg); }
          50% { transform: translate(310px, 74px) rotate(-1deg); }
          100% { transform: translate(310px, 80px) rotate(0deg); }
        }
        @keyframes floatPill3 {
          0% { transform: translate(80px, 320px) rotate(0deg); }
          50% { transform: translate(80px, 312px) rotate(-0.5deg); }
          100% { transform: translate(80px, 320px) rotate(0deg); }
        }
        @keyframes floatPill4 {
          0% { transform: translate(310px, 310px) rotate(0deg); }
          50% { transform: translate(310px, 302px) rotate(0.8deg); }
          100% { transform: translate(310px, 310px) rotate(0deg); }
        }
        @keyframes pulsePathway {
          0% { stroke-dashoffset: 0; opacity: 0.3; }
          50% { opacity: 0.9; }
          100% { stroke-dashoffset: -40; opacity: 0.3; }
        }
        @keyframes centerPulse {
          0% { transform: scale(1); filter: drop-shadow(0 4px 12px rgba(0,0,0,0.06)); }
          50% { transform: scale(1.08); filter: drop-shadow(0 12px 28px rgba(141,184,255,0.35)); }
          100% { transform: scale(1); filter: drop-shadow(0 4px 12px rgba(0,0,0,0.06)); }
        }
        .center-orb {
          animation: centerPulse 4s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .pill-1 { animation: floatPill1 5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .pill-2 { animation: floatPill2 6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .pill-3 { animation: floatPill3 5.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .pill-4 { animation: floatPill4 6.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .pathway {
          stroke-dasharray: 10 12;
          animation: pulsePathway 3s linear infinite;
        }
      `}</style>

      <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[380px]">
        <defs>
          <filter id="shadowFilter2" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.05" />
          </filter>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8DB8FF" />
            <stop offset="100%" stop-color="#4B89FF" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8DFFB3" />
            <stop offset="100%" stop-color="#369762" />
          </linearGradient>
        </defs>

        {/* Dynamic Neural pathway curves */}
        {/* Path to Pill 1 */}
        <path d="M 200 200 Q 130 130, 70 88" stroke="url(#gradient1)" strokeWidth="3" className="pathway" strokeLinecap="round" />
        {/* Path to Pill 2 */}
        <path d="M 200 200 Q 260 130, 310 98" stroke="url(#gradient2)" strokeWidth="3" className="pathway" strokeLinecap="round" />
        {/* Path to Pill 3 */}
        <path d="M 200 200 Q 130 260, 80 302" stroke="url(#gradient1)" strokeWidth="3" className="pathway" strokeLinecap="round" />
        {/* Path to Pill 4 */}
        <path d="M 200 200 Q 270 260, 310 292" stroke="#BFE7A9" strokeWidth="3" className="pathway" strokeLinecap="round" />

        {/* Connection anchor indicators */}
        <circle cx="70" cy="88" r="4" fill="#8DB8FF" />
        <circle cx="310" cy="98" r="4" fill="#8DFFB3" />
        <circle cx="80" cy="302" r="4" fill="#8DB8FF" />
        <circle cx="310" cy="292" r="4" fill="#BFE7A9" />

        {/* Center Orb containing Webild Logo */}
        <g className="center-orb">
          <circle cx="200" cy="200" r="40" fill="white" stroke="#E6E6E6" strokeWidth="2.5" filter="url(#shadowFilter2)" />
          <image href="/logoicon.png" x="176" y="176" width="48" height="48" />
          {/* Concentric rings */}
          <circle cx="200" cy="200" r="48" stroke="#8DB8FF" strokeWidth="1.5" strokeDasharray="3 6" opacity="0.5" />
        </g>

        {/* Floating Interest Pills (Rendered as SVG Groups for clean rendering) */}
        {/* Pill 1 */}
        <g className="pill-1" filter="url(#shadowFilter2)">
          <rect x="-70" y="-18" width="140" height="36" rx="18" fill="white" stroke="#E6E6E6" strokeWidth="1.5" />
          <circle cx="-50" cy="0" r="6" fill="#E45A5A" opacity="0.8" />
          <text x="-36" y="4" fill="#2A2A2F" fontSize="11" fontFamily="sans-serif" fontWeight="600">Product Design</text>
        </g>

        {/* Pill 2 */}
        <g className="pill-2" filter="url(#shadowFilter2)">
          <rect x="-70" y="-18" width="140" height="36" rx="18" fill="white" stroke="#E6E6E6" strokeWidth="1.5" />
          <circle cx="-50" cy="0" r="6" fill="#8DFFB3" />
          <text x="-36" y="4" fill="#2A2A2F" fontSize="11" fontFamily="sans-serif" fontWeight="600">AI Development</text>
        </g>

        {/* Pill 3 */}
        <g className="pill-3" filter="url(#shadowFilter2)">
          <rect x="-70" y="-18" width="140" height="36" rx="18" fill="white" stroke="#E6E6E6" strokeWidth="1.5" />
          <circle cx="-50" cy="0" r="6" fill="#8DB8FF" />
          <text x="-36" y="4" fill="#2A2A2F" fontSize="11" fontFamily="sans-serif" fontWeight="600">Creative Writing</text>
        </g>

        {/* Pill 4 */}
        <g className="pill-4" filter="url(#shadowFilter2)">
          <rect x="-70" y="-18" width="140" height="36" rx="18" fill="white" stroke="#E6E6E6" strokeWidth="1.5" />
          <circle cx="-50" cy="0" r="6" fill="#BFE7A9" />
          <text x="-36" y="4" fill="#2A2A2F" fontSize="11" fontFamily="sans-serif" fontWeight="600">Startup Growth</text>
        </g>
      </svg>

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
        @keyframes bentoSnap {
          0% { transform: scale(0.92) translate(var(--x-off), var(--y-off)); opacity: 0; }
          75% { transform: scale(1.04) translate(0, 0); opacity: 0.95; }
          100% { transform: scale(1) translate(0, 0); opacity: 1; }
        }
        @keyframes bentoPulse {
          0% { border-color: rgba(230, 230, 230, 0.8); }
          50% { border-color: rgba(141, 184, 255, 0.5); }
          100% { border-color: rgba(230, 230, 230, 0.8); }
        }
        @keyframes scanGuide {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -40; }
        }
        .anim-bento-container {
          animation: bentoPulse 3s ease-in-out infinite;
        }
        .bento-card-1 {
          --x-off: -40px; --y-off: -40px;
          animation: bentoSnap 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards 0.1s;
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }
        .bento-card-2 {
          --x-off: 40px; --y-off: -30px;
          animation: bentoSnap 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards 0.3s;
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }
        .bento-card-3 {
          --x-off: -30px; --y-off: 40px;
          animation: bentoSnap 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards 0.5s;
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }
        .bento-card-4 {
          --x-off: 40px; --y-off: 40px;
          animation: bentoSnap 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards 0.7s;
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }
        .laser-line {
          stroke-dasharray: 4 4;
          animation: scanGuide 2s linear infinite;
        }
      `}</style>

      <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[380px]">
        <defs>
          <filter id="shadowFilter3" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.04" />
          </filter>
        </defs>

        {/* Dashed outer canvas workspace bounds */}
        <rect x="50" y="50" width="300" height="300" rx="28" fill="rgba(250, 250, 250, 0.4)" stroke="#E6E6E6" strokeWidth="2.5" strokeDasharray="6 6" className="anim-bento-container" />

        {/* Alignment coordinate lasers */}
        <line x1="200" y1="30" x2="200" y2="370" stroke="#8DB8FF" strokeWidth="1.5" opacity="0.4" className="laser-line" />
        <line x1="30" y1="200" x2="370" y2="200" stroke="#8DB8FF" strokeWidth="1.5" opacity="0.4" className="laser-line" />

        {/* Bento Cell 1: Webild Anchor */}
        <g className="bento-card-1" filter="url(#shadowFilter3)">
          <rect x="65" y="65" width="130" height="130" rx="20" fill="#2A2A2F" stroke="#171717" strokeWidth="2" />
          <image href="/logoicon.png" x="100" y="90" width="60" height="60" />
          <text x="130" y="172" fill="#E6E6E6" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.5">ANCHOR</text>
        </g>

        {/* Bento Cell 2: React Node */}
        <g className="bento-card-2" filter="url(#shadowFilter3)">
          <rect x="205" y="65" width="130" height="130" rx="20" fill="white" stroke="#E6E6E6" strokeWidth="1.5" />
          {/* React mock icon */}
          <circle cx="270" cy="115" r="18" fill="#8DB8FF" opacity="0.1" />
          <ellipse cx="270" cy="115" rx="18" ry="6" stroke="#8DB8FF" strokeWidth="1.5" transform="rotate(30, 270, 115)" />
          <ellipse cx="270" cy="115" rx="18" ry="6" stroke="#8DB8FF" strokeWidth="1.5" transform="rotate(90, 270, 115)" />
          <ellipse cx="270" cy="115" rx="18" ry="6" stroke="#8DB8FF" strokeWidth="1.5" transform="rotate(150, 270, 115)" />
          <circle cx="270" cy="115" r="3" fill="#8DB8FF" />
          
          <text x="270" y="165" fill="#2A2A2F" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">React</text>
        </g>

        {/* Bento Cell 3: Tailwind */}
        <g className="bento-card-3" filter="url(#shadowFilter3)">
          <rect x="65" y="205" width="130" height="130" rx="20" fill="white" stroke="#E6E6E6" strokeWidth="1.5" />
          {/* Tailwind mock wave shape */}
          <circle cx="130" cy="255" r="18" fill="#8DFFB3" opacity="0.1" />
          <path d="M 120 255 Q 130 240, 140 255 Q 130 270, 120 255 Z" stroke="#369762" strokeWidth="2" fill="none" />
          <path d="M 122 255 Q 130 246, 138 255" stroke="#369762" strokeWidth="1.5" fill="none" />
          
          <text x="130" y="305" fill="#2A2A2F" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Tailwind</text>
        </g>

        {/* Bento Cell 4: TypeScript */}
        <g className="bento-card-4" filter="url(#shadowFilter3)">
          <rect x="205" y="205" width="130" height="130" rx="20" fill="white" stroke="#E6E6E6" strokeWidth="1.5" />
          {/* TypeScript logo mock */}
          <rect x="252" y="97" width="36" height="36" rx="6" fill="#8DB8FF" opacity="0.1" transform="translate(0, 140)" />
          <text x="270" y="260" fill="#2A2A2F" fontSize="18" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">TS</text>
          
          <text x="270" y="305" fill="#2A2A2F" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">TypeScript</text>
        </g>
      </svg>

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
        @keyframes drawTimelineAxis {
          0% { stroke-dashoffset: 400; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes scaleTimelineNode {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideCardL {
          0% { transform: translateX(-15px) scale(0.96); opacity: 0; }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes slideCardR {
          0% { transform: translateX(15px) scale(0.96); opacity: 0; }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes particleFlow {
          0% { transform: translate(200px, 80px); opacity: 0; }
          15% { opacity: 1; }
          50% { transform: translate(200px, 190px); }
          75% { transform: translate(110px, 205px); opacity: 1; }
          90% { opacity: 0; }
          100% { transform: translate(70px, 205px); opacity: 0; }
        }
        .axis-trunk {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: drawTimelineAxis 2.5s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }
        .anim-node-exp1 { animation: scaleTimelineNode 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 0.4s; opacity: 0; transform-origin: 200px 190px; }
        .anim-node-exp2 { animation: scaleTimelineNode 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 1.2s; opacity: 0; transform-origin: 200px 290px; }
        .exp-card-l { animation: slideCardL 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards 0.6s; opacity: 0; transform-origin: right center; }
        .exp-card-r { animation: slideCardR 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards 1.4s; opacity: 0; transform-origin: left center; }
        .particle-beam { animation: particleFlow 4s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      `}</style>

      <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[380px]">
        <defs>
          <filter id="shadowFilter4" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.04" />
          </filter>
        </defs>

        {/* Central timeline trunk */}
        <line x1="200" y1="80" x2="200" y2="350" stroke="#E6E6E6" strokeWidth="4" strokeLinecap="round" className="axis-trunk" />
        <path d="M 200 80 L 200 350" stroke="#8DB8FF" strokeWidth="4" strokeLinecap="round" className="axis-trunk" opacity="0.6" />

        {/* Top Anchor Node: Webild Logo */}
        <g>
          <circle cx="200" cy="55" r="24" fill="white" stroke="#E6E6E6" strokeWidth="2.5" filter="url(#shadowFilter4)" />
          <image href="/logoicon.png" x="184" y="39" width="32" height="32" />
        </g>

        {/* Mid-1: Node (Left attachment) */}
        <g className="anim-node-exp1">
          {/* Curved Connection branch to left card */}
          <path d="M 200 190 Q 150 190, 110 205" stroke="#8DB8FF" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="200" cy="190" r="8" fill="white" stroke="#8DB8FF" strokeWidth="3" />
        </g>

        {/* Left Side Card */}
        <g className="exp-card-l" transform="translate(20, 150)" filter="url(#shadowFilter4)">
          <rect width="130" height="80" rx="14" fill="white" stroke="#E6E6E6" strokeWidth="1.5" />
          <rect x="12" y="12" width="60" height="7" rx="3.5" fill="#E6E6E6" />
          <text x="12" y="38" fill="#2A2A2F" fontSize="12" fontWeight="bold" fontFamily="sans-serif">Freelancer</text>
          <text x="12" y="54" fill="#A3A3A3" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Product Dev</text>
          <text x="12" y="68" fill="#8DB8FF" fontSize="9" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.5">2022 - 2024</text>
        </g>

        {/* Mid-2: Node (Right attachment) */}
        <g className="anim-node-exp2">
          {/* Curved Connection branch to right card */}
          <path d="M 200 290 Q 250 290, 290 305" stroke="#8DFFB3" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="200" cy="290" r="8" fill="white" stroke="#8DFFB3" strokeWidth="3" />
        </g>

        {/* Right Side Card */}
        <g className="exp-card-r" transform="translate(250, 250)" filter="url(#shadowFilter4)">
          <rect width="130" height="80" rx="14" fill="white" stroke="#E6E6E6" strokeWidth="1.5" />
          <rect x="12" y="12" width="70" height="7" rx="3.5" fill="#E6E6E6" />
          <text x="12" y="38" fill="#2A2A2F" fontSize="12" fontWeight="bold" fontFamily="sans-serif">Senior Engineer</text>
          <text x="12" y="54" fill="#A3A3A3" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Webild Cloud</text>
          <text x="12" y="68" fill="#369762" fontSize="9" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.5">2024 - PRESENT</text>
        </g>

        {/* Flowing energy particles down timeline */}
        <circle r="4" fill="#8DB8FF" className="particle-beam" filter="url(#shadowFilter4)" />
      </svg>

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
        @keyframes meshSpin1 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes meshSpin2 {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes meshBreathe {
          0% { transform: scale(0.96); opacity: 0.35; }
          50% { transform: scale(1.04); opacity: 0.7; }
          100% { transform: scale(0.96); opacity: 0.35; }
        }
        @keyframes AIlogoPulse {
          0% { transform: scale(1); filter: drop-shadow(0 4px 12px rgba(0,0,0,0.06)); }
          50% { transform: scale(1.08); filter: drop-shadow(0 12px 28px rgba(141,184,255,0.45)); }
          100% { transform: scale(1); filter: drop-shadow(0 4px 12px rgba(0,0,0,0.06)); }
        }
        .spin-mesh-inner {
          animation: meshSpin1 16s linear infinite;
          transform-origin: 200px 200px;
        }
        .spin-mesh-outer {
          animation: meshSpin2 24s linear infinite;
          transform-origin: 200px 200px;
        }
        .breath-mesh {
          animation: meshBreathe 4s ease-in-out infinite;
          transform-origin: 200px 200px;
        }
        .pulse-logo-glow {
          animation: AIlogoPulse 3s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
      `}</style>

      <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[380px]">
        <defs>
          <filter id="shadowFilter5" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.06" />
          </filter>
          <radialGradient id="meshRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#8DB8FF" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#8DB8FF" stop-opacity="0" />
          </radialGradient>
        </defs>

        {/* Background glow radial circle */}
        <circle cx="200" cy="200" r="150" fill="url(#meshRadial)" />

        {/* Generative mesh outer system */}
        <g className="spin-mesh-outer">
          <circle cx="200" cy="200" r="130" stroke="#E6E6E6" strokeWidth="2" strokeDasharray="8 16" />
          {/* Constellation anchor points */}
          <circle cx="200" cy="70" r="5" fill="#8DFFB3" />
          <circle cx="200" cy="330" r="5" fill="#8DB8FF" />
          <circle cx="70" cy="200" r="5" fill="#BFE7A9" />
          <circle cx="330" cy="200" r="5" fill="#8DFFB3" />
        </g>

        {/* Generative mesh inner system */}
        <g className="spin-mesh-inner">
          <circle cx="200" cy="200" r="95" stroke="#8DB8FF" strokeWidth="1.5" strokeDasharray="16 8" opacity="0.7" />
          {/* Core connection lines */}
          <line x1="200" y1="200" x2="267" y2="133" stroke="#8DB8FF" strokeWidth="1.5" opacity="0.6" />
          <line x1="200" y1="200" x2="133" y2="267" stroke="#8DB8FF" strokeWidth="1.5" opacity="0.6" />
          <circle cx="267" cy="133" r="4" fill="#8DB8FF" />
          <circle cx="133" cy="267" r="4" fill="#8DB8FF" />
        </g>

        {/* Breathing mesh helper */}
        <circle cx="200" cy="200" r="65" stroke="#8DFFB3" strokeWidth="3.5" opacity="0.6" className="breath-mesh" />

        {/* Central AI Brand Node */}
        <g className="pulse-logo-glow">
          <circle cx="200" cy="200" r="38" fill="white" stroke="#E6E6E6" strokeWidth="2.5" filter="url(#shadowFilter5)" />
          <image href="/logoicon.png" x="178" y="178" width="44" height="44" />
        </g>
      </svg>

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
