"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useEditor } from "@/context/EditorContext";
import { Loader2, Check, RefreshCw, Trash2 } from "lucide-react";

interface DomainType {
  id: string;
  name: string;
  status: "active" | "pending";
}

export default function DomainsPane() {
  const { websiteId } = useEditor();
  const [searchVal, setSearchVal] = useState("");
  const [customDomains, setCustomDomains] = useState<DomainType[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  // Load custom domains from DB
  const loadDomains = async () => {
    if (!websiteId) return;
    try {
      const res = await fetch(`/api/websites/${websiteId}/domains`);
      const data = await res.json();
      if (res.ok && data.domains) {
        setCustomDomains(data.domains);
      }
    } catch (err) {
      console.error("Failed to load domains", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDomains();
  }, [websiteId]);

  const handleConnect = async () => {
    const domain = searchVal.trim();
    if (!domain) return;
    if (!domain.includes(".")) {
      toast.error("Please enter a valid domain name (e.g. realitycheque.com)");
      return;
    }
    if (!websiteId) {
      toast.error("No website selected.");
      return;
    }
    setConnecting(true);
    const toastId = toast.loading("Connecting domain...");
    try {
      const res = await fetch(`/api/websites/${websiteId}/domains`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });
      const data = await res.json();
      toast.dismiss(toastId);
      setConnecting(false);
      if (res.ok && data.domain) {
        setCustomDomains((prev) => [...prev, data.domain]);
        setSearchVal("");
        toast.success("Domain added! Please configure your DNS settings.");
      } else {
        toast.error(data.error || "Failed to connect domain");
      }
    } catch {
      toast.dismiss(toastId);
      setConnecting(false);
      toast.error("Connection failed.");
    }
  };

  const handleVerify = async (domainId: string) => {
    if (!websiteId) return;
    setVerifyingId(domainId);
    const toastId = toast.loading("Checking DNS resolution...");
    try {
      const res = await fetch(
        `/api/websites/${websiteId}/domains/${domainId}/verify`,
        {
          method: "POST",
        },
      );
      const data = await res.json();
      toast.dismiss(toastId);
      setVerifyingId(null);
      if (res.ok && data.verified) {
        toast.success("Domain verified! SSL certificate issued.");
        loadDomains();
      } else {
        toast.error(
          "DNS records check failed. DNS propagation might take up to 24h.",
        );
      }
    } catch {
      toast.dismiss(toastId);
      setVerifyingId(null);
      toast.error("Failed to verify DNS. Connection error.");
    }
  };

  const handleDelete = async (domainId: string) => {
    if (!websiteId) return;
    if (!confirm("Are you sure you want to disconnect this custom domain?"))
      return;
    const toastId = toast.loading("Disconnecting domain...");
    try {
      const res = await fetch(
        `/api/websites/${websiteId}/domains/${domainId}`,
        {
          method: "DELETE",
        },
      );
      toast.dismiss(toastId);
      if (res.ok) {
        toast.success("Domain disconnected!");
        setCustomDomains((prev) => prev.filter((d) => d.id !== domainId));
      } else {
        toast.error("Failed to disconnect domain.");
      }
    } catch {
      toast.dismiss(toastId);
      toast.error("Failed to disconnect domain. Connection error.");
    }
  };

  if (!websiteId) {
    return (
      <section className="w-[340px] shrink-0 border-r border-[#E6E6E6]/60 bg-white flex flex-col h-full items-center justify-center p-6 text-center">
        <p className="text-sm text-gray-400 font-medium font-['Inter_Tight']">
          No website loaded. Go back to the dashboard and open a site.
        </p>
      </section>
    );
  }

  return (
    <section className="w-[340px] shrink-0 border-r border-[#E6E6E6]/60 bg-white flex flex-col h-full overflow-hidden select-none font-inter">
      {/* Title Header */}
      <div className="h-[54px] border-b border-[#E6E6E6]/40 px-6 flex items-center justify-between shrink-0">
        <span className="font-semibold text-[15px] text-black">
          Domains & SSL
        </span>
        <span className="text-[11px] font-bold px-2 py-0.5 bg-[#8DFFB3]/25 text-[#369762] rounded-md">
          Pro Active
        </span>
      </div>

      {/* Content container */}
      <div
        className="flex-1 overflow-y-auto p-5 flex flex-col gap-6"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Section: Connected Domains */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Connected Domains
          </span>
          {loading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
            </div>
          ) : customDomains.length === 0 ? (
            <div className="text-xs text-gray-500 text-center py-4 border border-dashed border-[#E6E6E6] rounded-xl bg-[#FBFBFB]">
              No custom domains connected yet.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {customDomains.map((dom) => (
                <div
                  key={dom.id}
                  className="p-3 bg-[#F7F7F7] border border-[#E6E6E6] rounded-xl flex flex-col gap-2 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13px] font-bold text-black truncate">
                        {dom.name}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {dom.status === "active"
                          ? "SSL secured & live"
                          : "DNS config pending"}
                      </span>
                    </div>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                        dom.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700 animate-pulse"
                      }`}
                    >
                      {dom.status === "active" ? "Active" : "Setup Required"}
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-2 border-t border-[#E6E6E6]/40 pt-2">
                    {dom.status === "pending" && (
                      <button
                        onClick={() => handleVerify(dom.id)}
                        disabled={verifyingId === dom.id}
                        className="text-[10px] font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-0.5 disabled:opacity-50"
                      >
                        {verifyingId === dom.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <RefreshCw className="w-3 h-3" />
                        )}
                        Verify DNS
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(dom.id)}
                      className="text-[10px] font-semibold text-red-650 hover:text-red-700 flex items-center gap-0.5"
                    >
                      <Trash2 className="w-3 h-3" />
                      Disconnect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section: Connect Domain Input */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Connect Custom Domain
          </span>
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
              {connecting && (
                <span className="w-3 h-3 rounded-lg border-2 border-white border-t-transparent animate-spin" />
              )}
              Connect Domain
            </button>
          </div>
        </div>

        {/* DNS instructions panel if setup required exists */}
        {customDomains.some((d) => d.status === "pending") && (
          <div className="p-4 bg-amber-50/50 border border-amber-200/60 rounded-xl flex flex-col gap-2.5">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
              DNS Settings Required
            </span>
            <p className="text-xs text-amber-700/80 leading-relaxed">
              Configure your domain registrar (Namecheap, GoDaddy, etc.) with
              the following DNS records:
            </p>
            <div className="flex flex-col gap-1.5 font-mono text-[10px] text-gray-600 bg-white p-2.5 rounded-lg border border-amber-200/40">
              <div>
                Type: <strong className="text-black">A</strong>
              </div>
              <div>
                Host: <strong className="text-black">@</strong>
              </div>
              <div>
                Value: <strong className="text-black">76.76.21.21</strong>
              </div>
              <div className="h-px bg-gray-100 my-1" />
              <div>
                Type: <strong className="text-black">CNAME</strong>
              </div>
              <div>
                Host: <strong className="text-black">www</strong>
              </div>
              <div>
                Value:{" "}
                <strong className="text-black">cname.linkedpage.co</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
