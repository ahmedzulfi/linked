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
    <div className="flex flex-col self-stretch grow">
      <div className="flex justify-center self-stretch pt-[21.07979965209961px]">
        <div className="flex flex-col justify-center self-stretch grow bg-[#fbfbfb] rounded-[13px] outline-1 outline-t-1 outline-l-1 outline-r-1 outline-b-1 outline outline-[#f3f3f3] relative overflow-hidden min-h-[832px]">
          {/* Background white sheet layer */}
          <div className="w-[486.25px] h-[831.4500122070312px] bg-white absolute left-0 top-0 rounded-[13px] pointer-events-none"></div>
          
          <div className="self-stretch grow relative z-10 flex flex-col items-center py-[21.08px]">
            {/* Background mask layer (hidden/opacity-0 to avoid obscuring light theme details) */}
            <div className="w-[486.25px] h-[831.4500122070312px] bg-gradient-to-b from-black via-black to-black absolute left-0 top-0 pointer-events-none opacity-0"></div>
            
            <div className="w-[434.0899963378906px] flex flex-col gap-[12.640000343322754px]">
              <div className="flex justify-between items-center self-stretch">
                <div className="w-[83.16px] h-[27.34000015258789px] flex items-center">
                  <span className="font-medium text-[17.899999618530273px] leading-[27.360000610351562px] text-neutral-900">Templates</span>
                </div>
                
                <div className="flex flex-col relative group/info">
                  <div className="w-[18.229999542236328px] h-[18.229999542236328px] flex items-center justify-center cursor-pointer">
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[15.191665649414062px] h-[15.191665649414062px]">
                      <g clipPath="url(#clip0_5_88)">
                        <path d="M9.11488 16.7108C13.3099 16.7108 16.7107 13.3101 16.7107 9.115C16.7107 4.91994 13.3099 1.51917 9.11488 1.51917C4.91981 1.51917 1.51904 4.91994 1.51904 9.115C1.51904 13.3101 4.91981 16.7108 9.11488 16.7108Z" stroke="#171717" strokeWidth="1.51917" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.11523 12.1541V9.11499" stroke="#171717" strokeWidth="1.51917" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.11523 6.07666H9.12283" stroke="#171717" strokeWidth="1.51917" stroke-linecap="round" stroke-linejoin="round"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_5_88">
                          <rect width="18.23" height="18.23" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  
                  {/* Hover tooltip explanation */}
                  <div className="h-[66.62999725341797px] flex flex-col opacity-0 group-hover/info:opacity-100 transition-opacity duration-150 absolute right-0 top-[22px] z-50 pointer-events-none">
                    <div className="w-80 flex flex-col bg-gradient-to-b from-[#2a2a2f] to-[#3a3a42] px-[12.647899627685547px] pt-[3.109999895095825px] pb-[4.519999980926514px] rounded-lg shadow-md">
                      <span className="font-normal text-[13.300000190734863px] leading-[19.40999984741211px] text-white">
                        Manage your site's templates. Select a layout, search presets, or generate customized structures using AI.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="h-0.5 border-t border-black/5"></div>
            </div>
            
            {/* Tabs Selector Navigation */}
            <div className="flex w-[434.0899963378906px] h-[44px] items-center justify-between mt-3">
              {/* Presets Tab Button */}
              <button
                onClick={() => setActivePickerTab("presets")}
                className={`w-[206.5px] h-10 rounded-[13px] relative cursor-pointer outline-none transition-all flex items-center justify-center gap-2 border ${
                  activePickerTab === "presets" 
                    ? "bg-white border-black/5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]" 
                    : "bg-[#f3f3f3] border-transparent hover:bg-zinc-200/50"
                }`}
              >
                <div className="w-[16.15999984741211px] h-[16.15999984741211px] flex items-center justify-center">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.08008 2.02002V10.1" stroke="black" strokeWidth="1.515" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.4467 5.38669L8.08005 2.02002L4.71338 5.38669" stroke="black" strokeWidth="1.515" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14.14 10.1V12.7933C14.14 13.1505 13.9981 13.493 13.7456 13.7455C13.493 13.9981 13.1505 14.14 12.7934 14.14H3.36669C3.00953 14.14 2.667 13.9981 2.41445 13.7455C2.1619 13.493 2.02002 13.1505 2.02002 12.7933V10.1" stroke="black" strokeWidth="1.515" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-medium text-[14.899999618530273px] leading-[23px] text-center text-black">Presets</span>
              </button>
              
              {/* Generate AI Tab Button */}
              <button
                onClick={() => setActivePickerTab("ai")}
                className="flex flex-col justify-start items-start cursor-pointer outline-none relative w-[210.52000427246094px]"
              >
                {activePickerTab === "ai" && (
                  <div className="w-[210.52000427246094px] h-12 opacity-[0.20] bg-gradient-to-b from-[#0894ff] via-[#c959dd] via-[#ff2e54] to-[#ff9004] absolute -top-[4px] -left-[2px] blur-sm rounded-[14px] pointer-events-none"></div>
                )}
                <div className="flex flex-col self-stretch p-0.5 rounded-[14px] w-full relative z-10">
                  <div className={`self-stretch h-10 rounded-[13px] flex items-center justify-center gap-2 border transition-all ${
                    activePickerTab === "ai" 
                      ? "bg-white border-black/5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]" 
                      : "bg-[#f3f3f3] border-transparent hover:bg-zinc-200/50"
                  }`}>
                    <div className="w-[16.15999984741211px] h-[16.15999984741211px] flex items-center justify-center">
                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_5_109)">
                          <path d="M7.41827 1.8948C7.44712 1.74034 7.52909 1.60083 7.64997 1.50044C7.77085 1.40005 7.92303 1.34509 8.08016 1.34509C8.23729 1.34509 8.38948 1.40005 8.51035 1.50044C8.63123 1.60083 8.7132 1.74034 8.74205 1.8948L9.44972 5.63718C9.49998 5.90325 9.62928 6.14799 9.82075 6.33945C10.0122 6.53092 10.2569 6.66022 10.523 6.71048L14.2654 7.41815C14.4199 7.447 14.5594 7.52896 14.6598 7.64984C14.7601 7.77072 14.8151 7.92291 14.8151 8.08004C14.8151 8.23717 14.7601 8.38935 14.6598 8.51023C14.5594 8.63111 14.4199 8.71307 14.2654 8.74192L10.523 9.4496C10.2569 9.49986 10.0122 9.62916 9.82075 9.82062C9.62928 10.0121 9.49998 10.2568 9.44972 10.5229L8.74205 14.2653C8.7132 14.4197 8.63123 14.5592 8.51035 14.6596C8.38948 14.76 8.23729 14.815 8.08016 14.815C7.92303 14.815 7.77085 14.76 7.64997 14.6596C7.52909 14.5592 7.44712 14.4197 7.41827 14.2653L6.7106 10.5229C6.66034 10.2568 6.53104 10.0121 6.33957 9.82062C6.14811 9.62916 5.90337 9.49986 5.63731 9.4496L1.89492 8.74192C1.74046 8.71307 1.60095 8.63111 1.50056 8.51023C1.40017 8.38935 1.34521 8.23717 1.34521 8.08004C1.34521 7.92291 1.40017 7.77072 1.50056 7.64984C1.60095 7.52896 1.74046 7.447 1.89492 7.41815L5.63731 6.71048C5.90337 6.66022 6.14811 6.53092 6.33957 6.33945C6.53104 6.14799 6.66034 5.90325 6.7106 5.63718L7.41827 1.8948Z" stroke="black" strokeWidth="1.515" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M13.4668 1.34668V4.03938" stroke="black" strokeWidth="1.515" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M14.8128 2.69336H12.1201" stroke="black" strokeWidth="1.515" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2.69303 14.8127C3.4366 14.8127 4.03938 14.2099 4.03938 13.4663C4.03938 12.7228 3.4366 12.12 2.69303 12.12C1.94946 12.12 1.34668 12.7228 1.34668 13.4663C1.34668 14.2099 1.94946 14.8127 2.69303 14.8127Z" stroke="black" strokeWidth="1.515" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_5_109">
                            <rect width="16.16" height="16.16" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <span className="font-medium text-[15.100000381469727px] leading-[23px] text-center text-black">Generate AI</span>
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
                  className="flex flex-col gap-3 mt-4"
                >
                  {/* Library Header */}
                  <div className="w-[434.0899963378906px] flex flex-col mt-1">
                    <span className="font-medium text-[14.899999618530273px] leading-[23px] text-black">Template Library</span>
                  </div>
                  
                  {/* Search Input Bar Container */}
                  <div className="w-[434.0899963378906px] h-10 flex items-center gap-[4.199999809265137px] bg-[#f3f3f3] px-[12.647899627685547px] rounded-[13px] border border-black/5 relative">
                    <div className="relative shrink-0 w-[22.440000534057617px] h-[16.158000946044922px] flex items-center justify-center">
                      <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[14px]">
                        <path d="M17.279 14.1379L14.3574 11.2163" stroke="black" strokeWidth="1.3465" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.5466 12.7918C13.5212 12.7918 15.9326 10.3804 15.9326 7.40578C15.9326 4.43117 13.5212 2.01978 10.5466 2.01978C7.57204 2.01978 5.16064 4.43117 5.16064 7.40578C5.16064 10.3804 7.57204 12.7918 10.5466 12.7918Z" stroke="black" strokeWidth="1.3465" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search templates..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="flex-1 bg-transparent border-none text-[14.600000381469727px] text-black placeholder:text-zinc-400 focus:outline-none focus:ring-0 p-0 font-normal ml-1"
                    />
                  </div>
                  
                  {/* Template preset cards grid list */}
                  <div className="grid grid-cols-2 gap-x-[15px] gap-y-[16px] w-[434.0899963378906px] h-[510px] overflow-y-auto mt-1 pb-4" style={{ scrollbarWidth: "none" }}>
                    {filteredTemplates.length > 0 ? (
                      filteredTemplates.map((template) => {
                        const isSelected = selected === template.id;
                        return (
                          <div
                            key={template.id}
                            onClick={() => onSelect(template.id)}
                            className={`w-[208.61000061035156px] h-[156.4499969482422px] bg-[#f3f3f3] rounded-[13px] relative overflow-hidden cursor-pointer group border transition-all ${
                              isSelected ? "border-blue-500 ring-1 ring-blue-500" : "border-black/5 hover:border-zinc-300"
                            }`}
                          >
                            {/* Template Virtual Preview */}
                            <div className="w-[208.61000061035156px] h-[156.4499969482422px] absolute inset-0 select-none pointer-events-none opacity-85">
                              <TemplatePreview template={template} />
                            </div>
                            
                            {/* Bottom Gradient overlay */}
                            <div className="w-[208.61000061035156px] h-[78.22116088867188px] absolute bottom-0 left-0 pointer-events-none">
                              <div className="w-[208.61000061035156px] h-[78.22116088867188px] bg-gradient-to-b from-black/0 to-black/80 absolute inset-0"></div>
                            </div>
                            
                            {/* Template Name tag */}
                            <div className="flex flex-col absolute bottom-3 left-3 z-10 pointer-events-none">
                              <div className="h-[23.079999923706055px] flex items-center">
                                <span className="font-medium text-[15.199999809265137px] leading-[23px] capitalize text-white truncate max-w-[180px]">
                                  {template.name}
                                </span>
                              </div>
                            </div>
                            
                            {/* Selected Badge Indicator */}
                            {isSelected && (
                              <div className="absolute top-2 right-2 w-5 h-5 rounded-lg bg-blue-500 flex items-center justify-center shadow-sm z-20">
                                <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
                              </div>
                            )}
                            
                            {/* Action Hover overlay */}
                            <div className="w-[208.61000061035156px] h-[156.4499969482422px] flex justify-center items-center bg-white/20 backdrop-blur-[1px] absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                              <div className="h-10 flex flex-col justify-center items-center bg-[#f3f3f3] px-[25.295799255371094px] py-[8px] rounded-[13px] shadow-sm">
                                <span className="font-medium text-[15.300000190734863px] leading-[23px] text-center text-black">
                                  {isSelected ? "Active" : "Select Layout"}
                                </span>
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
                  className="w-[434.0899963378906px] flex flex-col gap-4 mt-6"
                >
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-[13px] p-4 border border-[#E6E6E6]/60 flex flex-col gap-3">
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
                          className="text-left w-full px-3.5 py-2.5 bg-white hover:bg-zinc-50 border border-[#E6E6E6] rounded-xl text-[11px] font-semibold text-zinc-700 hover:text-black flex items-center justify-between transition-colors shadow-sm cursor-pointer"
                        >
                          <span>{prompt}</span>
                          <Sparkles className="w-3 h-3 text-zinc-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
