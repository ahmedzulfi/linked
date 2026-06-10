"use client";

import { useState } from "react";
import { ProfileData, ProfileExperience, ProfileLink, ProfileProject } from "@/shared/types";
import { User, Briefcase, Link as LinkIcon, Folder, Plus, Trash2 } from "lucide-react";

interface InlineEditorProps {
  profile: ProfileData;
  onChange: <K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K],
  ) => void;
  activeTab?: "profile" | "experience" | "links" | "projects";
  setActiveTab?: (tab: "profile" | "experience" | "links" | "projects") => void;
}

// Reusable editable field
function EditableField({
  label,
  value,
  onChange,
  multiline = false,
  placeholder = "",
  className = "",
  id,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
  className?: string;
  id?: string;
}) {
  return (
    <div className="flex flex-col gap-1 text-left">
      <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wide">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          className={`ds-input !h-auto min-h-[80px] resize-none py-3 text-sm border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 transition-colors ${className}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
        />
      ) : (
        <input
          id={id}
          className={`ds-input text-sm border border-neutral-200 focus:border-neutral-400 bg-white placeholder-neutral-400 text-neutral-800 transition-colors ${className}`}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

type Tab = "profile" | "experience" | "links" | "projects";

export default function InlineEditor({
  profile,
  onChange,
  activeTab: controlledTab,
  setActiveTab: controlledSetActive,
}: InlineEditorProps) {
  const [localTab, setLocalTab] = useState<Tab>("profile");
  const activeTab = controlledTab ?? localTab;
  const setActiveTab = (controlledSetActive ?? setLocalTab) as (
    tab: Tab,
  ) => void;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    { id: "projects", label: "Projects", icon: <Folder className="w-4 h-4" /> },
    {
      id: "experience",
      label: "Experience",
      icon: <Briefcase className="w-4 h-4" />,
    },
    { id: "links", label: "Links", icon: <LinkIcon className="w-4 h-4" /> },
  ];

  // ── Experience helpers ──
  const updateExperience = (
    index: number,
    field: keyof ProfileExperience,
    value: string,
  ) => {
    const next = [...profile.experience];
    next[index] = { ...next[index], [field]: value };
    onChange("experience", next);
  };

  const removeExperience = (index: number) => {
    onChange(
      "experience",
      profile.experience.filter((_, i) => i !== index),
    );
  };

  const addExperience = () => {
    onChange("experience", [
      ...profile.experience,
      {
        title: "New Role",
        company: "Company",
        duration: "2024 – Present",
        description: "",
      },
    ]);
  };

  // ── Link helpers ──
  const updateLink = (
    index: number,
    field: keyof ProfileLink,
    value: string,
  ) => {
    const next = [...profile.links];
    next[index] = { ...next[index], [field]: value };
    onChange("links", next);
  };

  const removeLink = (index: number) => {
    onChange(
      "links",
      profile.links.filter((_, i) => i !== index),
    );
  };

  const addLink = () => {
    onChange("links", [
      ...profile.links,
      { label: "New Link", url: "https://", icon: "website" },
    ]);
  };

  // ── Project helpers ──
  const updateProject = (
    index: number,
    field: keyof ProfileProject,
    value: string,
  ) => {
    const next = [...(profile.projects || [])];
    next[index] = { ...next[index], [field]: value };
    onChange("projects", next);
  };

  const removeProject = (index: number) => {
    onChange(
      "projects",
      (profile.projects || []).filter((_, i) => i !== index),
    );
  };

  const addProject = () => {
    onChange("projects", [
      ...(profile.projects || []),
      {
        title: "New Project",
        description: "Project description",
        link: "https://",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60",
      },
    ]);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Tab bar */}
      <div className="flex items-center gap-1 p-1 bg-[#F3F3F3] rounded-[10px] select-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-semibold rounded-lg transition-[background-color,color] duration-150 active:scale-[0.97] ${
              activeTab === tab.id
                ? "bg-white text-neutral-900 shadow-sm border border-neutral-200/50"
                : "text-neutral-550 hover:text-neutral-900 border border-transparent"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {/* ── Profile Tab ── */}
        {activeTab === "profile" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 p-3 bg-[#FBFBFB] border border-[#E6E6E6] rounded-lg">
              <img
                src={profile.avatarUrl || "https://api.dicebear.com/7.x/initials/svg?seed=User&backgroundColor=8db8ff"}
                alt={profile.name}
                className="w-12 h-12 rounded-lg object-cover border border-[#E6E6E6] flex-shrink-0"
              />
              <div className="flex flex-col gap-0.5 min-w-0 text-left">
                <p className="text-sm font-semibold text-neutral-800 truncate">
                  {profile.name}
                </p>
                <p className="text-xs text-neutral-500 truncate">
                  {profile.headline}
                </p>
              </div>
            </div>

            <EditableField
              id="editor-field-name"
              label="Full name"
              value={profile.name}
              onChange={(v) => onChange("name", v)}
              placeholder="Your name"
            />
            <EditableField
              id="editor-field-headline"
              label="Headline"
              value={profile.headline}
              onChange={(v) => onChange("headline", v)}
              placeholder="Product Designer · Builder"
            />
            <EditableField
              id="editor-field-location"
              label="Location"
              value={profile.location ?? ""}
              onChange={(v) => onChange("location", v)}
              placeholder="San Francisco, CA"
            />
            <EditableField
              id="editor-field-summary"
              label="About / Summary"
              value={profile.summary}
              onChange={(v) => onChange("summary", v)}
              multiline
              placeholder="Write a short bio…"
            />
            <EditableField
              id="editor-field-interests"
              label="Interests & Aspirations"
              value={profile.interests ?? ""}
              onChange={(v) => onChange("interests", v)}
              multiline
              placeholder="e.g. AI Engineering, Design Systems..."
            />
            <EditableField
              id="editor-field-avatarUrl"
              label="Avatar Image URL"
              value={profile.avatarUrl}
              onChange={(v) => onChange("avatarUrl", v)}
              placeholder="https://example.com/photo.jpg"
            />
            <EditableField
              id="editor-field-bannerUrl"
              label="Hero Portrait / Banner Image URL"
              value={profile.bannerUrl ?? ""}
              onChange={(v) => onChange("bannerUrl", v)}
              placeholder="https://example.com/hero.jpg"
            />
          </div>
        )}

        {/* ── Projects Tab ── */}
        {activeTab === "projects" && (
          <div className="flex flex-col gap-3 animate-in fade-in duration-200" id="editor-field-projects">
            {(profile.projects || []).map((proj, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 p-3.5 bg-[#FBFBFB] border border-[#E6E6E6] rounded-xl relative hover:bg-neutral-50/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-500 uppercase">
                    Project {i + 1}
                  </span>
                  <button
                    onClick={() => removeProject(i)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors duration-150 active:scale-95 border border-neutral-200/50 bg-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <EditableField
                  label="Project Title"
                  value={proj.title}
                  onChange={(v) => updateProject(i, "title", v)}
                  placeholder="e.g. Finance Dashboard App"
                />
                <EditableField
                  label="Description"
                  value={proj.description}
                  onChange={(v) => updateProject(i, "description", v)}
                  multiline
                  placeholder="Tell us about the project..."
                />
                <EditableField
                  label="Project URL"
                  value={proj.link ?? ""}
                  onChange={(v) => updateProject(i, "link", v)}
                  placeholder="https://example.com"
                />
                <EditableField
                  label="Cover Image URL"
                  value={proj.image ?? ""}
                  onChange={(v) => updateProject(i, "image", v)}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            ))}

            <button
              onClick={addProject}
              className="w-full h-11 border border-dashed border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/40 text-neutral-700 text-xs font-bold rounded-xl transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 shadow-xs mt-2"
            >
              <Plus className="w-4 h-4 text-neutral-550" /> Add Project
            </button>
          </div>
        )}

        {/* ── Experience Tab ── */}
        {activeTab === "experience" && (
          <div className="flex flex-col gap-3 animate-in fade-in duration-200" id="editor-field-experience">
            {profile.experience.map((exp, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 p-3.5 bg-[#FBFBFB] border border-[#E6E6E6] rounded-xl relative hover:bg-neutral-50/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-500 uppercase">
                    Experience {i + 1}
                  </span>
                  <button
                    onClick={() => removeExperience(i)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors duration-150 active:scale-95 border border-neutral-200/50 bg-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <EditableField
                  label="Job title"
                  value={exp.title}
                  onChange={(v) => updateExperience(i, "title", v)}
                />
                <EditableField
                  label="Company"
                  value={exp.company}
                  onChange={(v) => updateExperience(i, "company", v)}
                />
                <EditableField
                  label="Duration"
                  value={exp.duration}
                  onChange={(v) => updateExperience(i, "duration", v)}
                  placeholder="2022 – Present"
                />
                <EditableField
                  label="Description"
                  value={exp.description}
                  onChange={(v) => updateExperience(i, "description", v)}
                  multiline
                  placeholder="What did you build / achieve?"
                />
              </div>
            ))}

            <button
              onClick={addExperience}
              className="w-full h-11 border border-dashed border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/40 text-neutral-700 text-xs font-bold rounded-xl transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 shadow-xs mt-2"
            >
              <Plus className="w-4 h-4 text-neutral-550" /> Add Experience
            </button>
          </div>
        )}

        {/* ── Links Tab ── */}
        {activeTab === "links" && (
          <div className="flex flex-col gap-3 animate-in fade-in duration-200" id="editor-field-links">
            {profile.links.map((link, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 p-3.5 bg-[#FBFBFB] border border-[#E6E6E6] rounded-xl relative hover:bg-neutral-50/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-500 uppercase">
                    Link {i + 1}
                  </span>
                  <button
                    onClick={() => removeLink(i)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors duration-150 active:scale-95 border border-neutral-200/50 bg-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <EditableField
                  label="Label"
                  value={link.label}
                  onChange={(v) => updateLink(i, "label", v)}
                  placeholder="LinkedIn"
                />
                <EditableField
                  label="URL"
                  value={link.url}
                  onChange={(v) => updateLink(i, "url", v)}
                  placeholder="https://linkedin.com/in/…"
                />
              </div>
            ))}

            <button
              onClick={addLink}
              className="w-full h-11 border border-dashed border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/40 text-neutral-700 text-xs font-bold rounded-xl transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 shadow-xs mt-2"
            >
              <Plus className="w-4 h-4 text-neutral-550" /> Add Link
            </button>

            <p className="text-[11px] text-neutral-400 text-center mt-2 font-semibold">
              Links appear in your profile header and footer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
