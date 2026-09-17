"use client";

import React from "react";
import { Calendar, Search } from "lucide-react";

interface HeaderProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  headerSearch: string;
  onHeaderSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedDate,
  onDateChange,
  headerSearch,
  onHeaderSearchChange,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-8 py-3 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-bold text-xl">
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13H5.5L12 6.5z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
              MoraSpirit
            </h1>
          </div>
        </div>

        {/* Top Right Quick Controls */}
        <div className="flex items-center gap-3">
          {/* Top Quick Date selector */}
          <div className="relative flex items-center">
            <div className="absolute left-3 text-slate-400 pointer-events-none">
              <Calendar className="w-4 h-4 text-slate-500" />
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="pl-9 pr-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer"
            />
          </div>

          {/* Quick Member Search */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search members..."
              value={headerSearch}
              onChange={(e) => onHeaderSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800 placeholder-slate-400 transition-all"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
