"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import { ProfileData, TemplateId, MOCK_PROFILE } from "@/shared/types";
import ProfilePreview from "@/app/editor/components/ProfilePreview";

function PublishedPageInner() {
  const params = useParams();
  const slug = params?.slug as string;

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [template, setTemplate] = useState<TemplateId>("minimal-card");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchPublicSite = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/websites/public?slug=${encodeURIComponent(slug)}`);
        const data = await res.json();
        if (data.success && data.profileData) {
          setProfile(data.profileData);
          setTemplate(data.template || "minimal-card");
        } else {
          console.warn("Public site not found in DB, trying sessionStorage fallback...");
          const storedProfile = sessionStorage.getItem("linkedpage_profile");
          const storedTemplate = sessionStorage.getItem("linkedpage_template") as TemplateId | null;
          if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
          } else {
            setProfile(MOCK_PROFILE);
          }
          if (storedTemplate) {
            setTemplate(storedTemplate);
          }
        }
      } catch (e) {
        console.error("Error loading published page details:", e);
        const storedProfile = sessionStorage.getItem("linkedpage_profile");
        const storedTemplate = sessionStorage.getItem("linkedpage_template") as TemplateId | null;
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        } else {
          setProfile(MOCK_PROFILE);
        }
        if (storedTemplate) {
          setTemplate(storedTemplate);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPublicSite();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center font-inter select-none">
        <div className="w-5 h-5 rounded-lg border-2 border-[#E6E6E6] border-t-[#2A2A2F] animate-spin" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen w-full bg-white select-none">
      <ProfilePreview profile={profile} template={template} fluid={true} />
    </div>
  );
}

export default function PublishedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center font-inter select-none">
        <div className="w-5 h-5 rounded-lg border-2 border-[#E6E6E6] border-t-[#2A2A2F] animate-spin" />
      </div>
    }>
      <PublishedPageInner />
    </Suspense>
  );
}
