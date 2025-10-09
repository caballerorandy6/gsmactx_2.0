// src/components/admin-components/AdminDashboard.tsx
"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import ImprovedDashboardSidebar from "@/components/admin-components/ImprovedDashboardSidebar";
import CampaignsListDashboard from "@/components/admin-components/CampaignListDashboard";
import DashboardStats from "@/components/admin-components/DashboardStats";
import EmptyDashboardState from "./EmptyDashboardState";
import { Campaign } from "@/libs/interfaces";
import { SafeAdmin } from "@/libs/types";
import AdminHeader from "./AdminHeader";

type FilterType = "all" | "sent" | "not-sent";

interface AdminDashboardProps {
  user: SafeAdmin | null;
  campaigns: Campaign[];
  dashboardStats?: {
    success: boolean;
    stats: {
      totalSubscribers: number;
      activeSubscribers: number;
      inactiveSubscribers: number;
      totalCampaigns: number;
      sentCampaigns: number;
      notSentCampaigns: number;
      emailsSent: number;
      emailsFailed: number;
      emailsPending: number;
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
  if (campaigns.length === 0) {
    return <EmptyDashboardState userName={user.name} />;
  }

  // Filter campaigns based on selected filter
  const filteredCampaigns = campaigns.filter((campaign) => {
    switch (selectedFilter) {
      case "sent":
        return campaign.sent === true;
      case "not-sent":
        return campaign.sent === false;
      default:
        return true; // 'all'
    }
  });

  // Calculate counts for sidebar
  const sentCount = campaigns.filter((c) => c.sent === true).length;
  const notSentCount = campaigns.filter((c) => c.sent === false).length;

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 mt-10 min-h-screen">
      <AdminHeader />

      <div className="flex pt-20">
        <ImprovedDashboardSidebar
          userName={user.name}
          totalCampaigns={campaigns.length}
          sentCampaigns={sentCount}
          notSentCampaigns={notSentCount}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />

        <div className="flex-1 p-8">
          {/* Dashboard Stats */}
          {dashboardStats?.success && dashboardStats.stats && (
            <DashboardStats stats={dashboardStats.stats} />
          )}

          {/* Campaigns List */}
          <CampaignsListDashboard
            campaigns={filteredCampaigns}
            totalCount={campaigns.length}
          />
        </div>
      </div>
    </section>
  );
};

// Add default export
export default AdminDashboard;
