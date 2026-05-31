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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const loadPublishedPage = async () => {
      try {
        const res = await fetch(`/api/p/${slug}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setProfile(data.profile);
          setTemplate(data.template);
        } else {
          setError(data.error || "Page not found or not published yet");
        }
      } catch {
        setError("Network error. Failed to load page.");
      } finally {
        setLoading(false);
      }
    };
    loadPublishedPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center font-inter select-none">
        <div className="w-5 h-5 rounded-lg border-2 border-[#E6E6E6] border-t-[#2A2A2F] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] flex flex-col items-center justify-center font-inter p-6 text-center select-none">
        <div className="w-16 h-16 rounded-[20px] bg-amber-50 border border-amber-200 flex items-center justify-center mb-6 shadow-sm">
          <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-black mb-2">Portfolio Not Found</h1>
        <p className="text-sm text-gray-500 max-w-sm mb-6 leading-relaxed">
          The requested portfolio is either not published or does not exist. Please check the URL.
        </p>
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
