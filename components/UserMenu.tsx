import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface UserMenuProps {
  name: string;
  email: string;
  avatarUrl?: string;
  onClose?: () => void;
}

export function UserMenu({ 
  name, 
  email, 
  avatarUrl = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  onClose
}: UserMenuProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, transform: "scale(0.95)" }}
      animate={{ opacity: 1, transform: "scale(1)" }}
      exit={{ opacity: 0, transform: "scale(0.95)" }}
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      className="absolute z-50 top-10 rounded-2xl origin-top-right border border-[#010101]/5 bg-white/95 backdrop-blur-xl shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.09)] right-0 w-72 p-5 text-left"
    >
      <div className="space-y-4">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="relative shrink-0 rounded-lg h-9 w-9 p-0.5 border border-[#E6E6E6]">
            <img
              className="h-full w-full object-cover rounded-lg"
              alt="user"
              src={avatarUrl}
            />
          </div>
          <div className="truncate">
            <p className="text-sm font-semibold text-[#2A2A2F] truncate">{name || "User"}</p>
            <p className="text-xs text-[#171717]/60 truncate">{email || "user@example.com"}</p>
          </div>
        </div>


        {/* Links */}
        <div className="flex flex-col gap-1">
          <button
            onClick={() => { router.push("/settings"); onClose?.(); }}
            className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-lg hover:bg-[#F7F7F7] text-[#171717]/80 hover:text-black w-full"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 0 3.319-1.915" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Settings
          </button>
          <button
            onClick={() => { router.push("/report-bug"); onClose?.(); }}
            className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-lg hover:bg-[#F7F7F7] text-[#171717]/80 hover:text-black w-full"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
            </svg>
            Report a bug
          </button>
          <button
            onClick={() => { router.push("/docs"); onClose?.(); }}
            className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-lg hover:bg-[#F7F7F7] text-[#171717]/80 hover:text-black w-full"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 7v14" />
              <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
            </svg>
            Documentation
          </button>
        </div>

        <div className="border-t border-black/5" />
        <button
          onClick={async () => {
            await authClient.signOut();
            sessionStorage.removeItem("linkedpage_user");
            toast.success("Signed out successfully");
            onClose?.();
            router.push("/");
          }}
          className="text-sm font-medium transition-colors duration-150 flex items-center h-fit gap-2 justify-start p-2 rounded-lg hover:bg-red-50 text-[#E45A5A] w-full"
          type="button"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 12H9" />
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          </svg>
          Sign out
        </button>
      </div>
    </motion.div>
  );
}
