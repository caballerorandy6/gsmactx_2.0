"use client";

import {
  EnvelopeIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

interface DashboardStatsProps {
  stats: {
    totalSubscribers: number;
    activeSubscribers: number;
    totalCampaigns: number;
    sentCampaigns: number;
    emailsSent: number;
    emailsFailed: number;
  };
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const statCards = [
    {
      name: "Total Subscribers",
      value: stats.totalSubscribers,
      icon: UserGroupIcon,
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      iconBg: "bg-blue-500/20",
    },
    {
      name: "Active Subscribers",
      value: stats.activeSubscribers,
      icon: CheckCircleIcon,
      color: "bg-green-500/10 text-green-400 border-green-500/20",
      iconBg: "bg-green-500/20",
    },
    {
      name: "Total Campaigns",
      value: stats.totalCampaigns,
      icon: EnvelopeIcon,
      color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      iconBg: "bg-purple-500/20",
    },
    {
      name: "Sent Campaigns",
      value: stats.sentCampaigns,
      icon: CheckCircleIcon,
      color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      iconBg: "bg-indigo-500/20",
    },
    {
      name: "Emails Sent",
      value: stats.emailsSent,
      icon: EnvelopeIcon,
      color: "bg-teal-500/10 text-teal-400 border-teal-500/20",
      iconBg: "bg-teal-500/20",
    },
    {
      name: "Emails Failed",
      value: stats.emailsFailed,
      icon: XCircleIcon,
      color: "bg-red-500/10 text-red-400 border-red-500/20",
      iconBg: "bg-red-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statCards.map((stat) => (
        <div
          key={stat.name}
          className={`rounded-xl border p-6 backdrop-blur-sm transition-all hover:scale-105 ${stat.color}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{stat.name}</p>
              <p className="mt-2 text-3xl font-bold">{stat.value.toLocaleString()}</p>
            </div>
            <div className={`rounded-full p-3 ${stat.iconBg}`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
