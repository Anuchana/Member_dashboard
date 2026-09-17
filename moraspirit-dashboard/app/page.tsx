"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Header } from "@/components/Header";
import { StatCards } from "@/components/StatCards";
import { FilterBar } from "@/components/FilterBar";
import { MemberGrid } from "@/components/MemberGrid";
import { DetailSidebar } from "@/components/DetailSidebar";
import { Member, AvailabilityMap } from "@/lib/types";
import { fetchMembers, checkAvailability } from "@/lib/api";

export default function DashboardPage() {
  // Today's date in YYYY-MM-DD
  const getTodayDateStr = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [members, setMembers] = useState<Member[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState<boolean>(true);
  const [membersError, setMembersError] = useState<string | null>(null);

  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateStr());
  const [availabilityMap, setAvailabilityMap] = useState<AvailabilityMap>({});
  const [isBatchChecking, setIsBatchChecking] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Format current timestamp
  const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }) + " " + now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 1. Initial Member List Fetch
  const loadMembers = useCallback(async () => {
    setIsLoadingMembers(true);
    setMembersError(null);
    try {
      const data = await fetchMembers();
      setMembers(data);
      if (data.length > 0) {
        setSelectedMemberId(data[0].id);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to connect to MoraSpirit server.";
      setMembersError(errorMessage);
    } finally {
      setIsLoadingMembers(false);
    }
  }, []);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  // 2. Single Availability Check
  const checkSingleAvailability = useCallback(
    async (mspId: string, date: string) => {
      // Set loading state for this member
      setAvailabilityMap((prev) => ({
        ...prev,
        [mspId]: {
          ...prev[mspId],
          status: "loading",
        },
      }));

      try {
        const res = await checkAvailability(mspId, date);
        const timestamp = getCurrentTimestamp();
        // If JSON data does not say busy, make them available
        const finalStatus: "available" | "busy" =
          res && res.status === "busy" ? "busy" : "available";

        setAvailabilityMap((prev) => ({
          ...prev,
          [mspId]: {
            status: finalStatus,
            reason: res.reason,
            lastChecked: timestamp,
          },
        }));
      } catch (err: unknown) {
        const errorMsg =
          err instanceof Error ? err.message : "Availability check failed";
        setAvailabilityMap((prev) => ({
          ...prev,
          [mspId]: {
            status: "error",
            error: errorMsg,
            lastChecked: getCurrentTimestamp(),
          },
        }));
      }
    },
    []
  );

  // 3. Batch Check All Members Availability
  const checkAllAvailability = useCallback(
    async (targetDate: string, memberList: Member[]) => {
      if (memberList.length === 0) return;

      setIsBatchChecking(true);

      // Set all to loading
      setAvailabilityMap((prev) => {
        const nextMap = { ...prev };
        memberList.forEach((m) => {
          nextMap[m.id] = { status: "loading" };
        });
        return nextMap;
      });

      // Run requests concurrently with limit or Promise.allSettled
      await Promise.allSettled(
        memberList.map(async (m) => {
          try {
            const res = await checkAvailability(m.id, targetDate);
            const timestamp = getCurrentTimestamp();
            // If JSON data does not say busy, make them available
            const finalStatus: "available" | "busy" =
              res && res.status === "busy" ? "busy" : "available";

            setAvailabilityMap((prev) => ({
              ...prev,
              [m.id]: {
                status: finalStatus,
                reason: res.reason,
                lastChecked: timestamp,
              },
            }));
          } catch {
            setAvailabilityMap((prev) => ({
              ...prev,
              [m.id]: {
                status: "error",
                error: "Check failed",
                lastChecked: getCurrentTimestamp(),
              },
            }));
          }
        })
      );

      setIsBatchChecking(false);
    },
    []
  );

  // When members load or selected date changes, run availability check for all members
  useEffect(() => {
    if (members.length > 0) {
      checkAllAvailability(selectedDate, members);
    }
  }, [members, selectedDate, checkAllAvailability]);

  // Handle single member click selection
  const handleSelectMember = (id: string) => {
    setSelectedMemberId(id);
    // If not checked for current date, run check
    if (!availabilityMap[id] || availabilityMap[id].status === "error") {
      checkSingleAvailability(id, selectedDate);
    }
  };

  // Re-check single member
  const handleRecheckSelected = () => {
    if (selectedMemberId) {
      checkSingleAvailability(selectedMemberId, selectedDate);
    }
  };

  // Filtered members list
  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) return members;
    const q = searchQuery.toLowerCase().trim();
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q)
    );
  }, [members, searchQuery]);

  // Selected member object
  const selectedMember = useMemo(
    () => members.find((m) => m.id === selectedMemberId) || null,
    [members, selectedMemberId]
  );

  // Compute Statistics
  const availableCount = useMemo(() => {
    return Object.values(availabilityMap).filter(
      (s) => s.status === "available"
    ).length;
  }, [availabilityMap]);

  const busyCount = useMemo(() => {
    return Object.values(availabilityMap).filter((s) => s.status === "busy")
      .length;
  }, [availabilityMap]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Header */}
      <Header
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        headerSearch={searchQuery}
        onHeaderSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6">
        {/* Title Section Banner */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Team Availability Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Check member availability and manage your team for any date.
          </p>
        </div>

        {/* Top Summary Stat Cards */}
        <StatCards
          totalMembers={members.length}
          availableCount={availableCount}
          busyCount={busyCount}
          selectedDate={selectedDate}
        />

        {/* Filter and Action Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onCheckAllAvailability={() =>
            checkAllAvailability(selectedDate, members)
          }
          isChecking={isBatchChecking}
        />

        {/* Layout Grid: Cards Grid on Left, Sidebar on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left / Center 2 Columns */}
          <div className="lg:col-span-2">
            <MemberGrid
              members={filteredMembers}
              selectedMemberId={selectedMemberId}
              onSelectMember={handleSelectMember}
              availabilityMap={availabilityMap}
              isLoading={isLoadingMembers}
              error={membersError}
              onRetry={loadMembers}
            />
          </div>

          {/* Right Sidebar 1 Column */}
          <div className="lg:col-span-1 sticky top-20">
            <DetailSidebar
              member={selectedMember}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              availability={
                selectedMemberId
                  ? availabilityMap[selectedMemberId]
                  : undefined
              }
              onRecheck={handleRecheckSelected}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
