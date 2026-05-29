"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isNameValid = name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPasswordValid = password.length >= 6;
  const isFormValid = isNameValid && isEmailValid && isPasswordValid;

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      if (!isNameValid) toast.error("Please enter your full name!");
      else if (!isEmailValid) toast.error("Please enter a valid email address!");
      else toast.error("Password must be at least 6 characters!");
      return;
    }

    setIsSubmitting(true);
    toast.loading("Creating your account...");

    setTimeout(() => {
      setIsSubmitting(false);
      toast.dismiss();
      toast.success("Account created! Welcome to Webild 🎉");
      router.push("/onboarding");
    }, 1400);
  };

  const handleGoogleSignup = () => {
    toast.loading("Connecting Google authorization provider...");
    setTimeout(() => {
      toast.dismiss();
      toast.success("Successfully signed up with Google!");
      router.push("/onboarding");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white font-inter select-none">
      {/* Landing page Navbar */}
      <Navbar />

      {/* Page content — padded to clear navbar */}
      <div className="pt-28 pb-10 px-5 flex items-center justify-center min-h-screen">
        {/* Center form card — matches reference exactly */}
        <div
          className="relative card p-8 flex flex-col gap-5"
          style={{ width: "min(100%, 380px)" }}
        >
          {/* Header */}
          <div className="flex flex-col gap-1 text-center items-center">
            <h1 className="text-2xl font-medium text-black w-fit leading-tight font-inter">
              Create your account
            </h1>
            <p className="text-[13px] text-[#6B7280] font-inter">
              Start building beautiful pages in minutes
            </p>
          </div>

          {/* Google SSO */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="button button-secondary w-full gap-2.5"
          >
            <img
              className="w-4 h-4 flex-shrink-0"
              alt="Google"
              width={16}
              height={16}
              src="https://www.webild.io/icons/google.svg"
            />
            <span className="text-[13px] font-medium text-black font-inter">
              Continue with Google
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="ds-divider" />
            <span className="text-[11px] font-medium text-[#9CA3AF] font-inter uppercase tracking-wide flex-shrink-0">
              or
            </span>
            <div className="ds-divider" />
          </div>

          {/* Signup form */}
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            {/* Full name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-black font-inter">
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                disabled={isSubmitting}
                className="ds-input disabled:opacity-50"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-black font-inter">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={isSubmitting}
                className="ds-input disabled:opacity-50"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-black font-inter">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  disabled={isSubmitting}
                  className="ds-input pr-12 disabled:opacity-50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-[#9CA3AF] hover:text-black transition-colors duration-150"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {password.length > 0 && !isPasswordValid && (
                <p className="text-[11px] text-[#E45A5A] font-inter">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className="button button-primary w-full disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          {/* Terms */}
          <p className="text-center text-[11px] text-[#9CA3AF] font-inter leading-relaxed">
            By signing up you agree to our{" "}
            <button
              type="button"
              className="text-[#2A2A2F] hover:underline"
              onClick={() => toast.info("Terms of Service — coming soon!")}
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="text-[#2A2A2F] hover:underline"
              onClick={() => toast.info("Privacy Policy — coming soon!")}
            >
              Privacy Policy
            </button>
          </p>

          {/* Footer */}
          <p className="text-center text-[13px] text-[#6B7280] font-inter">
            Already have an account?{" "}
            <button
              type="button"
              className="text-[#2A2A2F] font-medium hover:underline"
              onClick={() => router.push("/login")}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
