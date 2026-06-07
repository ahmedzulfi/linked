"use client";

import { ProfileData, TemplateId } from "@/shared/types";

interface ProfilePreviewProps {
  profile: ProfileData;
  template: TemplateId;
  scale?: number;
  onFieldClick?: (fieldName: string) => void;
  fluid?: boolean;
}

// ─── Link icons (inline SVG) ───────────────────────────────────────────────────
function LinkIcon({ icon }: { icon?: string }) {
  if (icon === "linkedin") return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
  );
  if (icon === "twitter") return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.856L2.25 2.25h6.883l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" /></svg>
  );
  if (icon === "github") return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
  );
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>
  );
}

// ─── 1. Daniel Cross Template ─────────────────────────────────────────────────
function DanielCross({ profile }: { profile: ProfileData }) {
  return (
    <div className="w-full min-h-screen bg-white text-black p-6 md:p-12 font-sans select-text">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <header className="border-b-4 border-black pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-neutral-400">Independent Portfolio</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">{profile.name}</h1>
            <p className="text-lg md:text-xl font-bold tracking-tight text-neutral-800 mt-2">{profile.headline}</p>
            {profile.location && <p className="text-xs font-mono text-neutral-500">Loc. {profile.location}</p>}
          </div>
          {profile.avatarUrl && (
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-20 h-20 md:w-28 md:h-28 object-cover border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] grayscale shrink-0"
            />
          )}
        </header>

        {/* Bio / Summary */}
        <section className="space-y-2">
          <h2 className="text-[10px] uppercase font-mono font-bold tracking-widest text-neutral-400">Context</h2>
          <p className="text-base md:text-xl font-bold leading-snug tracking-tight max-w-2xl">
            {profile.summary}
          </p>
          {profile.interests && (
            <p className="text-xs font-mono text-neutral-500 leading-relaxed max-w-xl mt-3">
              <span className="font-bold text-black uppercase">Core Focus:</span> {profile.interests}
            </p>
          )}
        </section>

        {/* Projects */}
        {profile.projects && profile.projects.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-[10px] uppercase font-mono font-bold tracking-widest text-neutral-400">Selected Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.projects.map((proj, i) => (
                <div key={i} className="border-2 border-black p-5 space-y-3 bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                  {proj.image && (
                    <img src={proj.image} alt={proj.title} className="w-full h-40 object-cover border border-black mb-1" />
                  )}
                  <h3 className="text-lg font-black uppercase tracking-tight">{proj.title}</h3>
                  <p className="text-xs text-neutral-700 leading-relaxed">{proj.description}</p>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[10px] font-mono font-bold uppercase tracking-wider underline hover:text-neutral-600 block mt-2"
                    >
                      Project Link ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {profile.experience && profile.experience.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-[10px] uppercase font-mono font-bold tracking-widest text-neutral-400">Experience Timeline</h2>
            <div className="divide-y-2 divide-black border-t-2 border-black">
              {profile.experience.map((exp, i) => (
                <div key={i} className="py-4 flex flex-col md:flex-row justify-between items-start gap-2">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-bold uppercase">{exp.title}</h3>
                    <p className="text-xs font-mono text-neutral-600">{exp.company}</p>
                    {exp.description && <p className="text-xs text-neutral-500 max-w-xl mt-1.5 leading-relaxed">{exp.description}</p>}
                  </div>
                  <span className="text-[10px] font-mono text-black font-bold whitespace-nowrap bg-neutral-100 border border-black px-2 py-0.5">{exp.duration}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {profile.skills && profile.skills.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-[10px] uppercase font-mono font-bold tracking-widest text-neutral-400">Core Tools</h2>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map((skill, i) => (
                <span key={i} className="text-[10px] font-mono font-bold bg-neutral-100 border border-black text-black px-2.5 py-1 uppercase">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {profile.education && profile.education.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-[10px] uppercase font-mono font-bold tracking-widest text-neutral-400">Academic Background</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.education.map((edu, i) => (
                <div key={i} className="border-l-4 border-black pl-3 py-0.5">
                  <h3 className="text-sm font-bold uppercase">{edu.degree}</h3>
                  <p className="text-xs font-mono text-neutral-600">{edu.school} · {edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Links / Footer */}
        <footer className="border-t-4 border-black pt-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            {profile.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-bold uppercase underline hover:text-neutral-600"
              >
                {link.label}
              </a>
            ))}
          </div>
          <span className="text-[10px] font-mono text-neutral-400">© {profile.name}</span>
        </footer>
      </div>
    </div>
  );
}

// ─── 2. Julian Mercer Template ────────────────────────────────────────────────
function JulianMercer({ profile }: { profile: ProfileData }) {
  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] text-[#2C2621] p-6 md:p-12 font-serif select-text">
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-3 pb-8 border-b border-[#E3DEC3]">
          {profile.avatarUrl && (
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-20 h-20 mx-auto rounded-full object-cover border border-[#E3DEC3] p-1 shadow-sm bg-white"
            />
          )}
          <h1 className="text-3xl md:text-5xl font-light italic tracking-tight">{profile.name}</h1>
          <p className="text-xs font-mono uppercase tracking-widest text-[#7A6A53] mt-1">{profile.headline}</p>
          {profile.location && <p className="text-[10px] font-mono text-neutral-400">{profile.location}</p>}
        </header>

        {/* About */}
        <section className="space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#7A6A53]">Introduction</span>
          <p className="text-base md:text-lg font-light leading-relaxed italic text-neutral-800">
            "{profile.summary}"
          </p>
          {profile.interests && (
            <div className="pt-3 text-xs font-light text-neutral-600 leading-relaxed border-t border-[#E3DEC3]/40 mt-3 font-sans">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#7A6A53] block mb-1">Passions & Interests</span>
              {profile.interests}
            </div>
          )}
        </section>

        {/* Projects */}
        {profile.projects && profile.projects.length > 0 && (
          <section className="space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7A6A53]">Selected Works</span>
            <div className="space-y-8">
              {profile.projects.map((proj, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  {proj.image && (
                    <img src={proj.image} alt={proj.title} className="w-full h-40 object-cover border border-[#E3DEC3] rounded-lg shadow-sm" />
                  )}
                  <div className="space-y-2">
                    <h3 className="text-lg font-light italic leading-tight">{proj.title}</h3>
                    <p className="text-xs text-neutral-600 leading-relaxed font-sans">{proj.description}</p>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[10px] font-mono text-[#7A6A53] hover:underline"
                      >
                        Launch Project ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {profile.experience && profile.experience.length > 0 && (
          <section className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7A6A53]">Timeline</span>
            <div className="space-y-6">
              {profile.experience.map((exp, i) => (
                <div key={i} className="flex flex-col md:flex-row justify-between items-start gap-1 border-b border-[#E3DEC3]/30 pb-4 last:border-0">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">{exp.title}</h3>
                    <p className="text-[11px] font-mono text-[#7A6A53]">{exp.company}</p>
                    {exp.description && <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed font-sans">{exp.description}</p>}
                  </div>
                  <span className="text-[10px] font-mono text-[#7A6A53] whitespace-nowrap bg-[#E3DEC3]/20 px-2 py-0.5 rounded">{exp.duration}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {profile.skills && profile.skills.length > 0 && (
          <section className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7A6A53]">Core Competencies</span>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map((skill, i) => (
                <span key={i} className="text-[10px] font-mono border border-[#E3DEC3] px-2.5 py-0.5 bg-white rounded text-neutral-700">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {profile.education && profile.education.length > 0 && (
          <section className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7A6A53]">Academic Path</span>
            <div className="space-y-3">
              {profile.education.map((edu, i) => (
                <div key={i} className="flex justify-between items-center gap-4">
                  <div>
                    <h4 className="text-sm font-medium">{edu.degree}</h4>
                    <p className="text-[10px] font-mono text-neutral-500">{edu.school}</p>
                  </div>
                  <span className="text-[10px] font-mono text-[#7A6A53]">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-[#E3DEC3] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-[#7A6A53]">
          <div className="flex gap-4">
            {profile.links.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {link.label}
              </a>
            ))}
          </div>
          <span>Julian Mercer Style</span>
        </footer>
      </div>
    </div>
  );
}

// ─── 3. Link Hunt Template ────────────────────────────────────────────────────
function LinkHunt({ profile }: { profile: ProfileData }) {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#F3F4F6] to-[#E5E7EB] text-gray-900 px-4 py-8 font-sans select-text">
      <div className="max-w-md mx-auto space-y-6 text-center">
        {/* Profile Card */}
        <div className="bg-white p-5 rounded-[20px] border border-gray-200 shadow-sm space-y-3">
          {profile.avatarUrl && (
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-blue-500 p-0.5 shadow-sm bg-white"
            />
          )}
          <div className="space-y-0.5">
            <h1 className="text-xl font-bold tracking-tight">{profile.name}</h1>
            <p className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full inline-block uppercase tracking-wider">{profile.headline}</p>
            {profile.location && <p className="text-[10px] text-gray-400 mt-1 font-semibold">{profile.location}</p>}
          </div>
          <p className="text-xs text-gray-600 leading-relaxed font-normal">{profile.summary}</p>
          {profile.interests && (
            <div className="text-[10px] text-gray-500 italic border-t border-gray-100 pt-2 mt-2 leading-relaxed">
              Focus: {profile.interests}
            </div>
          )}
        </div>

        {/* Links Stack */}
        <div className="space-y-2">
          {profile.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-3.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-[14px] shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <LinkIcon icon={link.icon} />
                </div>
                <span className="text-xs font-semibold text-gray-800">{link.label}</span>
              </div>
              <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-500 transition-colors">↗</span>
            </a>
          ))}
        </div>

        {/* Projects Preview */}
        {profile.projects && profile.projects.length > 0 && (
          <div className="bg-white p-5 rounded-[20px] border border-gray-200 shadow-sm text-left space-y-3">
            <h2 className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Works Showcase</h2>
            <div className="space-y-3">
              {profile.projects.map((proj, i) => (
                <div key={i} className="flex gap-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  {proj.image && (
                    <img src={proj.image} alt={proj.title} className="w-12 h-12 object-cover border border-gray-100 rounded-lg shrink-0" />
                  )}
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-bold text-gray-800">{proj.title}</h3>
                    <p className="text-[10px] text-gray-500 leading-relaxed">{proj.description}</p>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 font-semibold hover:underline block mt-0.5">
                        Link ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Chips */}
        {profile.skills && profile.skills.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1">
            {profile.skills.map((skill, i) => (
              <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-600 shadow-xs">
                {skill.name}
              </span>
            ))}
          </div>
        )}

        {/* Experience summary */}
        {profile.experience && profile.experience.length > 0 && (
          <div className="bg-white p-5 rounded-[20px] border border-gray-200 shadow-sm text-left space-y-3">
            <h2 className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Positions</h2>
            <div className="space-y-3">
              {profile.experience.slice(0, 3).map((exp, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-xs font-bold text-gray-800">{exp.title}</h3>
                    <span className="text-[9px] font-mono text-gray-400 bg-gray-50 border border-gray-100 px-1 rounded">{exp.duration}</span>
                  </div>
                  <p className="text-[10px] text-gray-500">{exp.company}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-[9px] font-mono text-gray-400">© {profile.name} · Link Hunt</p>
      </div>
    </div>
  );
}

// ─── 4. Biobricks Template ────────────────────────────────────────────────────
function Biobricks({ profile }: { profile: ProfileData }) {
  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] text-[#171717] p-5 md:p-10 font-sans select-text">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Main profile brick */}
          <div className="md:col-span-2 bg-white border border-[#E6E6E6] rounded-2xl p-5 flex flex-col justify-between shadow-xs min-h-[180px]">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {profile.avatarUrl && (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-12 h-12 rounded-xl object-cover border border-[#EAEAEA]"
                  />
                )}
                <div>
                  <h1 className="text-xl font-bold tracking-tight">{profile.name}</h1>
                  {profile.location && <p className="text-[10px] text-neutral-400 font-medium">{profile.location}</p>}
                </div>
              </div>
              <p className="text-xs text-neutral-500 font-medium leading-relaxed mt-1">{profile.headline}</p>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed mt-3">{profile.summary}</p>
          </div>

          {/* Social connections brick */}
          <div className="bg-white border border-[#E6E6E6] rounded-2xl p-5 flex flex-col justify-between shadow-xs min-h-[180px]">
            <h2 className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Connect</h2>
            <div className="flex flex-col gap-2 mt-3">
              {profile.links.slice(0, 4).map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-emerald-600 transition-colors"
                >
                  <LinkIcon icon={link.icon} />
                  {link.label}
                </a>
              ))}
            </div>
            <div className="text-[9px] font-mono text-neutral-400 mt-2">Active Biobricks</div>
          </div>

          {/* Interests block if available */}
          {profile.interests && (
            <div className="md:col-span-3 bg-[#EEFDF5] border border-[#A7F3D0]/60 rounded-2xl p-5 shadow-xs">
              <h2 className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 mb-2">Interests & Focus Area</h2>
              <p className="text-xs text-emerald-800 leading-relaxed font-medium">{profile.interests}</p>
            </div>
          )}

          {/* Projects brick */}
          {profile.projects && profile.projects.length > 0 && (
            <div className="md:col-span-3 bg-white border border-[#E6E6E6] rounded-2xl p-5 shadow-xs space-y-3">
              <h2 className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Selected Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {profile.projects.map((proj, i) => (
                  <div key={i} className="border border-[#E6E6E6] rounded-xl p-3 bg-[#FAFAFA] flex flex-col justify-between gap-2">
                    <div>
                      <h3 className="text-xs font-bold text-neutral-800 truncate">{proj.title}</h3>
                      <p className="text-[10px] text-neutral-500 mt-0.5 leading-relaxed line-clamp-3">{proj.description}</p>
                    </div>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[10px] font-semibold text-emerald-600 hover:underline">
                        Visit ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills list brick */}
          {profile.skills && profile.skills.length > 0 && (
            <div className="bg-white border border-[#E6E6E6] rounded-2xl p-5 shadow-xs">
              <h2 className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Skills</h2>
              <div className="flex flex-wrap gap-1 mt-3">
                {profile.skills.map((skill, i) => (
                  <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded bg-neutral-50 border border-neutral-100 text-neutral-600">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experience list brick */}
          {profile.experience && profile.experience.length > 0 && (
            <div className="md:col-span-2 bg-white border border-[#E6E6E6] rounded-2xl p-5 shadow-xs space-y-3">
              <h2 className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Experience</h2>
              <div className="space-y-3">
                {profile.experience.slice(0, 3).map((exp, i) => (
                  <div key={i} className="flex justify-between items-start gap-4 border-b border-neutral-100 pb-2 last:border-0 last:pb-0">
                    <div>
                      <h3 className="text-xs font-bold text-neutral-800">{exp.title}</h3>
                      <p className="text-[10px] text-neutral-400">{exp.company}</p>
                    </div>
                    <span className="text-[9px] font-mono text-neutral-400 whitespace-nowrap">{exp.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education list brick */}
          {profile.education && profile.education.length > 0 && (
            <div className="md:col-span-3 bg-white border border-[#E6E6E6] rounded-2xl p-5 shadow-xs">
              <h2 className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Education</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {profile.education.map((edu, i) => (
                  <div key={i} className="text-xs">
                    <h4 className="font-bold text-neutral-800">{edu.degree}</h4>
                    <p className="text-[10px] text-neutral-500">{edu.school} · {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ─── Main exported component ───────────────────────────────────────────────────
export default function ProfilePreview({ profile, template, scale = 1, onFieldClick, fluid = false }: ProfilePreviewProps) {
  const isDanielCross = template === "daniel-cross";
  const isJulianMercer = template === "julian-mercer";
  const isLinkHunt = template === "link-hunt";
  const isBiobricks = template === "biobricks";

  // Fallback to Daniel Cross if an outdated ID is provided
  const actualTemplate = isDanielCross || isJulianMercer || isLinkHunt || isBiobricks ? template : "daniel-cross";

  if (fluid) {
    return (
      <div className="w-full min-h-screen">
        {actualTemplate === "daniel-cross" && <DanielCross profile={profile} />}
        {actualTemplate === "julian-mercer" && <JulianMercer profile={profile} />}
        {actualTemplate === "link-hunt" && <LinkHunt profile={profile} />}
        {actualTemplate === "biobricks" && <Biobricks profile={profile} />}
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
        className="w-full h-full"
        style={{
          width: PREVIEW_W,
          height: PREVIEW_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          overflow: "auto",
        }}
      >
        {actualTemplate === "daniel-cross" && <DanielCross profile={profile} />}
        {actualTemplate === "julian-mercer" && <JulianMercer profile={profile} />}
        {actualTemplate === "link-hunt" && <LinkHunt profile={profile} />}
        {actualTemplate === "biobricks" && <Biobricks profile={profile} />}
      </div>
    </div>
  );
}
