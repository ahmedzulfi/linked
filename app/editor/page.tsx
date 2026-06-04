"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEditor } from "@/context/EditorContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Check,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Plus,
  Trash2,
  Globe,
  Loader2,
  CornerDownLeft,
  Smartphone,
  Monitor,
} from "lucide-react";
import ProfilePreview from "./components/ProfilePreview";
import WizardAnimations from "@/components/WizardAnimations";

// AI avatar component for the chat bubbles
function AIAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
      <Sparkles className="w-4 h-4 text-white" />
    </div>
  );
}

// User avatar placeholder
function UserAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-neutral-200 border border-neutral-300 flex items-center justify-center shrink-0 shadow-xs">
      <span className="text-[10px] font-bold text-neutral-600 uppercase">You</span>
    </div>
  );
}

function EditorInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {
    websiteId,
    editedProfile,
    selectedTemplate,
    selectTemplate,
    loadWebsite,
    updateField,
  } = useEditor();

  // Onboarding wizard steps (2 to 8)
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [publishing, setPublishing] = useState(false);
  const [optimizing, setOptimizing] = useState(false);

  // Form states
  const [projects, setProjects] = useState<{ title: string; description: string; link?: string; image?: string }[]>([]);
  const [interests, setInterests] = useState("");
  const [skills, setSkills] = useState<{ name: string }[]>([]);
  const [experience, setExperience] = useState<{ title: string; company: string; duration: string; description: string }[]>([]);
  const [subdomain, setSubdomain] = useState("");
  const [checkingSubdomain, setCheckingSubdomain] = useState(false);
  const [isSubdomainAvailable, setIsSubdomainAvailable] = useState<boolean | null>(null);

  // Inline Add states
  const [newProjTitle, setNewProjTitle] = useState("");
  const [newProjDesc, setNewProjDesc] = useState("");
  const [newProjLink, setNewProjLink] = useState("");
  const [showAddProject, setShowAddProject] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load website data on mount
  useEffect(() => {
    if (id) {
      loadWebsite(id);
    } else {
      router.push("/onboarding");
    }
  }, [id, loadWebsite]);

  // Sync profile data to forms
  useEffect(() => {
    if (editedProfile) {
      if (projects.length === 0 && editedProfile.projects) {
        setProjects(editedProfile.projects);
      }
      if (!interests && editedProfile.interests) {
        setInterests(editedProfile.interests);
      }
      if (skills.length === 0 && editedProfile.skills) {
        setSkills(editedProfile.skills);
      }
      if (experience.length === 0 && editedProfile.experience) {
        setExperience(editedProfile.experience.map(exp => ({
          title: exp.title,
          company: exp.company,
          duration: exp.duration,
          description: exp.description || ""
        })));
      }
      if (!subdomain && editedProfile.name) {
        const slug = editedProfile.name.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
        setSubdomain(slug);
      }
    }
  }, [editedProfile]);

  // Check subdomain availability
  useEffect(() => {
    if (subdomain.length < 3) {
      setIsSubdomainAvailable(null);
      return;
    }
    setCheckingSubdomain(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/websites/subdomain/check?slug=${subdomain}${websiteId ? `&websiteId=${websiteId}` : ""}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setIsSubdomainAvailable(data.available);
        } else {
          setIsSubdomainAvailable(null);
        }
      } catch {
        setIsSubdomainAvailable(null);
      } finally {
        setCheckingSubdomain(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [subdomain, websiteId]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentStep, showAddProject]);

  // Step 6: AI Optimization
  useEffect(() => {
    if (currentStep === 6) {
      const runAiRefinement = async () => {
        setOptimizing(true);
        try {
          const res = await fetch("/api/onboarding/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              websiteId,
              projects,
              interests,
              skills,
              experience,
            }),
          });
          const data = await res.json();
          if (res.ok && data.success) {
            toast.success("AI copy refinement complete!");
            if (websiteId) {
              await loadWebsite(websiteId);
            }
          }
        } catch (err) {
          console.error("AI refinement failed:", err);
        } finally {
          setOptimizing(false);
          setCurrentStep(7);
        }
      };
      runAiRefinement();
    }
  }, [currentStep]);

  // Handle final publish
  const handlePublish = async () => {
    if (!websiteId) return;
    setPublishing(true);
    const toastId = toast.loading("Publishing your professional portfolio page...");
    try {
      // 1. Update slug & template preference in DB
      const saveRes = await fetch(`/api/websites/${websiteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subdomainSlug: subdomain,
          templateId: selectedTemplate,
          profile: editedProfile,
        }),
      });

      if (!saveRes.ok) {
        throw new Error("Failed to save subdomain slug settings.");
      }

      // 2. Call publish API
      const response = await fetch(`/api/websites/${websiteId}/publish`, {
        method: "POST",
      });
      const data = await response.json();
      toast.dismiss(toastId);
      setPublishing(false);
      if (!response.ok) {
        toast.error(data.error || "Failed to publish website");
        return;
      }
      toast.success("Your page is live! 🎉");
      router.push(`/publish?slug=${data.slug}`);
    } catch (err: any) {
      toast.dismiss(toastId);
      setPublishing(false);
      toast.error(err.message || "Network error. Failed to publish website.");
    }
  };

  const handleNextStep = () => {
    // Save to context local state on next clicks
    if (currentStep === 2) updateField("projects", projects);
    if (currentStep === 3) updateField("interests", interests);
    if (currentStep === 4) updateField("skills", skills);
    if (currentStep === 5) updateField("experience", experience);

    setCurrentStep(currentStep + 1);
  };

  const handleBackStep = () => {
    if (currentStep > 2) {
      if (currentStep === 7) {
        setCurrentStep(5); // skip Step 6 optimization loading screen
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const addProject = () => {
    if (!newProjTitle.trim()) {
      toast.error("Project title is required");
      return;
    }
    setProjects([
      ...projects,
      {
        title: newProjTitle.trim(),
        description: newProjDesc.trim(),
        link: newProjLink.trim() || undefined,
        image: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60`,
      },
    ]);
    setNewProjTitle("");
    setNewProjDesc("");
    setNewProjLink("");
    setShowAddProject(false);
  };

  const removeProject = (idx: number) => {
    setProjects(projects.filter((_, i) => i !== idx));
  };

  const addSkillTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (skills.some(s => s.name.toLowerCase() === newSkill.trim().toLowerCase())) {
      setNewSkill("");
      return;
    }
    setSkills([...skills, { name: newSkill.trim() }]);
    setNewSkill("");
  };

  const removeSkillTag = (name: string) => {
    setSkills(skills.filter(s => s.name !== name));
  };

  const addExperienceItem = () => {
    setExperience([
      ...experience,
      {
        title: "New Role",
        company: "Company Name",
        duration: "Jan 2026 - Present",
        description: "",
      },
    ]);
  };

  const updateExperienceItem = (index: number, key: string, value: string) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [key]: value };
    setExperience(updated);
  };

  const removeExperienceItem = (idx: number) => {
    setExperience(experience.filter((_, i) => i !== idx));
  };

  const desktopScale = 0.52;
  const mobileScale = 0.42;

  return (
    <div className="h-screen w-full flex bg-[#F9FAFB] font-sans overflow-hidden">
      
      {/* ── Left Column: Chat-like interactive wizard (40% width) ── */}
      <aside className="w-[420px] md:w-[480px] shrink-0 h-full bg-white border-r border-neutral-100 flex flex-col justify-between shadow-xs relative z-20">
        
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between shrink-0 bg-white/50 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <AIAvatar />
            <div>
              <span className="font-semibold text-sm text-neutral-800 block leading-tight">LinkedPage Assistant</span>
              <span className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider block mt-0.5 animate-pulse">Onboarding Workspace</span>
            </div>
          </div>
          <button
            onClick={() => router.push("/onboarding")}
            className="text-[11px] font-semibold text-neutral-400 hover:text-neutral-700 transition-colors border border-neutral-200 px-2 py-1 rounded-lg"
          >
            Restart
          </button>
        </div>

        {/* Scrollable Conversation History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ scrollbarWidth: "none" }}>
          
          {/* Step 2 Introduction (Always visible since it's the start) */}
          <div className="flex items-start gap-3">
            <AIAvatar />
            <div className="bg-neutral-50 border border-neutral-200/60 rounded-2xl rounded-tl-sm px-4 py-3 shadow-xs max-w-[85%] text-xs text-neutral-700 leading-relaxed">
              Hello! Welcome to your profile dashboard. I've initialized your LinkedIn information in the database.
              <br/><br/>
              Let's refine your portfolio contents. First, let's review your <strong>Projects & Portfolio Highlights</strong>.
            </div>
          </div>

          {/* Static User Response for Step 2 */}
          {currentStep > 2 && (
            <div className="flex justify-end items-start gap-3">
              <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-xs max-w-[85%] text-xs leading-relaxed font-medium">
                I've updated my projects and portfolio details.
              </div>
              <UserAvatar />
            </div>
          )}

          {/* Step 3 Chat History */}
          {currentStep >= 3 && (
            <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <AIAvatar />
              <div className="bg-neutral-50 border border-neutral-200/60 rounded-2xl rounded-tl-sm px-4 py-3 shadow-xs max-w-[85%] text-xs text-neutral-700 leading-relaxed">
                Got it. Next, let's document your <strong>Core Interests and Career Goals</strong> to personalize your profile bio.
              </div>
            </div>
          )}

          {currentStep > 3 && (
            <div className="flex justify-end items-start gap-3">
              <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-xs max-w-[85%] text-xs leading-relaxed font-medium">
                Interests and aspirations submitted successfully.
              </div>
              <UserAvatar />
            </div>
          )}

          {/* Step 4 Chat History */}
          {currentStep >= 4 && (
            <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <AIAvatar />
              <div className="bg-neutral-50 border border-neutral-200/60 rounded-2xl rounded-tl-sm px-4 py-3 shadow-xs max-w-[85%] text-xs text-neutral-700 leading-relaxed">
                Excellent. Let's adjust your <strong>Core Skills & Tools</strong> tags.
              </div>
            </div>
          )}

          {currentStep > 4 && (
            <div className="flex justify-end items-start gap-3">
              <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-xs max-w-[85%] text-xs leading-relaxed font-medium">
                Skills tags confirmed.
              </div>
              <UserAvatar />
            </div>
          )}

          {/* Step 5 Chat History */}
          {currentStep >= 5 && (
            <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <AIAvatar />
              <div className="bg-neutral-50 border border-neutral-200/60 rounded-2xl rounded-tl-sm px-4 py-3 shadow-xs max-w-[85%] text-xs text-neutral-700 leading-relaxed">
                Perfect. Finally, let's verify your <strong>Work Experience timeline</strong>.
              </div>
            </div>
          )}

          {currentStep > 5 && (
            <div className="flex justify-end items-start gap-3">
              <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-xs max-w-[85%] text-xs leading-relaxed font-medium">
                Work experience details refined.
              </div>
              <UserAvatar />
            </div>
          )}

          {/* Step 6 Chat History (AI Loading) */}
          {currentStep === 6 && (
            <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <AIAvatar />
              <div className="bg-neutral-50 border border-neutral-200/60 rounded-2xl rounded-tl-sm px-4 py-3 shadow-xs max-w-[85%] text-xs text-neutral-700 leading-relaxed flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                Refinement engine running in the background...
              </div>
            </div>
          )}

          {/* Step 7 Chat History */}
          {currentStep >= 7 && (
            <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <AIAvatar />
              <div className="bg-neutral-50 border border-neutral-200/60 rounded-2xl rounded-tl-sm px-4 py-3 shadow-xs max-w-[85%] text-xs text-neutral-700 leading-relaxed">
                AI optimization finished! I've polished your text copy.
                <br/><br/>
                Now, please **select one of the 4 Framer-inspired template styles** below to apply your design theme.
              </div>
            </div>
          )}

          {currentStep > 7 && (
            <div className="flex justify-end items-start gap-3">
              <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-xs max-w-[85%] text-xs leading-relaxed font-medium">
                Template design style chosen.
              </div>
              <UserAvatar />
            </div>
          )}

          {/* Step 8 Chat History */}
          {currentStep >= 8 && (
            <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <AIAvatar />
              <div className="bg-neutral-50 border border-neutral-200/60 rounded-2xl rounded-tl-sm px-4 py-3 shadow-xs max-w-[85%] text-xs text-neutral-700 leading-relaxed">
                Almost complete! Let's choose your custom subdomain link slug to publish your site live.
              </div>
            </div>
          )}

          {/* DYNAMIC FORMS RENDER (Rendered inline inside chat feed) */}
          <div className="pt-2">
            
            {/* Step 2 Form (Projects) */}
            {currentStep === 2 && (
              <div className="border border-neutral-200 rounded-2xl p-4 bg-neutral-50/30 space-y-4 animate-in fade-in duration-300">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Portfolio Projects ({projects.length})</span>
                
                <div className="space-y-2">
                  {projects.map((proj, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-neutral-100 shadow-2xs">
                      <div className="truncate pr-4">
                        <span className="text-xs font-semibold text-neutral-800 block truncate">{proj.title}</span>
                        <span className="text-[10px] text-neutral-400 block truncate">{proj.description}</span>
                      </div>
                      <button onClick={() => removeProject(idx)} className="text-neutral-400 hover:text-red-500 p-1.5 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {projects.length === 0 && !showAddProject && (
                    <p className="text-[11px] text-neutral-400 italic text-center py-4 bg-white border border-neutral-100 rounded-xl">No projects added yet.</p>
                  )}
                </div>

                {showAddProject ? (
                  <div className="bg-white border border-neutral-200 rounded-xl p-3.5 space-y-2.5 shadow-2xs">
                    <input
                      type="text"
                      placeholder="Project Title (e.g. Finance Hub)"
                      value={newProjTitle}
                      onChange={(e) => setNewProjTitle(e.target.value)}
                      className="w-full text-xs p-2.5 border border-neutral-200 rounded-lg outline-none focus:border-blue-400"
                    />
                    <textarea
                      placeholder="Short description..."
                      value={newProjDesc}
                      onChange={(e) => setNewProjDesc(e.target.value)}
                      rows={2}
                      className="w-full text-xs p-2.5 border border-neutral-200 rounded-lg outline-none focus:border-blue-400 resize-none"
                    />
                    <input
                      type="text"
                      placeholder="Project URL Link (optional)"
                      value={newProjLink}
                      onChange={(e) => setNewProjLink(e.target.value)}
                      className="w-full text-xs p-2.5 border border-neutral-200 rounded-lg outline-none focus:border-blue-400"
                    />
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => setShowAddProject(false)} className="px-2.5 py-1 text-[10px] font-bold text-neutral-500 hover:bg-neutral-100 rounded">Cancel</button>
                      <button onClick={addProject} className="px-2.5 py-1 text-[10px] font-bold bg-blue-600 text-white hover:bg-blue-700 rounded shadow-xs">Add</button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAddProject(true)}
                    className="w-full h-8 border border-dashed border-neutral-300 rounded-xl text-[11px] font-semibold text-neutral-600 flex items-center justify-center gap-1 hover:bg-neutral-50 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Project Card
                  </button>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextStep}
                    className="h-8 px-4 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 flex items-center gap-1 transition-colors"
                  >
                    Save & Next <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 Form (Interests) */}
            {currentStep === 3 && (
              <div className="border border-neutral-200 rounded-2xl p-4 bg-neutral-50/30 space-y-4 animate-in fade-in duration-300">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Interests & Direction</span>
                <textarea
                  placeholder="Describe your primary interests or directions (e.g. AI systems, UX typography, crypto security)..."
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  rows={4}
                  className="w-full text-xs p-3 border border-neutral-200 bg-white rounded-xl outline-none focus:border-blue-400 resize-none leading-relaxed"
                />
                <div className="flex justify-between items-center pt-2">
                  <button onClick={handleBackStep} className="flex items-center gap-0.5 text-xs font-semibold text-neutral-400 hover:text-neutral-700">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="h-8 px-4 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 flex items-center gap-1 transition-colors"
                  >
                    Save & Next <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 Form (Skills) */}
            {currentStep === 4 && (
              <div className="border border-neutral-200 rounded-2xl p-4 bg-neutral-50/30 space-y-4 animate-in fade-in duration-300">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Skills tags manager</span>
                
                <div className="flex flex-wrap gap-1.5 p-2 bg-white border border-neutral-100 rounded-xl max-h-36 overflow-y-auto">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-2 py-0.5 bg-neutral-100 rounded-full border border-neutral-200 text-neutral-700">
                      {skill.name}
                      <button onClick={() => removeSkillTag(skill.name)} className="text-neutral-400 hover:text-red-500 font-bold ml-1">×</button>
                    </span>
                  ))}
                </div>

                <form onSubmit={addSkillTag} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type skill & press Enter"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="flex-1 text-xs px-2.5 py-1.5 border border-neutral-200 bg-white rounded-lg outline-none focus:border-blue-400"
                  />
                  <button type="submit" className="px-3 bg-neutral-950 text-white text-[10px] font-bold rounded-lg hover:bg-neutral-800">Add</button>
                </form>

                <div className="flex justify-between items-center pt-2">
                  <button onClick={handleBackStep} className="flex items-center gap-0.5 text-xs font-semibold text-neutral-400 hover:text-neutral-700">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="h-8 px-4 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 flex items-center gap-1 transition-colors"
                  >
                    Save & Next <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5 Form (Experience) */}
            {currentStep === 5 && (
              <div className="border border-neutral-200 rounded-2xl p-4 bg-neutral-50/30 space-y-4 animate-in fade-in duration-300">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Work timeline items</span>
                
                <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                  {experience.map((exp, idx) => (
                    <div key={idx} className="bg-white border border-neutral-200 rounded-xl p-3.5 space-y-2.5 shadow-2xs relative">
                      <button onClick={() => removeExperienceItem(idx)} className="absolute top-2.5 right-2.5 text-neutral-400 hover:text-red-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={exp.title}
                          placeholder="Role"
                          onChange={(e) => updateExperienceItem(idx, "title", e.target.value)}
                          className="text-[11px] p-1.5 border border-neutral-200 rounded outline-none focus:border-blue-400"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          placeholder="Company"
                          onChange={(e) => updateExperienceItem(idx, "company", e.target.value)}
                          className="text-[11px] p-1.5 border border-neutral-200 rounded outline-none focus:border-blue-400"
                        />
                      </div>
                      <input
                        type="text"
                        value={exp.duration}
                        placeholder="Duration (e.g. 2024 - Present)"
                        onChange={(e) => updateExperienceItem(idx, "duration", e.target.value)}
                        className="w-full text-[11px] p-1.5 border border-neutral-200 rounded outline-none focus:border-blue-400"
                      />
                      <textarea
                        value={exp.description}
                        placeholder="Responsibilities..."
                        rows={2}
                        onChange={(e) => updateExperienceItem(idx, "description", e.target.value)}
                        className="w-full text-[11px] p-1.5 border border-neutral-200 rounded outline-none focus:border-blue-400 resize-none leading-relaxed"
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={addExperienceItem}
                  className="w-full h-8 border border-dashed border-neutral-300 rounded-xl text-[11px] font-semibold text-neutral-600 flex items-center justify-center gap-1 hover:bg-neutral-50 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Experience Card
                </button>

                <div className="flex justify-between items-center pt-2">
                  <button onClick={handleBackStep} className="flex items-center gap-0.5 text-xs font-semibold text-neutral-400 hover:text-neutral-700">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="h-8 px-4 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 flex items-center gap-1 transition-colors"
                  >
                    Refine with AI <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 7 Form (Select Template) */}
            {currentStep === 7 && (
              <div className="border border-neutral-200 rounded-2xl p-4 bg-neutral-50/30 space-y-4 animate-in fade-in duration-300">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Choose Theme Style</span>
                
                <div className="grid grid-cols-2 gap-2">
                  {["daniel-cross", "julian-mercer", "link-hunt", "biobricks"].map((id) => {
                    const isSelected = selectedTemplate === id;
                    const labelName = id === "daniel-cross" ? "Daniel Cross" : id === "julian-mercer" ? "Julian Mercer" : id === "link-hunt" ? "Link Hunt" : "Biobricks";
                    return (
                      <div
                        key={id}
                        onClick={() => selectTemplate(id as any)}
                        className={`bg-white border p-3 rounded-xl cursor-pointer text-center transition-all ${
                          isSelected
                            ? "border-blue-500 bg-blue-50/10 ring-1 ring-blue-500/30"
                            : "border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        <span className="text-xs font-bold text-neutral-800 block">{labelName}</span>
                        {isSelected && <span className="text-[9px] font-bold text-blue-500 block mt-1">Applied</span>}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button onClick={handleBackStep} className="flex items-center gap-0.5 text-xs font-semibold text-neutral-400 hover:text-neutral-700">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="h-8 px-4 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 flex items-center gap-1 transition-colors"
                  >
                    Confirm Theme <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 8 Form (Publish slug configuration) */}
            {currentStep === 8 && (
              <div className="border border-neutral-200 rounded-2xl p-4 bg-neutral-50/30 space-y-4 animate-in fade-in duration-300">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Choose Slug Address</span>
                
                <div className="flex items-center w-full bg-white border border-neutral-200 rounded-xl px-2.5 py-1.5 focus-within:border-blue-400">
                  <input
                    type="text"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    className="flex-1 text-xs bg-transparent outline-none font-medium font-mono text-neutral-800"
                    placeholder="name"
                  />
                  <span className="text-xs text-neutral-400 font-mono font-medium ml-1">.linkedpage.io</span>
                </div>

                <div className="min-h-4 text-right">
                  {checkingSubdomain ? (
                    <span className="text-[9px] text-neutral-400 font-mono">Checking availability...</span>
                  ) : isSubdomainAvailable === true ? (
                    <span className="text-[9px] text-emerald-600 font-bold flex items-center justify-end gap-0.5 font-mono">
                      <Check className="w-3 h-3" /> Available!
                    </span>
                  ) : isSubdomainAvailable === false ? (
                    <span className="text-[9px] text-red-500 font-bold flex items-center justify-end gap-0.5 font-mono">
                      <AlertCircle className="w-3 h-3" /> Taken!
                    </span>
                  ) : null}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button onClick={handleBackStep} className="flex items-center gap-0.5 text-xs font-semibold text-neutral-400 hover:text-neutral-700">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    onClick={handlePublish}
                    disabled={publishing || isSubdomainAvailable !== true}
                    className="h-8 px-5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {publishing ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" /> Publishing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" /> Publish Live Page
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>

          <div ref={chatEndRef} />
        </div>

        {/* Input bar footer block (Generic cosmetic layout only) */}
        <div className="p-4 border-t border-neutral-100 shrink-0 bg-neutral-50/50 flex gap-2">
          <input
            type="text"
            disabled
            placeholder="Complete wizard forms above to proceed..."
            className="flex-1 bg-neutral-100 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-400 cursor-not-allowed"
          />
          <button
            disabled
            className="w-8 h-8 rounded-xl bg-neutral-200 text-neutral-400 flex items-center justify-center shrink-0 cursor-not-allowed"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </div>

      </aside>

      {/* ── Right Column: SVG Animation or Live Template Preview (60% width) ── */}
      <main className="flex-1 h-full flex flex-col overflow-hidden bg-[#FAFAFA] relative">
        
        {/* Right Canvas Toolbar (Visible during template selection & publish step) */}
        {currentStep >= 7 && (
          <div className="absolute top-4 right-4 z-30 flex items-center bg-white border border-neutral-200/80 rounded-xl p-1 shadow-xs gap-1">
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all ${
                previewMode === "desktop" ? "bg-blue-50 text-blue-600" : "text-neutral-400 hover:text-neutral-600"
              }`}
              title="Desktop preview"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewMode("mobile")}
              className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all ${
                previewMode === "mobile" ? "bg-blue-50 text-blue-600" : "text-neutral-400 hover:text-neutral-600"
              }`}
              title="Mobile preview"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* Steps 2-6: Step-specific SVG animations */}
            {currentStep <= 6 && (
              <motion.div
                key={`anim-${currentStep}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full flex items-center justify-center"
              >
                <WizardAnimations step={currentStep} />
              </motion.div>
            )}

            {/* Steps 7-8: Live Profile Preview Canvas */}
            {currentStep >= 7 && (
              <motion.div
                key={`preview-${selectedTemplate}-${previewMode}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full h-full flex items-center justify-center"
              >
                {editedProfile ? (
                  previewMode === "desktop" ? (
                    <div
                      className="rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-md relative"
                      style={{ width: 1024 * desktopScale, height: 768 * desktopScale }}
                    >
                      <div style={{ width: 1024, height: 768, transform: `scale(${desktopScale})`, transformOrigin: "top left", overflow: "auto" }}>
                        <ProfilePreview profile={editedProfile} template={selectedTemplate} fluid={true} />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="rounded-3xl overflow-hidden border-[6px] border-neutral-800 bg-white shadow-md relative"
                      style={{ width: 375 * mobileScale, height: 812 * mobileScale }}
                    >
                      <div style={{ width: 375, height: 812, transform: `scale(${mobileScale})`, transformOrigin: "top left", overflow: "auto" }}>
                        <ProfilePreview profile={editedProfile} template={selectedTemplate} fluid={true} />
                      </div>
                    </div>
                  )
                ) : (
                  <div className="text-neutral-400 text-xs font-mono">Loading preview data...</div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </main>

    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-6 h-6 text-neutral-800 animate-spin" />
            <span className="text-xs text-neutral-400 font-mono">Loading workspace...</span>
          </div>
        </div>
      }
    >
      <EditorInner />
    </Suspense>
  );
}
