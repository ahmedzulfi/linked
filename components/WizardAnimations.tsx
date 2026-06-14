"use client";

import React from "react";
import { Sparkles, Briefcase, Code, Heart, Layers } from "lucide-react";

interface WizardAnimationsProps {
  step: number;
  profile?: any;
  projects?: { title: string; description: string; link?: string }[];
  interests?: string;
  skills?: { name: string }[];
  experience?: {
    title: string;
    company: string;
    duration: string;
    description: string;
  }[];
}

// ─── Welcome / Kickoff Animation (Step 1) ──────────────────────────────────────
export function WelcomeAnimation({ profile }: { profile?: any }) {
  const name = profile?.name || "Your Name";
  const headline = profile?.headline || "Professional Headline";
  const avatarUrl = profile?.avatarUrl || "https://i.pravatar.cc/80?img=47";

  return (
    <div className="w-full max-w-[480px] aspect-square flex flex-col items-center justify-center relative">
      <style>{`
        @keyframes cardFloat {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(0.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes welcomePulse {
          0% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.2; }
          100% { transform: scale(1); opacity: 0.1; }
        }
        .welcome-float {
          animation: cardFloat 6s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .welcome-pulse {
          animation: welcomePulse 4s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
      `}</style>

      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[380px] welcome-float"
      >
        <defs>
          <filter
            id="shadowWelcome"
            x="-15%"
            y="-15%"
            width="130%"
            height="130%"
          >
            <feDropShadow
              dx="0"
              dy="8"
              stdDeviation="12"
              floodColor="#000000"
              floodOpacity="0.08"
            />
          </filter>
          <clipPath id="circleAvatar">
            <circle cx="200" cy="140" r="36" />
          </clipPath>
          <linearGradient id="welcomeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8DB8FF" />
            <stop offset="100%" stop-color="#DCEAFF" />
          </linearGradient>
        </defs>

        {/* Pulse Ring in background */}
        <circle
          cx="200"
          cy="140"
          r="54"
          fill="url(#welcomeGrad)"
          className="welcome-pulse"
        />

        {/* Main Welcome Card */}
        <rect
          x="40"
          y="60"
          width="320"
          height="260"
          rx="24"
          fill="white"
          stroke="#E6E6E6"
          strokeWidth="2"
          filter="url(#shadowWelcome)"
        />

        {/* Avatar Container */}
        <circle
          cx="200"
          cy="140"
          r="38"
          fill="white"
          stroke="#E6E6E6"
          strokeWidth="1.5"
        />
        <image
          href={avatarUrl}
          x="164"
          y="104"
          width="72"
          height="72"
          clipPath="url(#circleAvatar)"
        />

        {/* Profile Details */}
        <text
          x="200"
          y="210"
          fill="#2A2A2F"
          fontSize="16"
          fontWeight="bold"
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          {name}
        </text>

        <text
          x="200"
          y="232"
          fill="#888888"
          fontSize="11"
          fontWeight="600"
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          {headline.length > 42 ? headline.slice(0, 42) + "..." : headline}
        </text>

        {/* Divider */}
        <line
          x1="70"
          y1="255"
          x2="330"
          y2="255"
          stroke="#F0F0F0"
          strokeWidth="1.5"
        />

        {/* Action Badge */}
        <rect x="90" y="270" width="220" height="32" rx="10" fill="#2A2A2F" />
        <text
          x="200"
          y="290"
          fill="white"
          fontSize="10"
          fontWeight="bold"
          fontFamily="sans-serif"
          textAnchor="middle"
          letterSpacing="0.8"
        >
          PORTFOLIO INITIALIZED ✨
        </text>
      </svg>

      <div className="absolute bottom-1.5 flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono tracking-wide animate-pulse">
        Ready to customize
      </div>
    </div>
  );
}

// ─── Projects Animation (Step 2) ────────────────────────────────────────────────
export function ProjectsAnimation({
  projects,
}: {
  projects?: { title: string; description: string }[];
}) {
  const defaultProjects = [
    {
      title: "Financial Dashboard App",
      description: "Modern Web UI using React & Tailwind",
    },
    {
      title: "SaaS Analytics Platform",
      description: "Node.js and PostgreSQL backend",
    },
    {
      title: "E-Commerce Mobile Client",
      description: "React Native application",
    },
  ];

  const displayProjects =
    projects && projects.length > 0 ? projects.slice(0, 3) : defaultProjects;

  // Backfill up to 3 placeholders if they have deleted projects
  while (displayProjects.length < 3) {
    displayProjects.push({
      title: "Add New Project",
      description: "Customize details in the editor form...",
    });
  }

  return (
    <div className="w-full max-w-[480px] aspect-square flex flex-col items-center justify-center relative">
      <style>{`
        @keyframes browserFloat {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(0.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes blockFloat1 {
          0% { transform: translate(-30px, 30px) scale(0.95); opacity: 0; }
          70% { transform: translate(3px, -2px) scale(1.03); opacity: 0.9; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }
        @keyframes blockFloat2 {
          0% { transform: translate(30px, 40px) scale(0.95); opacity: 0; }
          70% { transform: translate(-3px, -2px) scale(1.03); opacity: 0.9; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }
        @keyframes blockFloat3 {
          0% { transform: translate(0px, 50px) scale(0.95); opacity: 0; }
          70% { transform: translate(0px, -4px) scale(1.03); opacity: 0.9; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }
        @keyframes logoPulse {
          0% { transform: scale(1); opacity: 0.08; }
          50% { transform: scale(1.08); opacity: 0.15; }
          100% { transform: scale(1); opacity: 0.08; }
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
          animation: logoPulse 4s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
      `}</style>

      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[380px] anim-browser"
      >
        <defs>
          <filter
            id="shadowFilter"
            x="-15%"
            y="-15%"
            width="130%"
            height="130%"
          >
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="8"
              floodColor="#000000"
              floodOpacity="0.06"
            />
          </filter>
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
          <pattern
            id="innerGrid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="#EAEAEA" />
          </pattern>
        </defs>

        {/* Browser Window */}
        <rect
          x="20"
          y="30"
          width="360"
          height="320"
          rx="20"
          fill="white"
          stroke="#E6E6E6"
          strokeWidth="2"
          filter="url(#shadowFilter)"
        />

        {/* Controls */}
        <g>
          <circle cx="45" cy="52" r="6" fill="#E45A5A" opacity="0.8" />
          <circle cx="61" cy="52" r="6" fill="#BFE7A9" opacity="0.8" />
          <circle cx="77" cy="52" r="6" fill="#8DB8FF" opacity="0.8" />

          <rect x="110" y="40" width="180" height="24" rx="12" fill="#F3F3F3" />
          <image href="/logoicon.png" x="120" y="44" width="16" height="16" />
          <text
            x="142"
            y="56"
            fill="#888888"
            fontFamily="monospace"
            fontSize="9"
            fontWeight="bold"
          >
            webild.com/projects
          </text>
        </g>

        <line
          x1="20"
          y1="76"
          x2="380"
          y2="76"
          stroke="#E6E6E6"
          strokeWidth="1.5"
        />
        <rect
          x="21"
          y="77"
          width="358"
          height="272"
          fill="url(#innerGrid)"
          rx="19"
        />

        <image
          href="/logoicon.png"
          x="140"
          y="130"
          width="120"
          height="120"
          className="anim-bg-logo"
        />

        {/* Dynamic Project Cards */}
        {displayProjects.map((proj, idx) => {
          const yPos = 100 + idx * 80;
          const animClass = `anim-card-${idx + 1}`;
          const gradColor =
            idx === 0
              ? "url(#blueGrad)"
              : idx === 1
                ? "url(#greenGrad)"
                : "url(#purpleGrad)";
          const initialLetter = proj.title
            ? proj.title.charAt(0).toUpperCase()
            : "P";

          return (
            <g key={idx} className={animClass} filter="url(#shadowFilter)">
              <rect
                x="48"
                y={yPos}
                width="304"
                height="64"
                rx="14"
                fill="white"
                stroke="#E6E6E6"
                strokeWidth="1.5"
              />
              <rect
                x="60"
                y={yPos + 12}
                width="40"
                height="40"
                rx="10"
                fill={gradColor}
              />
              <text
                x="80"
                y={yPos + 37}
                fill="white"
                fontSize="16"
                fontWeight="bold"
                fontFamily="sans-serif"
                textAnchor="middle"
              >
                {initialLetter}
              </text>

              <text
                x="114"
                y={yPos + 28}
                fill="#2A2A2F"
                fontSize="12"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                {proj.title.length > 24
                  ? proj.title.slice(0, 24) + "..."
                  : proj.title}
              </text>
              <text
                x="114"
                y={yPos + 44}
                fill="#A3A3A3"
                fontSize="10"
                fontFamily="sans-serif"
              >
                {proj.description.length > 34
                  ? proj.description.slice(0, 34) + "..."
                  : proj.description}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="absolute bottom-1.5 flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono tracking-wide">
        <Code className="w-4 h-4 text-blue-500" /> Building Projects Grid
      </div>
    </div>
  );
}

// ─── Interests Animation (Step 3) ───────────────────────────────────────────────
export function InterestsAnimation({ interests }: { interests?: string }) {
  const defaultInterests = [
    "Product Design",
    "AI Development",
    "Creative Writing",
    "Startup Growth",
  ];
  const parsed = interests
    ? interests
        .split(/[,;\n]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 2)
    : [];
  const displayInterests =
    parsed.length > 0 ? parsed.slice(0, 4) : defaultInterests;

  while (displayInterests.length < 4) {
    displayInterests.push(
      defaultInterests[displayInterests.length % defaultInterests.length],
    );
  }

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
          0% { transform: scale(1); box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
          50% { transform: scale(1.08); box-shadow: 0 12px 28px rgba(141,184,255,0.35); }
          100% { transform: scale(1); box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
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

      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[380px]"
      >
        <defs>
          <filter
            id="shadowFilter2"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="6"
              floodColor="#000000"
              floodOpacity="0.05"
            />
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

        {/* Neural pathway curves */}
        <path
          d="M 200 200 Q 130 130, 70 88"
          stroke="url(#gradient1)"
          strokeWidth="3"
          className="pathway"
          strokeLinecap="round"
        />
        <path
          d="M 200 200 Q 260 130, 310 98"
          stroke="url(#gradient2)"
          strokeWidth="3"
          className="pathway"
          strokeLinecap="round"
        />
        <path
          d="M 200 200 Q 130 260, 80 302"
          stroke="url(#gradient1)"
          strokeWidth="3"
          className="pathway"
          strokeLinecap="round"
        />
        <path
          d="M 200 200 Q 270 260, 310 292"
          stroke="#BFE7A9"
          strokeWidth="3"
          className="pathway"
          strokeLinecap="round"
        />

        <circle cx="70" cy="88" r="4" fill="#8DB8FF" />
        <circle cx="310" cy="98" r="4" fill="#8DFFB3" />
        <circle cx="80" cy="302" r="4" fill="#8DB8FF" />
        <circle cx="310" cy="292" r="4" fill="#BFE7A9" />

        {/* Center Orb */}
        <g className="center-orb">
          <circle
            cx="200"
            cy="200"
            r="40"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="2.5"
            filter="url(#shadowFilter2)"
          />
          <image href="/logoicon.png" x="176" y="176" width="48" height="48" />
          <circle
            cx="200"
            cy="200"
            r="48"
            stroke="#8DB8FF"
            strokeWidth="1.5"
            strokeDasharray="3 6"
            opacity="0.5"
          />
        </g>

        {/* Dynamic Interest Pills */}
        <g className="pill-1" filter="url(#shadowFilter2)">
          <rect
            x="-70"
            y="-18"
            width="140"
            height="36"
            rx="18"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="1.5"
          />
          <circle cx="-50" cy="0" r="6" fill="#E45A5A" opacity="0.8" />
          <text
            x="-36"
            y="4"
            fill="#2A2A2F"
            fontSize="10"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            {displayInterests[0].length > 16
              ? displayInterests[0].slice(0, 16) + "..."
              : displayInterests[0]}
          </text>
        </g>

        <g className="pill-2" filter="url(#shadowFilter2)">
          <rect
            x="-70"
            y="-18"
            width="140"
            height="36"
            rx="18"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="1.5"
          />
          <circle cx="-50" cy="0" r="6" fill="#8DFFB3" />
          <text
            x="-36"
            y="4"
            fill="#2A2A2F"
            fontSize="10"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            {displayInterests[1].length > 16
              ? displayInterests[1].slice(0, 16) + "..."
              : displayInterests[1]}
          </text>
        </g>

        <g className="pill-3" filter="url(#shadowFilter2)">
          <rect
            x="-70"
            y="-18"
            width="140"
            height="36"
            rx="18"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="1.5"
          />
          <circle cx="-50" cy="0" r="6" fill="#8DB8FF" />
          <text
            x="-36"
            y="4"
            fill="#2A2A2F"
            fontSize="10"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            {displayInterests[2].length > 16
              ? displayInterests[2].slice(0, 16) + "..."
              : displayInterests[2]}
          </text>
        </g>

        <g className="pill-4" filter="url(#shadowFilter2)">
          <rect
            x="-70"
            y="-18"
            width="140"
            height="36"
            rx="18"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="1.5"
          />
          <circle cx="-50" cy="0" r="6" fill="#BFE7A9" />
          <text
            x="-36"
            y="4"
            fill="#2A2A2F"
            fontSize="10"
            fontFamily="sans-serif"
            fontWeight="600"
          >
            {displayInterests[3].length > 16
              ? displayInterests[3].slice(0, 16) + "..."
              : displayInterests[3]}
          </text>
        </g>
      </svg>

      <div className="absolute bottom-1.5 flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono tracking-wide">
        <Heart className="w-4 h-4 text-red-500" /> Mapping Interests
      </div>
    </div>
  );
}

// ─── Skills Animation (Step 4) ──────────────────────────────────────────────────
export function SkillsAnimation({ skills }: { skills?: { name: string }[] }) {
  const defaultSkills = ["React", "Tailwind", "TypeScript", "Next.js"];
  const parsed =
    skills && skills.length > 0 ? skills.map((s) => s.name) : defaultSkills;
  const displaySkills = [...parsed];

  while (displaySkills.length < 3) {
    displaySkills.push(
      defaultSkills[displaySkills.length % defaultSkills.length],
    );
  }

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

      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[380px]"
      >
        <defs>
          <filter
            id="shadowFilter3"
            x="-15%"
            y="-15%"
            width="130%"
            height="130%"
          >
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="6"
              floodColor="#000000"
              floodOpacity="0.04"
            />
          </filter>
        </defs>

        <rect
          x="50"
          y="50"
          width="300"
          height="300"
          rx="28"
          fill="rgba(250, 250, 250, 0.4)"
          stroke="#E6E6E6"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          className="anim-bento-container"
        />

        <line
          x1="200"
          y1="30"
          x2="200"
          y2="370"
          stroke="#8DB8FF"
          strokeWidth="1.5"
          opacity="0.4"
          className="laser-line"
        />
        <line
          x1="30"
          y1="200"
          x2="370"
          y2="200"
          stroke="#8DB8FF"
          strokeWidth="1.5"
          opacity="0.4"
          className="laser-line"
        />

        {/* Bento Cell 1: Webild Anchor */}
        <g className="bento-card-1" filter="url(#shadowFilter3)">
          <rect
            x="65"
            y="65"
            width="130"
            height="130"
            rx="20"
            fill="#2A2A2F"
            stroke="#171717"
            strokeWidth="2"
          />
          <image href="/logoicon.png" x="100" y="90" width="60" height="60" />
          <text
            x="130"
            y="172"
            fill="#E6E6E6"
            fontSize="11"
            fontWeight="bold"
            fontFamily="sans-serif"
            textAnchor="middle"
            letterSpacing="0.5"
          >
            ANCHOR
          </text>
        </g>

        {/* Bento Cell 2: Skill Node 1 */}
        <g className="bento-card-2" filter="url(#shadowFilter3)">
          <rect
            x="205"
            y="65"
            width="130"
            height="130"
            rx="20"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="1.5"
          />
          <circle cx="270" cy="115" r="18" fill="#8DB8FF" opacity="0.1" />
          <circle cx="270" cy="115" r="5" fill="#8DB8FF" />
          <ellipse
            cx="270"
            cy="115"
            rx="16"
            ry="6"
            stroke="#8DB8FF"
            strokeWidth="1.5"
            transform="rotate(30, 270, 115)"
          />
          <ellipse
            cx="270"
            cy="115"
            rx="16"
            ry="6"
            stroke="#8DB8FF"
            strokeWidth="1.5"
            transform="rotate(150, 270, 115)"
          />

          <text
            x="270"
            y="165"
            fill="#2A2A2F"
            fontSize="11"
            fontWeight="bold"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            {displaySkills[0].length > 14
              ? displaySkills[0].slice(0, 14) + "..."
              : displaySkills[0]}
          </text>
        </g>

        {/* Bento Cell 3: Skill Node 2 */}
        <g className="bento-card-3" filter="url(#shadowFilter3)">
          <rect
            x="65"
            y="205"
            width="130"
            height="130"
            rx="20"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="1.5"
          />
          <circle cx="130" cy="255" r="18" fill="#8DFFB3" opacity="0.1" />
          <path
            d="M 120 255 Q 130 240, 140 255 Q 130 270, 120 255 Z"
            stroke="#369762"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="130" cy="255" r="4" fill="#369762" />

          <text
            x="130"
            y="305"
            fill="#2A2A2F"
            fontSize="11"
            fontWeight="bold"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            {displaySkills[1].length > 14
              ? displaySkills[1].slice(0, 14) + "..."
              : displaySkills[1]}
          </text>
        </g>

        {/* Bento Cell 4: Skill Node 3 */}
        <g className="bento-card-4" filter="url(#shadowFilter3)">
          <rect
            x="205"
            y="205"
            width="130"
            height="130"
            rx="20"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="1.5"
          />
          <rect
            x="252"
            y="235"
            width="36"
            height="36"
            rx="6"
            fill="#8DB8FF"
            opacity="0.1"
          />
          <text
            x="270"
            y="260"
            fill="#2A2A2F"
            fontSize="16"
            fontWeight="950"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            TS
          </text>

          <text
            x="270"
            y="305"
            fill="#2A2A2F"
            fontSize="11"
            fontWeight="bold"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            {displaySkills[2].length > 14
              ? displaySkills[2].slice(0, 14) + "..."
              : displaySkills[2]}
          </text>
        </g>
      </svg>

      <div className="absolute bottom-1.5 flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono tracking-wide">
        <Layers className="w-4 h-4 text-indigo-500" /> Stacking Skills Chips
      </div>
    </div>
  );
}

// ─── Experience Animation (Step 5) ──────────────────────────────────────────────
export function ExperienceAnimation({
  experience,
}: {
  experience?: { title: string; company: string; duration: string }[];
}) {
  const defaultExp = [
    { title: "Freelancer", company: "Product Dev", duration: "2022 - 2024" },
    {
      title: "Senior Engineer",
      company: "Webild Cloud",
      duration: "2024 - PRESENT",
    },
  ];

  const displayExp =
    experience && experience.length > 0 ? experience.slice(0, 2) : defaultExp;

  // Stagger left and right cards
  const leftCard = displayExp.length === 2 ? displayExp[0] : defaultExp[0];
  const rightCard =
    displayExp.length === 2
      ? displayExp[1]
      : displayExp.length === 1
        ? displayExp[0]
        : defaultExp[1];

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

      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[380px]"
      >
        <defs>
          <filter
            id="shadowFilter4"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="6"
              floodColor="#000000"
              floodOpacity="0.04"
            />
          </filter>
        </defs>

        <line
          x1="200"
          y1="80"
          x2="200"
          y2="350"
          stroke="#E6E6E6"
          strokeWidth="4"
          strokeLinecap="round"
          className="axis-trunk"
        />
        <path
          d="M 200 80 L 200 350"
          stroke="#8DB8FF"
          strokeWidth="4"
          strokeLinecap="round"
          className="axis-trunk"
          opacity="0.6"
        />

        {/* Top Node */}
        <g>
          <circle
            cx="200"
            cy="55"
            r="24"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="2.5"
            filter="url(#shadowFilter4)"
          />
          <image href="/logoicon.png" x="184" y="39" width="32" height="32" />
        </g>

        {/* Node 1 */}
        <g className="anim-node-exp1">
          <path
            d="M 200 190 Q 150 190, 110 205"
            stroke="#8DB8FF"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle
            cx="200"
            cy="190"
            r="8"
            fill="white"
            stroke="#8DB8FF"
            strokeWidth="3"
          />
        </g>

        {/* Left Card */}
        <g
          className="exp-card-l"
          transform="translate(20, 150)"
          filter="url(#shadowFilter4)"
        >
          <rect
            width="130"
            height="80"
            rx="14"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="1.5"
          />
          <text
            x="12"
            y="24"
            fill="#A3A3A3"
            fontSize="8"
            fontWeight="bold"
            fontFamily="monospace"
          >
            {leftCard.company.length > 20
              ? leftCard.company.slice(0, 20) + "..."
              : leftCard.company}
          </text>
          <text
            x="12"
            y="44"
            fill="#2A2A2F"
            fontSize="11"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            {leftCard.title.length > 18
              ? leftCard.title.slice(0, 18) + "..."
              : leftCard.title}
          </text>
          <text
            x="12"
            y="66"
            fill="#8DB8FF"
            fontSize="9"
            fontWeight="900"
            fontFamily="sans-serif"
            letterSpacing="0.5"
          >
            {leftCard.duration}
          </text>
        </g>

        {/* Node 2 */}
        <g className="anim-node-exp2">
          <path
            d="M 200 290 Q 250 290, 290 305"
            stroke="#8DFFB3"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle
            cx="200"
            cy="290"
            r="8"
            fill="white"
            stroke="#8DFFB3"
            strokeWidth="3"
          />
        </g>

        {/* Right Card */}
        <g
          className="exp-card-r"
          transform="translate(250, 250)"
          filter="url(#shadowFilter4)"
        >
          <rect
            width="130"
            height="80"
            rx="14"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="1.5"
          />
          <text
            x="12"
            y="24"
            fill="#A3A3A3"
            fontSize="8"
            fontWeight="bold"
            fontFamily="monospace"
          >
            {rightCard.company.length > 20
              ? rightCard.company.slice(0, 20) + "..."
              : rightCard.company}
          </text>
          <text
            x="12"
            y="44"
            fill="#2A2A2F"
            fontSize="11"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            {rightCard.title.length > 18
              ? rightCard.title.slice(0, 18) + "..."
              : rightCard.title}
          </text>
          <text
            x="12"
            y="66"
            fill="#369762"
            fontSize="9"
            fontWeight="900"
            fontFamily="sans-serif"
            letterSpacing="0.5"
          >
            {rightCard.duration}
          </text>
        </g>

        <circle
          r="4"
          fill="#8DB8FF"
          className="particle-beam"
          filter="url(#shadowFilter4)"
        />
      </svg>

      <div className="absolute bottom-1.5 flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono tracking-wide">
        <Briefcase className="w-4 h-4 text-amber-500" /> Drawing Timeline
      </div>
    </div>
  );
}

// ─── Generating Mesh Animation (Step 6 / Others) ──────────────────────────────
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

      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[380px]"
      >
        <defs>
          <filter
            id="shadowFilter5"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="0"
              dy="8"
              stdDeviation="10"
              floodColor="#000000"
              floodOpacity="0.06"
            />
          </filter>
          <radialGradient id="meshRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#8DB8FF" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#8DB8FF" stop-opacity="0" />
          </radialGradient>
        </defs>

        <circle cx="200" cy="200" r="150" fill="url(#meshRadial)" />

        <g className="spin-mesh-outer">
          <circle
            cx="200"
            cy="200"
            r="130"
            stroke="#E6E6E6"
            strokeWidth="2"
            strokeDasharray="8 16"
          />
          <circle cx="200" cy="70" r="5" fill="#8DFFB3" />
          <circle cx="200" cy="330" r="5" fill="#8DB8FF" />
          <circle cx="70" cy="200" r="5" fill="#BFE7A9" />
          <circle cx="330" cy="200" r="5" fill="#8DFFB3" />
        </g>

        <g className="spin-mesh-inner">
          <circle
            cx="200"
            cy="200"
            r="95"
            stroke="#8DB8FF"
            strokeWidth="1.5"
            strokeDasharray="16 8"
            opacity="0.7"
          />
          <line
            x1="200"
            y1="200"
            x2="267"
            y2="133"
            stroke="#8DB8FF"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <line
            x1="200"
            y1="200"
            x2="133"
            y2="267"
            stroke="#8DB8FF"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <circle cx="267" cy="133" r="4" fill="#8DB8FF" />
          <circle cx="133" cy="267" r="4" fill="#8DB8FF" />
        </g>

        <circle
          cx="200"
          cy="200"
          r="65"
          stroke="#8DFFB3"
          strokeWidth="3.5"
          opacity="0.6"
          className="breath-mesh"
        />

        <g className="pulse-logo-glow">
          <circle
            cx="200"
            cy="200"
            r="38"
            fill="white"
            stroke="#E6E6E6"
            strokeWidth="2.5"
            filter="url(#shadowFilter5)"
          />
          <image href="/logoicon.png" x="178" y="178" width="44" height="44" />
        </g>
      </svg>

      <div className="absolute bottom-1.5 flex items-center gap-2 text-xs font-semibold text-neutral-500 font-mono tracking-wide">
        <Sparkles
          className="w-4 h-4 text-amber-500 animate-spin"
          style={{ animationDuration: "4s" }}
        />{" "}
        AI Refinement
      </div>
    </div>
  );
}

// ─── Main Animation Dispatcher ────────────────────────────────────────────────
export default function WizardAnimations({
  step,
  profile,
  projects,
  interests,
  skills,
  experience,
}: WizardAnimationsProps) {
  if (step === 1) return <WelcomeAnimation profile={profile} />;
  if (step === 5) return <ExperienceAnimation experience={experience} />;
  if (step === 6) return <ProjectsAnimation projects={projects} />;
  return <GeneratingAnimation />;
}
