"use client";

import React from "react";
import { Search, Calendar, RefreshCw } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDate: string;
  onDateChange: (date: string) => void;
  onCheckAllAvailability: () => void;
  isChecking: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedDate,
  onDateChange,
  onCheckAllAvailability,
  isChecking,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-6 bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm">
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by name, role or member ID..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800 placeholder-slate-400 transition-all"
        />
      </div>

      {/* Date & Trigger Button */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        <div className="relative flex items-center min-w-[170px] w-full md:w-auto">
          <Calendar className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer transition-all"
          />
        </div>

        <button
          onClick={onCheckAllAvailability}
          disabled={isChecking}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white rounded-lg text-xs font-semibold shadow-sm hover:shadow transition-all disabled:opacity-70 whitespace-nowrap cursor-pointer"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${isChecking ? "animate-spin" : ""}`}
          />
          <span>Check Availability</span>
        </button>
      </div>
    </div>
  );
};
