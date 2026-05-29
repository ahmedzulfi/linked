"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { TemplateMeta, TEMPLATES, TemplateId } from "@/shared/types";

interface TemplatePickerProps {
  selected: TemplateId;
  onSelect: (id: TemplateId) => void;
}

function TemplatePreview({ template }: { template: TemplateMeta }) {
  if (template.id === "minimal-card") {
    return (
      <div className="w-full h-full p-3 flex items-center justify-center" style={{ backgroundColor: template.previewBg }}>
        <div className="w-full max-w-[140px] bg-white     rounded-lg  border border-[#E6E6E6] p-3  shadow-[0_6px_10px_-6px_#00000016] ">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7   rounded-lg bg-[#E6E6E6]" />
            <div className="flex flex-col gap-1">
              <div className="h-1.5 w-14 bg-[#2A2A2F]   rounded-lg" />
              <div className="h-1 w-10 bg-[#E6E6E6]   rounded-lg" />
            </div>
          </div>
          <div className="h-1 w-full bg-[#F3F3F3] rounded mb-1" />
          <div className="h-1 w-4/5 bg-[#F3F3F3] rounded mb-2" />
          <div className="flex gap-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-3 px-2   rounded-lg bg-[#D4FBE5] flex items-center">
                <div className="h-0.5 w-5 bg-[#8DFFB3] rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (template.id === "bento-grid") {
    return (
      <div className="w-full h-full p-3 grid grid-cols-2 grid-rows-3 gap-1.5" style={{ backgroundColor: template.previewBg }}>
        <div className="col-span-2 bg-white rounded-[6px] border border-[#E6E6E6] p-2 flex items-center gap-2">
          <div className="w-5 h-5   rounded-lg bg-[#E6E6E6] flex-shrink-0" />
          <div className="h-1.5 w-16 bg-[#2A2A2F]   rounded-lg" />
        </div>
        <div className="bg-white rounded-[6px] border border-[#E6E6E6] p-2">
          <div className="h-1.5 w-8 bg-[#8DFFB3] rounded mb-1" />
          <div className="h-1 w-full bg-[#F3F3F3] rounded" />
          <div className="h-1 w-3/4 bg-[#F3F3F3] rounded mt-1" />
        </div>
        <div className="bg-white rounded-[6px] border border-[#E6E6E6] p-2">
          <div className="h-1.5 w-8 bg-[#8DFFB3] rounded mb-1" />
          <div className="h-1 w-full bg-[#F3F3F3] rounded" />
          <div className="h-1 w-2/3 bg-[#F3F3F3] rounded mt-1" />
        </div>
        <div className="col-span-2 bg-white rounded-[6px] border border-[#E6E6E6] p-2 flex gap-1">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-2 px-1.5   rounded-lg bg-[#F3F3F3] flex-shrink-0">
              <div className="h-full w-4 bg-[#E6E6E6] rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (template.id === "full-scroll") {
    return (
      <div className="w-full h-full flex flex-col" style={{ backgroundColor: template.previewBg }}>
        <div className="h-12 bg-[#2A2A2F] flex items-end px-3 pb-2">
          <div className="w-8 h-8   rounded-lg bg-[#E6E6E6] border-2 border-white -mb-4" />
        </div>
        <div className="flex-1 bg-white px-3 pt-5 flex flex-col gap-2">
          <div className="h-2 w-20 bg-[#2A2A2F] rounded" />
          <div className="h-1 w-16 bg-[#E6E6E6] rounded" />
          <div className="h-px w-full bg-[#E6E6E6] my-1" />
          {[1, 2].map(i => (
            <div key={i} className="flex gap-2 items-start">
              <div className="w-3 h-3   rounded-lg bg-[#8DFFB3] mt-0.5 flex-shrink-0" />
              <div className="flex-1 flex flex-col gap-1">
                <div className="h-1.5 w-14 bg-[#2A2A2F] rounded" />
                <div className="h-1 w-10 bg-[#E6E6E6] rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Dark template
  return (
    <div className="w-full h-full p-3 flex flex-col gap-2" style={{ backgroundColor: template.previewBg }}>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7   rounded-lg bg-[#2A2A2F] border border-[#333]" />
        <div className="flex flex-col gap-1">
          <div className="h-1.5 w-14 bg-white/80   rounded-lg" />
          <div className="h-1 w-10 bg-white/30   rounded-lg" />
        </div>
      </div>
      <div className="h-1 w-full bg-white/10 rounded" />
      <div className="h-1 w-4/5 bg-white/10 rounded" />
      <div className="flex gap-1 mt-1">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-3 px-2   rounded-lg bg-[#8DFFB3]/20 flex items-center">
            <div className="h-0.5 w-4 bg-[#8DFFB3] rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TemplatePicker({ selected, onSelect }: TemplatePickerProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-sm font-medium text-black mb-0.5">Choose a template</h2>
        <p className="text-xs text-[#9CA3AF]">You can switch anytime — your edits are preserved.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {TEMPLATES.map((template, i) => {
          const isSelected = selected === template.id;
          return (
            <motion.button
              key={template.id}
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => onSelect(template.id)}
              className={`relative group      rounded-lg   overflow-hidden border text-left transition-[border-color,box-shadow] duration-200 active:scale-[0.97] ${isSelected
                ? "border-[#2A2A2F] shadow-[0_0_0_2px_#2A2A2F]"
                : "border-[#E6E6E6] hover:border-[#C0C0C0]"
                }`}
            >
              {/* Preview area */}
              <div className="h-[110px] w-full overflow-hidden">
                <TemplatePreview template={template} />
              </div>

              {/* Label */}
              <div className="p-2.5 bg-white border-t border-[#E6E6E6]">
                <p className="text-[11px] font-medium text-black leading-tight">{template.name}</p>
                <p className="text-[10px] text-[#9CA3AF] leading-tight mt-0.5 line-clamp-1">{template.description}</p>
              </div>

              {/* Selected badge */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute top-2 right-2 w-5 h-5   rounded-lg bg-[#2A2A2F] flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}


