"use client";

import { Check } from "lucide-react";
import { TEMPLATES, TemplateId } from "@/shared/types";

interface TemplatePickerProps {
  selected: TemplateId;
  onSelect: (id: TemplateId) => void;
}

function DanielCrossPreview() {
  return (
    <div className="w-full h-full" style={{ backgroundColor: "#e9e6e2", overflow: "hidden", position: "relative" }}>
      {/* Sidebar mock */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "30%",
        backgroundColor: "#edeae7", padding: "12px", display: "flex", flexDirection: "column", gap: "8px"
      }}>
        {/* Logo / name */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "#d5d0cb" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <div style={{ height: "6px", width: "50px", background: "#4a3429", borderRadius: "3px" }} />
            <div style={{ height: "4px", width: "36px", background: "#aaa8a5", borderRadius: "2px" }} />
          </div>
        </div>
        {/* Nav items */}
        {["Home", "About", "Work", "Contact"].map((n, i) => (
          <div key={i} style={{
            height: "22px", borderRadius: "5px", background: i === 0 ? "#f5f2f0" : "transparent",
            display: "flex", alignItems: "center", paddingLeft: "6px"
          }}>
            <div style={{ height: "4px", width: i === 0 ? "28px" : `${20 + i * 6}px`, background: "#8a8782", borderRadius: "2px" }} />
          </div>
        ))}
        {/* Social links */}
        <div style={{ marginTop: "auto" }}>
          <div style={{ height: "4px", width: "40px", background: "#b0aca8", borderRadius: "2px", marginBottom: "5px" }} />
          {["Instagram", "Twitter-X", "LinkedIn"].map((s, i) => (
            <div key={i} style={{ height: "14px", display: "flex", alignItems: "center", gap: "4px", marginBottom: "2px" }}>
              <div style={{ height: "3px", width: "40px", background: "#c0bdb9", borderRadius: "2px" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div style={{ marginLeft: "30%", padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
        {/* Hero section */}
        <div style={{ background: "#f5f2f0", borderRadius: "8px", padding: "10px 12px", marginBottom: "4px" }}>
          {/* Status tags */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "6px" }}>
            <div style={{ height: "12px", borderRadius: "6px", background: "#edeae7", padding: "0 6px", display: "flex", alignItems: "center" }}>
              <div style={{ height: "4px", width: "40px", background: "#4a3429", borderRadius: "2px" }} />
            </div>
          </div>
          {/* Big name */}
          <div style={{ height: "22px", width: "65%", background: "#2a2520", borderRadius: "4px", marginBottom: "4px" }} />
          {/* Subtitle */}
          <div style={{ height: "10px", width: "80%", background: "#c0bdb9", borderRadius: "3px", marginBottom: "6px" }} />
          {/* Bio paragraph */}
          {[100, 95, 88].map((w, i) => (
            <div key={i} style={{ height: "4px", width: `${w}%`, background: "#d8d5d1", borderRadius: "2px", marginBottom: "3px" }} />
          ))}
        </div>

        {/* Projects grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
          {[1, 2].map((i) => (
            <div key={i} style={{ borderRadius: "8px", overflow: "hidden", position: "relative", height: "60px", background: "#d5d0cb" }}>
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
                background: "linear-gradient(transparent, rgba(0,0,0,0.7))", display: "flex", alignItems: "flex-end", padding: "4px 6px"
              }}>
                <div style={{ height: "5px", width: "40px", background: "#fff", borderRadius: "2px" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ background: "#e5e2de", borderRadius: "6px", padding: "6px 8px", display: "flex", gap: "8px" }}>
          {["Email", "Phone", "Location"].map((f, i) => (
            <div key={i} style={{ height: "4px", width: `${30 + i * 6}px`, background: "#b0aba7", borderRadius: "2px" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TemplatePicker({ selected, onSelect }: TemplatePickerProps) {
  const template = TEMPLATES[0]; // Only Daniel Cross

  return (
    <div className="flex flex-col self-stretch grow">
      <div className="flex justify-center self-stretch pt-[21px]">
        <div className="flex flex-col justify-center self-stretch grow bg-[#fbfbfb] rounded-[13px] outline outline-1 outline-[#f3f3f3] relative overflow-hidden min-h-[832px]">
          {/* Background layer */}
          <div className="w-full bg-white absolute left-0 top-0 bottom-0 rounded-[13px] pointer-events-none" />

          <div className="self-stretch grow relative z-10 flex flex-col items-center py-[21px]">
            <div className="w-[434px] flex flex-col gap-[12px]">
              {/* Header */}
              <div className="flex justify-between items-center self-stretch">
                <span className="font-medium text-[17px] leading-[27px] text-neutral-900">
                  Templates
                </span>
                <div className="relative group/info">
                  <div className="w-[18px] h-[18px] flex items-center justify-center cursor-pointer">
                    <svg width="16" height="16" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#info-clip)">
                        <path d="M9.11488 16.7108C13.3099 16.7108 16.7107 13.3101 16.7107 9.115C16.7107 4.91994 13.3099 1.51917 9.11488 1.51917C4.91981 1.51917 1.51904 4.91994 1.51904 9.115C1.51904 13.3101 4.91981 16.7108 9.11488 16.7108Z" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.11523 12.1541V9.11499" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.11523 6.07666H9.12283" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="info-clip">
                          <rect width="18.23" height="18.23" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="opacity-0 group-hover/info:opacity-100 transition-opacity duration-150 absolute right-0 top-[22px] z-50 pointer-events-none">
                    <div className="w-72 bg-gradient-to-b from-[#2a2a2f] to-[#3a3a42] px-3 py-2 rounded-lg shadow-md">
                      <span className="text-[13px] leading-[19px] text-white font-normal">
                        Your portfolio is built on the Daniel Cross Framer template — a premium, clean design with modern typography and sleek aesthetics.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-0.5 border-t border-black/5" />
            </div>

            {/* Single Template Card */}
            <div className="w-[434px] mt-4">
              <div
                onClick={() => onSelect(template.id)}
                className={`w-full h-[200px] bg-[#f3f3f3] rounded-[13px] relative overflow-hidden cursor-pointer border transition-all ${
                  selected === template.id
                    ? "border-blue-500 ring-1 ring-blue-500"
                    : "border-black/5 hover:border-zinc-300"
                }`}
              >
                {/* Template Preview */}
                <div className="absolute inset-0 pointer-events-none">
                  <DanielCrossPreview />
                </div>

                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-black/0 to-white/80 pointer-events-none" />

                {/* Template Name */}
                <div className="absolute bottom-3 left-3 z-10">
                  <span className="font-medium text-[15px] text-black/80">{template.name}</span>
                  <p className="text-[11px] text-black/40 mt-0.5">{template.description}</p>
                </div>

                {/* Selected badge */}
                {selected === template.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-lg bg-blue-500 flex items-center justify-center shadow-sm z-20">
                    <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 flex justify-center items-center bg-white/20 backdrop-blur-[1px] opacity-0 hover:opacity-100 transition-opacity duration-200 z-10">
                  <div className="h-10 flex items-center bg-[#f3f3f3] px-6 rounded-[13px] shadow-sm">
                    <span className="font-medium text-[15px] text-black">
                      {selected === template.id ? "Active" : "Use This Layout"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Premium badge row */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-[#edeae7] border border-[#d5d0cb] rounded-full px-3 py-1.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1L7.5 4.5H11L8 7L9.5 10.5L6 8.5L2.5 10.5L4 7L1 4.5H4.5L6 1Z" fill="#4a3429"/>
                  </svg>
                  <span className="text-[11px] font-medium text-[#4a3429]">Premium Framer Template</span>
                </div>
                <span className="text-[11px] text-neutral-400">Daniel Cross by Muddasir Hussain</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
