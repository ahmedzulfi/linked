$f = "app\editor\page.tsx"
$lines = [System.IO.File]::ReadAllLines($f)

$newCanvas = @'
      {/* Canvas */}
      <main className="flex-1 flex flex-col overflow-hidden relative">

        {/* Row 1: Dark top bar */}
        <div className="flex items-center justify-between px-4 h-[52px] bg-[#1C1C1E] shrink-0">
          <button
            onClick={() => toast.info("Upgrade to Pro for custom domains, priority support & more!")}
            className="relative h-8 px-4 text-sm font-medium text-[#171717] bg-white rounded-full hover:bg-white/90 transition-colors active:scale-95 overflow-hidden"
          >
            <span className="absolute inset-0 rounded-full pointer-events-none" style={{ padding: "1.5px", background: "linear-gradient(to right, #f97316, #ec4899, #3b82f6)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }} />
            Upgrade Plan
          </button>

          <div className="flex items-center gap-2.5">
            <AnimatePresence>
              {isDirty && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => { resetEdits(); toast("Edits reset"); }}
                  className="h-8 px-3 text-xs font-medium text-white/50 hover:text-white transition-colors"
                >
                  Reset
                </motion.button>
              )}
            </AnimatePresence>
            <button
              onClick={() => { navigator.clipboard.writeText(`https://linkedpage.io/${editedProfile?.name.toLowerCase().replace(/\s+/g, "-") ?? "profile"}`); toast.success("Share link copied!"); }}
              className="h-8 px-4 text-sm font-medium bg-white/10 border border-white/20 text-white rounded-full hover:bg-white/20 transition-colors"
            >
              Share
            </button>
            <button
              onClick={handlePublish} disabled={publishing}
              className="h-8 px-5 text-sm font-semibold bg-[#3b82f6] text-white rounded-full hover:bg-[#2563eb] transition-colors active:scale-[0.97] flex items-center gap-1.5"
            >
              {publishing && <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />}
              Publish
            </button>
            <div className="relative">
              <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/20 hover:border-white/40 transition-colors">
                <img src={editedProfile?.avatarUrl ?? "https://i.pravatar.cc/80?img=47"} alt="Avatar" className="w-full h-full object-cover" />
              </button>
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div initial={{ opacity: 0, scale: 0.95, y: -8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -8 }} transition={{ duration: 0.15, ease: "easeOut" }} className="absolute right-0 top-10 z-50">
                    <UserMenu />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Row 2: White toolbar */}
        <div className="flex items-center gap-3 px-4 h-[48px] bg-white border-b border-[#E6E6E6] shrink-0">
          <div className="relative group">
            <button className="flex items-center gap-2 h-8 px-3 text-sm font-medium bg-[#F7F7F7] border border-[#E6E6E6] rounded-[8px] text-[#2A2A2F] hover:bg-[#F0F0F0] transition-colors whitespace-nowrap">
              <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" viewBox="0 0 24 24">
                <path d="M14 4.1 12 6" /><path d="m5.1 8-2.9-.8" /><path d="m6 12-1.9 2" />
                <path d="M7.2 2.2 8 5.1" />
                <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z" />
              </svg>
              Customize
            </button>
            <div className="absolute z-50 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 left-full top-1/2 -translate-y-1/2 ml-2">
              <div className="absolute w-2 h-2 bg-[#171717] rotate-45 -left-1 top-1/2 -translate-y-1/2" />
              <div className="relative px-3 py-1 text-xs text-white bg-[#171717] rounded-md whitespace-nowrap">Edit text, images, colors, fonts, and layouts</div>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-2 h-8 px-3 text-sm font-medium bg-[#F7F7F7] border border-[#E6E6E6] rounded-[8px] text-[#2A2A2F] hover:bg-[#F0F0F0] transition-colors">
              <span>Home</span>
              <svg className="w-3.5 h-3.5 text-[#171717]/50" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className="absolute z-50 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 top-full left-1/2 -translate-x-1/2 mt-2">
              <div className="absolute w-2 h-2 bg-[#171717] rotate-45 -top-1 left-1/2 -translate-x-1/2" />
              <div className="relative px-3 py-1 text-xs text-white bg-[#171717] rounded-md whitespace-nowrap">Switch and manage site pages</div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3 px-3 h-8 bg-[#F7F7F7] border border-[#E6E6E6] rounded-[8px]">
              <span className="flex items-center min-w-0 gap-2 text-sm">
                <svg className="w-[13px] h-[13px] text-[#3b82f6] shrink-0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                  <path d="M20 2v4" /><path d="M22 4h-4" /><circle cx="4" cy="20" r="2" />
                </svg>
                <span className="text-[#3b82f6] font-medium truncate min-w-0">
                  {editedProfile?.name.toLowerCase().replace(/\s+/g, "") ?? "yourname"}.linkedpage.io
                </span>
                <span className="hidden lg:inline text-[#2A2A2F]/60 text-xs whitespace-nowrap">is available!</span>
              </span>
              <button onClick={handlePublish} disabled={publishing} className="shrink-0 flex items-center gap-1 h-6 px-3 text-xs font-semibold bg-[#3b82f6] text-white rounded-[6px] hover:bg-[#2563eb] transition-colors active:scale-95">
                {publishing && <span className="w-2.5 h-2.5 rounded-full border-2 border-white border-t-transparent animate-spin" />}
                Get Your Domain
              </button>
            </div>
          </div>

          <div className="flex items-center gap-0.5">
            <button disabled title="Undo" className="w-8 h-8 flex items-center justify-center text-[#171717]/25 cursor-not-allowed rounded-[7px]">
              <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 14 4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
              </svg>
            </button>
            <button disabled title="Redo" className="w-8 h-8 flex items-center justify-center text-[#171717]/25 cursor-not-allowed rounded-[7px]">
              <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="m15 14 5-5-5-5" /><path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13" />
              </svg>
            </button>
            <button disabled title="Version history" className="w-8 h-8 flex items-center justify-center text-[#171717]/25 cursor-not-allowed rounded-[7px]">
              <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" />
              </svg>
            </button>
            <div className="w-px h-4 bg-[#E6E6E6] mx-1" />
            <button onClick={() => setPreviewMode("desktop")} title="Desktop" className={`w-8 h-8 flex items-center justify-center rounded-[7px] transition-all duration-150 ${previewMode === "desktop" ? "bg-[#F3F3F3] text-[#2A2A2F]" : "text-[#171717]/35 hover:text-[#2A2A2F] hover:bg-[#F7F7F7]"}`}>
              <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <rect height="14" width="20" rx="2" x="2" y="3" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" />
              </svg>
            </button>
            <button onClick={() => setPreviewMode("mobile")} title="Mobile" className={`w-8 h-8 flex items-center justify-center rounded-[7px] transition-all duration-150 ${previewMode === "mobile" ? "bg-[#F3F3F3] text-[#2A2A2F]" : "text-[#171717]/35 hover:text-[#2A2A2F] hover:bg-[#F7F7F7]"}`}>
              <svg className="w-[13px] h-[13px]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <rect height="20" width="14" rx="2" ry="2" x="5" y="2" /><path d="M12 18h.01" />
              </svg>
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-hidden bg-[#EFEFEF] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedTemplate}-${previewMode}`}
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              className="w-full h-full flex items-center justify-center p-8"
            >
              {editedProfile ? (
                previewMode === "desktop" ? (
                  <div
                    className="rounded-[12px] overflow-hidden border border-[#E6E6E6] bg-white w-full h-full"
                    style={{ maxWidth: 1024 * desktopScale, maxHeight: 768 * desktopScale, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
                  >
                    <div style={{ width: 1024, height: 768, transform: `scale(${desktopScale})`, transformOrigin: "top left", overflow: "auto", pointerEvents: "none", userSelect: "none" }}>
                      <ProfilePreview profile={editedProfile} template={selectedTemplate} />
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[32px] overflow-hidden border-[7px] border-[#2A2A2F] bg-white" style={{ width: 375 * mobileScale, height: 812 * mobileScale, boxShadow: "0 16px 48px -12px rgba(0,0,0,0.22)" }}>
                    <div style={{ width: 375, height: 812, transform: `scale(${mobileScale})`, transformOrigin: "top left", overflow: "auto", pointerEvents: "none", userSelect: "none" }}>
                      <ProfilePreview profile={editedProfile} template={selectedTemplate} />
                    </div>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center text-center max-w-sm gap-4">
                  <div className="w-14 h-14 bg-[#2A2A2F] rounded-[18px] flex items-center justify-center transform rotate-3  shadow-[0_6px_10px_-6px_#00000016] ">
                    <svg className="w-6 h-6 text-white transform -rotate-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-medium text-[#2A2A2F]">Paste your LinkedIn URL</h2>
                  <p className="text-sm text-[#9CA3AF]">Use the chat panel to paste a LinkedIn URL and generate your micro-site.</p>
                  <button onClick={() => router.push("/")} className="mt-2 px-4 py-2 bg-[#2A2A2F] text-white text-sm font-medium rounded-[8px] hover:bg-[#3A3A42] transition-colors">
                    Go to home
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>
'@

$before = $lines[0..957]  # lines 1-958 (0-indexed)
$after  = $lines[1158..$lines.Length]  # from line 1159 onward

$combined = ($before + $newCanvas.Split("`n") + $after) -join "`r`n"
[System.IO.File]::WriteAllText((Resolve-Path $f).Path, $combined)
Write-Output "Done: $((Get-Content $f).Length) lines"
