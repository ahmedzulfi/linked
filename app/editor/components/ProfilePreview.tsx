"use client";

import { useState, useEffect } from "react";
import { ProfileData, TemplateId } from "@/shared/types";
import { compileHtmlContent } from "@/lib/compiler-client";

interface ProfilePreviewProps {
  profile: ProfileData;
  template: TemplateId;
  scale?: number;
  onFieldClick?: (fieldName: string) => void;
  fluid?: boolean;
}

export default function ProfilePreview({ profile, template, scale = 1, onFieldClick, fluid = false }: ProfilePreviewProps) {
  const [templateHtml, setTemplateHtml] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch("/templates/daniel-cross.html")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load preview template");
        return res.text();
      })
      .then((html) => setTemplateHtml(html))
      .catch((err) => {
        console.error(err);
        setError("Could not load preview template. Check that public/templates/daniel-cross.html exists.");
      });
  }, []);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center text-sm text-red-500 bg-red-50 p-4 rounded-xl border border-red-200">
        {error}
      </div>
    );
  }

  if (!templateHtml) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-sm text-neutral-500 gap-2 bg-neutral-50 rounded-xl border border-neutral-200 min-h-[300px]">
        <svg className="animate-spin h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span>Loading preview...</span>
      </div>
    );
  }

  // Compile the profile content on top of the fetched template HTML
  const html = compileHtmlContent(templateHtml, profile);

  if (fluid) {
    return (
      <iframe
        srcDoc={html}
        className="w-full h-full border-0 bg-white min-h-screen"
        title="Live Preview"
      />
    );
  }

  const PREVIEW_W = 1024;
  const PREVIEW_H = 768;

  return (
    <div
      className="relative overflow-hidden rounded-[16px] border border-[#E6E6E6] bg-white shadow-sm"
      style={{
        width: PREVIEW_W * scale,
        height: PREVIEW_H * scale,
      }}
    >
      <iframe
        srcDoc={html}
        className="border-0 bg-white"
        style={{
          width: PREVIEW_W,
          height: PREVIEW_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
        title="Live Preview"
      />
    </div>
  );
}
