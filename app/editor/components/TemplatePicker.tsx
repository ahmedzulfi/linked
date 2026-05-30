"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
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
    <div data-layer="Container" className="Container size-lf-stretch inline-flex flex-col justify-start items-start w-full min-h-[920px] select-none">
      <div data-layer="Container" className="Container self-stretch pt-5 inline-flex justify-center items-start w-full">
        <div data-layer="Background+Border" className="BackgroundBorder flex-1 self-stretch relative bg-neutral-50 rounded-xl outline outline-1 outline-zinc-100 inline-flex flex-col justify-center items-start w-full min-h-[900px]">
          <div data-layer="Overlay+Shadow" className="OverlayShadow w-full h-full left-0 top-0 absolute bg-white/0 rounded-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] pointer-events-none" />
          <div data-layer="Mask Group" className="MaskGroup self-stretch flex-1 relative w-full">
            <div data-layer="Mask" className="Mask w-full h-full left-0 top-0 absolute bg-gradient-to-b from-black/0 via-black via 3% to-black/0 pointer-events-none" />
            <div data-layer="Container" className="Container w-full h-full left-0 top-0 absolute">
              
              {/* Header Title Section */}
              <div data-layer="Container" className="Container w-[calc(100%-42.16px)] left-[21.08px] top-[21.08px] absolute inline-flex flex-col justify-start items-start gap-3">
                <div data-layer="Container" className="Container self-stretch inline-flex justify-between items-center w-full">
                  <div data-layer="Heading 2" className="Heading2 w-24 h-7 relative">
                    <div data-layer="Media" className="Media left-0 top-[-1px] absolute justify-center text-neutral-900 text-lg font-medium font-['Inter_Tight'] leading-7">Templates</div>
                  </div>
                  <div data-layer="Container" className="Container relative inline-flex flex-col justify-start items-start group/info cursor-pointer">
                    <div data-svg-wrapper data-layer="SVG" className="Svg relative">
                      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_5_88)">
                          <path d="M9.11488 16.7108C13.3099 16.7108 16.7107 13.3101 16.7107 9.115C16.7107 4.91994 13.3099 1.51917 9.11488 1.51917C4.91981 1.51917 1.51904 4.91994 1.51904 9.115C1.51904 13.3101 4.91981 16.7108 9.11488 16.7108Z" stroke="#171717" strokeWidth="1.51917" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9.11523 12.1541V9.11499" stroke="#171717" strokeWidth="1.51917" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9.11523 6.07666H9.12283" stroke="#171717" strokeWidth="1.51917" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_5_88">
                            <rect width="18.23" height="18.23" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    {/* Tooltip Description */}
                    <div data-layer="Container" className="Container h-16 left-[-301.76px] top-[26.66px] absolute opacity-0 group-hover/info:opacity-100 transition-[opacity,transform] duration-150 scale-95 translate-y-1 group-hover/info:scale-100 group-hover/info:translate-y-0 flex flex-col justify-start items-start z-50">
                      <div data-layer="Background+Shadow" className="BackgroundShadow w-80 px-3.5 py-2.5 bg-linear-99 from-zinc-800 from 20% to-zinc-700 to 80% rounded-lg shadow-[0px_5px_6px_0px_rgba(0,0,0,0.12)] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.25)] shadow-[inset_0px_-3px_4px_0px_rgba(0,0,0,0.20)] flex flex-col justify-start items-start">
                        <div className="justify-center text-white text-[11px] font-normal font-['Inter'] leading-relaxed">
                          Manage your site's templates. Select a layout, search presets, or generate customized structures using AI.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div data-layer="Horizontal Divider" className="HorizontalDivider self-stretch h-0.5 border-t-2 border-black/5" />
              </div>

              {/* Sub-tabs switcher (Presets vs Generate with AI) */}
              <div data-layer="Container" className="Container w-[calc(100%-42.16px)] h-11 left-[21.08px] top-[84.14px] absolute inline-flex flex-row gap-2 justify-start items-start">
                
                {/* Preset Layouts Button */}
                <button 
                  onClick={() => setActivePickerTab("presets")}
                  className={`flex-1 h-10 relative rounded-xl cursor-pointer transition-all duration-150 outline-none ${activePickerTab === "presets" ? "bg-zinc-200/80" : "bg-zinc-100/50 hover:bg-zinc-200/40"}`}
                >
                  <div data-layer="Button:shadow" className="ButtonShadow w-full h-10 left-0 top-0 absolute rounded-xl shadow-[0px_0px_0px_1px_rgba(0,0,0,0.07)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.02)] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.75)]" />
                  <div data-svg-wrapper data-layer="SVG" className="Svg left-[12px] top-[11.92px] absolute">
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="13" height="13" rx="1.5" stroke="black" strokeWidth="1.5" />
                      <path d="M2 6.5H15M6.5 2V15" stroke="black" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div className="left-[34px] top-[7.45px] absolute text-center justify-center text-black text-[11px] font-semibold font-['Inter'] leading-6">Presets</div>
                </button>

                {/* Generate with AI Button (glowing gradient) */}
                <button 
                  onClick={() => setActivePickerTab("ai")}
                  className="flex-1 relative inline-flex flex-col justify-start items-start cursor-pointer group outline-none"
                >
                  <div className={`GradientBlur w-full h-12 left-[-2px] top-[-2px] absolute opacity-20 bg-linear-55 from-sky-500 via-fuchsia-500 to-amber-500 blur-xs transition-opacity duration-150 ${activePickerTab === "ai" ? "opacity-35 scale-[1.01]" : "opacity-0 group-hover:opacity-20"}`} />
                  <div className="Container self-stretch p-0.5 rounded-2xl flex flex-col justify-start items-start overflow-hidden w-full">
                    <div className={`Button self-stretch h-10 relative rounded-xl w-full transition-all ${activePickerTab === "ai" ? "bg-zinc-200/90" : "bg-zinc-100 hover:bg-zinc-100/80"}`}>
                      <div data-layer="Button:shadow" className="ButtonShadow w-full h-10 left-0 top-0 absolute rounded-xl shadow-[0px_0px_0px_1px_rgba(0,0,0,0.07)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.02)] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.75)]" />
                      <div data-svg-wrapper data-layer="SVG" className="Svg left-[12px] top-[11.92px] absolute">
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_5_109)">
                            <path d="M7.41827 1.8948C7.44712 1.74034 7.52909 1.60083 7.64997 1.50044C7.77085 1.40005 7.92303 1.34509 8.08016 1.34509C8.23729 1.34509 8.38948 1.40005 8.51035 1.50044C8.63123 1.60083 8.7132 1.74034 8.74205 1.8948L9.44972 5.63718C9.49998 5.90325 9.62928 6.14799 9.82075 6.33945C10.0122 6.53092 10.2569 6.66022 10.523 6.71048L14.2654 7.41815C14.4199 7.447 14.5594 7.52896 14.6598 7.64984C14.7601 7.77072 14.8151 7.92291 14.8151 8.08004C14.8151 8.23717 14.7601 8.38935 14.6598 8.51023C14.5594 8.63111 14.4199 8.71307 14.2654 8.74192L10.523 9.4496C10.2569 9.49986 10.0122 9.62916 9.82075 9.82062C9.62928 10.0121 9.49998 10.2568 9.44972 10.5229L8.74205 14.2653C8.7132 14.4197 8.63123 14.5592 8.51035 14.6596C8.38948 14.76 8.23729 14.815 8.08016 14.815C7.92303 14.815 7.77085 14.76 7.64997 14.6596C7.52909 14.5592 7.44712 14.4197 7.41827 14.2653L6.7106 10.5229C6.66034 10.2568 6.53104 10.0121 6.33957 9.82062C6.14811 9.62916 5.90337 9.49986 5.63731 9.4496L1.89492 8.74192C1.74046 8.71307 1.60095 8.63111 1.50056 8.51023C1.40017 8.38935 1.34521 8.23717 1.34521 8.08004C1.34521 7.92291 1.40017 7.77072 1.50056 7.64984C1.60095 7.52896 1.74046 7.447 1.89492 7.41815L5.63731 6.71048C5.90337 6.66022 6.14811 6.53092 6.33957 6.33945C6.53104 6.14799 6.66034 5.90325 6.7106 5.63718L7.41827 1.8948Z" stroke="black" strokeWidth="1.515" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13.4668 1.34668V4.03938" stroke="black" stroke-width="1.515" strokeLinecap="round" stroke-linejoin="round"/>
                            <path d="M14.8128 2.69336H12.1201" stroke="black" stroke-width="1.515" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2.69303 14.8127C3.4366 14.8127 4.03938 14.2099 4.03938 13.4663C4.03938 12.7228 3.4366 12.12 2.69303 12.12C1.94946 12.12 1.34668 12.7228 1.34668 13.4663C1.34668 14.2099 1.94946 14.8127 2.69303 14.8127Z" stroke="black" stroke-width="1.515" strokeLinecap="round" stroke-linejoin="round"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_5_109">
                              <rect width="16.16" height="16.16" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="left-[34px] top-[7.45px] absolute text-center justify-center text-black text-[11px] font-semibold font-['Inter'] leading-6">Generate AI</div>
                    </div>
                  </div>
                </button>

              </div>

              <AnimatePresence mode="wait">
                {activePickerTab === "presets" ? (
                  <motion.div
                    key="presets"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {/* Search Bar */}
                    <div data-layer="Background" className="Background w-[calc(100%-42.16px)] h-10 p-3 left-[21.08px] top-[149.22px] absolute bg-zinc-100 rounded-xl inline-flex justify-start items-center gap-1.5 border border-black/5">
                      <div data-layer="Overlay+Shadow" className="OverlayShadow w-full h-10 left-0 top-0 absolute bg-white/0 rounded-xl shadow-[0px_0px_0px_1px_rgba(0,0,0,0.07)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.02)] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.75)] pointer-events-none" />
                      <div data-svg-wrapper data-layer="SVG" className="Svg relative shrink-0">
                        <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.279 14.1379L14.3574 11.2163" stroke="black" strokeWidth="1.3465" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M10.5466 12.7918C13.5212 12.7918 15.9326 10.3804 15.9326 7.40578C15.9326 4.43117 13.5212 2.01978 10.5466 2.01978C7.57204 2.01978 5.16064 4.43117 5.16064 7.40578C5.16064 10.3804 7.57204 12.7918 10.5466 12.7918Z" stroke="black" strokeWidth="1.3465" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Search presets..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 bg-transparent border-none text-xs text-black placeholder:text-zinc-400 focus:outline-none focus:ring-0 p-0"
                      />
                    </div>

                    {/* Template presets library header */}
                    <div data-layer="Heading 2" className="Heading2 w-[calc(100%-42.16px)] left-[21.08px] top-[209.30px] absolute inline-flex flex-col justify-start items-start">
                      <div data-layer="Image Library" className="ImageLibrary justify-center text-zinc-400 text-[11px] font-bold uppercase tracking-wider leading-6">Template Library</div>
                    </div>

                    {/* Template Preset Cards Grid List */}
                    <div data-layer="Container" className="Container w-[calc(100%-42.16px)] left-[21.08px] top-[248px] absolute inline-flex flex-col justify-start items-start gap-4 h-[550px] overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
                      {filteredTemplates.length > 0 ? (
                        filteredTemplates.map((template) => {
                          const isSelected = selected === template.id;
                          return (
                            <div 
                              key={template.id}
                              onClick={() => onSelect(template.id)}
                              data-layer="Background+Shadow" 
                              className={`BackgroundShadow self-stretch h-36 relative bg-zinc-50 rounded-xl shadow-[0px_0px_0px_1px_rgba(0,0,0,0.07)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.02)] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.75)] overflow-hidden cursor-pointer group border transition-all ${isSelected ? "border-blue-500 ring-1 ring-blue-500" : "border-[#E6E6E6] hover:border-zinc-300"}`}
                            >
                              {/* Virtual Template preview */}
                              <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none opacity-85">
                                <TemplatePreview template={template} />
                              </div>

                              {/* Bottom Gradient overlay */}
                              <div data-layer="Mask Group" className="MaskGroup w-full h-16 left-0 bottom-0 absolute">
                                <div data-layer="Mask" className="Mask w-full h-16 left-0 top-0 absolute bg-gradient-to-b from-black/0 to-black to 60%" />
                              </div>
                              <div data-layer="Container" className="Container left-[12.64px] bottom-[12px] absolute inline-flex flex-col justify-start items-start">
                                <p className="justify-center text-white text-xs font-bold font-['Inter'] capitalize leading-tight">
                                  {template.name}
                                </p>
                                <p className="text-[9.5px] text-white/70 leading-none mt-1 truncate max-w-[220px]">
                                  {template.description}
                                </p>
                              </div>

                              {/* Selected Check icon badge */}
                              {isSelected && (
                                <div className="absolute top-2 right-2 w-5 h-5 rounded-lg bg-blue-500 flex items-center justify-center shadow-sm">
                                  <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
                                </div>
                              )}

                              {/* Explore/Select hover overlay */}
                              <div data-layer="Overlay+OverlayBlur" className="OverlayOverlayblur w-full h-full left-0 top-0 absolute opacity-0 group-hover:opacity-100 bg-white/10 backdrop-blur-[1px] transition-opacity duration-200 inline-flex justify-center items-center">
                                <div data-layer="Button" className="Button h-8 px-4 relative bg-zinc-100 hover:bg-white rounded-xl inline-flex flex-col justify-center items-center transition-colors shadow-sm">
                                  <div className="text-center justify-center text-black text-xs font-semibold leading-none">
                                    {isSelected ? "Active" : "Select Layout"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="py-8 text-center text-xs text-zinc-400 w-full">
                          No templates match your search.
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ai"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="w-[calc(100%-42.16px)] left-[21.08px] top-[149.22px] absolute bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-xl p-4 border border-[#E6E6E6]/60 flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      <span>AI Layout Generator</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-relaxed">
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
                          className="text-left w-full px-3.5 py-2.5 bg-white hover:bg-zinc-50 border border-[#E6E6E6] rounded-xl text-[11px] font-semibold text-zinc-700 hover:text-black flex items-center justify-between transition-colors shadow-sm"
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
          </div>
        </div>
      </div>
    </div>
  );
}
