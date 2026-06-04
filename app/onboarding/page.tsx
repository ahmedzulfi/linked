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
  Briefcase,
  Layers,
  Heart,
  FileText,
  FileCode,
  Globe,
  Loader2,
} from "lucide-react";
import { AnimatedUploadIllustration, AnimatedGeneratingIllustration } from "@/components/AnimatedSVGs";
import ProfilePreview from "../editor/components/ProfilePreview";

// ── Typing dots indicator ────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-[3px] px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-[5px] h-[5px] rounded-full bg-[#2A2A2F]/40"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function OnboardingInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    startScrapeManual,
    isLoading,
    scrapeError,
    editedProfile,
    clearProfile,
    useMockProfile,
    websiteId,
    setScrapeError,
    pendingZip,
    setPendingZip,
    selectedTemplate,
    selectTemplate,
    loadWebsite,
    updateField,
  } = useEditor();

  // Wizard step state (1 to 8)
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);

  // Form states
  const [projects, setProjects] = useState<{ title: string; description: string; link?: string; image?: string }[]>([]);
  const [interests, setInterests] = useState("");
  const [skills, setSkills] = useState<{ name: string }[]>([]);
  const [experience, setExperience] = useState<{ title: string; company: string; duration: string; description: string }[]>([]);
  const [subdomain, setSubdomain] = useState("");
  const [checkingSubdomain, setCheckingSubdomain] = useState(false);
  const [isSubdomainAvailable, setIsSubdomainAvailable] = useState<boolean | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [optimizing, setOptimizing] = useState(false);

  // New Project Form State
  const [newProjTitle, setNewProjTitle] = useState("");
  const [newProjDesc, setNewProjDesc] = useState("");
  const [newProjLink, setNewProjLink] = useState("");
  const [showAddProject, setShowAddProject] = useState(false);

  // New Skill Tag State
  const [newSkill, setNewSkill] = useState("");

  // Sync editedProfile from context to local wizard form state
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

  const handleUploadZipWithFile = async (file: File) => {
    if (file.size > 20 * 1024 * 1024) {
      toast.error("Files larger than 20MB are not allowed.");
      return;
    }
    setIsImporting(true);
    const toastId = toast.loading("Uploading and parsing ZIP archive...");
    try {
      const success = await startScrapeManual(file);
      toast.dismiss(toastId);
      if (success) {
        toast.success("LinkedIn profile parsed successfully!");
        setWizardStep(2);
      }
      setIsImporting(false);
    } catch (e: any) {
      toast.dismiss(toastId);
      toast.error(e.message || "Failed to process ZIP archive.");
      setIsImporting(false);
    }
  };

  // If there's an uploaded ZIP from the home page, start processing immediately
  useEffect(() => {
    if (pendingZip) {
      const fileToProcess = pendingZip;
      setPendingZip(null);
      setZipFile(fileToProcess);
      handleUploadZipWithFile(fileToProcess);
    }
  }, [pendingZip, setPendingZip]);

  const handleZipFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setZipFile(file);
      handleUploadZipWithFile(file);
    }
  };

  const handleManualImport = async () => {
    const toastId = toast.loading("Loading default template settings...");
    await useMockProfile();
    toast.dismiss(toastId);
    toast.success("Loaded skip mock profile!");
    setWizardStep(2);
  };

  // Step 6: AI Optimization
  useEffect(() => {
    if (wizardStep === 6) {
      const runAiOptimization = async () => {
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
            toast.success("AI optimization complete! Page copy refined.");
            // Refresh editor context state with optimized data
            if (websiteId) {
              await loadWebsite(websiteId);
            }
          } else {
            console.warn("AI optimization failed: ", data.error);
          }
        } catch (err) {
          console.error("AI optimization API error:", err);
        } finally {
          setOptimizing(false);
          setWizardStep(7);
        }
      };
      runAiOptimization();
    }
  }, [wizardStep]);

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
        image: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60`, // default clean layout asset
      },
    ]);
    setNewProjTitle("");
    setNewProjDesc("");
    setNewProjLink("");
    setShowAddProject(false);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (skills.some((s) => s.name.toLowerCase() === newSkill.trim().toLowerCase())) {
      setNewSkill("");
      return;
    }
    setSkills([...skills, { name: newSkill.trim() }]);
    setNewSkill("");
  };

  const removeSkill = (name: string) => {
    setSkills(skills.filter((s) => s.name !== name));
  };

  const removeExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const updateExperienceItem = (index: number, key: string, value: string) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [key]: value };
    setExperience(updated);
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

  // Helper to step backward
  const stepBack = () => {
    if (wizardStep > 1) {
      if (wizardStep === 7) {
        setWizardStep(5); // skip AI loading step on go-back
      } else {
        setWizardStep(wizardStep - 1);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black antialiased relative overflow-hidden flex flex-col justify-between py-12 px-6">
      {/* Mesh decorative background */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-60">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-blue-200/40 to-transparent blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-gradient-to-bl from-emerald-100/30 to-transparent blur-[120px]" />
      </div>

      {/* Top Header */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
          <img src="/logoicon.png" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="font-semibold text-lg text-neutral-800 tracking-tight">LinkedPage</span>
        </div>
        {wizardStep > 1 && (
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
            <span>Step {wizardStep > 5 ? wizardStep - 1 : wizardStep} of 7</span>
            <div className="flex gap-1 ml-2">
              {[1, 2, 3, 4, 5, 7, 8].map((s, idx) => (
                <div
                  key={s}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    wizardStep === s
                      ? "bg-blue-500 scale-125"
                      : wizardStep > s || (wizardStep === 6 && s < 6)
                      ? "bg-neutral-300"
                      : "bg-neutral-200"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Wizard Container */}
      <main className="w-full max-w-4xl mx-auto flex-1 flex items-center justify-center z-10 py-10">
        <AnimatePresence mode="wait">
          {/* STEP 1: Upload LinkedIn ZIP */}
          {wizardStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border border-neutral-200/80 rounded-[24px] shadow-sm p-8 w-full max-w-lg space-y-6"
            >
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Upload LinkedIn Profile</h1>
                <p className="text-sm text-neutral-500 max-w-sm mx-auto">
                  Export your LinkedIn data ZIP and upload it here to auto-populate your premium site instantly.
                </p>
              </div>

              {/* Upload box */}
              <label
                htmlFor="zip-upload-wizard"
                className="w-full flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 hover:border-blue-400 rounded-2xl p-8 bg-neutral-50/50 hover:bg-blue-50/10 cursor-pointer transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] active:scale-[0.99] text-center group"
              >
                <input
                  id="zip-upload-wizard"
                  type="file"
                  accept=".zip"
                  onChange={handleZipFileChange}
                  className="hidden"
                  disabled={isImporting}
                />
                <AnimatedUploadIllustration />
                <div className="space-y-1 mt-3">
                  <span className="text-sm font-semibold text-neutral-800 block">
                    Drop your LinkedIn ZIP archive
                  </span>
                  <span className="text-xs text-neutral-400 block font-medium">
                    Click to browse files (contains Profile.csv)
                  </span>
                </div>
              </label>

              {/* Instructions */}
              <div className="bg-neutral-50 border border-neutral-200/60 rounded-xl p-4 space-y-2.5">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Quick Export Guide (Takes 2 min)</span>
                <div className="space-y-2 text-xs text-neutral-500">
                  <div className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0">1</span>
                    <span>Go to LinkedIn's Member Data export page.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0">2</span>
                    <span>Select "Profile" data only and request archive.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0">3</span>
                    <span>Download ZIP from email and drag it here.</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-center justify-center pt-2">
                <button
                  onClick={handleManualImport}
                  className="text-xs text-neutral-400 hover:text-neutral-700 underline font-medium transition-colors"
                >
                  Skip & start with sample data →
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Portfolio Projects */}
          {wizardStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border border-neutral-200/80 rounded-[24px] shadow-sm p-8 w-full max-w-xl space-y-6"
            >
              <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900 flex items-center gap-2">
                  <FileCode className="w-6 h-6 text-blue-500" /> Showcase Your Projects
                </h1>
                <p className="text-sm text-neutral-500">
                  Add projects, case studies, or github sites to present on your profile.
                </p>
              </div>

              {/* Added projects list */}
              <div className="space-y-3">
                {projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3.5 bg-neutral-50 border border-neutral-200/80 rounded-xl"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-800">{proj.title}</h4>
                      <p className="text-xs text-neutral-500 line-clamp-1">{proj.description}</p>
                    </div>
                    <button
                      onClick={() => removeProject(idx)}
                      className="text-neutral-400 hover:text-red-500 p-1.5 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {projects.length === 0 && !showAddProject && (
                  <div className="text-center py-8 border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50/50">
                    <p className="text-xs text-neutral-400 font-medium">No projects added yet.</p>
                  </div>
                )}
              </div>

              {/* Inline project adder */}
              {showAddProject ? (
                <div className="p-4 border border-neutral-200 rounded-xl space-y-3 bg-neutral-50/20">
                  <input
                    type="text"
                    placeholder="Project Title (e.g. Stripe Radar Redesign)"
                    value={newProjTitle}
                    onChange={(e) => setNewProjTitle(e.target.value)}
                    className="w-full text-sm p-2.5 bg-white border border-neutral-200 rounded-lg outline-none focus:border-blue-400"
                  />
                  <textarea
                    placeholder="Project description or impact..."
                    value={newProjDesc}
                    onChange={(e) => setNewProjDesc(e.target.value)}
                    rows={2}
                    className="w-full text-sm p-2.5 bg-white border border-neutral-200 rounded-lg outline-none focus:border-blue-400 resize-none"
                  />
                  <input
                    type="text"
                    placeholder="Project Link (optional)"
                    value={newProjLink}
                    onChange={(e) => setNewProjLink(e.target.value)}
                    className="w-full text-sm p-2.5 bg-white border border-neutral-200 rounded-lg outline-none focus:border-blue-400"
                  />
                  <div className="flex gap-2 justify-end pt-1">
                    <button
                      onClick={() => setShowAddProject(false)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-neutral-500 hover:bg-neutral-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addProject}
                      className="px-3.5 py-1.5 text-xs font-semibold bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
                    >
                      Add Project
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAddProject(true)}
                  className="w-full h-10 border border-dashed border-neutral-300 rounded-xl text-xs font-semibold text-neutral-600 flex items-center justify-center gap-1.5 hover:bg-neutral-50 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add custom project card
                </button>
              )}

              {/* Bottom buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
                <button onClick={stepBack} className="flex items-center gap-1 text-xs font-semibold text-neutral-400 hover:text-neutral-700">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setWizardStep(3)}
                  className="px-5 h-9 bg-blue-500 text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1"
                >
                  Next step <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Interests & Goals */}
          {wizardStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border border-neutral-200/80 rounded-[24px] shadow-sm p-8 w-full max-w-xl space-y-6"
            >
              <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-emerald-500" /> Interests & Focus Areas
                </h1>
                <p className="text-sm text-neutral-500">
                  Tell us what topics, technologies, or challenges you're interested in exploring.
                </p>
              </div>

              <textarea
                placeholder="e.g. I am passionate about developer tooling, design engineering, and fintech scalability. I love building open source libraries and tutoring junior engineers in my free time."
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                rows={5}
                className="w-full text-sm p-3 bg-neutral-50/50 border border-neutral-200 rounded-xl outline-none focus:border-blue-400 resize-none leading-relaxed"
              />

              {/* Bottom buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
                <button onClick={stepBack} className="flex items-center gap-1 text-xs font-semibold text-neutral-400 hover:text-neutral-700">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setWizardStep(4)}
                  className="px-5 h-9 bg-blue-500 text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1"
                >
                  Next step <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Skills tag editor */}
          {wizardStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border border-neutral-200/80 rounded-[24px] shadow-sm p-8 w-full max-w-xl space-y-6"
            >
              <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900 flex items-center gap-2">
                  <Layers className="w-6 h-6 text-indigo-500" /> Your Skills & Expertise
                </h1>
                <p className="text-sm text-neutral-500">
                  Add tags representing your core capabilities.
                </p>
              </div>

              {/* Skill tag list */}
              <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto p-1.5 border border-neutral-100 rounded-xl bg-neutral-50/30">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 bg-white border border-neutral-200 rounded-full text-neutral-700"
                  >
                    {skill.name}
                    <button
                      onClick={() => removeSkill(skill.name)}
                      className="text-neutral-400 hover:text-red-500 font-bold ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {skills.length === 0 && (
                  <span className="text-xs text-neutral-400 p-2">No skills tags added yet.</span>
                )}
              </div>

              {/* Add tag form */}
              <form onSubmit={addSkill} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add new skill (e.g. Next.js, Product Design)"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1 text-sm px-3 py-2 bg-white border border-neutral-200 rounded-lg outline-none focus:border-blue-400"
                />
                <button
                  type="submit"
                  className="px-4 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </form>

              {/* Bottom buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
                <button onClick={stepBack} className="flex items-center gap-1 text-xs font-semibold text-neutral-400 hover:text-neutral-700">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setWizardStep(5)}
                  className="px-5 h-9 bg-blue-500 text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1"
                >
                  Next step <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Work Experience */}
          {wizardStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border border-neutral-200/80 rounded-[24px] shadow-sm p-8 w-full max-w-2xl space-y-6"
            >
              <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-amber-500" /> Work Experience
                </h1>
                <p className="text-sm text-neutral-500">
                  Verify or edit your recent career timeline items.
                </p>
              </div>

              {/* Experience list with inline forms */}
              <div className="space-y-6 max-h-[350px] overflow-y-auto pr-2">
                {experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-neutral-200 rounded-xl bg-neutral-50/20 space-y-3 relative group"
                  >
                    <button
                      onClick={() => removeExperience(idx)}
                      className="absolute top-3 right-3 text-neutral-400 hover:text-red-500 p-1.5 transition-colors"
                      title="Remove Role"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Role Title</label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => updateExperienceItem(idx, "title", e.target.value)}
                          className="w-full text-xs p-2 bg-white border border-neutral-200 rounded-lg outline-none focus:border-blue-400"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperienceItem(idx, "company", e.target.value)}
                          className="w-full text-xs p-2 bg-white border border-neutral-200 rounded-lg outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Duration</label>
                        <input
                          type="text"
                          value={exp.duration}
                          onChange={(e) => updateExperienceItem(idx, "duration", e.target.value)}
                          className="w-full text-xs p-2 bg-white border border-neutral-200 rounded-lg outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Role Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateExperienceItem(idx, "description", e.target.value)}
                        rows={2}
                        className="w-full text-xs p-2 bg-white border border-neutral-200 rounded-lg outline-none focus:border-blue-400 resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                ))}

                {experience.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50/50">
                    <p className="text-xs text-neutral-400 font-medium">No experience items added yet.</p>
                  </div>
                )}
              </div>

              <button
                onClick={addExperienceItem}
                className="w-full h-10 border border-dashed border-neutral-300 rounded-xl text-xs font-semibold text-neutral-600 flex items-center justify-center gap-1.5 hover:bg-neutral-50 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add work experience card
              </button>

              {/* Bottom buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
                <button onClick={stepBack} className="flex items-center gap-1 text-xs font-semibold text-neutral-400 hover:text-neutral-700">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setWizardStep(6)}
                  className="px-5 h-9 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-1"
                >
                  Refine with AI <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 6: Background AI Optimization Loading Screen */}
          {wizardStep === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-neutral-200/80 rounded-[24px] shadow-sm p-8 w-full max-w-md text-center space-y-6"
            >
              <AnimatedGeneratingIllustration />
              <div className="space-y-2">
                <h2 className="text-xl font-bold tracking-tight text-neutral-900 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" /> Optimizing Page Details
                </h2>
                <p className="text-xs text-neutral-400 font-mono">
                  Using OpenRouter LLM to polish and format copy...
                </p>
              </div>

              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-6 h-6 text-neutral-800 animate-spin" />
                <span className="text-[11px] font-semibold text-neutral-500">Formatting headline, summary & projects...</span>
              </div>
            </motion.div>
          )}

          {/* STEP 7: Template Selection Grid */}
          {wizardStep === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full max-w-4xl space-y-6"
            >
              <div className="text-center space-y-1 mb-2">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-950">Select Portfolio Layout</h1>
                <p className="text-sm text-neutral-500">
                  Pick one of the 4 Framer-inspired template designs loaded with your details.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["daniel-cross", "julian-mercer", "link-hunt", "biobricks"].map((id) => {
                  const isSelected = selectedTemplate === id;
                  const name = id === "daniel-cross" ? "Daniel Cross" : id === "julian-mercer" ? "Julian Mercer" : id === "link-hunt" ? "Link Hunt" : "Biobricks";
                  const desc = id === "daniel-cross" ? "High-contrast, bold editorial layout" : id === "julian-mercer" ? "Elegant serif typography with warm tones" : id === "link-hunt" ? "Clean creator links-in-bio stack" : "Clean grid modular bento cards";

                  return (
                    <div
                      key={id}
                      onClick={() => selectTemplate(id as any)}
                      className={`bg-white border rounded-[20px] p-4 flex flex-col justify-between cursor-pointer transition-all hover:translate-y-[-2px] hover:shadow-md ${
                        isSelected
                          ? "border-blue-500 ring-2 ring-blue-500/20"
                          : "border-neutral-200/80 hover:border-neutral-300"
                      }`}
                    >
                      <div className="space-y-1 mb-3">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-bold text-neutral-900">{name}</h3>
                          {isSelected && (
                            <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-full uppercase">
                              <Check className="w-2.5 h-2.5" /> Selected
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-neutral-400 font-medium">{desc}</p>
                      </div>

                      {/* Mini Scaled Preview Container */}
                      <div className="w-full aspect-[4/3] rounded-lg border border-neutral-100 overflow-hidden relative bg-[#F9F9F9] flex items-center justify-center p-2">
                        <div className="origin-top scale-[0.45] w-[1024px] h-[768px] absolute top-2 left-2 pointer-events-none select-none overflow-hidden rounded-lg shadow-sm border border-neutral-200">
                          <ProfilePreview profile={editedProfile || {} as any} template={id as any} fluid={true} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-neutral-200 bg-white/40 p-4 rounded-xl">
                <button onClick={stepBack} className="flex items-center gap-1 text-xs font-semibold text-neutral-400 hover:text-neutral-700">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setWizardStep(8)}
                  className="px-6 h-10 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  Proceed to Publish <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 8: Domain & Publish */}
          {wizardStep === 8 && (
            <motion.div
              key="step8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border border-neutral-200/80 rounded-[24px] shadow-sm p-8 w-full max-w-md space-y-6"
            >
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Configure Page Link</h1>
                <p className="text-sm text-neutral-500 max-w-xs mx-auto">
                  Choose a unique link name to publish your professional portfolio online.
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Subdomain Link Address</label>
                <div className="flex items-center w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 focus-within:border-blue-400 focus-within:bg-white transition-colors">
                  <Globe className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    className="flex-1 text-sm bg-transparent outline-none font-medium font-mono text-neutral-800"
                    placeholder="yourname"
                  />
                  <span className="text-xs text-neutral-400 font-mono font-medium ml-1 shrink-0">.linkedpage.io</span>
                </div>

                <div className="min-h-5 text-right">
                  {checkingSubdomain ? (
                    <span className="text-[10px] text-neutral-400 font-mono">Checking availability...</span>
                  ) : isSubdomainAvailable === true ? (
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center justify-end gap-1 font-mono">
                      <Check className="w-3.5 h-3.5" /> Subdomain is available!
                    </span>
                  ) : isSubdomainAvailable === false ? (
                    <span className="text-[10px] text-red-500 font-semibold flex items-center justify-end gap-1 font-mono">
                      <AlertCircle className="w-3.5 h-3.5" /> Subdomain is already taken!
                    </span>
                  ) : null}
                </div>
              </div>

              <button
                onClick={handlePublish}
                disabled={publishing || isSubdomainAvailable !== true}
                className="w-full h-11 bg-blue-500 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {publishing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Publishing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Publish Live Portfolio
                  </>
                )}
              </button>

              {/* Back to template selector */}
              <div className="flex justify-center items-center pt-2">
                <button
                  onClick={() => setWizardStep(7)}
                  className="text-xs text-neutral-400 hover:text-neutral-600 font-medium transition-colors"
                >
                  ← Go back to templates
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer copyright */}
      <footer className="w-full text-center text-[10px] text-neutral-400 font-mono shrink-0">
        © {new Date().getFullYear()} LinkedPage. Simple. Fast. Professional.
      </footer>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-neutral-800 animate-spin" />
        </div>
      }
    >
      <OnboardingInner />
    </Suspense>
  );
}
