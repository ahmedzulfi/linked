"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordStep, setShowPasswordStep] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordInputRef = useRef<HTMLInputElement>(null);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPasswordValid = password.length >= 6;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (!showPasswordStep) {
      setShowPasswordStep(true);
      setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 100);
      return;
    }

    if (!isPasswordValid) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    setIsSubmitting(true);
    toast.loading("Authenticating secure session...");

    setTimeout(() => {
      setIsSubmitting(false);
      toast.dismiss();
      toast.success("Welcome back! Signed in successfully.");
      router.push("/");
    }, 1200);
  };

  const handleGoogleLogin = () => {
    toast.loading("Connecting Google authorization provider...");
    setTimeout(() => {
      toast.dismiss();
      toast.success("Successfully authenticated with Google account!");
      router.push("/");
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
              Welcome back
            </h1>
            <p className="text-[13px] text-[#6B7280] font-inter">
              Sign in to your account to continue
            </p>
          </div>

          {/* Google SSO */}
          <button
            type="button"
            onClick={handleGoogleLogin}
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

          {/* Email + Password Form */}
          <form onSubmit={handleContinue} className="flex flex-col gap-4">
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
                disabled={showPasswordStep || isSubmitting}
                className="ds-input disabled:opacity-50"
                required
              />
            </div>

            {/* Password (collapsible) */}
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-[280ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
                showPasswordStep
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[13px] font-medium text-black font-inter">
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-[12px] text-[#8DB8FF] font-medium font-inter hover:underline"
                      onClick={() =>
                        toast.info("Password reset link sent to your email!")
                      }
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      ref={passwordInputRef}
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      disabled={isSubmitting}
                      className="ds-input pr-12"
                      required={showPasswordStep}
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
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={
                isSubmitting ||
                (showPasswordStep ? !isPasswordValid : !isEmailValid)
              }
              className="button button-primary w-full disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Processing...
                </span>
              ) : showPasswordStep ? (
                "Sign in"
              ) : (
                "Continue"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-[13px] text-[#6B7280] font-inter">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-[#2A2A2F] font-medium hover:underline"
              onClick={() => router.push("/signup")}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
