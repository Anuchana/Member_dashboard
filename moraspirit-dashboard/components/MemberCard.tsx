"use client";

import React from "react";
import { Member, MemberAvailabilityStatus } from "@/lib/types";
import { Check, Loader2 } from "lucide-react";

interface MemberCardProps {
  member: Member;
  isSelected: boolean;
  onSelect: () => void;
  availability?: MemberAvailabilityStatus;
}

export const MemberCard: React.FC<MemberCardProps> = ({
  member,
  isSelected,
  onSelect,
  availability,
}) => {

  // Status Badge Helper
  const renderStatusBadge = () => {
    if (!availability || availability.status === "loading") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
          <Loader2 className="w-3 h-3 animate-spin text-slate-400" />
          Checking...
        </span>
      );
    }

    if (availability.status === "available") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Available
        </span>
      );
    }

    if (availability.status === "busy") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          Busy
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
        <span className="w-2 h-2 rounded-full bg-amber-500" />
        Unchecked
      </span>
    );
  };

  return (
    <div
      onClick={onSelect}
      className={`relative p-4 rounded-xl bg-white border transition-all cursor-pointer group flex flex-col justify-between ${
        isSelected
          ? "border-blue-500 ring-2 ring-blue-500/20 shadow-md bg-blue-50/20"
          : "border-slate-200/80 hover:border-slate-300 hover:shadow-sm"
      }`}
    >
      {/* Selected Indicator Badge (Top Right) */}
      {isSelected && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </div>
      )}

      {/* Top Header: Meta */}
      <div className="flex items-start gap-3.5">
        <div className="flex-1 min-w-0 pr-4">
          <h3 className="text-sm font-bold text-slate-900 truncate leading-snug group-hover:text-blue-600 transition-colors">
            {member.name}
          </h3>
          <p className="text-xs font-medium text-slate-500 truncate">
            {member.role}
          </p>
          <span className="text-[11px] font-mono text-slate-400 mt-0.5 block">
            {member.id}
          </span>
        </div>
      </div>

      {/* Bottom Status Pill */}
      <div className="mt-4 pt-2 flex items-center justify-start border-t border-slate-100">
        {renderStatusBadge()}
      </div>
    </div>
  );
};
