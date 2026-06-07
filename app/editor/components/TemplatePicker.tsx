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
  if (template.id === "daniel-cross") {
    return (
      <div className="w-full h-full p-3 flex items-center justify-center" style={{ backgroundColor: template.previewBg }}>
        <div className="w-full max-w-[140px] bg-white rounded-lg border border-[#E6E6E6] p-3 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
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

  return (
    <div className="w-full h-full p-3 flex items-center justify-center" style={{ backgroundColor: template.previewBg }}>
      <div className="w-full max-w-[140px] bg-white rounded-lg border border-[#E6E6E6] p-3 shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]">
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
                        <path d="M9.11488 16.7108C13.3099 16.7108 16.7107 13.3101 16.7107 9.115C16.7107 4.91994 13.3099 1.51917 9.11488 1.51917C4.91981 1.51917 1.51904 4.91994 1.51904 9.115C1.51904 13.3101 4.91981 16.7108 9.11488 16.7108Z" stroke="#171717" strokeWidth="1.51917" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.11523 12.1541V9.11499" stroke="#171717" strokeWidth="1.51917" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M9.11523 6.07666H9.12283" stroke="#171717" strokeWidth="1.51917" stroke-linecap="round" stroke-linejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_5_88">
                          <rect width="18.23" height="18.23" fill="white" />
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

            <div className="flex flex-col gap-3 mt-4">
              {/* Library Header */}


              {/* Search Input Bar Container */}
              <div className="w-[434.0899963378906px] h-10 flex items-center gap-[4.199999809265137px] bg-[#f3f3f3] px-[12.647899627685547px] rounded-[13px] border border-black/5 relative">
                <div className="relative shrink-0 w-[22.440000534057617px] h-[16.158000946044922px] flex items-center justify-center">
                  <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[14px]">
                    <path d="M17.279 14.1379L14.3574 11.2163" stroke="black" strokeWidth="1.3465" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.5466 12.7918C13.5212 12.7918 15.9326 10.3804 15.9326 7.40578C15.9326 4.43117 13.5212 2.01978 10.5466 2.01978C7.57204 2.01978 5.16064 4.43117 5.16064 7.40578C5.16064 10.3804 7.57204 12.7918 10.5466 12.7918Z" stroke="black" strokeWidth="1.3465" strokeLinecap="round" strokeLinejoin="round" />
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
              <div className="grid grid-cols-2 gap-x-[15px] gap-y-[16px] w-[434.0899963378906px]  overflow-y-auto mt-1 pb-4" style={{ scrollbarWidth: "none" }}>
                {filteredTemplates.length > 0 ? (
                  filteredTemplates.map((template) => {
                    const isSelected = selected === template.id;
                    return (
                      <div
                        key={template.id}
                        onClick={() => onSelect(template.id)}
                        className={`w-[208.61000061035156px] h-[156.4499969482422px] bg-[#f3f3f3] rounded-[13px] relative overflow-hidden cursor-pointer group border transition-all ${isSelected ? "border-blue-500 ring-1 ring-blue-500" : "border-black/5 hover:border-zinc-300"
                          }`}
                      >
                        {/* Template Virtual Preview */}
                        <div className="w-[208.61000061035156px] h-[156.4499969482422px] absolute inset-0 select-none pointer-events-none opacity-85">
                          <TemplatePreview template={template} />
                        </div>

                        {/* Bottom Gradient overlay */}
                        <div className="w-[208.61000061035156px] h-[78.22116088867188px] absolute bottom-0 left-0 pointer-events-none">
                          <div className="w-[208.61000061035156px] h-[78.22116088867188px] bg-gradient-to-b from-black/0 to-white/80 absolute inset-0"></div>
                        </div>

                        {/* Template Name tag */}
                        <div className="flex flex-col absolute bottom-3 left-3 z-10 pointer-events-none">
                          <div className="h-[23.079999923706055px] flex items-center">
                            <span className="font-medium text-[15.199999809265137px] leading-[23px] capitalize text-black/80 truncate max-w-[180px]">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
