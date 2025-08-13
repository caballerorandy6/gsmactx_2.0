"use client";

import Link from "next/link";
import clsx from "clsx";

type FilterType = "all" | "sent" | "not-sent";

interface SidebarItem {
  id: FilterType;
  label: string;
  count: number;
}

interface DashboardSidebarProps {
  userName: string;
  totalCampaigns: number;
  sentCampaigns: number;
  notSentCampaigns: number;
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const DashboardSidebar = ({
  userName,
  totalCampaigns,
  sentCampaigns,
  notSentCampaigns,
  selectedFilter,
  onFilterChange,
}: DashboardSidebarProps) => {
  const sidebarItems: SidebarItem[] = [
    { id: "all", label: "All Campaigns", count: totalCampaigns },
    { id: "sent", label: "Sent", count: sentCampaigns },
    { id: "not-sent", label: "Not Sent", count: notSentCampaigns },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-900/80 backdrop-blur-sm border-r border-white/10 p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Dashboard</h2>
        <p className="text-gray-400 text-sm">Welcome back, {userName}</p>
      </div>

      <nav className="space-y-2">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onFilterChange(item.id)}
            className={clsx(
              "w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between",
              selectedFilter === item.id
                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            )}
          >
            <span className="font-medium">{item.label}</span>
            <span
              className={clsx(
                "px-2 py-1 text-xs rounded-full",
                selectedFilter === item.id
                  ? "bg-indigo-500/30 text-indigo-200"
                  : "bg-gray-700 text-gray-300"
              )}
            >
              {item.count}
            </span>
          </button>
        ))}
      </nav>

      <div className="mt-8 pt-8 border-t border-white/10">
        <Link
          href="/create-campaign"
          className="w-full block text-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400 transition-colors"
        >
          Create Campaign
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
