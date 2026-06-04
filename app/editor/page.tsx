"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function EditorPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/onboarding");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-6 h-6 text-neutral-800 animate-spin" />
        <span className="text-xs text-neutral-400 font-mono">Redirecting to wizard...</span>
      </div>
    </div>
  );
}
