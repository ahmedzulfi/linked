"use client";

import React, { useState } from "react";
import { toast } from "sonner";

export default function DomainsPane() {
  const [searchVal, setSearchVal] = useState("");
  const [customDomains, setCustomDomains] = useState<{ name: string; status: "active" | "pending" }[]>([
    { name: "realitycheque.io", status: "active" }
  ]);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = () => {
    const domain = searchVal.trim();
    if (!domain) return;
    if (!domain.includes(".")) {
      toast.error("Please enter a valid domain name (e.g. realitycheque.com)");
      return;
    }
    setConnecting(true);
    toast.loading("Connecting domain...");
    setTimeout(() => {
      toast.dismiss();
      setConnecting(false);
      setCustomDomains(prev => [...prev, { name: domain, status: "pending" }]);
      setSearchVal("");
      toast.success("Domain added! Please configure your DNS settings.");
    }, 1200);
  };

  return (
    <section className="w-[340px] shrink-0 border-r border-[#E6E6E6]/60 bg-white flex flex-col h-full overflow-hidden select-none font-inter">
      {/* Title Header */}
      <div className="h-[54px] border-b border-[#E6E6E6]/40 px-6 flex items-center justify-between shrink-0">
        <span className="font-semibold text-[15px] text-black">Domains & SSL</span>
        <span className="text-[11px] font-bold px-2 py-0.5 bg-[#8DFFB3]/25 text-[#369762] rounded-md">Pro Active</span>
      </div>

      {/* Content container */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6" style={{ scrollbarWidth: "none" }}>
        {/* Section: Connected Domains */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Connected Domains</span>
          <div className="flex flex-col gap-2">
            {customDomains.map((dom, i) => (
              <div key={i} className="p-3 bg-[#F7F7F7] border border-[#E6E6E6] rounded-xl flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-black">{dom.name}</span>
                  <span className="text-[11px] text-gray-400">
                    {dom.status === "active" ? "SSL secured & live" : "DNS config pending"}
                  </span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  dom.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700 animate-pulse"
                }`}>
                  {dom.status === "active" ? "Active" : "Setup Required"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Connect Domain Input */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Connect Custom Domain</span>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value.toLowerCase())}
              placeholder="e.g. yourname.com"
              className="w-full h-10 px-3 bg-[#F7F7F7] border border-[#E6E6E6] rounded-lg text-sm text-black outline-none focus:ring-1 focus:ring-blue-400 font-medium"
            />
            <button
              onClick={handleConnect}
              disabled={connecting}
              className="w-full h-10 rounded-lg bg-[#2A2A2F] hover:bg-[#3E3E45] active:scale-95 transition-all text-white text-[12px] font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              {connecting && <span className="w-3 h-3 rounded-lg border-2 border-white border-t-transparent animate-spin" />}
              Connect Domain
            </button>
          </div>
        </div>

        {/* DNS instructions panel if setup required exists */}
        {customDomains.some(d => d.status === "pending") && (
          <div className="p-4 bg-amber-50/50 border border-amber-200/60 rounded-xl flex flex-col gap-2.5">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">DNS Settings Required</span>
            <p className="text-xs text-amber-700/80 leading-relaxed">
              Configure your domain registrar (Namecheap, GoDaddy, etc.) with the following DNS records:
            </p>
            <div className="flex flex-col gap-1.5 font-mono text-[10px] text-gray-600 bg-white p-2.5 rounded-lg border border-amber-200/40">
              <div>Type: <strong className="text-black">A</strong></div>
              <div>Host: <strong className="text-black">@</strong></div>
              <div>Value: <strong className="text-black">76.76.21.21</strong></div>
              <div className="h-px bg-gray-100 my-1" />
              <div>Type: <strong className="text-black">CNAME</strong></div>
              <div>Host: <strong className="text-black">www</strong></div>
              <div>Value: <strong className="text-black">cname.linkedpage.co</strong></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
