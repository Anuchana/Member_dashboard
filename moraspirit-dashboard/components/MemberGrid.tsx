"use client";

import React from "react";
import { Member, AvailabilityMap } from "@/lib/types";
import { MemberCard } from "./MemberCard";
import { SearchX, UserX } from "lucide-react";

interface MemberGridProps {
  members: Member[];
  selectedMemberId: string | null;
  onSelectMember: (id: string) => void;
  availabilityMap: AvailabilityMap;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export const MemberGrid: React.FC<MemberGridProps> = ({
  members,
  selectedMemberId,
  onSelectMember,
  availabilityMap,
  isLoading,
  error,
  onRetry,
}) => {
  // Skeleton loader cards
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-white border border-slate-200/80 animate-pulse flex flex-col justify-between h-[120px]"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
                <div className="h-2.5 bg-slate-200 rounded w-1/3" />
              </div>
            </div>
            <div className="h-5 bg-slate-200 rounded-full w-24 mt-3" />
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-xl border border-rose-200 p-8 text-center my-4 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
          <UserX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">
          Failed to load team members
        </h3>
        <p className="text-xs text-slate-500 mb-4 max-w-md mx-auto">{error}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow transition-all cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty state when search yields no matches
  if (members.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center my-4 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <SearchX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">
          No members found
        </h3>
        <p className="text-xs text-slate-500">
          Try searching with a different name, role, or member ID.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {members.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
          isSelected={selectedMemberId === member.id}
          onSelect={() => onSelectMember(member.id)}
          availability={availabilityMap[member.id]}
        />
      ))}
    </div>
  );
};
