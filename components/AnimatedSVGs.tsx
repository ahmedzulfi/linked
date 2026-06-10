"use client";

import React from "react";

export function AnimatedUploadIllustration() {
  return (
    <div className="w-full max-w-[200px] h-[120px] mx-auto select-none pointer-events-none mb-3">
      <svg
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Subtle glow filter */}
          <filter id="glow-svg" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Gradients */}
          <linearGradient id="folderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8DB8FF" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>

          <linearGradient id="browserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9FAFB" />
            <stop offset="100%" stopColor="#EEF2F6" />
          </linearGradient>

          <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8DFFB3" />
            <stop offset="100%" stopColor="#369762" />
          </linearGradient>
        </defs>

        <style>{`
          /* Keyframes */
          @keyframes floatZip {
            0% {
              transform: translateY(0px) rotate(-3deg);
            }
            50% {
              transform: translateY(-8px) rotate(1deg);
            }
            100% {
              transform: translateY(0px) rotate(-3deg);
            }
          }

          @keyframes pulseBrowser {
            0%, 100% {
              opacity: 0.85;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.015);
            }
          }

          @keyframes drawRay {
            0% {
              stroke-dashoffset: 16;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }

          @keyframes floatParticle {
            0%, 100% {
              transform: translate(0, 0);
              opacity: 0.3;
            }
            50% {
              transform: translate(3px, -5px);
              opacity: 0.8;
            }
          }

          /* Class bindings (Safari-compatible with fill-box/transform-origin) */
          .svg-zip-card {
            transform-box: fill-box;
            transform-origin: center center;
            animation: floatZip 3.5s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
          }

          .svg-browser-card {
            transform-box: fill-box;
            transform-origin: center bottom;
            animation: pulseBrowser 4s ease-in-out infinite;
          }

          .svg-connector-ray {
            stroke-dasharray: 8 8;
            animation: drawRay 1.2s linear infinite;
          }

          .svg-p1 {
            transform-box: fill-box;
            transform-origin: center;
            animation: floatParticle 2.8s ease-in-out infinite;
          }

          .svg-p2 {
            transform-box: fill-box;
            transform-origin: center;
            animation: floatParticle 3.4s ease-in-out infinite -1s;
          }
        `}</style>

        {/* 1. Browser Base (Dropzone target background) */}
        <g className="svg-browser-card">
          {/* Main Card */}
          <rect
            x="30"
            y="45"
            width="140"
            height="70"
            rx="12"
            fill="url(#browserGrad)"
            stroke="#E6E6E6"
            strokeWidth="1.5"
          />
          {/* Top Bar Decoration */}
          <line
            x1="30"
            y1="58"
            x2="170"
            y2="58"
            stroke="#E6E6E6"
            strokeWidth="1.2"
          />
          {/* Browser Dots */}
          <circle cx="40" cy="51" r="2.5" fill="#E45A5A" />
          <circle cx="48" cy="51" r="2.5" fill="#E9C46A" />
          <circle cx="56" cy="51" r="2.5" fill="#369762" />

          {/* Fake Grid Layout Elements inside Browser */}
          <rect
            x="40"
            y="66"
            width="35"
            height="12"
            rx="3"
            fill="#E6E6E6"
            opacity="0.6"
          />
          <rect
            x="80"
            y="66"
            width="80"
            height="12"
            rx="3"
            fill="#E6E6E6"
            opacity="0.6"
          />
          <rect
            x="40"
            y="84"
            width="120"
            height="20"
            rx="4"
            fill="url(#accentGrad)"
            opacity="0.15"
          />
          <rect
            x="48"
            y="90"
            width="70"
            height="8"
            rx="2"
            fill="url(#accentGrad)"
            opacity="0.6"
          />
        </g>

        {/* 2. Moving Rays/Connectors flowing from top to browser */}
        <path
          d="M 50 15 Q 60 40 85 45"
          stroke="#3b82f6"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="svg-connector-ray"
          opacity="0.3"
        />
        <path
          d="M 150 15 Q 140 40 115 45"
          stroke="#3b82f6"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="svg-connector-ray"
          opacity="0.3"
        />

        {/* 3. Floating Particles */}
        <circle cx="25" cy="40" r="3" fill="#8DB8FF" className="svg-p1" />
        <circle cx="178" cy="65" r="2" fill="#8DFFB3" className="svg-p2" />
        <circle
          cx="165"
          cy="30"
          r="3.5"
          fill="#3b82f6"
          className="svg-p1"
          opacity="0.5"
        />

        {/* 4. The ZIP File Card (Floating/Ingesting) */}
        <g className="svg-zip-card">
          {/* Card Shadow */}
          <rect
            x="76"
            y="12"
            width="48"
            height="48"
            rx="10"
            fill="#171717"
            opacity="0.08"
            filter="url(#glow-svg)"
          />
          {/* Card Body */}
          <rect
            x="74"
            y="10"
            width="48"
            height="48"
            rx="10"
            fill="url(#folderGrad)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          {/* Zip Folder Icon */}
          <path
            d="M 88 22 L 95 22 L 97 25 L 108 25 L 108 38 L 88 38 Z"
            fill="#FFFFFF"
            opacity="0.9"
          />
          {/* Zipper Teeth details */}
          <line
            x1="98"
            y1="27"
            x2="98"
            y2="38"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />

          {/* "ZIP" Tag label text */}
          <rect
            x="88"
            y="32"
            width="20"
            height="8"
            rx="2"
            fill="#1e3a8a"
            opacity="0.3"
          />
          <path
            d="M91 37 L91 34 M93 34 L97 34 M95 34 L95 37 M98 34 L98 37"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

export function AnimatedGeneratingIllustration() {
  return (
    <div className="w-full max-w-[240px] h-[140px] mx-auto select-none pointer-events-none mb-6">
      <svg
        viewBox="0 0 240 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Glowing Filter */}
          <filter id="glow-heavy" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Gradients */}
          <linearGradient
            id="mainBentoGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8DB8FF" />
          </linearGradient>

          <linearGradient id="bentoAccent" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8DFFB3" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#369762" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <style>{`
          /* Animations */
          @keyframes drawStroke {
            0% {
              stroke-dashoffset: 400;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }

          @keyframes popIn {
            0%, 100% {
              transform: scale(0.92);
              opacity: 0.4;
            }
            50% {
              transform: scale(1.02);
              opacity: 1;
            }
          }

          @keyframes spinSlow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes assembleBlock {
            0% {
              transform: translateY(12px) scale(0.9);
              opacity: 0;
            }
            30%, 70% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(-8px) scale(0.95);
              opacity: 0;
            }
          }

          @keyframes pulseCircle {
            0%, 100% {
              r: 12px;
              opacity: 0.15;
            }
            50% {
              r: 20px;
              opacity: 0.35;
            }
          }

          /* Classes */
          .svg-wireframe-lines {
            stroke-dasharray: 400;
            animation: drawStroke 6s linear infinite;
          }

          .svg-node-avatar {
            transform-box: fill-box;
            transform-origin: center center;
            animation: popIn 3s ease-in-out infinite;
          }

          .svg-bento-1 {
            transform-box: fill-box;
            transform-origin: center center;
            animation: assembleBlock 4s cubic-bezier(0.25, 1, 0.5, 1) infinite;
          }

          .svg-bento-2 {
            transform-box: fill-box;
            transform-origin: center center;
            animation: assembleBlock 4s cubic-bezier(0.25, 1, 0.5, 1) infinite -1.33s;
          }

          .svg-bento-3 {
            transform-box: fill-box;
            transform-origin: center center;
            animation: assembleBlock 4s cubic-bezier(0.25, 1, 0.5, 1) infinite -2.66s;
          }

          .svg-pulse-glow {
            transform-box: fill-box;
            transform-origin: center;
            animation: pulseCircle 3s ease-in-out infinite;
          }

          .svg-spinning-gear {
            transform-box: fill-box;
            transform-origin: center;
            animation: spinSlow 12s linear infinite;
          }
        `}</style>

        {/* 1. Network / Connecting Wireframe Lines */}
        <path
          d="M 30,70 L 80,35 L 140,55 L 210,70 L 160,110 L 80,100 Z M 80,35 L 160,110 M 140,55 L 80,100"
          stroke="#E6E6E6"
          strokeWidth="1"
          className="svg-wireframe-lines"
        />

        {/* 2. Glowing pulse behind central Avatar node */}
        <circle
          cx="120"
          cy="70"
          r="16"
          fill="#8DB8FF"
          className="svg-pulse-glow"
        />

        {/* 3. Spinning Gear/Stars Decoration */}
        <g className="svg-spinning-gear">
          {/* Mini star nodes */}
          <path
            d="M 120 40 L 122 45 L 127 45 L 123 48 L 125 53 L 120 50 L 115 53 L 117 48 L 113 45 L 118 45 Z"
            fill="#8DFFB3"
            opacity="0.6"
          />
          <path
            d="M 60 70 L 62 73 L 66 73 L 63 75 L 64 79 L 60 77 L 56 79 L 57 75 L 54 73 L 58 73 Z"
            fill="#3b82f6"
            opacity="0.4"
          />
        </g>

        {/* 4. Assembling Bento Web Blocks */}
        {/* Left Small block */}
        <g className="svg-bento-1">
          <rect
            x="25"
            y="45"
            width="45"
            height="50"
            rx="8"
            fill="url(#bentoAccent)"
            stroke="#8DFFB3"
            strokeWidth="1.2"
          />
          <line
            x1="33"
            y1="57"
            x2="62"
            y2="57"
            stroke="#369762"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="33"
            y1="67"
            x2="52"
            y2="67"
            stroke="#369762"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          <circle cx="35" cy="82" r="3" fill="#369762" />
          <circle cx="45" cy="82" r="3" fill="#369762" />
          <circle cx="55" cy="82" r="3" fill="#369762" />
        </g>

        {/* Center Main block */}
        <g className="svg-bento-2">
          <rect
            x="85"
            y="25"
            width="70"
            height="90"
            rx="10"
            fill="#FFFFFF"
            stroke="#E6E6E6"
            strokeWidth="1.5"
            filter="url(#glow-heavy)"
          />
          {/* Avatar frame */}
          <circle cx="120" cy="55" r="14" fill="#F3F3F3" />
          <path d="M110 74 C110 65, 130 65, 130 74 Z" fill="#E6E6E6" />
          {/* Name & details */}
          <rect x="100" y="78" width="40" height="5" rx="2" fill="#2A2A2F" />
          <rect x="95" y="87" width="50" height="3.5" rx="1.5" fill="#E6E6E6" />
          <rect x="105" y="94" width="30" height="3" rx="1.5" fill="#E6E6E6" />
        </g>

        {/* Right Small block */}
        <g className="svg-bento-3">
          <rect
            x="170"
            y="45"
            width="45"
            height="50"
            rx="8"
            fill="url(#mainBentoGrad)"
            stroke="#3b82f6"
            strokeWidth="1"
          />
          <rect
            x="178"
            y="55"
            width="29"
            height="10"
            rx="3"
            fill="#FFFFFF"
            opacity="0.3"
          />
          <line
            x1="178"
            y1="73"
            x2="198"
            y2="73"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="178"
            y1="81"
            x2="192"
            y2="81"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>
      </svg>
    </div>
  );
}

export function AnimatedSuccessIllustration() {
  return (
    <div className="relative w-24 h-24 mx-auto">
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <filter
            id="success-blur"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <style>{`
          @keyframes drawCheckCircle {
            to { stroke-dashoffset: 0; }
          }
          @keyframes drawCheckMark {
            to { stroke-dashoffset: 0; }
          }
          @keyframes popScale {
            0% { transform: scale(0.8); }
            50% { transform: scale(1.08); }
            100% { transform: scale(1); }
          }
          @keyframes confettiFly {
            0% { transform: translate(0, 0) scale(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translate(var(--tx), var(--ty)) scale(1.2); opacity: 0; }
          }

          .success-circle-bg {
            stroke-dasharray: 202;
            stroke-dashoffset: 202;
            animation: drawCheckCircle 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          }
          .success-check-path {
            stroke-dasharray: 45;
            stroke-dashoffset: 45;
            animation: drawCheckMark 0.5s cubic-bezier(0.19, 1, 0.22, 1) 0.5s forwards;
          }
          .success-con-1 { --tx: -20px; --ty: -25px; animation: confettiFly 1.2s ease-out 0.8s infinite; }
          .success-con-2 { --tx: 25px; --ty: -22px; animation: confettiFly 1.4s ease-out 0.7s infinite; }
          .success-con-3 { --tx: -22px; --ty: 15px; animation: confettiFly 1.1s ease-out 0.9s infinite; }
          .success-con-4 { --tx: 24px; --ty: 20px; animation: confettiFly 1.3s ease-out 0.6s infinite; }
          .success-con-5 { --tx: 0px; --ty: -32px; animation: confettiFly 1.5s ease-out 0.5s infinite; }
          
          .success-main-group {
            transform-box: fill-box;
            transform-origin: center;
            animation: popScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
        `}</style>

        {/* Confetti Burst */}
        <circle
          cx="40"
          cy="40"
          r="2"
          fill="#8DB8FF"
          className="success-con-1"
        />
        <circle
          cx="40"
          cy="40"
          r="3"
          fill="#8DFFB3"
          className="success-con-2"
        />
        <circle
          cx="40"
          cy="40"
          r="2.5"
          fill="#E9C46A"
          className="success-con-3"
        />
        <circle
          cx="40"
          cy="40"
          r="3"
          fill="#E45A5A"
          className="success-con-4"
        />
        <path
          d="M40 40 L41 42 L43 42 L41 43 L42 45 L40 44 L38 45 L39 43 L37 42 L39 42 Z"
          fill="#8DB8FF"
          className="success-con-5"
        />

        <g className="success-main-group">
          {/* Background Glow */}
          <circle
            cx="40"
            cy="40"
            r="32"
            fill="#8DFFB3"
            opacity="0.25"
            filter="url(#success-blur)"
          />
          {/* Main Circle */}
          <circle
            cx="40"
            cy="40"
            r="32"
            fill="#8DFFB3"
            stroke="#369762"
            strokeWidth="3"
            className="success-circle-bg"
          />
          {/* Check Path */}
          <path
            d="M26 41.5 L35 50.5 L54 31.5"
            stroke="#1a5c3a"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="success-check-path"
          />
        </g>
      </svg>
    </div>
  );
}

export function AnimatedDashboardEmptyIllustration() {
  return (
    <div className="w-full max-w-[160px] h-[120px] mx-auto select-none pointer-events-none mb-4">
      <svg
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient
            id="emptyFolderGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#EEF2F6" />
            <stop offset="100%" stopColor="#DFE5EC" />
          </linearGradient>
          <linearGradient
            id="emptyPaperGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F9FAFB" />
          </linearGradient>
        </defs>

        <style>{`
          @keyframes folderBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          @keyframes paperSlide {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px) rotate(1.5deg); }
          }
          @keyframes dashDraw {
            to { stroke-dashoffset: 0; }
          }
          @keyframes searchFloat {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(4px, -4px) rotate(3deg); }
          }

          .empty-folder-base {
            transform-box: fill-box;
            transform-origin: center bottom;
            animation: folderBounce 4s ease-in-out infinite;
          }
          .empty-paper-card {
            transform-box: fill-box;
            transform-origin: center center;
            animation: paperSlide 4s ease-in-out infinite;
          }
          .empty-dash-border {
            stroke-dasharray: 6 4;
            stroke-dashoffset: 50;
            animation: dashDraw 3s linear infinite;
          }
          .empty-magnifier {
            transform-box: fill-box;
            transform-origin: center center;
            animation: searchFloat 3.2s ease-in-out infinite;
          }
        `}</style>

        {/* Dash Outline of website board representation */}
        <rect
          x="25"
          y="15"
          width="110"
          height="85"
          rx="14"
          stroke="#D1D5DB"
          strokeWidth="1.5"
          className="empty-dash-border"
        />

        {/* Paper Page sliding out */}
        <g className="empty-paper-card">
          <rect
            x="42"
            y="24"
            width="76"
            height="60"
            rx="8"
            fill="url(#emptyPaperGrad)"
            stroke="#E6E6E6"
            strokeWidth="1.2"
          />
          {/* Wireframe details on paper */}
          <circle cx="56" cy="38" r="6" fill="#F3F3F3" />
          <rect x="68" y="34" width="38" height="4" rx="2" fill="#E6E6E6" />
          <rect
            x="68"
            y="41"
            width="24"
            height="3"
            rx="1.5"
            fill="#E6E6E6"
            opacity="0.6"
          />

          <rect x="50" y="52" width="60" height="2" rx="1" fill="#F3F3F3" />
          <rect x="50" y="58" width="45" height="2" rx="1" fill="#F3F3F3" />
          <rect
            x="50"
            y="64"
            width="55"
            height="2"
            rx="1"
            fill="#F3F3F3"
            opacity="0.5"
          />

          {/* Plus Add sign */}
          <circle cx="80" cy="74" r="8" fill="#3b82f6" opacity="0.1" />
          <path
            d="M77 74 L83 74 M80 77 L80 71"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* Open Folder representation */}
        <g className="empty-folder-base">
          {/* Back flap */}
          <path
            d="M 35 90 L 35 55 A 4 4 0 0 1 39 51 L 62 51 L 68 56 L 121 56 A 4 4 0 0 1 125 60 L 125 90 Z"
            fill="url(#emptyFolderGrad)"
            stroke="#D1D5DB"
            strokeWidth="1"
          />
          {/* Front flap */}
          <path
            d="M 33 92 L 33 63 A 4 4 0 0 1 37 59 L 123 59 A 4 4 0 0 1 127 63 L 127 92 Z"
            fill="#EEF2F6"
            stroke="#D1D5DB"
            strokeWidth="1"
            opacity="0.95"
          />
          <path d="M 33 65 L 127 65" stroke="#FFFFFF" strokeWidth="1.2" />
        </g>

        {/* Floating Magnifier */}
        <g className="empty-magnifier">
          <circle
            cx="112"
            cy="42"
            r="9"
            stroke="#9CA3AF"
            strokeWidth="2"
            fill="#FFFFFF"
            opacity="0.9"
          />
          <line
            x1="118.5"
            y1="48.5"
            x2="129"
            y2="59"
            stroke="#9CA3AF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

export function AnimatedThinkingIllustration() {
  return (
    <div className="flex items-center justify-center py-1 select-none pointer-events-none">
      <svg
        viewBox="0 0 42 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-4"
      >
        <style>{`
          @keyframes bubblePulse {
            0%, 100% { transform: translateY(0) scale(0.85); opacity: 0.4; }
            50% { transform: translateY(-4px) scale(1.05); opacity: 1; }
          }
          .think-bubble-1 {
            transform-box: fill-box;
            transform-origin: center;
            animation: bubblePulse 1.2s ease-in-out infinite;
          }
          .think-bubble-2 {
            transform-box: fill-box;
            transform-origin: center;
            animation: bubblePulse 1.2s ease-in-out infinite -0.4s;
          }
          .think-bubble-3 {
            transform-box: fill-box;
            transform-origin: center;
            animation: bubblePulse 1.2s ease-in-out infinite -0.8s;
          }
        `}</style>

        {/* Glow stops */}
        <circle
          cx="8"
          cy="8"
          r="4.5"
          fill="#3b82f6"
          className="think-bubble-1"
        />
        <circle
          cx="21"
          cy="8"
          r="4.5"
          fill="#8DB8FF"
          className="think-bubble-2"
        />
        <circle
          cx="34"
          cy="8"
          r="4.5"
          fill="#8DFFB3"
          className="think-bubble-3"
        />
      </svg>
    </div>
  );
}
