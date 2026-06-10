import { ProfileData, TemplateId } from "@/shared/types";
import ProfileWrapper from "./ProfileWrapper";
import { notFound } from "next/navigation";

interface PublishedPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PublishedPage({ params }: PublishedPageProps) {
  const { slug } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/p/${slug}`, { cache: "no-store" });

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  if (!data.success || !data.profile) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <ProfileWrapper
        profile={data.profile}
        template={data.template}
        fluid={true}
      />
    </div>
  );
}

export async function generateMetadata({ params }: PublishedPageProps) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/p/${slug}`, { cache: "no-store" });
    if (!res.ok) return {};
    const data = await res.json();
    if (!data.profile) return {};
    return {
      title: `${data.profile.name} - Personal Page`,
      description: data.profile.headline,
      openGraph: {
        title: data.profile.name,
        description: data.profile.headline,
        images: [{ url: data.profile.avatarUrl }],
      },
    };
  } catch (err) {
    console.error("Failed to generate metadata for published page:", err);
    return {};
  }
}
