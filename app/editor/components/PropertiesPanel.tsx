"use client";

import React from "react";
import { ProfileData, ProfileExperience, ProfileLink, ProfileProject } from "@/shared/types";
import { 
  User, Briefcase, Link as LinkIcon, Folder, Plus, Trash2, 
  Wrench, MessageSquare, ArrowLeft, X, Palette, Image as ImageIcon, Upload 
} from "lucide-react";
import { toast } from "sonner";

interface PropertiesPanelProps {
  profile: ProfileData;
  selectedField: string | null;
  selectedIndex?: number;
  onChange: <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => void;
  onClose: () => void;
  onSelectField: (field: string | null, index?: number) => void;
}

export default function PropertiesPanel({
  profile,
  selectedField,
  selectedIndex,
  onChange,
  onClose,
  onSelectField,
}: PropertiesPanelProps) {


  // Helper to handle local base64 image uploads
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    index?: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image file is too large (max 2MB)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (index !== undefined) {
        if (field === "projects") {
          const list = [...(profile.projects || [])];
          list[index] = { ...list[index], image: base64 };
          onChange("projects", list);
        } else if (field === "testimonials") {
          const list = [...(profile.testimonials || [])];
          list[index] = { ...list[index], avatarUrl: base64 };
          onChange("testimonials", list);
        }
      } else {
        onChange(field as any, base64);
      }
      toast.success("Image updated successfully!");
    };
    reader.readAsDataURL(file);
  };

  // Helper for updating theme colors
  const updateThemeColor = (key: string, value: string) => {
    const themeColors = profile.themeColors || {};
    onChange("themeColors", {
      ...themeColors,
      [key]: value,
    });
  };

  const resetThemeColors = () => {
    onChange("themeColors", undefined);
    toast.success("Theme colors reset to template defaults!");
  };



  const themeColors = profile.themeColors || {};

  // Form wrappers and fields
  const renderProfileFields = () => (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Full Name</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Name"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Headline</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.headline}
          onChange={(e) => onChange("headline", e.target.value)}
          placeholder="Role or headline"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Location</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.location ?? "London-UK"}
          onChange={(e) => onChange("location", e.target.value)}
          placeholder="London-UK"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Summary / Bio</label>
        <textarea
          className="min-h-[120px] border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl p-3.5 text-sm transition-colors outline-none resize-none leading-relaxed"
          value={profile.summary}
          onChange={(e) => onChange("summary", e.target.value)}
          placeholder="Write your professional bio..."
          rows={4}
        />
      </div>
    </div>
  );

  const renderGraphicsFields = (activeField: string) => {
    const graphics = [
      { id: "avatarUrl", label: "Profile Avatar Image", value: profile.avatarUrl },
      { id: "bannerUrl", label: "Hero Portrait Photo", value: profile.bannerUrl || profile.avatarUrl },
      { id: "aboutPhotoUrl", label: "About Section Portrait", value: profile.aboutPhotoUrl },
      { id: "signatureUrl", label: "Handwritten Signature", value: profile.signatureUrl },
      { id: "footerBannerUrl", label: "Footer Work Banner Background", value: profile.footerBannerUrl }
    ];

    const currentImg = graphics.find(g => g.id === activeField) || graphics[0];

    return (
      <div className="space-y-5 animate-in fade-in duration-200 text-left">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">{currentImg.label}</label>
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 flex flex-col items-center gap-3">
            {currentImg.value ? (
              <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-neutral-200/80 shadow-sm bg-white flex items-center justify-center">
                <img src={currentImg.value} alt={currentImg.label} className="w-full h-full object-cover" />
                <button
                  onClick={() => onChange(currentImg.id as any, "")}
                  className="absolute top-1 right-1 w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center active:scale-95 shadow-md border-none"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-xl border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center text-neutral-400 select-none">
                <ImageIcon className="w-8 h-8 stroke-[1.25]" />
                <span className="text-[10px] mt-1.5 font-medium">No image URL</span>
              </div>
            )}

            <div className="flex gap-2 w-full mt-1">
              <input
                type="file"
                id={`file-graphic-${currentImg.id}`}
                accept="image/*"
                onChange={(e) => handleImageUpload(e, currentImg.id)}
                className="hidden"
              />
              <button
                onClick={() => document.getElementById(`file-graphic-${currentImg.id}`)?.click()}
                className="flex-1 h-9 bg-neutral-900 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 active:scale-[0.97] transition-transform duration-100 shadow-sm hover:bg-neutral-800 cursor-pointer border-none"
              >
                <Upload className="w-3.5 h-3.5" /> Upload File
              </button>
              {currentImg.value && (
                <button
                  onClick={() => onChange(currentImg.id as any, "")}
                  className="h-9 px-3 border border-neutral-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-neutral-700 bg-white rounded-lg text-xs font-semibold active:scale-[0.97] transition-all"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Image URL Override</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-xs transition-colors outline-none font-mono"
            value={currentImg.value || ""}
            onChange={(e) => onChange(currentImg.id as any, e.target.value)}
            placeholder="https://images.unsplash.com/... or data:image/png;base64,..."
          />
        </div>
      </div>
    );
  };

  const renderColorPalette = () => (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Accent Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={themeColors.accentColor || "#4a3429"}
              onChange={(e) => updateThemeColor("accentColor", e.target.value)}
              className="w-8 h-8 rounded-lg border border-neutral-200 cursor-pointer overflow-hidden p-0 shrink-0 bg-transparent"
            />
            <input
              type="text"
              value={themeColors.accentColor || "#4a3429"}
              onChange={(e) => updateThemeColor("accentColor", e.target.value)}
              className="w-full h-8 text-[11px] border border-neutral-200 rounded-lg px-2 outline-none font-mono"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Background</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={themeColors.primaryBg || "#e9e6e2"}
              onChange={(e) => updateThemeColor("primaryBg", e.target.value)}
              className="w-8 h-8 rounded-lg border border-neutral-200 cursor-pointer overflow-hidden p-0 shrink-0 bg-transparent"
            />
            <input
              type="text"
              value={themeColors.primaryBg || "#e9e6e2"}
              onChange={(e) => updateThemeColor("primaryBg", e.target.value)}
              className="w-full h-8 text-[11px] border border-neutral-200 rounded-lg px-2 outline-none font-mono"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Card Background</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={themeColors.cardBg || "#edeae7"}
              onChange={(e) => updateThemeColor("cardBg", e.target.value)}
              className="w-8 h-8 rounded-lg border border-neutral-200 cursor-pointer overflow-hidden p-0 shrink-0 bg-transparent"
            />
            <input
              type="text"
              value={themeColors.cardBg || "#edeae7"}
              onChange={(e) => updateThemeColor("cardBg", e.target.value)}
              className="w-full h-8 text-[11px] border border-neutral-200 rounded-lg px-2 outline-none font-mono"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Text Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={themeColors.textPrimary || "#000000"}
              onChange={(e) => updateThemeColor("textPrimary", e.target.value)}
              className="w-8 h-8 rounded-lg border border-neutral-200 cursor-pointer overflow-hidden p-0 shrink-0 bg-transparent"
            />
            <input
              type="text"
              value={themeColors.textPrimary || "#000000"}
              onChange={(e) => updateThemeColor("textPrimary", e.target.value)}
              className="w-full h-8 text-[11px] border border-neutral-200 rounded-lg px-2 outline-none font-mono"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 text-left">
        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Secondary Text Color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={themeColors.textMuted || "#8a8a8a"}
            onChange={(e) => updateThemeColor("textMuted", e.target.value)}
            className="w-8 h-8 rounded-lg border border-neutral-200 cursor-pointer overflow-hidden p-0 shrink-0 bg-transparent"
          />
          <input
            type="text"
            value={themeColors.textMuted || "#8a8a8a"}
            onChange={(e) => updateThemeColor("textMuted", e.target.value)}
            className="w-full h-8 text-[11px] border border-neutral-200 rounded-lg px-2 outline-none font-mono"
          />
        </div>
      </div>

      <div className="pt-2 border-t border-neutral-100 flex gap-2">
        <button
          onClick={resetThemeColors}
          className="flex-1 h-9 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 bg-white rounded-lg text-xs font-semibold active:scale-[0.97]"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );

  const renderProjectEditor = (idx: number) => {
    const list = profile.projects || [];
    const proj = list[idx];

    if (!proj) {
      return (
        <div className="text-sm text-neutral-500 py-4">Project not found</div>
      );
    }

    const updateProjField = (key: keyof ProfileProject, value: string) => {
      const next = [...list];
      next[idx] = { ...next[idx], [key]: value };
      onChange("projects", next);
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-200 text-left">
        <button
          onClick={() => onSelectField("projects_list")}
          className="h-8 px-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-semibold flex items-center gap-1 active:scale-[0.97] transition-all border-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to projects list
        </button>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Project Title</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={proj.title}
            onChange={(e) => updateProjField("title", e.target.value)}
            placeholder="Title"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Link / URL</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-xs transition-colors outline-none font-mono"
            value={proj.link || ""}
            onChange={(e) => updateProjField("link", e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Project Cover Image</label>
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 flex flex-col items-center gap-3">
            {proj.image ? (
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-neutral-200 shadow-sm bg-white">
                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-full aspect-[16/10] rounded-xl border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center text-neutral-400 select-none">
                <ImageIcon className="w-8 h-8 stroke-[1.25]" />
                <span className="text-[10px] mt-1.5 font-medium">No image uploaded</span>
              </div>
            )}

            <div className="flex gap-2 w-full mt-1">
              <input
                type="file"
                id={`file-project-${idx}`}
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "projects", idx)}
                className="hidden"
              />
              <button
                onClick={() => document.getElementById(`file-project-${idx}`)?.click()}
                className="flex-1 h-9 bg-neutral-900 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 active:scale-[0.97] transition-transform duration-100 shadow-sm hover:bg-neutral-800 cursor-pointer border-none"
              >
                <Upload className="w-3.5 h-3.5" /> Upload File
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Image URL Override</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-xs transition-colors outline-none font-mono"
            value={proj.image || ""}
            onChange={(e) => updateProjField("image", e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div className="pt-2 border-t border-neutral-100 flex gap-2">
          <button
            onClick={() => {
              const next = list.filter((_, i) => i !== idx);
              onChange("projects", next);
              onSelectField("projects_list");
              toast.success("Project deleted successfully");
            }}
            className="flex-1 h-10 border border-red-200 text-red-600 bg-white hover:bg-red-50 rounded-xl text-xs font-semibold active:scale-[0.97] transition-all flex items-center justify-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete Project
          </button>
        </div>
      </div>
    );
  };

  const renderProjectsList = () => {
    const list = profile.projects || [];
    return (
      <div className="space-y-4 animate-in fade-in duration-200 text-left">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Project Cards ({list.length})</span>
          <button
            onClick={() => {
              const next = [
                ...list,
                {
                  title: "New Project",
                  description: "Design description",
                  link: "#",
                  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60"
                }
              ];
              onChange("projects", next);
              onSelectField("project", next.length - 1);
              toast.success("New project added! Customizing...");
            }}
            className="h-8 px-2.5 bg-neutral-900 text-white rounded-lg text-xs font-bold flex items-center gap-1 active:scale-[0.97] cursor-pointer border-none"
          >
            <Plus className="w-3.5 h-3.5" /> Add Project
          </button>
        </div>

        <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
          {list.map((proj, idx) => (
            <div
              key={idx}
              onClick={() => onSelectField("project", idx)}
              className="p-3 bg-neutral-50/50 hover:bg-neutral-50 border border-neutral-200/60 rounded-xl flex items-center justify-between cursor-pointer group active:scale-[0.99] transition-transform duration-100 text-left"
            >
              <div className="flex items-center gap-3 min-w-0 pr-4">
                {proj.image ? (
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-neutral-200 shrink-0">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 border border-neutral-200">
                    <Folder className="w-4 h-4 text-neutral-400" />
                  </div>
                )}
                <div className="truncate">
                  <span className="text-xs font-bold text-neutral-800 block truncate">{proj.title}</span>
                  <span className="text-[10px] text-neutral-400 block truncate mt-0.5 font-mono">{proj.link || "No URL link"}</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const next = list.filter((_, i) => i !== idx);
                  onChange("projects", next);
                  toast.success("Project deleted");
                }}
                className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-red-650 p-1 rounded-lg transition-opacity duration-100 border-none bg-transparent"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {list.length === 0 && (
            <div className="text-center py-8 text-xs text-neutral-400 italic">No projects found. Add one above!</div>
          )}
        </div>
      </div>
    );
  };

  const renderExperienceList = () => {
    const list = profile.experience || [];

    const updateExpItem = (idx: number, field: keyof ProfileExperience, val: string) => {
      const next = [...list];
      next[idx] = { ...next[idx], [field]: val };
      onChange("experience", next);
    };

    const addExp = () => {
      const next = [
        ...list,
        {
          title: "Senior Lead Designer",
          company: "Workspace",
          duration: "2024 – Present",
          description: "Responsible for leading team deliverables and prototypes."
        }
      ];
      onChange("experience", next);
      toast.success("Added new work experience!");
    };

    const removeExp = (idx: number) => {
      const next = list.filter((_, i) => i !== idx);
      onChange("experience", next);
      toast.success("Removed work experience");
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-200 text-left">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide font-inter">Work Timeline ({list.length})</span>
          <button
            onClick={addExp}
            className="h-8 px-2.5 bg-neutral-900 text-white rounded-lg text-xs font-bold flex items-center gap-1 active:scale-[0.97] cursor-pointer border-none"
          >
            <Plus className="w-3.5 h-3.5" /> Add Job
          </button>
        </div>

        <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
          {list.map((exp, idx) => (
            <div key={idx} className="group bg-neutral-50/20 hover:bg-neutral-50/50 border border-neutral-200 rounded-xl p-3.5 space-y-3 relative transition-colors duration-150">
              <button
                onClick={() => removeExp(idx)}
                className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1.5 rounded-lg border border-neutral-200/50 bg-white hover:bg-red-50 text-neutral-400 hover:text-red-650 active:scale-95 transition-all shadow-xs border-none"
                title="Delete item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-wider">Job Title</label>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => updateExpItem(idx, "title", e.target.value)}
                    className="h-9 text-xs border border-neutral-200 rounded-lg px-2.5 bg-white outline-none focus:border-neutral-400"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-wider">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExpItem(idx, "company", e.target.value)}
                    className="h-9 text-xs border border-neutral-200 rounded-lg px-2.5 bg-white outline-none focus:border-neutral-400"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-wider">Duration / Dates</label>
                <input
                  type="text"
                  value={exp.duration}
                  onChange={(e) => updateExpItem(idx, "duration", e.target.value)}
                  className="h-9 text-xs border border-neutral-200 rounded-lg px-2.5 bg-white outline-none focus:border-neutral-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-wider">Job Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExpItem(idx, "description", e.target.value)}
                  className="text-xs border border-neutral-200 rounded-lg p-2 bg-white resize-none leading-relaxed focus:border-neutral-400 h-16 outline-none"
                  rows={2}
                />
              </div>
            </div>
          ))}

          {list.length === 0 && (
            <div className="text-center py-6 text-xs text-neutral-400 italic">No work history found. Add one above!</div>
          )}
        </div>
      </div>
    );
  };

  const renderServicesEditor = (idx?: number) => {
    const list = profile.services || [];
    const cta = profile.servicesCta || {
      title: "Book A 30 min Free Call",
      text: "Let’s connect to discuss your design needs, explore creative ideas, and plan your project effectively together.",
      buttonText: "Book A Call",
      buttonUrl: "#contact"
    };

    const updateServiceField = (sIdx: number, field: string, val: string) => {
      const next = [...list];
      next[sIdx] = { ...next[sIdx], [field]: val };
      onChange("services", next);
    };

    const addServiceItem = () => {
      const next = [
        ...list,
        { title: "New Service Offered", price: "$400", description: "Design package description." }
      ];
      onChange("services", next);
      toast.success("Service card added successfully!");
    };

    const removeServiceItem = (sIdx: number) => {
      const next = list.filter((_, i) => i !== sIdx);
      onChange("services", next);
      toast.success("Service card removed");
    };

    const updateCta = (field: string, val: string) => {
      onChange("servicesCta", {
        ...cta,
        [field]: val
      });
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-200 text-left pr-1" style={{ scrollbarWidth: "none" }}>
        
        {/* Services Section Title */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Section Headline</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.servicesTitle || ""}
            onChange={(e) => onChange("servicesTitle", e.target.value)}
            placeholder="Turning ideas into digital experiences"
          />
        </div>

        {/* Services List cards */}
        <div className="pt-2 border-t border-neutral-100 space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Service Cards ({list.length})</span>
            <button
              onClick={addServiceItem}
              className="h-7 px-2 bg-neutral-900 text-white rounded-lg text-[10.5px] font-bold flex items-center gap-1 active:scale-[0.97] border-none cursor-pointer"
            >
              <Plus className="w-3 h-3" /> Add Card
            </button>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
            {list.map((srv, sIdx) => {
              const isSelected = selectedField === "service" && selectedIndex === sIdx;
              return (
                <div key={sIdx} className={`p-3 border rounded-xl space-y-2 relative transition-all group ${
                  isSelected ? "border-blue-500 bg-blue-50/10" : "border-neutral-200 bg-neutral-50/10"
                }`}>
                  <button
                    onClick={() => removeServiceItem(sIdx)}
                    className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1 text-neutral-400 hover:text-red-650 border-none bg-transparent cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={srv.title}
                      placeholder="Title"
                      onChange={(e) => updateServiceField(sIdx, "title", e.target.value)}
                      className="col-span-2 h-8 text-xs border border-neutral-200 rounded-lg px-2 bg-white outline-none"
                    />
                    <input
                      type="text"
                      value={srv.price}
                      placeholder="Price"
                      onChange={(e) => updateServiceField(sIdx, "price", e.target.value)}
                      className="h-8 text-xs border border-neutral-200 rounded-lg px-2 bg-white outline-none text-right font-mono"
                    />
                  </div>
                  <textarea
                    value={srv.description}
                    placeholder="Brief description of deliverables..."
                    onChange={(e) => updateServiceField(sIdx, "description", e.target.value)}
                    className="w-full text-xs border border-neutral-200 rounded-lg p-2 bg-white resize-none outline-none"
                    rows={2}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Card Offer */}
        <div className="pt-3 border-t border-neutral-100 space-y-3.5">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide block">Call-To-Action Offer Block</span>
          <div className="p-3.5 bg-neutral-50/30 border border-neutral-200 rounded-xl space-y-3">
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">CTA Title</label>
              <input
                type="text"
                value={cta.title}
                onChange={(e) => updateCta("title", e.target.value)}
                className="h-9 text-xs border border-neutral-200 rounded-lg px-2.5 bg-white outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">CTA Description Text</label>
              <textarea
                value={cta.text}
                onChange={(e) => updateCta("text", e.target.value)}
                className="text-xs border border-neutral-200 rounded-lg p-2 bg-white resize-none h-16 outline-none leading-relaxed"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">Button Label</label>
                <input
                  type="text"
                  value={cta.buttonText}
                  onChange={(e) => updateCta("buttonText", e.target.value)}
                  className="h-9 text-xs border border-neutral-200 rounded-lg px-2.5 bg-white outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">Button Link / URL</label>
                <input
                  type="text"
                  value={cta.buttonUrl}
                  onChange={(e) => updateCta("buttonUrl", e.target.value)}
                  className="h-9 text-[11px] border border-neutral-200 rounded-lg px-2 bg-white outline-none font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProcessEditor = () => {
    const list = profile.processes || [];

    const updateStepField = (idx: number, field: string, val: string) => {
      const next = [...list];
      next[idx] = { ...next[idx], [field]: val };
      onChange("processes", next);
    };

    const addStep = () => {
      const stepsCount = list.length;
      const next = [
        ...list,
        { stepTag: `/0${stepsCount + 1}`, title: "New Step Title", description: "Design phase details." }
      ];
      onChange("processes", next);
      toast.success("Process step added successfully!");
    };

    const removeStep = (idx: number) => {
      const next = list.filter((_, i) => i !== idx);
      onChange("processes", next);
      toast.success("Process step removed");
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-200 text-left">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Section Headline</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.processTitle || ""}
            onChange={(e) => onChange("processTitle", e.target.value)}
            placeholder="From ideas to impactful creative results."
          />
        </div>

        <div className="pt-2 border-t border-neutral-100 space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Process Steps ({list.length})</span>
            <button
              onClick={addStep}
              className="h-7 px-2.5 bg-neutral-900 text-white rounded-lg text-xs font-bold flex items-center gap-1 active:scale-[0.97] border-none cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Step
            </button>
          </div>

          <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
            {list.map((step, idx) => (
              <div key={idx} className="group bg-neutral-50/20 hover:bg-neutral-50/50 border border-neutral-200 rounded-xl p-3.5 space-y-2.5 relative transition-colors">
                <button
                  onClick={() => removeStep(idx)}
                  className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1 text-neutral-400 hover:text-red-650 border-none bg-transparent cursor-pointer"
                  title="Remove step"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="grid grid-cols-4 gap-2">
                  <input
                    type="text"
                    value={step.stepTag}
                    placeholder="/01"
                    onChange={(e) => updateStepField(idx, "stepTag", e.target.value)}
                    className="h-8 text-xs border border-neutral-200 rounded-lg px-2 bg-white outline-none font-mono text-center"
                  />
                  <input
                    type="text"
                    value={step.title}
                    placeholder="Step Title"
                    onChange={(e) => updateStepField(idx, "title", e.target.value)}
                    className="col-span-3 h-8 text-xs border border-neutral-200 rounded-lg px-2.5 bg-white outline-none font-semibold"
                  />
                </div>
                <textarea
                  value={step.description}
                  placeholder="Phase details description..."
                  onChange={(e) => updateStepField(idx, "description", e.target.value)}
                  className="w-full text-xs border border-neutral-200 rounded-lg p-2 bg-white resize-none outline-none leading-relaxed"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTestimonialsEditor = () => {
    const list = profile.testimonials || [];

    const updateTestimonialField = (idx: number, field: string, val: string) => {
      const next = [...list];
      next[idx] = { ...next[idx], [field]: val };
      onChange("testimonials", next);
    };

    const addReview = () => {
      const next = [
        ...list,
        { quote: "Outstanding work and communication.", name: "Client Name", role: "CEO, Innovent", avatarUrl: "" }
      ];
      onChange("testimonials", next);
      toast.success("Review card added!");
    };

    const removeReview = (idx: number) => {
      const next = list.filter((_, i) => i !== idx);
      onChange("testimonials", next);
      toast.success("Review card removed");
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-200 text-left">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Section Headline</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.testimonialsTitle || ""}
            onChange={(e) => onChange("testimonialsTitle", e.target.value)}
            placeholder="Voices of trust from happy clients"
          />
        </div>

        <div className="pt-2 border-t border-neutral-100 space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Client Testimonials ({list.length})</span>
            <button
              onClick={addReview}
              className="h-7 px-2.5 bg-neutral-900 text-white rounded-lg text-xs font-bold flex items-center gap-1 active:scale-[0.97] border-none cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Review
            </button>
          </div>

          <div className="space-y-3.5 max-h-[440px] overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
            {list.map((review, idx) => (
              <div key={idx} className="group bg-neutral-50/20 hover:bg-neutral-50/50 border border-neutral-200 rounded-xl p-3.5 space-y-2.5 relative transition-colors">
                <button
                  onClick={() => removeReview(idx)}
                  className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1 text-neutral-400 hover:text-red-650 border-none bg-transparent cursor-pointer"
                  title="Remove review"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Quote / Feedback</label>
                  <textarea
                    value={review.quote}
                    onChange={(e) => updateTestimonialField(idx, "quote", e.target.value)}
                    className="text-xs border border-neutral-200 rounded-lg p-2.5 bg-white resize-none outline-none leading-relaxed h-16"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Client Name</label>
                    <input
                      type="text"
                      value={review.name}
                      onChange={(e) => updateTestimonialField(idx, "name", e.target.value)}
                      className="h-8 text-xs border border-neutral-200 rounded-lg px-2 bg-white outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Client Role</label>
                    <input
                      type="text"
                      value={review.role}
                      onChange={(e) => updateTestimonialField(idx, "role", e.target.value)}
                      className="h-8 text-xs border border-neutral-200 rounded-lg px-2 bg-white outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Client Avatar Photo</label>
                  <div className="flex items-center gap-3 bg-neutral-50/50 p-2 border border-neutral-200 rounded-lg">
                    {review.avatarUrl ? (
                      <img src={review.avatarUrl} alt={review.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 border border-neutral-200">
                        <ImageIcon className="w-4 h-4 text-neutral-400" />
                      </div>
                    )}
                    <input
                      type="file"
                      id={`file-review-${idx}`}
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "testimonials", idx)}
                      className="hidden"
                    />
                    <button
                      onClick={() => document.getElementById(`file-review-${idx}`)?.click()}
                      className="px-2.5 py-1 bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 rounded text-[10.5px] font-bold transition-all border-none cursor-pointer"
                    >
                      Upload File
                    </button>
                    <input
                      type="text"
                      value={review.avatarUrl || ""}
                      placeholder="Or paste URL"
                      onChange={(e) => updateTestimonialField(idx, "avatarUrl", e.target.value)}
                      className="flex-1 h-7 text-[10.5px] border border-neutral-200 rounded px-2 bg-white font-mono"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderLinksEditor = () => {
    const list = profile.links || [];

    const updateLinkItem = (idx: number, field: keyof ProfileLink, val: string) => {
      const next = [...list];
      next[idx] = { ...next[idx], [field]: val };
      onChange("links", next);
    };

    const addLinkItem = () => {
      const next = [
        ...list,
        { label: "Website", url: "https://", icon: "website" as const }
      ];
      onChange("links", next);
      toast.success("Added new profile link!");
    };

    const removeLinkItem = (idx: number) => {
      const next = list.filter((_, i) => i !== idx);
      onChange("links", next);
      toast.success("Link removed");
    };

    return (
      <div className="space-y-4 animate-in fade-in duration-200 text-left">
        <div className="flex flex-col gap-1 pb-4 border-b border-neutral-100">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Phone Number</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+44 7700 900123"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Social & Portfolio Links ({list.length})</span>
          <button
            onClick={addLinkItem}
            className="h-8 px-2.5 bg-neutral-900 text-white rounded-lg text-xs font-bold flex items-center gap-1 active:scale-[0.97] cursor-pointer border-none"
          >
            <Plus className="w-3.5 h-3.5" /> Add Link
          </button>
        </div>

        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
          {list.map((lnk, idx) => (
            <div key={idx} className="group bg-neutral-50/20 hover:bg-neutral-50/50 border border-neutral-200 rounded-xl p-3 space-y-2.5 relative transition-colors">
              <button
                onClick={() => removeLinkItem(idx)}
                className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1 text-neutral-400 hover:text-red-650 border-none bg-transparent cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">Label</label>
                  <input
                    type="text"
                    value={lnk.label}
                    onChange={(e) => updateLinkItem(idx, "label", e.target.value)}
                    className="h-9 text-xs border border-neutral-200 rounded-lg px-2.5 bg-white outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">Icon Type</label>
                  <select
                    value={lnk.icon || "other"}
                    onChange={(e) => updateLinkItem(idx, "icon", e.target.value as any)}
                    className="h-9 text-xs border border-neutral-200 rounded-lg px-2 bg-white outline-none"
                  >
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter / X</option>
                    <option value="github">GitHub</option>
                    <option value="website">Website</option>
                    <option value="email">Email</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">URL Link</label>
                <input
                  type="text"
                  value={lnk.url}
                  onChange={(e) => updateLinkItem(idx, "url", e.target.value)}
                  className="h-9 text-[11px] border border-neutral-200 rounded-lg px-2.5 bg-white font-mono outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderHeroFields = () => {
    const firstName = profile.name ? profile.name.split(" ")[0].toLowerCase() : "daniel";
    return (
      <div className="space-y-4 animate-in fade-in duration-200 text-left">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Hero Badge Text</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.heroBadgeText ?? "Welcome here ❤️"}
            onChange={(e) => onChange("heroBadgeText", e.target.value)}
            placeholder="Welcome here ❤️"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Greeting Start</label>
            <input
              type="text"
              className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-2 text-xs transition-colors outline-none"
              value={profile.heroGreetingStart ?? "Hey,"}
              onChange={(e) => onChange("heroGreetingStart", e.target.value)}
              placeholder="Hey,"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Name Text</label>
            <input
              type="text"
              className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-2 text-xs transition-colors outline-none"
              value={profile.heroGreetingName ?? firstName}
              onChange={(e) => onChange("heroGreetingName", e.target.value)}
              placeholder="daniel"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Greeting End</label>
            <input
              type="text"
              className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-2 text-xs transition-colors outline-none"
              value={profile.heroGreetingEnd ?? "here"}
              onChange={(e) => onChange("heroGreetingEnd", e.target.value)}
              placeholder="here"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Hero Subheadline (Inline Wrap)</label>
          <textarea
            className="min-h-[80px] border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl p-3.5 text-sm transition-colors outline-none resize-none leading-relaxed"
            value={profile.heroSubheadline ?? "I design Interfaces, experiences, & brands."}
            onChange={(e) => onChange("heroSubheadline", e.target.value)}
            placeholder="I design Interfaces, experiences, & brands."
            rows={3}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Hero CTA Button Text</label>
            <input
              type="text"
              className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
              value={profile.heroCtaText ?? "Book A Call"}
              onChange={(e) => onChange("heroCtaText", e.target.value)}
              placeholder="Book A Call"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Hero CTA Button Link</label>
            <input
              type="text"
              className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none font-mono"
              value={profile.heroCtaUrl ?? "#contact"}
              onChange={(e) => onChange("heroCtaUrl", e.target.value)}
              placeholder="#contact"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Hero Rating Text</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.heroRatingText ?? "4.9 / 5"}
            onChange={(e) => onChange("heroRatingText", e.target.value)}
            placeholder="4.9 / 5"
          />
        </div>
      </div>
    );
  };

  const renderLabelsFields = () => (
    <div className="space-y-4 animate-in fade-in duration-200 text-left max-h-[580px] overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Services Tag Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.servicesLabel ?? "What I Do"}
          onChange={(e) => onChange("servicesLabel", e.target.value)}
          placeholder="What I Do"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">About Section Tag Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.aboutLabel ?? "About me"}
          onChange={(e) => onChange("aboutLabel", e.target.value)}
          placeholder="About me"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Brands Ticker Tag Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.brandsLabel ?? "Worked with Global Brands"}
          onChange={(e) => onChange("brandsLabel", e.target.value)}
          placeholder="Worked with Global Brands"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Projects Section Tag Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.projectsLabel ?? "My Portfolio"}
          onChange={(e) => onChange("projectsLabel", e.target.value)}
          placeholder="My Portfolio"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Projects Section Subtitle</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.projectsSubtitle ?? "Every project built to inspire users"}
          onChange={(e) => onChange("projectsSubtitle", e.target.value)}
          placeholder="Every project built to inspire users"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Explore Projects Button Label</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.projectsExploreText ?? "Explore All"}
            onChange={(e) => onChange("projectsExploreText", e.target.value)}
            placeholder="Explore All"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Explore Projects Button URL</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none font-mono"
            value={profile.projectsExploreUrl ?? "#work"}
            onChange={(e) => onChange("projectsExploreUrl", e.target.value)}
            placeholder="#work"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Process Section Tag Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.processLabel ?? "My Process"}
          onChange={(e) => onChange("processLabel", e.target.value)}
          placeholder="My Process"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Testimonials Section Tag Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.testimonialsLabel ?? "Reviews"}
          onChange={(e) => onChange("testimonialsLabel", e.target.value)}
          placeholder="Reviews"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Footer Section Tag Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.footerLabel ?? "Have a question"}
          onChange={(e) => onChange("footerLabel", e.target.value)}
          placeholder="Have a question"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Status Tag Text</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.statusText ?? "Available for work"}
          onChange={(e) => onChange("statusText", e.target.value)}
          placeholder="Available for work"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Follow Me Header Text</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.followMeLabel ?? "Follow me"}
          onChange={(e) => onChange("followMeLabel", e.target.value)}
          placeholder="Follow me"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Footer Credit Intro</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.footerCreditText ?? "Template by"}
            onChange={(e) => onChange("footerCreditText", e.target.value)}
            placeholder="Template by"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Footer Credit Name</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.footerCreditName ?? "Muddasir Hussain"}
            onChange={(e) => onChange("footerCreditName", e.target.value)}
            placeholder="Muddasir Hussain"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Framer Badge Text</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.builtInFramerText ?? "Built in"}
            onChange={(e) => onChange("builtInFramerText", e.target.value)}
            placeholder="Built in"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Framer Link Text</label>
          <input
            type="text"
            className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-405 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
            value={profile.builtInFramerUrl ?? "Framer"}
            onChange={(e) => onChange("builtInFramerUrl", e.target.value)}
            placeholder="Framer"
          />
        </div>
      </div>
    </div>
  );

  const renderNavigationFields = () => (
    <div className="space-y-4 animate-in fade-in duration-200 text-left">
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Home Nav Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.navHomeText ?? "Home"}
          onChange={(e) => onChange("navHomeText", e.target.value)}
          placeholder="Home"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">About Nav Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.navAboutText ?? "About"}
          onChange={(e) => onChange("navAboutText", e.target.value)}
          placeholder="About"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Projects Nav Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.navProjectsText ?? "Projects"}
          onChange={(e) => onChange("navProjectsText", e.target.value)}
          placeholder="Projects"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">Contact Nav Label</label>
        <input
          type="text"
          className="h-11 border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 rounded-xl px-3.5 text-sm transition-colors outline-none"
          value={profile.navContactText ?? "Contact"}
          onChange={(e) => onChange("navContactText", e.target.value)}
          placeholder="Contact"
        />
      </div>
    </div>
  );

  // Determine which properties editor pane to display based on selectedField
  const renderEditorContent = () => {
    if (!selectedField) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 select-none animate-in fade-in duration-200">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 shadow-sm mb-4">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 9.152c.582-.448 1.148-.89 1.676-1.345m-1.676 1.345a55.542 55.542 0 0 1-5.696 4.01c-3.024 1.747-4.536 2.62-5.65 1.706-1.114-.914-.73-2.617-.005-6.02L4.545 4.54a1.8 1.8 0 0 1 1.742-1.424l4.5.006a1.8 1.8 0 0 1 1.742 1.424l.872 3.424Z" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-neutral-800">Visual Editor Active</h3>
          <p className="text-xs text-neutral-500 mt-2 max-w-[280px] leading-relaxed">
            Click on any section, text line, or image card on the right website preview canvas to edit its properties instantly.
          </p>
        </div>
      );
    }

    switch (selectedField) {
      case "name":
      case "headline":
      case "location":
      case "summary":
        return renderProfileFields();
      
      case "hero":
      case "heroBadgeText":
      case "heroGreetingStart":
      case "heroGreetingName":
      case "heroGreetingEnd":
      case "heroSubheadline":
      case "heroCtaText":
      case "heroCtaUrl":
      case "heroRatingText":
        return renderHeroFields();

      case "labels":
      case "servicesLabel":
      case "aboutLabel":
      case "brandsLabel":
      case "projectsLabel":
      case "projectsSubtitle":
      case "projectsExploreText":
      case "projectsExploreUrl":
      case "processLabel":
      case "testimonialsLabel":
      case "footerLabel":
      case "statusText":
      case "followMeLabel":
      case "footerCreditText":
      case "footerCreditName":
      case "builtInFramerText":
      case "builtInFramerUrl":
        return renderLabelsFields();

      case "navigation":
      case "navHomeText":
      case "navAboutText":
      case "navProjectsText":
      case "navContactText":
        return renderNavigationFields();
      
      case "avatarUrl":
      case "bannerUrl":
      case "aboutPhotoUrl":
      case "signatureUrl":
      case "footerBannerUrl":
        return renderGraphicsFields(selectedField);

      case "project":
        return renderProjectEditor(selectedIndex ?? 0);
      case "projects_list":
      case "projects":
        return renderProjectsList();

      case "experience":
        return renderExperienceList();

      case "service":
      case "servicesCta":
      case "services":
      case "servicesTitle":
        return renderServicesEditor(selectedIndex);

      case "process":
      case "processes":
      case "processTitle":
        return renderProcessEditor();

      case "testimonial":
      case "testimonials":
      case "testimonialsTitle":
        return renderTestimonialsEditor();

      case "links":
      case "email":
      case "phone":
        return renderLinksEditor();

      case "colors":
        return renderColorPalette();

      default:
        return renderProfileFields();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white select-none">
      {/* Properties Panel Header */}
      <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between shrink-0 bg-white">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-blue-500" />
          <span className="font-bold text-sm text-neutral-800">
            {selectedField ? "Properties Editor" : "Visual Customizer"}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-500 flex items-center justify-center active:scale-95 transition-all border-none bg-transparent cursor-pointer"
          title="Exit Customizer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>



      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-5" style={{ scrollbarWidth: "none" }}>
        {renderEditorContent()}
      </div>
    </div>
  );
}
