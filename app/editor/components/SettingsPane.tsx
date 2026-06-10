"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useEditor } from "@/context/EditorContext";

interface SettingsPaneProps {
  profileName: string;
  router: any;
}

export default function SettingsPane({
  profileName,
  router,
}: SettingsPaneProps) {
  const { websiteId } = useEditor();
  const [siteName, setSiteName] = useState(profileName);
  const [seoTitle, setSeoTitle] = useState(
    `${profileName} - Professional Micro-site`,
  );
  const [seoDesc, setSeoDesc] = useState(
    "Explore my professional experience, projects, education, and social networks.",
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!websiteId) return;
    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/websites/${websiteId}`);
        const data = await res.json();
        if (res.ok && data.website) {
          setSiteName(data.website.brandName || "");
          setSeoTitle(data.website.seoTitle || "");
          setSeoDesc(data.website.seoDesc || "");
        }
      } catch (err) {
        console.error("Failed to fetch settings details", err);
      }
    };
    fetchDetails();
  }, [websiteId]);

  const handleSaveSettings = async () => {
    if (!websiteId) return;
    setSaving(true);
    const toastId = toast.loading("Saving settings...");
    try {
      const res = await fetch(`/api/websites/${websiteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName: siteName,
          seoTitle,
          seoDesc,
        }),
      });
      const data = await res.json();
      toast.dismiss(toastId);
      setSaving(false);
      if (res.ok) {
        toast.success("Site configuration saved!");
        sessionStorage.setItem("linkedpage_brand_name", siteName);
      } else {
        toast.error(data.error || "Failed to save settings");
      }
    } catch {
      toast.dismiss(toastId);
      setSaving(false);
      toast.error("Failed to save settings. Connection error.");
    }
  };

  const handleDeleteSite = async () => {
    if (!websiteId) return;
    const confirmDel = window.confirm(
      "Are you absolutely sure you want to delete this website? This action is permanent!",
    );
    if (!confirmDel) return;
    const toastId = toast.loading("Deleting website...");
    try {
      const res = await fetch(`/api/websites/${websiteId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      toast.dismiss(toastId);
      if (res.ok) {
        toast.success("Website deleted successfully.");
        sessionStorage.removeItem("linkedpage_brand_name");
        sessionStorage.removeItem("linkedpage_subdomain");
        router.push("/dashboard");
      } else {
        toast.error(data.error || "Failed to delete website");
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Failed to delete website. Connection error.");
    }
  };

  if (!websiteId) {
    return (
      <section className="w-[340px] shrink-0 border-r border-[#E6E6E6]/60 bg-white flex flex-col h-full items-center justify-center p-6 text-center">
        <p className="text-sm text-gray-400 font-medium font-['Inter_Tight']">
          No website loaded. Go back to the dashboard and open a site.
        </p>
      </section>
    );
  }

  return (
    <section className="w-[340px] shrink-0 border-r border-[#E6E6E6]/60 bg-white flex flex-col h-full overflow-hidden select-none font-inter">
      {/* Title Header */}
      <div className="h-[54px] border-b border-[#E6E6E6]/40 px-6 flex items-center justify-between shrink-0">
        <span className="font-semibold text-[15px] text-black">
          Site Settings
        </span>
      </div>

      {/* Content container */}
      <div
        className="flex-1 overflow-y-auto p-5 flex flex-col gap-5"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Branding */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Brand Name
          </label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full h-9 px-3 bg-[#F7F7F7] border border-[#E6E6E6] rounded-lg text-sm text-black outline-none focus:ring-1 focus:ring-blue-400 font-medium"
          />
        </div>

        {/* SEO Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            SEO Title Tag
          </label>
          <input
            type="text"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="w-full h-9 px-3 bg-[#F7F7F7] border border-[#E6E6E6] rounded-lg text-sm text-black outline-none focus:ring-1 focus:ring-blue-400 font-medium"
          />
        </div>

        {/* SEO Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Meta Description
          </label>
          <textarea
            value={seoDesc}
            onChange={(e) => setSeoDesc(e.target.value)}
            rows={4}
            className="w-full p-3 bg-[#F7F7F7] border border-[#E6E6E6] rounded-lg text-sm text-black outline-none focus:ring-1 focus:ring-blue-400 resize-none font-medium"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="w-full h-10 rounded-lg bg-[#2A2A2F] text-white text-[12px] font-semibold hover:bg-[#3E3E45] active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm"
        >
          {saving && (
            <span className="w-3 h-3 rounded-lg border-2 border-white border-t-transparent animate-spin" />
          )}
          Save Configuration
        </button>

        <div className="border-t border-gray-100 my-2" />

        {/* Danger Zone */}
        <div className="p-4 border border-red-200 bg-red-50/40 rounded-xl flex flex-col gap-3">
          <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider">
            Danger Zone
          </span>
          <p className="text-xs text-red-700/80 leading-relaxed">
            Deleting your site will permanently wipe all pages, files, and
            domains. This cannot be undone.
          </p>
          <button
            onClick={handleDeleteSite}
            className="w-full h-10 rounded-lg bg-red-650 hover:bg-red-700 text-white text-[12px] font-bold active:scale-95 transition-all shadow-sm"
          >
            Delete Website
          </button>
        </div>
      </div>
    </section>
  );
}
