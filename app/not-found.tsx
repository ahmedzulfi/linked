"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white font-inter flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-5 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col items-center gap-8 max-w-sm text-center"
        >
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-[#F3F3F3] flex items-center justify-center">
            <Compass className="w-7 h-7 text-[#9CA3AF]" />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-medium text-black">404</h1>
            <p className="text-base text-[#6B6B6B] leading-relaxed">
              This page doesn't exist. Maybe it was moved, deleted, or you typed the URL incorrectly.
            </p>
          </div>

          {/* CTA */}
          <Link href="/" className="button button-primary gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
