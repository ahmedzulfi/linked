"use client";

import { ProfileData, TemplateId } from "@/shared/types";

interface ProfilePreviewProps {
  profile: ProfileData;
  template: TemplateId;
  scale?: number;
  onFieldClick?: (fieldName: string) => void;
  fluid?: boolean;
}

// ─── Editable Wrapper for hover outlines & click interactions ───────────────────
function EditableWrapper({
  fieldName,
  onFieldClick,
  children,
  className = "",
}: {
  fieldName: string;
  onFieldClick?: (fieldName: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  if (!onFieldClick) return <>{children}</>;
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onFieldClick(fieldName);
      }}
      className={`cursor-pointer hover:outline hover:outline-2 hover:outline-dashed hover:outline-blue-400 hover:outline-offset-2 rounded transition-all ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Link icons (inline SVG) ───────────────────────────────────────────────────
function LinkIcon({ icon }: { icon?: string }) {
  if (icon === "linkedin") return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
  );
  if (icon === "twitter") return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.856L2.25 2.25h6.883l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" /></svg>
  );
  if (icon === "github") return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
  );
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>
  );
}

// ─── Minimal Card Template ─────────────────────────────────────────────────────
function MinimalCard({ profile, onFieldClick }: { profile: ProfileData; onFieldClick?: (fieldName: string) => void }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-inter">
      <div className="w-full max-w-lg">
        <div className="bg-white border border-[#E6E6E6] rounded-[20px] p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.04),0_10px_30px_-10px_rgba(0,0,0,0.08)]">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <EditableWrapper fieldName="avatarUrl" onFieldClick={onFieldClick}>
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-16 h-16   rounded-lg object-cover border border-[#E6E6E6] flex-shrink-0"
              />
            </EditableWrapper>
            <div className="flex flex-col gap-0.5 min-w-0">
              <EditableWrapper fieldName="name" onFieldClick={onFieldClick}>
                <h1 className="text-xl font-medium text-black leading-tight">{profile.name}</h1>
              </EditableWrapper>
              <EditableWrapper fieldName="headline" onFieldClick={onFieldClick}>
                <p className="text-sm text-[#6B6B6B] leading-tight mt-0.5">{profile.headline}</p>
              </EditableWrapper>
              {profile.location && (
                <EditableWrapper fieldName="location" onFieldClick={onFieldClick}>
                  <p className="text-xs text-[#9CA3AF] mt-1">{profile.location}</p>
                </EditableWrapper>
              )}
            </div>
          </div>

          {/* Summary */}
          <EditableWrapper fieldName="summary" onFieldClick={onFieldClick}>
            <p className="text-sm text-[#171717] leading-relaxed mb-6">{profile.summary}</p>
          </EditableWrapper>

          {/* Skills */}
          {profile.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {profile.skills.slice(0, 8).map((skill, i) => (
                <span key={i} className="text-[11px] font-medium px-2.5 py-1   rounded-lg bg-[#DCEAFF] text-[#1A4A8A]">
                  {skill.name}
                </span>
              ))}
            </div>
          )}

          <div className="h-px bg-[#E6E6E6] mb-6" />

          {/* Experience */}
          {profile.experience.length > 0 && (
            <EditableWrapper fieldName="experience" onFieldClick={onFieldClick} className="mb-6">
              <div className="flex flex-col gap-4">
                <h2 className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide">Experience</h2>
                {profile.experience.slice(0, 3).map((exp, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium text-black">{exp.title}</p>
                    <p className="text-xs text-[#6B6B6B]">{exp.company} · {exp.duration}</p>
                    {exp.description && <p className="text-xs text-[#9CA3AF] leading-relaxed mt-0.5">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </EditableWrapper>
          )}

          {/* Links */}
          {profile.links.length > 0 && (
            <EditableWrapper fieldName="links" onFieldClick={onFieldClick}>
              <div className="flex items-center gap-2 flex-wrap">
                {profile.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    className="flex items-center gap-1.5 text-xs font-medium text-[#171717] hover:text-[#8DB8FF] transition-colors px-3 py-1.5   rounded-lg border border-[#E6E6E6] hover:border-[#8DB8FF]"
                  >
                    <LinkIcon icon={link.icon} />
                    {link.label}
                  </a>
                ))}
              </div>
            </EditableWrapper>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Bento Grid Template ───────────────────────────────────────────────────────
function BentoGrid({ profile, onFieldClick }: { profile: ProfileData; onFieldClick?: (fieldName: string) => void }) {
  return (
    <div className="min-h-screen bg-[#FBFBFB] p-6 font-inter">
      <div className="max-w-2xl mx-auto grid grid-cols-2 gap-3">
        {/* Hero card */}
        <div className="col-span-2 bg-white border border-[#E6E6E6] rounded-[16px] p-6 flex items-center gap-4">
          <EditableWrapper fieldName="avatarUrl" onFieldClick={onFieldClick}>
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-16 h-16   rounded-lg object-cover border border-[#E6E6E6] flex-shrink-0"
            />
          </EditableWrapper>
          <div className="min-w-0 flex-1">
            <EditableWrapper fieldName="name" onFieldClick={onFieldClick}>
              <h1 className="text-xl font-medium text-black">{profile.name}</h1>
            </EditableWrapper>
            <EditableWrapper fieldName="headline" onFieldClick={onFieldClick}>
              <p className="text-sm text-[#6B6B6B] leading-snug mt-0.5">{profile.headline}</p>
            </EditableWrapper>
            {profile.location && (
              <EditableWrapper fieldName="location" onFieldClick={onFieldClick}>
                <p className="text-xs text-[#9CA3AF] mt-1">{profile.location}</p>
              </EditableWrapper>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="col-span-2 bg-white border border-[#E6E6E6] rounded-[16px] p-5">
          <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-2">About</p>
          <EditableWrapper fieldName="summary" onFieldClick={onFieldClick}>
            <p className="text-sm text-[#171717] leading-relaxed">{profile.summary}</p>
          </EditableWrapper>
        </div>

        {/* Skills */}
        <div className="bg-[#DCEAFF]/40 border border-[#8DB8FF]/30 rounded-[16px] p-5">
          <p className="text-xs font-medium text-[#1A4A8A] uppercase tracking-wide mb-3">Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {profile.skills.map((skill, i) => (
              <span key={i} className="text-[11px] font-medium px-2 py-0.5   rounded-lg bg-white border border-[#8DB8FF]/40 text-[#1A4A8A]">
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Experience snippets */}
        <div className="bg-white border border-[#E6E6E6] rounded-[16px] p-5">
          <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-3">Experience</p>
          <EditableWrapper fieldName="experience" onFieldClick={onFieldClick}>
            <div className="flex flex-col gap-2.5">
              {profile.experience.slice(0, 3).map((exp, i) => (
                <div key={i} className="flex flex-col gap-0">
                  <p className="text-[12px] font-medium text-black">{exp.title}</p>
                  <p className="text-[11px] text-[#9CA3AF]">{exp.company}</p>
                </div>
              ))}
            </div>
          </EditableWrapper>
        </div>

        {/* Links */}
        {profile.links.length > 0 && (
          <div className="col-span-2 bg-white border border-[#E6E6E6] rounded-[16px] p-5">
            <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-3">Links</p>
            <EditableWrapper fieldName="links" onFieldClick={onFieldClick}>
              <div className="flex items-center gap-2 flex-wrap">
                {profile.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    className="flex items-center gap-1.5 text-xs font-medium text-[#171717] hover:text-[#8DB8FF] transition-colors px-3 py-1.5   rounded-lg border border-[#E6E6E6] hover:border-[#8DB8FF]"
                  >
                    <LinkIcon icon={link.icon} />
                    {link.label}
                  </a>
                ))}
              </div>
            </EditableWrapper>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Full Scroll Template ──────────────────────────────────────────────────────
function FullScroll({ profile, onFieldClick }: { profile: ProfileData; onFieldClick?: (fieldName: string) => void }) {
  return (
    <div className="min-h-screen bg-[#F3F3F3] font-inter">
      {/* Hero banner */}
      <div className="h-32 bg-gradient-to-r from-[#2A2A2F] to-[#3A3A4A] relative" />

      <div className="max-w-xl mx-auto px-6 -mt-10 pb-16">
        {/* Avatar */}
        <EditableWrapper fieldName="avatarUrl" onFieldClick={onFieldClick} className="w-fit mb-4">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-20 h-20   rounded-lg object-cover border-4 border-white  shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)]"
          />
        </EditableWrapper>

        {/* Name + headline */}
        <EditableWrapper fieldName="name" onFieldClick={onFieldClick}>
          <h1 className="text-2xl font-medium text-black mb-1 leading-tight">{profile.name}</h1>
        </EditableWrapper>
        <EditableWrapper fieldName="headline" onFieldClick={onFieldClick}>
          <p className="text-sm text-[#6B6B6B] mb-1">{profile.headline}</p>
        </EditableWrapper>
        {profile.location && (
          <EditableWrapper fieldName="location" onFieldClick={onFieldClick}>
            <p className="text-xs text-[#9CA3AF] mb-4">{profile.location}</p>
          </EditableWrapper>
        )}

        {/* Links */}
        {profile.links.length > 0 && (
          <EditableWrapper fieldName="links" onFieldClick={onFieldClick} className="mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              {profile.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  className="flex items-center gap-1.5 text-xs font-medium text-[#171717] hover:text-[#8DB8FF] transition-colors px-3 py-1.5   rounded-lg bg-white border border-[#E6E6E6] hover:border-[#8DB8FF]"
                >
                  <LinkIcon icon={link.icon} />
                  {link.label}
                </a>
              ))}
            </div>
          </EditableWrapper>
        )}

        {/* About */}
        <section className="bg-white rounded-[16px] border border-[#E6E6E6] p-6 mb-4">
          <h2 className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-3">About</h2>
          <EditableWrapper fieldName="summary" onFieldClick={onFieldClick}>
            <p className="text-sm text-[#171717] leading-relaxed">{profile.summary}</p>
          </EditableWrapper>
        </section>

        {/* Experience */}
        <section className="bg-white rounded-[16px] border border-[#E6E6E6] p-6 mb-4">
          <h2 className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-4">Experience</h2>
          <EditableWrapper fieldName="experience" onFieldClick={onFieldClick}>
            <div className="flex flex-col gap-5">
              {profile.experience.map((exp, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-1 bg-[#E6E6E6]   rounded-lg flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-black">{exp.title}</p>
                    <p className="text-xs text-[#6B6B6B]">{exp.company} · {exp.duration}</p>
                    {exp.description && <p className="text-xs text-[#9CA3AF] leading-relaxed mt-1">{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </EditableWrapper>
        </section>

        {/* Skills */}
        {profile.skills.length > 0 && (
          <section className="bg-white rounded-[16px] border border-[#E6E6E6] p-6">
            <h2 className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-3">Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map((skill, i) => (
                <span key={i} className="text-[11px] font-medium px-2.5 py-1   rounded-lg bg-[#F3F3F3] border border-[#E6E6E6] text-[#171717]">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// ─── Dark Template ─────────────────────────────────────────────────────────────
function DarkTemplate({ profile, onFieldClick }: { profile: ProfileData; onFieldClick?: (fieldName: string) => void }) {
  return (
    <div className="min-h-screen bg-[#0D0D10] font-inter">
      <div className="max-w-xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <EditableWrapper fieldName="avatarUrl" onFieldClick={onFieldClick}>
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-16 h-16   rounded-lg object-cover border border-[#ffffff15]"
            />
          </EditableWrapper>
          <div className="flex-1">
            <EditableWrapper fieldName="name" onFieldClick={onFieldClick}>
              <h1 className="text-xl font-medium text-white mb-0.5 leading-tight">{profile.name}</h1>
            </EditableWrapper>
            <EditableWrapper fieldName="headline" onFieldClick={onFieldClick}>
              <p className="text-sm text-[#8DB8FF]">{profile.headline}</p>
            </EditableWrapper>
            {profile.location && (
              <EditableWrapper fieldName="location" onFieldClick={onFieldClick}>
                <p className="text-xs text-[#ffffff40] mt-0.5">{profile.location}</p>
              </EditableWrapper>
            )}
          </div>
        </div>

        {/* Summary */}
        <EditableWrapper fieldName="summary" onFieldClick={onFieldClick}>
          <p className="text-sm text-[#ffffff80] leading-relaxed mb-8">{profile.summary}</p>
        </EditableWrapper>

        {/* Skills */}
        {profile.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-8">
            {profile.skills.map((skill, i) => (
              <span key={i} className="text-[11px] font-medium px-2.5 py-1   rounded-lg border border-[#ffffff15] text-[#8DB8FF]">
                {skill.name}
              </span>
            ))}
          </div>
        )}

        <div className="h-px bg-[#ffffff10] mb-8" />

        {/* Experience */}
        {profile.experience.length > 0 && (
          <div className="flex flex-col gap-5 mb-8">
            <h2 className="text-xs font-medium text-[#ffffff40] uppercase tracking-wide">Experience</h2>
            <EditableWrapper fieldName="experience" onFieldClick={onFieldClick}>
              <div className="flex flex-col gap-5">
                {profile.experience.map((exp, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-px bg-[#ffffff15] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-white">{exp.title}</p>
                      <p className="text-xs text-[#8DB8FF]/70">{exp.company} · {exp.duration}</p>
                      {exp.description && <p className="text-xs text-[#ffffff50] leading-relaxed mt-1">{exp.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </EditableWrapper>
          </div>
        )}

        {/* Links */}
        {profile.links.length > 0 && (
          <EditableWrapper fieldName="links" onFieldClick={onFieldClick}>
            <div className="flex items-center gap-2 flex-wrap">
              {profile.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  className="flex items-center gap-1.5 text-xs font-medium text-[#ffffff60] hover:text-white transition-colors px-3 py-1.5   rounded-lg border border-[#ffffff15] hover:border-[#8DB8FF]/50"
                >
                  <LinkIcon icon={link.icon} />
                  {link.label}
                </a>
              ))}
            </div>
          </EditableWrapper>
        )}
      </div>
    </div>
  );
}

// ─── Main exported component ───────────────────────────────────────────────────
export default function ProfilePreview({ profile, template, scale = 1, onFieldClick, fluid = false }: ProfilePreviewProps) {
  if (fluid) {
    return (
      <div className="w-full min-h-screen">
        {template === "minimal-card" && <MinimalCard profile={profile} onFieldClick={onFieldClick} />}
        {template === "bento-grid" && <BentoGrid profile={profile} onFieldClick={onFieldClick} />}
        {template === "full-scroll" && <FullScroll profile={profile} onFieldClick={onFieldClick} />}
        {template === "dark" && <DarkTemplate profile={profile} onFieldClick={onFieldClick} />}
      </div>
    );
  }

  const PREVIEW_W = 1024;
  const PREVIEW_H = 768;

  return (
    <div
      className="relative overflow-hidden rounded-[16px] border border-[#E6E6E6] bg-white"
      style={{
        width: PREVIEW_W * scale,
        height: PREVIEW_H * scale,
      }}
    >
      <div
        style={{
          width: PREVIEW_W,
          height: PREVIEW_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          overflow: "auto",
        }}
      >
        {template === "minimal-card" && <MinimalCard profile={profile} onFieldClick={onFieldClick} />}
        {template === "bento-grid" && <BentoGrid profile={profile} onFieldClick={onFieldClick} />}
        {template === "full-scroll" && <FullScroll profile={profile} onFieldClick={onFieldClick} />}
        {template === "dark" && <DarkTemplate profile={profile} onFieldClick={onFieldClick} />}
      </div>
    </div>
  );
}
