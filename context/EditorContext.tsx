"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import {
  ProfileData,
  TemplateId,
  MOCK_PROFILE,
  BLANK_PROFILE,
} from "@/shared/types";
import { toast } from "sonner";

// ─── State Shape ───────────────────────────────────────────────────────────────
interface EditorState {
  websiteId: string | null;
  profile: ProfileData | null;
  editedProfile: ProfileData | null;
  selectedTemplate: TemplateId;
  linkedinUrl: string;
  isLoading: boolean;
  scrapeError: string | null;
  isDirty: boolean;
  pendingZip: File | null;
}

interface EditorActions {
  setWebsiteId: (id: string | null) => void;
  loadWebsite: (id: string) => Promise<void>;
  saveWebsite: () => Promise<void>;
  setLinkedinUrl: (url: string) => void;
  startScrape: (url: string) => Promise<void>;
  startScrapeManual: (file: File) => Promise<boolean>;
  updateField: <K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K],
  ) => void;
  selectTemplate: (id: TemplateId) => void;
  resetEdits: () => void;
  clearProfile: () => void;
  useMockProfile: () => void;
  setScrapeError: (err: string | null) => void;
  setPendingZip: (file: File | null) => void;
}

type EditorContextValue = EditorState & EditorActions;

// ─── Context ───────────────────────────────────────────────────────────────────
const EditorContext = createContext<EditorContextValue | null>(null);

const SESSION_KEY = "linkedpage_profile";
const TEMPLATE_KEY = "linkedpage_template";
const URL_KEY = "linkedpage_url";

export function EditorProvider({ children }: { children: ReactNode }) {
  const [websiteId, setWebsiteId] = useState<string | null>(null);
  const [linkedinUrl, setLinkedinUrlState] = useState("");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [editedProfile, setEditedProfile] = useState<ProfileData | null>(null);
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateId>("daniel-cross");
  const [isLoading, setIsLoading] = useState(false);
  const [scrapeError, setScrapeError] = useState<string | null>(null);
  const [pendingZip, setPendingZip] = useState<File | null>(null);

  // Rehydrate from sessionStorage on mount (fallback/legacy support)
  useEffect(() => {
    try {
      const storedProfile = sessionStorage.getItem(SESSION_KEY);
      const storedTemplate = sessionStorage.getItem(
        TEMPLATE_KEY,
      ) as TemplateId | null;
      const storedUrl = sessionStorage.getItem(URL_KEY);
      if (storedProfile && !websiteId) {
        const p = JSON.parse(storedProfile) as ProfileData;
        setProfile(p);
        setEditedProfile(p);
      }
      if (storedTemplate) setSelectedTemplate(storedTemplate);
      if (storedUrl) setLinkedinUrlState(storedUrl);
    } catch {
      // ignore parse errors
    }
  }, [websiteId]);

  const setLinkedinUrl = useCallback((url: string) => {
    setLinkedinUrlState(url);
    sessionStorage.setItem(URL_KEY, url);
  }, []);

  const persistProfile = useCallback((p: ProfileData) => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(p));
  }, []);

  // Helper to create a website in the backend and assign it the profile data
  const createWebsiteWithProfile = useCallback(
    async (profileData: ProfileData): Promise<string> => {
      const createRes = await fetch("/api/websites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: selectedTemplate }),
      });

      if (createRes.status === 401) {
        // User is not logged in. Redirect to signup to save their progress
        window.location.href = "/signup?intent=save_scrape";
        // We return a dummy promise that never resolves so the rest of the code doesn't crash before redirect
        await new Promise(() => {});
      }

      const createData = await createRes.json();
      if (!createRes.ok || !createData.website) {
        throw new Error(createData.error || "Failed to create website draft");
      }
      const newId = createData.website.id;

      // 2. Save profile data to the website
      const updateRes = await fetch(`/api/websites/${newId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName: profileData.name,
          profile: profileData,
        }),
      });
      const updateData = await updateRes.json();
      if (!updateRes.ok) {
        throw new Error(
          updateData.error || "Failed to save profile data to website draft",
        );
      }

      setWebsiteId(newId);
      sessionStorage.setItem("linkedpage_last_website_id", newId);
      sessionStorage.setItem("linkedpage_brand_name", profileData.name);
      sessionStorage.setItem(
        "linkedpage_subdomain",
        `${createData.website.subdomainSlug}.linkedpage.io`,
      );
      return newId;
    },
    [selectedTemplate],
  );

  // Load website from API
  const loadWebsite = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/websites/${id}`);
      const data = await res.json();
      if (!res.ok || !data.website) {
        throw new Error(data.error || "Failed to load website details");
      }
      const web = data.website;
      setWebsiteId(web.id);
      sessionStorage.setItem("linkedpage_last_website_id", web.id);
      setProfile(web.profile);
      setEditedProfile(web.profile);
      setSelectedTemplate(web.templateId || "minimal-card");
      if (web.profile.linkedinUrl) {
        setLinkedinUrlState(web.profile.linkedinUrl);
      }

      sessionStorage.setItem("linkedpage_brand_name", web.brandName);
      sessionStorage.setItem(
        "linkedpage_subdomain",
        `${web.subdomainSlug}.linkedpage.io`,
      );
    } catch (e: any) {
      toast.error(e.message || "Failed to load website.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save changes manually to the backend API
  const saveWebsite = useCallback(async () => {
    if (!websiteId || !editedProfile) return;
    try {
      const response = await fetch(`/api/websites/${websiteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: editedProfile,
          templateId: selectedTemplate,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to save website changes");
      }
      setProfile(editedProfile);
    } catch (e: any) {
      console.error("Manual save failed:", e);
    }
  }, [websiteId, editedProfile, selectedTemplate]);

  // Auto-save changes (debounced)
  useEffect(() => {
    if (!websiteId || !editedProfile || !isDirty) return;

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/websites/${websiteId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            profile: editedProfile,
            templateId: selectedTemplate,
          }),
        });
        if (response.ok) {
          setProfile(editedProfile);
        }
      } catch (err) {
        console.error("Auto-save failed:", err);
      }
    }, 1000); // 1-second debounce

    return () => clearTimeout(timer);
  }, [websiteId, editedProfile, selectedTemplate]);

  // Scraping logic using the backend URL scraper
  const startScrape = useCallback(
    async (url: string) => {
      setIsLoading(true);
      setScrapeError(null);
      setLinkedinUrlState(url);
      sessionStorage.setItem(URL_KEY, url);

      try {
        const response = await fetch("/api/scrape", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch LinkedIn profile.");
        }

        const profileData = data.data;
        setProfile(profileData);
        setEditedProfile(profileData);
        persistProfile(profileData);

        // Create site draft in backend
        await createWebsiteWithProfile(profileData);
      } catch (e: any) {
        setScrapeError(
          e.message ||
            "Failed to fetch LinkedIn profile. Please check the URL and try again.",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [persistProfile, createWebsiteWithProfile],
  );

  // Manual scraping logic via uploaded ZIP file
  const startScrapeManual = useCallback(
    async (file: File): Promise<boolean> => {
      setIsLoading(true);
      setScrapeError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/scrape/manual", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to parse ZIP archive.");
        }

        const profileData = data.data;
        setProfile(profileData);
        setEditedProfile(profileData);
        persistProfile(profileData);

        // Create site draft in backend
        await createWebsiteWithProfile(profileData);
        return true;
      } catch (e: any) {
        setScrapeError(
          e.message ||
            "Failed to process ZIP archive. Make sure it contains Profile.csv.",
        );
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [persistProfile, createWebsiteWithProfile],
  );

  const updateField = useCallback(
    <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => {
      setEditedProfile((prev) => {
        if (!prev) return prev;
        const next = { ...prev, [key]: value };
        persistProfile(next);
        return next;
      });
    },
    [persistProfile],
  );

  const selectTemplate = useCallback((id: TemplateId) => {
    setSelectedTemplate(id);
    sessionStorage.setItem(TEMPLATE_KEY, id);
  }, []);

  const resetEdits = useCallback(() => {
    if (profile) {
      setEditedProfile(profile);
      persistProfile(profile);
    }
  }, [profile, persistProfile]);

  const clearProfile = useCallback(() => {
    setWebsiteId(null);
    setProfile(null);
    setEditedProfile(null);
    setScrapeError(null);
    setLinkedinUrlState("");
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(URL_KEY);
  }, []);

  const useMockProfile = useCallback(async () => {
    setScrapeError(null);
    setProfile(BLANK_PROFILE);
    setEditedProfile(BLANK_PROFILE);
    persistProfile(BLANK_PROFILE);

    // Create website draft in backend
    try {
      await createWebsiteWithProfile(BLANK_PROFILE);
    } catch (e) {
      console.error("Failed to initialize mock website in DB:", e);
    }
  }, [persistProfile, createWebsiteWithProfile]);

  const isDirty =
    !!profile &&
    !!editedProfile &&
    JSON.stringify(profile) !== JSON.stringify(editedProfile);

  return (
    <EditorContext.Provider
      value={{
        websiteId,
        profile,
        editedProfile,
        selectedTemplate,
        linkedinUrl,
        isLoading,
        scrapeError,
        isDirty,
        pendingZip,
        setWebsiteId,
        loadWebsite,
        saveWebsite,
        setLinkedinUrl,
        startScrape,
        startScrapeManual,
        updateField,
        selectTemplate,
        resetEdits,
        clearProfile,
        useMockProfile,
        setScrapeError,
        setPendingZip,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor(): EditorContextValue {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be used inside <EditorProvider>");
  return ctx;
}
