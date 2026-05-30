"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Search, LayoutGrid } from "lucide-react";
import { TemplateMeta, TEMPLATES, TemplateId } from "@/shared/types";
import { toast } from "sonner";

interface TemplatePickerProps {
  selected: TemplateId;
  onSelect: (id: TemplateId) => void;
}

function TemplatePreview({ template }: { template: TemplateMeta }) {
  if (template.id === "minimal-card") {
    return (
      <div className="w-full h-full p-3 flex items-center justify-center" style={{ backgroundColor: template.previewBg }}>
        <div className="w-full max-w-[140px] bg-white rounded-lg border border-[#E6E6E6] p-3 shadow-[0_6px_10px_-6px_#00000016]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-[#E6E6E6]" />
            <div className="flex flex-col gap-1">
              <div className="h-1.5 w-14 bg-[#2A2A2F] rounded-lg" />
              <div className="h-1 w-10 bg-[#E6E6E6] rounded-lg" />
            </div>
          </div>
          <div className="h-1 w-full bg-[#F3F3F3] rounded mb-1" />
          <div className="h-1 w-4/5 bg-[#F3F3F3] rounded mb-2" />
          <div className="flex gap-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-3 px-2 rounded-lg bg-[#DCEAFF] flex items-center">
                <div className="h-0.5 w-5 bg-[#8DB8FF] rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (template.id === "bento-grid") {
    return (
      <div className="w-full h-full p-3 grid grid-cols-2 grid-rows-3 gap-1.5" style={{ backgroundColor: template.previewBg }}>
        <div className="col-span-2 bg-white rounded-[6px] border border-[#E6E6E6] p-2 flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg bg-[#E6E6E6] flex-shrink-0" />
          <div className="h-1.5 w-16 bg-[#2A2A2F] rounded-lg" />
        </div>
        <div className="bg-white rounded-[6px] border border-[#E6E6E6] p-2">
          <div className="h-1.5 w-8 bg-[#8DFFB3] rounded mb-1" />
          <div className="h-1 w-full bg-[#F3F3F3] rounded" />
          <div className="h-1 w-3/4 bg-[#F3F3F3] rounded mt-1" />
        </div>
        <div className="bg-white rounded-[6px] border border-[#E6E6E6] p-2">
          <div className="h-1.5 w-8 bg-[#8DB8FF] rounded mb-1" />
          <div className="h-1 w-full bg-[#F3F3F3] rounded" />
          <div className="h-1 w-2/3 bg-[#F3F3F3] rounded mt-1" />
        </div>
        <div className="col-span-2 bg-white rounded-[6px] border border-[#E6E6E6] p-2 flex gap-1">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-2 px-1.5 rounded-lg bg-[#F3F3F3] flex-shrink-0">
              <div className="h-full w-4 bg-[#E6E6E6] rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (template.id === "full-scroll") {
    return (
      <div className="w-full h-full flex flex-col" style={{ backgroundColor: template.previewBg }}>
        <div className="h-12 bg-[#2A2A2F] flex items-end px-3 pb-2">
          <div className="w-8 h-8 rounded-lg bg-[#E6E6E6] border-2 border-white -mb-4" />
        </div>
        <div className="flex-1 bg-white px-3 pt-5 flex flex-col gap-2">
          <div className="h-2 w-20 bg-[#2A2A2F] rounded" />
          <div className="h-1 w-16 bg-[#E6E6E6] rounded" />
          <div className="h-px w-full bg-[#E6E6E6] my-1" />
          {[1, 2].map(i => (
            <div key={i} className="flex gap-2 items-start">
              <div className="w-3 h-3 rounded-lg bg-[#8DB8FF] mt-0.5 flex-shrink-0" />
              <div className="flex-1 flex flex-col gap-1">
                <div className="h-1.5 w-14 bg-[#2A2A2F] rounded" />
                <div className="h-1 w-10 bg-[#E6E6E6] rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-3 flex flex-col gap-2" style={{ backgroundColor: template.previewBg }}>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-[#2A2A2F] border border-[#333]" />
        <div className="flex flex-col gap-1">
          <div className="h-1.5 w-14 bg-white/80 rounded-lg" />
          <div className="h-1 w-10 bg-white/30 rounded-lg" />
        </div>
      </div>
      <div className="h-1 w-full bg-white/10 rounded" />
      <div className="h-1 w-4/5 bg-white/10 rounded" />
      <div className="flex gap-1 mt-1">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-3 px-2 rounded-lg bg-[#8DB8FF]/20 flex items-center">
            <div className="h-0.5 w-4 bg-[#8DB8FF] rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TemplatePicker({ selected, onSelect }: TemplatePickerProps) {
  const [activePickerTab, setActivePickerTab] = useState<"presets" | "ai">("presets");
  const [search, setSearch] = useState("");

  const filteredTemplates = TEMPLATES.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 font-inter">
      {/* Title section with Info Tooltip */}
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-[15px] font-semibold text-neutral-950 font-['Inter_Tight']">Templates</h1>
        
        {/* Info Tooltip */}
        <div className="relative group/info flex items-center justify-center cursor-pointer">
          <svg className="w-4 h-4 text-zinc-400 hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          <div className="absolute right-0 top-6 z-50 w-[260px] opacity-0 pointer-events-none group-hover/info:opacity-100 transition-[opacity,transform] duration-150 scale-95 translate-y-1 group-hover/info:scale-100 group-hover/info:translate-y-0 flex flex-col items-end">
            <div className="w-2.5 h-2.5 bg-zinc-800 rotate-45 mr-2 -mb-1 shadow-[0px_5px_6px_0px_rgba(0,0,0,0.12)]" />
            <div className="px-3.5 py-2.5 bg-gradient-to-b from-zinc-800 to-zinc-700 text-white text-[11px] leading-relaxed font-normal font-['Inter'] rounded-lg shadow-[0px_5px_6px_0px_rgba(0,0,0,0.12),inset_0px_1px_0px_0px_rgba(255,255,255,0.25),inset_0px_-3px_4px_0px_rgba(0,0,0,0.20)] text-left">
              Manage your site's template. Choose a pre-designed layout, customize it, or generate new templates with AI.
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-black/5" />

      {/* Sub-header tabs switcher */}
      <div className="flex items-center gap-2">
        {/* Presets Tab Button */}
        <button
          onClick={() => setActivePickerTab("presets")}
          className={`flex-grow h-9 flex items-center justify-center gap-1.5 rounded-xl border text-[12px] font-semibold transition-all duration-150 cursor-pointer ${
            activePickerTab === "presets"
              ? "bg-[#F3F3F3] border-[#E6E6E6] text-black shadow-sm"
              : "bg-white border-[#E6E6E6] text-zinc-500 hover:text-black hover:bg-zinc-50"
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Presets</span>
        </button>

        {/* Generate AI Tab Button (Glow design) */}
        <button
          onClick={() => setActivePickerTab("ai")}
          className={`flex-grow h-9 relative p-[1.5px] rounded-xl overflow-hidden transition-all duration-150 cursor-pointer ${
            activePickerTab === "ai"
              ? "bg-gradient-to-r from-sky-400 via-fuchsia-500 to-amber-400 shadow-[0_0_8px_rgba(168,85,247,0.15)] scale-[1.01]"
              : "hover:scale-[1.01]"
          }`}
        >
          {activePickerTab !== "ai" && (
            <div className="absolute inset-0 bg-[#E6E6E6] rounded-xl -z-10 group-hover:bg-zinc-400 transition-colors" />
          )}
          <div className="w-full h-full bg-white hover:bg-zinc-50/95 rounded-[10px] flex items-center justify-center gap-1.5 text-[12px] font-semibold text-black">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-500" />
            <span>Generate with AI</span>
          </div>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activePickerTab === "presets" ? (
          <motion.div
            key="presets"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col gap-3"
          >
            {/* Search Input Bar */}
            <div className="relative flex items-center bg-zinc-100 rounded-xl px-3.5 py-2.5 h-10 w-full gap-2 border border-black/5">
              <Search className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                type="text"
                placeholder="Search templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent border-none text-xs text-black placeholder:text-zinc-400 focus:outline-none focus:ring-0 p-0"
              />
            </div>

            {/* Presets Header */}
            <div className="mt-1 flex items-center justify-between">
              <h2 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wide">Template Library</h2>
              <span className="text-[10px] text-zinc-400 font-medium">{filteredTemplates.length} templates</span>
            </div>

            {/* Presets Library Grid List */}
            <div className="flex flex-col gap-3">
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template, i) => {
                  const isSelected = selected === template.id;
                  return (
                    <motion.button
                      key={template.id}
                      initial={{ opacity: 0, scale: 0.96, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.04, ease: [0.23, 1, 0.32, 1] }}
                      onClick={() => onSelect(template.id)}
                      className={`relative h-32 w-full bg-zinc-50 rounded-xl overflow-hidden border text-left cursor-pointer group shadow-[0px_4px_4px_rgba(0,0,0,0.02)] transition-all ${
                        isSelected
                          ? "border-blue-500 ring-1 ring-blue-500"
                          : "border-[#E6E6E6] hover:border-zinc-300"
                      }`}
                    >
                      {/* Visual Preview representation */}
                      <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
                        <TemplatePreview template={template} />
                      </div>

                      {/* Bottom Gradient Overlay */}
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/85 via-black/45 to-transparent flex flex-col justify-end p-3 pointer-events-none">
                        <p className="text-[11px] font-bold text-white uppercase tracking-wider leading-none">
                          {template.name}
                        </p>
                        <p className="text-[9px] text-white/70 leading-none mt-1 truncate">
                          {template.description}
                        </p>
                      </div>

                      {/* Selected Badge */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-lg bg-blue-500 flex items-center justify-center shadow-sm">
                          <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
                        </div>
                      )}

                      {/* Explore/Select hover overlay */}
                      <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <div className="h-8 px-4 rounded-xl bg-zinc-100 flex items-center justify-center border border-zinc-200 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.07)] hover:bg-white transition-colors duration-150">
                          <span className="text-black text-xs font-semibold">
                            {isSelected ? "Active" : "Select Layout"}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs text-zinc-400">
                  No templates match your search.
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="ai"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-xl p-4 border border-[#E6E6E6]/60 flex flex-col gap-3"
          >
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>AI Layout Generator</span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Describe the style or structure you desire, and our AI will automatically construct a customized layout matching your request.
            </p>
            <div className="flex flex-col gap-2 mt-1">
              {[
                "Minimalist Resume Card",
                "Bento Box Style Grid",
                "Full Page Scroll Banner",
                "Futuristic Dark Slate Layout",
              ].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => {
                    const mapped: Record<string, TemplateId> = {
                      "Minimalist Resume Card": "minimal-card",
                      "Bento Box Style Grid": "bento-grid",
                      "Full Page Scroll Banner": "full-scroll",
                      "Futuristic Dark Slate Layout": "dark",
                    };
                    const id = mapped[prompt] || "minimal-card";
                    toast.loading(`Analyzing description and generating layout...`);
                    setTimeout(() => {
                      toast.dismiss();
                      onSelect(id);
                      toast.success("AI layout successfully applied!");
                      setActivePickerTab("presets");
                    }, 1500);
                  }}
                  className="text-left w-full px-3.5 py-2.5 bg-white hover:bg-zinc-50 border border-[#E6E6E6] rounded-xl text-xs font-semibold text-zinc-700 hover:text-black flex items-center justify-between transition-colors shadow-sm"
                >
                  <span>{prompt}</span>
                  <Sparkles className="w-3 h-3 text-zinc-400" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
