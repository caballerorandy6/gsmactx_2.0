"use client";

import { useState, useMemo } from "react";
import { notFound } from "next/navigation";
// Direct imports instead of barrel imports for better tree-shaking
import ImprovedDashboardSidebar from "@/components/admin/layout/ImprovedDashboardSidebar";
import CampaignsListDashboard from "@/components/admin/campaigns/CampaignListDashboard";
import DashboardStats from "@/components/admin/dashboard/DashboardStats";
import EmptyDashboardState from "@/components/admin/dashboard/EmptyDashboardState";
import { Campaign } from "@/lib/interfaces";
import { SafeAdmin } from "@/lib/types";

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
  if (campaigns.length === 0) {
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

  return (
    <section className="min-h-screen">
      <div className="flex flex-col lg:flex-row">
        <ImprovedDashboardSidebar
          userName={user.name}
          totalCampaigns={campaigns.length}
          sentCampaigns={sentCount}
          notSentCampaigns={notSentCount}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />

        <div className="flex-1 p-4 sm:p-6 lg:p-8">
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
