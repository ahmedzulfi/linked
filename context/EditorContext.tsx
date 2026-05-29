"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { ProfileData, TemplateId, MOCK_PROFILE } from "@/shared/types";

//   ─ State Shape                                                               ─
interface EditorState {
  profile: ProfileData | null;
  editedProfile: ProfileData | null;
  selectedTemplate: TemplateId;
  linkedinUrl: string;
  isLoading: boolean;
  scrapeError: string | null;
  isDirty: boolean;
}

interface EditorActions {
  setLinkedinUrl: (url: string) => void;
  startScrape: (url: string) => Promise<void>;
  updateField: <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => void;
  selectTemplate: (id: TemplateId) => void;
  resetEdits: () => void;
  clearProfile: () => void;
  useMockProfile: () => void;
}

type EditorContextValue = EditorState & EditorActions;

//   ─ Context                                                                   ─
const EditorContext = createContext<EditorContextValue | null>(null);

const SESSION_KEY = "linkedpage_profile";
const TEMPLATE_KEY = "linkedpage_template";
const URL_KEY = "linkedpage_url";

export function EditorProvider({ children }: { children: ReactNode }) {
  const [linkedinUrl, setLinkedinUrlState] = useState("");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [editedProfile, setEditedProfile] = useState<ProfileData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("minimal-card");
  const [isLoading, setIsLoading] = useState(false);
  const [scrapeError, setScrapeError] = useState<string | null>(null);

  // Rehydrate from sessionStorage on mount
  useEffect(() => {
    try {
      const storedProfile = sessionStorage.getItem(SESSION_KEY);
      const storedTemplate = sessionStorage.getItem(TEMPLATE_KEY) as TemplateId | null;
      const storedUrl = sessionStorage.getItem(URL_KEY);
      if (storedProfile) {
        const p = JSON.parse(storedProfile) as ProfileData;
        setProfile(p);
        setEditedProfile(p);
      }
      if (storedTemplate) setSelectedTemplate(storedTemplate);
      if (storedUrl) setLinkedinUrlState(storedUrl);
    } catch {
      // ignore parse errors
    }
  }, []);

  const setLinkedinUrl = useCallback((url: string) => {
    setLinkedinUrlState(url);
    sessionStorage.setItem(URL_KEY, url);
  }, []);

  const persistProfile = useCallback((p: ProfileData) => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(p));
  }, []);

  // Mock scrape — in production, this calls /api/scrape
  const startScrape = useCallback(async (url: string) => {
    setIsLoading(true);
    setScrapeError(null);
    setLinkedinUrlState(url);
    sessionStorage.setItem(URL_KEY, url);

    try {
      // Simulate a network call — replace with real fetch('/api/scrape?url=…')
      await new Promise((r) => setTimeout(r, 2200));

      // For now, use the mock profile but stamp the URL
      const p: ProfileData = { ...MOCK_PROFILE, linkedinUrl: url };
      setProfile(p);
      setEditedProfile(p);
      persistProfile(p);
    } catch {
      setScrapeError("Failed to fetch LinkedIn profile. Please check the URL and try again.");
    } finally {
      setIsLoading(false);
    }
  }, [persistProfile]);

  const updateField = useCallback(
    <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => {
      setEditedProfile((prev) => {
        if (!prev) return prev;
        const next = { ...prev, [key]: value };
        persistProfile(next);
        return next;
      });
    },
    [persistProfile]
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
    setProfile(null);
    setEditedProfile(null);
    setScrapeError(null);
    setLinkedinUrlState("");
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(URL_KEY);
  }, []);

  const useMockProfile = useCallback(() => {
    setProfile(MOCK_PROFILE);
    setEditedProfile(MOCK_PROFILE);
    persistProfile(MOCK_PROFILE);
  }, [persistProfile]);

  const isDirty =
    !!profile &&
    !!editedProfile &&
    JSON.stringify(profile) !== JSON.stringify(editedProfile);

  return (
    <EditorContext.Provider
      value={{
        profile,
        editedProfile,
        selectedTemplate,
        linkedinUrl,
        isLoading,
        scrapeError,
        isDirty,
        setLinkedinUrl,
        startScrape,
        updateField,
        selectTemplate,
        resetEdits,
        clearProfile,
        useMockProfile,
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
