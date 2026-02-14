"use client";

import Link from "next/link";
import clsx from "clsx";
import {
  HomeIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
  BeakerIcon,
  Squares2X2Icon,
  CalendarDaysIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

type FilterType = "all" | "sent" | "not-sent";

interface SidebarItem {
  id: FilterType;
  label: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface DashboardSidebarProps {
  userName: string;
  totalCampaigns: number;
  sentCampaigns: number;
  notSentCampaigns: number;
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const ImprovedDashboardSidebar = ({
  userName,
  totalCampaigns,
  sentCampaigns,
  notSentCampaigns,
  selectedFilter,
  onFilterChange,
}: DashboardSidebarProps) => {
  const sidebarItems: SidebarItem[] = [
    {
      id: "all",
      label: "All Campaigns",
      count: totalCampaigns,
      icon: Squares2X2Icon,
    },
    {
      id: "sent",
      label: "Sent",
      count: sentCampaigns,
      icon: PaperAirplaneIcon,
    },
    {
      id: "not-sent",
      label: "Not Sent",
      count: notSentCampaigns,
      icon: EnvelopeIcon,
    },
  ];

  const quickActions = [
    {
      href: "/admin-dashboard",
      label: "Dashboard",
      icon: HomeIcon,
      color: "bg-gray-600 hover:bg-gray-500",
    },
    {
      href: "/appointments",
      label: "Appointments",
      icon: CalendarDaysIcon,
      color: "bg-emerald-600 hover:bg-emerald-500",
    },
    {
      href: "/create-appointment",
      label: "New Appointment",
      icon: PlusCircleIcon,
      color: "bg-teal-600 hover:bg-teal-500",
    },
    {
      href: "/create-campaign",
      label: "New Campaign",
      icon: EnvelopeIcon,
      color: "bg-indigo-600 hover:bg-indigo-500",
    },
    {
      href: "/test-campaign",
      label: "Test Campaign",
      icon: BeakerIcon,
      color: "bg-purple-600 hover:bg-purple-500",
    },
  ];

  return (
    <aside className="w-full lg:w-72 lg:min-h-screen bg-linear-to-b from-gray-900 via-gray-900 to-gray-800 backdrop-blur-sm lg:border-r border-b lg:border-b-0 border-white/10 p-4 sm:p-6 shadow-2xl">
      {/* User Welcome Section */}
      <div className="mb-6 lg:mb-8 pb-4 lg:pb-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-white">Dashboard</h2>
            <p className="text-gray-400 text-xs">Welcome, {userName}</p>
          </div>
        </div>
      </div>

      {/* Filter Navigation */}
      <div className="mb-6 lg:mb-8">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Filters
        </h3>
        <nav className="grid grid-cols-3 lg:grid-cols-1 gap-2 lg:space-y-1 lg:gap-0">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onFilterChange(item.id)}
              className={clsx(
                "w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-between group",
                selectedFilter === item.id
                  ? "bg-linear-to-r from-indigo-500/20 to-purple-500/20 text-white border border-indigo-500/30 shadow-lg shadow-indigo-500/10"
                  : "text-gray-300 hover:bg-white/5 hover:text-white hover:border hover:border-white/10"
              )}
            >
              <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-3">
                <item.icon
                  className={clsx(
                    "h-5 w-5 transition-colors",
                    selectedFilter === item.id
                      ? "text-indigo-400"
                      : "text-gray-400 group-hover:text-gray-300"
                  )}
                />
                <span className="font-medium text-xs sm:text-sm text-center lg:text-left">{item.label}</span>
              </div>
              <span
                className={clsx(
                  "px-2.5 py-0.5 text-xs font-semibold rounded-full transition-colors mt-1 lg:mt-0",
                  selectedFilter === item.id
                    ? "bg-indigo-500/30 text-indigo-200"
                    : "bg-gray-700/50 text-gray-400 group-hover:bg-gray-600/50"
                )}
              >
                {item.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Quick Actions */}
      <div className="mb-6 lg:mb-8">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Quick Actions
        </h3>
        <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 lg:space-y-2 lg:gap-0">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={clsx(
                "w-full flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-3 rounded-lg px-2 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white transition-all shadow-md",
                action.color
              )}
            >
              <action.icon className="h-5 w-5" />
              <span className="hidden sm:inline lg:inline">{action.label}</span>
              <span className="sm:hidden lg:hidden text-[10px] text-center">{action.label.split(' ')[0]}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="rounded-xl bg-linear-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 p-3 sm:p-4">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Overview
        </h3>
        <div className="grid grid-cols-3 lg:grid-cols-1 gap-3 lg:space-y-3 lg:gap-0">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <span className="text-xs sm:text-sm text-gray-300">Total</span>
            <span className="text-base sm:text-lg font-bold text-white">
              {totalCampaigns}
            </span>
          </div>
          <div className="hidden lg:block h-px bg-white/10"></div>
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <span className="text-xs sm:text-sm text-green-400">Sent</span>
            <span className="text-base sm:text-lg font-bold text-green-400">
              {sentCampaigns}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <span className="text-xs sm:text-sm text-orange-400">Pending</span>
            <span className="text-base sm:text-lg font-bold text-orange-400">
              {notSentCampaigns}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ImprovedDashboardSidebar;
