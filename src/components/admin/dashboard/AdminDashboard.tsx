"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import CampaignsListDashboard from "@/components/admin/campaigns/CampaignListDashboard";
import {
  AppointmentSummary,
  DashboardStatsData,
  OutreachStats,
} from "@/components/admin/dashboard/DashboardStats";
import UpcomingAppointments, {
  UpcomingAppointment,
} from "@/components/admin/dashboard/UpcomingAppointments";
import { Campaign } from "@/lib/interfaces";
import { SafeAdmin } from "@/lib/types";
import {
  Squares2X2Icon,
  PaperAirplaneIcon,
  ClockIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

type FilterType = "all" | "sent" | "not-sent";

interface AdminDashboardProps {
  user: SafeAdmin | null;
  campaigns: Campaign[];
  dashboardStats?: {
    success: boolean;
    stats: DashboardStatsData | null;
    upcomingAppointments?: UpcomingAppointment[];
  };
}

const AdminDashboard = ({
  user,
  campaigns,
  dashboardStats,
}: AdminDashboardProps) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");

  if (!user) {
    notFound();
  }

  const stats = dashboardStats?.success ? dashboardStats.stats : null;
  const sentCount = campaigns.filter((c) => c.sent).length;
  const notSentCount = campaigns.length - sentCount;
  const filteredCampaigns =
    selectedFilter === "all"
      ? campaigns
      : campaigns.filter((c) => c.sent === (selectedFilter === "sent"));

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
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-400">Welcome back, {user.name}</p>
        </div>
        <Link
          href="/create-appointment"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
        >
          <PlusIcon aria-hidden="true" className="size-4" />
          New appointment
        </Link>
      </div>

      {stats ? (
        <>
          <AppointmentSummary stats={stats} />
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <UpcomingAppointments
                appointments={dashboardStats?.upcomingAppointments ?? []}
              />
            </div>
            <OutreachStats stats={stats} />
          </div>
        </>
      ) : (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-200"
        >
          Dashboard numbers couldn&apos;t load. Refresh the page to try again.
        </p>
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
                      ? "bg-primary-500/20 text-white border border-primary-500/30"
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
