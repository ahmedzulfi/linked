"use client";

import { ProfileData, TemplateId } from "@/shared/types";
import { compileStaticHtml } from "@/lib/compiler";

interface ProfilePreviewProps {
  profile: ProfileData;
  template: TemplateId;
  scale?: number;
  onFieldClick?: (fieldName: string) => void;
  fluid?: boolean;
}

export default function ProfilePreview({ profile, template, scale = 1, onFieldClick, fluid = false }: ProfilePreviewProps) {
  const compiledHtml = compileStaticHtml(profile, "daniel-cross");

  if (fluid) {
    return (
      <div className="w-full h-full min-h-screen">
        <iframe
          srcDoc={compiledHtml}
          title="Live Portfolio Preview"
          className="w-full h-full min-h-screen border-0 bg-[#E9E6E2]"
          sandbox="allow-scripts"
        />
      </div>
    );
  }

  // Previews are scaled dynamically inside editor viewport
  const PREVIEW_W = 1200; 
  const PREVIEW_H = 800;

  return (
    <div
      className="relative overflow-hidden rounded-[16px] border border-[#E6E6E6] bg-[#E9E6E2]"
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
          overflow: "hidden",
        }}
      >
        <iframe
          srcDoc={compiledHtml}
          title="Live Portfolio Preview"
          className="w-full h-full border-0"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
}
