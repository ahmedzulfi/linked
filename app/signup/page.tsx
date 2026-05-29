"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordStep, setShowPasswordStep] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFirstNameValid = firstName.trim().length >= 1;
  const isLastNameValid = lastName.trim().length >= 1;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPasswordValid = password.length >= 8 && /[\d!@#$%^&*]/.test(password);

  // Step 1: name + email valid → reveal password
  // Step 2: all valid → submit
  const canContinue = isFirstNameValid && isLastNameValid && isEmailValid;
  const canSubmit = canContinue && isPasswordValid;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canContinue) {
      if (!isFirstNameValid) toast.error("Please enter your first name!");
      else if (!isLastNameValid) toast.error("Please enter your last name!");
      else toast.error("Please enter a valid email address!");
      return;
    }

    if (!showPasswordStep) {
      setShowPasswordStep(true);
      return;
    }

    if (!isPasswordValid) {
      toast.error("Password must be at least 8 characters with a number or symbol!");
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
    <div className="min-h-screen bg-[#f8f8f8] font-inter select-none">
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-h-screen py-28 mx-auto max-w-[1536px]">

        {/* ── Left: Signup Form (exact reference UI) ── */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Outer card — button-secondary + rounded + p-8 as in reference */}
          <div className="relative bg-white shadow-inner rounded-[20px] px-10 py-14 w-full max-w-md" >
            <div className="flex flex-col gap-5">

              {/* Header */}
              <div className="flex flex-col gap-1 text-center items-center">
                <h1 className="text-2xl font-medium text-black w-fit leading-tight">
                  Create your account
                </h1>
                <p className="text-sm text-black">
                  Get started with Webild today
                </p>
              </div>

              {/* Google SSO */}
              <div className="flex flex-col gap-3">
                <button
                  className="button text-sm font-medium outline-none focus:outline-none focus-visible:outline-none transition-all duration-200 card flex items-center justify-center gap-2 w-full"
                  type="button"
                  onClick={handleGoogleSignup}
                >
                  <img
                    className="w-auto"
                    height={16}
                    width={16}
                    alt="Google"
                    src="https://www.webild.io/icons/google.svg"
                    style={{ color: "transparent" }}
                  />
                  Continue with Google
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center gap-4">
                <div className="flex-1 border-t-2 border-black/5" />
                <span className="text-xs text-black">or</span>
                <div className="flex-1 border-t-2 border-black/5" />
              </div>

              {/* Form */}
              <form className="flex flex-col gap-4" onSubmit={handleContinue}>

                {/* First name + Last name */}
                <div className="grid grid-cols-2 gap-3">
                  {/* First name */}
                  <div>
                    <div className="z-10 flex items-center gap-1 mb-2 w-full min-w-0 relative">
                      <label className="block text-sm font-medium text-black text-nowrap truncate">
                        First name
                      </label>
                    </div>
                    <div className="relative w-full rounded-extra-sm transition-[outline] duration-300 card">
                      <input
                        className="p-3 w-full text-sm text-black placeholder:text-black/75 focus:outline-none focus:border-none bg-transparent"
                        type="text"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                  </div>

                  {/* Last name */}
                  <div>
                    <div className="z-10 flex items-center gap-1 mb-2 w-full min-w-0 relative">
                      <label className="block text-sm font-medium text-black text-nowrap truncate">
                        Last name
                      </label>
                    </div>
                    <div className="relative w-full rounded-extra-sm transition-[outline] duration-300 card">
                      <input
                        className="p-3 w-full text-sm text-black placeholder:text-black/75 focus:outline-none focus:border-none bg-transparent"
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <div className="z-10 flex items-center gap-1 mb-2 w-full min-w-0 relative">
                    <label className="block text-sm font-medium text-black text-nowrap truncate">
                      Email
                    </label>
                  </div>
                  <div className="relative w-full rounded-extra-sm transition-[outline] duration-300 card">
                    <input
                      className="p-3 w-full text-sm text-black placeholder:text-black/75 focus:outline-none focus:border-none bg-transparent"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </div>

                {/* Password (collapsible — matches reference grid-template-rows trick) */}
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.625,0.05,0,1)]"
                  style={{ gridTemplateRows: showPasswordStep ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden flex flex-col gap-4 p-px">
                    <div>
                      <div className="z-10 flex items-center gap-1 mb-2 w-full min-w-0 relative">
                        <label className="block text-sm font-medium text-black text-nowrap truncate">
                          Password
                        </label>
                      </div>
                      <div className="relative w-full rounded-extra-sm transition-[outline] duration-300 card">
                        <input
                          className="p-3 w-full text-sm text-black placeholder:text-black/75 focus:outline-none focus:border-none pr-10 bg-transparent"
                          type={showPassword ? "text" : "password"}
                          placeholder="At least 8 characters and at least 1 special symbol or number"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={isSubmitting}
                          required={showPasswordStep}
                        />
                        <button
                          className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-black/75"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword
                            ? <EyeOff className="w-4 h-4" />
                            : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {/* Password strength hint */}
                      {showPasswordStep && password.length > 0 && !isPasswordValid && (
                        <p className="mt-1.5 text-xs text-[#E45A5A]">
                          Min 8 characters with at least 1 number or symbol
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  className={`button text-sm font-medium outline-none focus:outline-none focus-visible:outline-none transition-all duration-200 button-primary w-full justify-center ${isSubmitting || (showPasswordStep ? !canSubmit : !canContinue)
                    ? "opacity-50 select-none pointer-events-none"
                    : ""
                    }`}
                  type="submit"
                  disabled={isSubmitting || (showPasswordStep ? !canSubmit : !canContinue)}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Creating account...
                    </span>
                  ) : "Continue"}
                </button>
              </form>

              {/* Footer */}
              <div className="text-center text-sm text-black">
                Already have an account?{" "}
                <button
                  className="cursor-pointer text-[#000] font-medium hover:underline"
                  onClick={() => router.push("/login")}
                >
                  Sign in
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* ── Right: Hero Illustration Panel ── */}
        <div className="relative hidden md:flex rounded-[20px] overflow-hidden bg-gradient-to-tr from-[#8DB8FF]/10 to-[#8DFFB3]/10 items-center justify-center border border-[#E6E6E6]">
          <img
            className="absolute inset-0 size-full object-cover opacity-80"
            alt="Auth background"
            src="/bg.png"
          />
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
          <img
            className="relative z-20 drop-shadow-2xl max-w-[85%] w-auto h-auto"
            alt="Webild illustration"
            src="https://www.webild.io/images/input.svg"
          />
        </div>

      </div>
    </div>
  );
}
