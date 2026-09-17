"use client";

import React from "react";
import { Users, CheckCircle2, XCircle, Calendar } from "lucide-react";

interface StatCardsProps {
  totalMembers: number;
  availableCount: number;
  busyCount: number;
  selectedDate: string;
}

export const StatCards: React.FC<StatCardsProps> = ({
  totalMembers,
  availableCount,
  busyCount,
  selectedDate,
}) => {
  // Format selected date nicely (e.g., Sep 17, 2026)
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Stat 1: Total Members */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:border-slate-300 transition-all">
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Total Members
          </span>
          <span className="text-2xl font-bold text-slate-900 leading-tight">
            {totalMembers}
          </span>
        </div>
      </div>

      {/* Stat 2: Available Today */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:border-slate-300 transition-all">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Available Today
          </span>
          <span className="text-2xl font-bold text-slate-900 leading-tight">
            {availableCount}
          </span>
        </div>
      </div>

      {/* Stat 3: Busy Today */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:border-slate-300 transition-all">
        <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
          <XCircle className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Busy Today
          </span>
          <span className="text-2xl font-bold text-slate-900 leading-tight">
            {busyCount}
          </span>
        </div>
      </div>

      {/* Stat 4: Selected Date */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:border-slate-300 transition-all">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Selected Date
          </span>
          <span className="text-base font-bold text-slate-900 leading-tight">
            {formatDate(selectedDate)}
          </span>
        </div>
      </div>
    </div>
  );
};
