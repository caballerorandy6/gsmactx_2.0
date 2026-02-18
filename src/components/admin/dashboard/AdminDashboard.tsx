"use client";

import { useState, useMemo } from "react";
import { notFound } from "next/navigation";
import CampaignsListDashboard from "@/components/admin/campaigns/CampaignListDashboard";
import DashboardStats from "@/components/admin/dashboard/DashboardStats";
import EmptyDashboardState from "@/components/admin/dashboard/EmptyDashboardState";
import { Campaign } from "@/lib/interfaces";
import { SafeAdmin } from "@/lib/types";
import {
  Squares2X2Icon,
  PaperAirplaneIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

type FilterType = "all" | "sent" | "not-sent";

interface AdminDashboardProps {
  user: SafeAdmin | null;
  campaigns: Campaign[];
  dashboardStats?: {
    success: boolean;
    stats: {
      // Email Campaign Stats
      totalSubscribers: number;
      activeSubscribers: number;
      inactiveSubscribers: number;
      totalCampaigns: number;
      sentCampaigns: number;
      notSentCampaigns: number;
      emailsSent: number;
      emailsFailed: number;
      emailsPending: number;
      // SMS Campaign Stats
      totalSMSCampaigns: number;
      sentSMSCampaigns: number;
      notSentSMSCampaigns: number;
      smsSent: number;
      smsFailed: number;
      smsPending: number;
      // Appointment Stats
      totalAppointments: number;
      pendingAppointments: number;
      confirmedAppointments: number;
      inProgressAppointments: number;
      completedAppointments: number;
      cancelledAppointments: number;
      todayAppointments: number;
      weekAppointments: number;
    } | null;
    recentCampaigns: unknown[];
  };
}

const AdminDashboard = ({
  user,
  campaigns,
  dashboardStats,
}: AdminDashboardProps) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");

  // Redirect to 404 if user is not authenticated
  if (!user) {
    notFound();
  }

  // Show empty state if no campaigns exist
  if (campaigns.length === 0 && !dashboardStats?.stats) {
    return <EmptyDashboardState userName={user.name} />;
  }

  // Memoize campaign counts to avoid recalculation on every render
  const { sentCount, notSentCount } = useMemo(() => {
    let sent = 0;
    let notSent = 0;
    for (const campaign of campaigns) {
      if (campaign.sent) {
        sent++;
      } else {
        notSent++;
      }
    }
    return { sentCount: sent, notSentCount: notSent };
  }, [campaigns]);

  // Memoize filtered campaigns based on selected filter
  const filteredCampaigns = useMemo(() => {
    if (selectedFilter === "all") return campaigns;
    const isSent = selectedFilter === "sent";
    return campaigns.filter((c) => c.sent === isSent);
  }, [campaigns, selectedFilter]);

  const filterButtons = [
    {
      id: "all" as FilterType,
      label: "All",
      count: campaigns.length,
      icon: Squares2X2Icon,
    },
    {
      id: "sent" as FilterType,
      label: "Sent",
      count: sentCount,
      icon: PaperAirplaneIcon,
    },
    {
      id: "not-sent" as FilterType,
      label: "Pending",
      count: notSentCount,
      icon: ClockIcon,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 pb-24 lg:pb-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Welcome back, {user.name}
          </p>
        </div>
      </div>

      {/* Dashboard Stats */}
      {dashboardStats?.success && dashboardStats.stats && (
        <DashboardStats stats={dashboardStats.stats} />
      )}

      {/* Campaigns Section */}
      {campaigns.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-white">
              Email Campaigns
            </h2>

            {/* Inline Filter Buttons */}
            <div className="flex gap-2">
              {filterButtons.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  aria-label={`Filter by ${filter.label}: ${filter.count} campaigns`}
                  aria-pressed={selectedFilter === filter.id}
                  className={clsx(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all motion-reduce:transition-none",
                    selectedFilter === filter.id
                      ? "bg-indigo-500/20 text-white border border-indigo-500/30"
                      : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
                  )}
                >
                  <filter.icon aria-hidden="true" className="h-4 w-4" />
                  <span className="hidden sm:inline">{filter.label}</span>
                  <span className="tabular-nums bg-white/10 px-1.5 py-0.5 rounded text-xs">
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Campaigns List */}
          <CampaignsListDashboard
            campaigns={filteredCampaigns}
            totalCount={campaigns.length}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
