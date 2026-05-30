"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Upload } from "lucide-react";
import { toast } from "sonner";

interface MediaItem {
  id: string;
  name: string;
  url: string;
}

const STOCK_MEDIA: MediaItem[] = [
  {
    id: "tech",
    name: "technology",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "fashion",
    name: "fashion",
    url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "business",
    name: "business",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "architecture",
    name: "architecture",
    url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "nature",
    name: "nature",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "food",
    name: "food",
    url: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&auto=format&fit=crop&q=80",
  },
];

export default function MediaPicker() {
  const [activePickerTab, setActivePickerTab] = useState<"uploads" | "ai">("uploads");
  const [search, setSearch] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const filteredMedia = STOCK_MEDIA.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleUploadClick = () => {
    toast.info("Upload functionality integration triggered!");
  };

  return (
    <div className="flex flex-col self-stretch grow">
      <div className="flex justify-center self-stretch pt-[21.07979965209961px]">
        <div className="flex flex-col justify-center self-stretch grow bg-[#fbfbfb] rounded-[13px] outline-1 outline-t-1 outline-l-1 outline-r-1 outline-b-1 outline outline-[#f3f3f3] relative overflow-hidden min-h-[832px]">
          {/* Background white sheet layer */}
          <div className="w-[486.25px] h-[831.4500122070312px] bg-white absolute left-0 top-0 rounded-[13px] pointer-events-none"></div>
          
          <div className="self-stretch grow relative z-10 flex flex-col items-center py-[21.08px]">
            {/* Background mask layer */}
            <div className="w-[486.25px] h-[831.4500122070312px] bg-gradient-to-b from-black via-black to-black absolute left-0 top-0 pointer-events-none opacity-0"></div>
            
            <div className="w-[434.0899963378906px] flex flex-col gap-[12.640000343322754px]">
              <div className="flex justify-between items-center self-stretch">
                <div className="w-[83.16px] h-[27.34000015258789px] flex items-center">
                  <span className="font-medium text-[17.899999618530273px] leading-[27.360000610351562px] text-neutral-900">Media</span>
                </div>
                
                <div className="flex flex-col relative group/info">
                  <div className="w-[18.229999542236328px] h-[18.229999542236328px] flex items-center justify-center cursor-pointer">
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[15.191665649414062px] h-[15.191665649414062px]">
                      <g clipPath="url(#clip0_5_88)">
                        <path d="M9.11488 16.7108C13.3099 16.7108 16.7107 13.3101 16.7107 9.115C16.7107 4.91994 13.3099 1.51917 9.11488 1.51917C4.91981 1.51917 1.51904 4.91994 1.51904 9.115C1.51904 13.3101 4.91981 16.7108 9.11488 16.7108Z" stroke="#171717" strokeWidth="1.51917" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.11523 12.1541V9.11499" stroke="#171717" strokeWidth="1.51917" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.11523 6.07666H9.12283" stroke="#171717" stroke-width="1.51917" stroke-linecap="round" stroke-linejoin="round"/>
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
                        Manage your site's visuals. Upload your own images, browse the library, or generate new ones with AI.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="h-0.5 border-t border-black/5"></div>
            </div>
            
            {/* Tabs Selector Navigation */}
            <div className="flex w-[434.0899963378906px] h-[44px] items-center justify-between mt-3">
              {/* Your Uploads Tab Button */}
              <button
                onClick={() => {
                  setActivePickerTab("uploads");
                  handleUploadClick();
                }}
                className={`w-[206.5px] h-10 rounded-[13px] relative cursor-pointer outline-none transition-all flex items-center justify-center gap-2 border ${
                  activePickerTab === "uploads" 
                    ? "bg-white border-black/5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]" 
                    : "bg-[#f3f3f3] border-transparent hover:bg-zinc-200/50"
                }`}
              >
                <div className="w-[16.15999984741211px] h-[16.15999984741211px] flex items-center justify-center">
                  <Upload className="w-4 h-4 text-black" />
                </div>
                <span className="font-medium text-[14.899999618530273px] leading-[23px] text-center text-black">Your Uploads</span>
              </button>
              
              {/* Generate Images Tab Button */}
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
                      <Sparkles className="w-4 h-4 text-black" />
                    </div>
                    <span className="font-medium text-[15.100000381469727px] leading-[23px] text-center text-black">Generate Images</span>
                  </div>
                </div>
              </button>
            </div>
            
            <AnimatePresence mode="wait">
              {activePickerTab === "uploads" ? (
                <motion.div
                  key="uploads"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col gap-3 mt-4"
                >
                  {/* Library Header */}
                  <div className="w-[434.0899963378906px] flex flex-col mt-1">
                    <span className="font-medium text-[14.899999618530273px] leading-[23px] text-black">Image Library</span>
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
                      placeholder="Search through image library"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="flex-1 bg-transparent border-none text-[14.600000381469727px] text-black placeholder:text-zinc-400 focus:outline-none focus:ring-0 p-0 font-normal ml-1"
                    />
                  </div>
                  
                  {/* Media preset cards grid list */}
                  <div className="flex flex-wrap gap-x-[16.8px] gap-y-[16px] w-[434.0899963378906px] h-[510px] overflow-y-auto pr-1 mt-1 pb-4" style={{ scrollbarWidth: "none" }}>
                    {filteredMedia.length > 0 ? (
                      filteredMedia.map((item) => {
                        const isSelected = selectedMedia === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              setSelectedMedia(item.id);
                              toast.success(`Selected ${item.name} image!`);
                            }}
                            className={`w-[208.61000061035156px] h-[156.4499969482422px] bg-[#f3f3f3] rounded-[13px] relative overflow-hidden cursor-pointer group border transition-all ${
                              isSelected ? "border-blue-500 ring-1 ring-blue-500" : "border-black/5 hover:border-zinc-300"
                            }`}
                          >
                            {/* Image element */}
                            <img 
                              src={item.url} 
                              alt={item.name}
                              className="w-[208.61000061035156px] h-[156.4499969482422px] object-cover absolute inset-0 select-none pointer-events-none opacity-85 group-hover:scale-105 transition-transform duration-300"
                            />
                            
                            {/* Bottom Gradient overlay */}
                            <div className="w-[208.61000061035156px] h-[78.22116088867188px] absolute bottom-0 left-0 pointer-events-none">
                              <div className="w-[208.61000061035156px] h-[78.22116088867188px] bg-gradient-to-b from-black/0 to-black/80 absolute inset-0"></div>
                            </div>
                            
                            {/* Media tag */}
                            <div className="flex flex-col absolute bottom-3 left-3 z-10 pointer-events-none">
                              <div className="h-[23.079999923706055px] flex items-center">
                                <span className="font-medium text-[15.199999809265137px] leading-[23px] capitalize text-white truncate max-w-[180px]">
                                  {item.name}
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
                                  {isSelected ? "Active" : "Explore"}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-8 text-center text-xs text-zinc-400 w-full">
                        No images match your search.
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
                      <span>AI Image Generator</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-relaxed">
                      Describe the concept or image style you desire, and our AI will automatically construct a customized image matching your request.
                    </p>
                    <div className="flex flex-col gap-2 mt-1">
                      {[
                        "Modern clean workspace mockup",
                        "High fashion editorial photoshoot model",
                        "Business professional handshake close-up",
                        "Stunning high rise architecture skyscraper",
                      ].map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => {
                            toast.loading(`Analyzing description and generating image...`);
                            setTimeout(() => {
                              toast.dismiss();
                              toast.success("AI image successfully generated!");
                              setActivePickerTab("uploads");
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
