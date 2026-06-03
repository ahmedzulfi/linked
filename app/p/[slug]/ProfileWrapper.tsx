"use client";

import ProfilePreview from "@/app/editor/components/ProfilePreview";
import { ProfileData, TemplateId } from "@/shared/types";

interface ProfileWrapperProps {
  profile: ProfileData;
  template: TemplateId;
  fluid?: boolean;
}

export default function ProfileWrapper({ profile, template, fluid = true }: ProfileWrapperProps) {
  return <ProfilePreview profile={profile} template={template} fluid={fluid} />;
}
