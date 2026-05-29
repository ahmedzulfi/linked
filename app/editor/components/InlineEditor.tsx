"use client";

import { useState } from "react";
import { ProfileData, ProfileExperience, ProfileLink } from "@/shared/types";
import { User, Briefcase, Link as LinkIcon, Plus, Trash2, GraduationCap } from "lucide-react";

interface InlineEditorProps {
  profile: ProfileData;
  onChange: <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => void;
}

// Reusable editable field
function EditableField({
  label,
  value,
  onChange,
  multiline = false,
  placeholder = "",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wide">
        {label}
      </label>
      {multiline ? (
        <textarea
          className={`ds-input !h-auto min-h-[80px] resize-none py-3 text-sm ${className}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
        />
      ) : (
        <input
          className={`ds-input text-sm ${className}`}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

type Tab = "profile" | "experience" | "links";

export default function InlineEditor({ profile, onChange }: InlineEditorProps) {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Profile", icon: <User className="w-3.5 h-3.5" /> },
    { id: "experience", label: "Experience", icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: "links", label: "Links", icon: <LinkIcon className="w-3.5 h-3.5" /> },
  ];

  // ── Experience helpers ──
  const updateExperience = (index: number, field: keyof ProfileExperience, value: string) => {
    const next = [...profile.experience];
    next[index] = { ...next[index], [field]: value };
    onChange("experience", next);
  };

  const removeExperience = (index: number) => {
    onChange("experience", profile.experience.filter((_, i) => i !== index));
  };

  const addExperience = () => {
    onChange("experience", [
      ...profile.experience,
      { title: "New Role", company: "Company", duration: "2024 – Present", description: "" },
    ]);
  };

  // ── Link helpers ──
  const updateLink = (index: number, field: keyof ProfileLink, value: string) => {
    const next = [...profile.links];
    next[index] = { ...next[index], [field]: value };
    onChange("links", next);
  };

  const removeLink = (index: number) => {
    onChange("links", profile.links.filter((_, i) => i !== index));
  };

  const addLink = () => {
    onChange("links", [
      ...profile.links,
      { label: "New Link", url: "https://", icon: "website" },
    ]);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Tab bar */}
      <div className="flex items-center gap-1 p-1 bg-[#F3F3F3] rounded-[10px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-medium rounded-[8px] transition-[background-color,color] duration-150 ${activeTab === tab.id
                ? "bg-white text-black  shadow-[0_6px_10px_-6px_#00000016] "
                : "text-[#6B6B6B] hover:text-black"
              }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4" style={{ scrollbarWidth: "none" }}>

        {/* ── Profile Tab ── */}
        {activeTab === "profile" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 p-3 bg-[#FBFBFB] border border-[#E6E6E6] rounded-[13px]">
              {/* Avatar preview */}
              <img
                src={profile.avatarUrl || "https://i.pravatar.cc/80?img=47"}
                alt={profile.name}
                className="w-12 h-12 rounded-full object-cover border border-[#E6E6E6] flex-shrink-0"
              />
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="text-sm font-medium text-black truncate">{profile.name}</p>
                <p className="text-xs text-[#6B6B6B] truncate">{profile.headline}</p>
              </div>
            </div>

            <EditableField
              label="Full name"
              value={profile.name}
              onChange={(v) => onChange("name", v)}
              placeholder="Your name"
            />
            <EditableField
              label="Headline"
              value={profile.headline}
              onChange={(v) => onChange("headline", v)}
              placeholder="Product Designer · Builder"
            />
            <EditableField
              label="Location"
              value={profile.location ?? ""}
              onChange={(v) => onChange("location", v)}
              placeholder="San Francisco, CA"
            />
            <EditableField
              label="About / Summary"
              value={profile.summary}
              onChange={(v) => onChange("summary", v)}
              multiline
              placeholder="Write a short bio…"
            />
            <EditableField
              label="Avatar URL"
              value={profile.avatarUrl}
              onChange={(v) => onChange("avatarUrl", v)}
              placeholder="https://example.com/photo.jpg"
            />
          </div>
        )}

        {/* ── Experience Tab ── */}
        {activeTab === "experience" && (
          <div className="flex flex-col gap-3">
            {profile.experience.map((exp, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 p-3 bg-[#FBFBFB] border border-[#E6E6E6] rounded-[13px] relative"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#9CA3AF]" />
                    <span className="text-xs font-medium text-[#9CA3AF]">
                      Experience {i + 1}
                    </span>
                  </div>
                  <button
                    onClick={() => removeExperience(i)}
                    className="p-1 rounded-md hover:bg-[#FEF2F2] text-[#9CA3AF] hover:text-[#E45A5A] transition-colors duration-150"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
              className="button button-secondary w-full gap-2"
            >
              <Plus className="w-4 h-4" />
              Add experience
            </button>
          </div>
        )}

        {/* ── Links Tab ── */}
        {activeTab === "links" && (
          <div className="flex flex-col gap-3">
            {profile.links.map((link, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 p-3 bg-[#FBFBFB] border border-[#E6E6E6] rounded-[13px]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <LinkIcon className="w-3.5 h-3.5 text-[#9CA3AF]" />
                    <span className="text-xs font-medium text-[#9CA3AF]">Link {i + 1}</span>
                  </div>
                  <button
                    onClick={() => removeLink(i)}
                    className="p-1 rounded-md hover:bg-[#FEF2F2] text-[#9CA3AF] hover:text-[#E45A5A] transition-colors duration-150"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
              className="button button-secondary w-full gap-2"
            >
              <Plus className="w-4 h-4" />
              Add link
            </button>

            <p className="text-xs text-[#9CA3AF] text-center">
              Links appear in your profile header and footer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
