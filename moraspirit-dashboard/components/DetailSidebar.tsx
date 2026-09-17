"use client";

import React from "react";
import { Member, MemberAvailabilityStatus } from "@/lib/types";
import {
  Calendar,
  Check,
  X,
  Clock,
  AlertCircle,
  Loader2,
  Info,
} from "lucide-react";

interface DetailSidebarProps {
  member: Member | null;
  selectedDate: string;
  onDateChange: (date: string) => void;
  availability?: MemberAvailabilityStatus;
  onRecheck: () => void;
}

export const DetailSidebar: React.FC<DetailSidebarProps> = ({
  member,
  selectedDate,
  onDateChange,
  availability,
  onRecheck,
}) => {
  if (!member) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center shadow-sm flex flex-col items-center justify-center h-full min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
          <Info className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">
          No Member Selected
        </h3>
        <p className="text-xs text-slate-500 max-w-xs">
          Click on any team member card from the list to view detailed
          availability and commitment schedules.
        </p>
      </div>
    );
  }

  // Format date display
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const dateObj = new Date(dateStr + "T00:00:00");
    if (isNaN(dateObj.getTime())) return dateStr;
    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between h-full">
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-lg font-bold text-slate-900 leading-snug">
            {member.name}
          </h2>
          <p className="text-xs font-semibold text-slate-500">{member.role}</p>
          <span className="text-xs font-mono text-slate-400 mt-0.5">
            {member.id}
          </span>
        </div>

        <hr className="border-slate-100" />

        {/* Selected Date Controls */}
        <div>
          <label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 mb-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            Selected Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer transition-all"
            />
          </div>
        </div>

        {/* Main Status Display Box */}
        {availability?.status === "loading" && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
            <p className="text-xs font-medium text-slate-600">
              Checking availability for {formatDate(selectedDate)}...
            </p>
          </div>
        )}

        {availability?.status === "available" && (
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-6 text-center space-y-3 transition-all">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="text-lg font-extrabold text-emerald-800">
              Available
            </h3>
            <p className="text-xs text-emerald-700/90 leading-relaxed max-w-xs mx-auto">
              {availability.reason ||
                `This member is available on ${formatDate(selectedDate)}.`}
            </p>
          </div>
        )}

        {availability?.status === "busy" && (
          <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-6 text-center space-y-3 transition-all">
            <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center mx-auto shadow-sm">
              <X className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="text-lg font-extrabold text-rose-800">Busy</h3>
            <p className="text-xs text-rose-700/90 leading-relaxed max-w-xs mx-auto">
              {availability.reason ||
                `This member is busy on ${formatDate(selectedDate)}.`}
            </p>
          </div>
        )}

        {availability?.status === "error" && (
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto shadow-sm">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-amber-800">
              Check Failed
            </h3>
            <p className="text-xs text-amber-700">
              {availability.error || "Could not retrieve status."}
            </p>
            <button
              onClick={onRecheck}
              className="mt-2 text-xs font-semibold text-amber-800 underline hover:text-amber-900 cursor-pointer"
            >
              Retry Check
            </button>
          </div>
        )}

        {(!availability || availability.status === "error") && (
          <div className="text-center pt-2">
            <button
              onClick={onRecheck}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              Check Availability
            </button>
          </div>
        )}
      </div>

      {/* Footer Timestamp */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>
          Last checked{" "}
          {availability?.lastChecked || formatDate(selectedDate)}
        </span>
      </div>
    </div>
  );
};
