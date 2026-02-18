"use client";

import {
  EnvelopeIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChatBubbleLeftRightIcon,
  DevicePhoneMobileIcon,
  CalendarDaysIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

interface DashboardStatsProps {
  stats: {
    // Email Campaign Stats
    totalSubscribers: number;
    activeSubscribers: number;
    totalCampaigns: number;
    sentCampaigns: number;
    emailsSent: number;
    emailsFailed: number;
    // SMS Campaign Stats
    totalSMSCampaigns: number;
    sentSMSCampaigns: number;
    smsSent: number;
    smsFailed: number;
    // Appointment Stats
    totalAppointments: number;
    pendingAppointments: number;
    confirmedAppointments: number;
    inProgressAppointments: number;
    completedAppointments: number;
    cancelledAppointments: number;
    todayAppointments: number;
    weekAppointments: number;
  };
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const emailStatCards = [
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
      name: "Email Campaigns",
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

  const smsStatCards = [
    {
      name: "SMS Campaigns",
      value: stats.totalSMSCampaigns,
      icon: ChatBubbleLeftRightIcon,
      color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      iconBg: "bg-cyan-500/20",
    },
    {
      name: "Sent SMS Campaigns",
      value: stats.sentSMSCampaigns,
      icon: CheckCircleIcon,
      color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      iconBg: "bg-emerald-500/20",
    },
    {
      name: "SMS Sent",
      value: stats.smsSent,
      icon: DevicePhoneMobileIcon,
      color: "bg-sky-500/10 text-sky-400 border-sky-500/20",
      iconBg: "bg-sky-500/20",
    },
    {
      name: "SMS Failed",
      value: stats.smsFailed,
      icon: XCircleIcon,
      color: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      iconBg: "bg-orange-500/20",
    },
  ];

  const appointmentStatCards = [
    {
      name: "Today",
      value: stats.todayAppointments,
      icon: CalendarDaysIcon,
      color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      iconBg: "bg-amber-500/20",
    },
    {
      name: "This Week",
      value: stats.weekAppointments,
      icon: CalendarDaysIcon,
      color: "bg-lime-500/10 text-lime-400 border-lime-500/20",
      iconBg: "bg-lime-500/20",
    },
    {
      name: "Pending",
      value: stats.pendingAppointments,
      icon: ClockIcon,
      color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      iconBg: "bg-yellow-500/20",
    },
    {
      name: "Confirmed",
      value: stats.confirmedAppointments,
      icon: CheckCircleIcon,
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      iconBg: "bg-blue-500/20",
    },
    {
      name: "In Progress",
      value: stats.inProgressAppointments,
      icon: WrenchScrewdriverIcon,
      color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      iconBg: "bg-indigo-500/20",
    },
    {
      name: "Completed",
      value: stats.completedAppointments,
      icon: CheckCircleIcon,
      color: "bg-green-500/10 text-green-400 border-green-500/20",
      iconBg: "bg-green-500/20",
    },
  ];

  return (
    <div className="space-y-6 mb-6 lg:mb-8">
      {/* Appointment Stats - Most important for daily operations */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <CalendarDaysIcon aria-hidden="true" className="h-5 w-5 text-amber-400" />
          <h3 className="text-lg font-semibold text-white">Appointments</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {appointmentStatCards.map((stat) => (
            <div
              key={stat.name}
              className={`rounded-xl border p-3 sm:p-4 backdrop-blur-sm transition-transform motion-reduce:transition-none hover:scale-[1.02] ${stat.color}`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <p className="text-xs sm:text-sm font-medium text-gray-400 truncate">
                  {stat.name}
                </p>
                <div className={`rounded-full p-1.5 sm:p-2 shrink-0 ${stat.iconBg}`}>
                  <stat.icon aria-hidden="true" className="h-4 w-4" />
                </div>
              </div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold tabular-nums">
                {stat.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Email Campaign Stats */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <EnvelopeIcon aria-hidden="true" className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Email Campaigns</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {emailStatCards.map((stat) => (
            <div
              key={stat.name}
              className={`rounded-xl border p-3 sm:p-4 backdrop-blur-sm transition-transform motion-reduce:transition-none hover:scale-[1.02] ${stat.color}`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <p className="text-xs sm:text-sm font-medium text-gray-400 truncate">
                  {stat.name}
                </p>
                <div className={`rounded-full p-1.5 sm:p-2 shrink-0 ${stat.iconBg}`}>
                  <stat.icon aria-hidden="true" className="h-4 w-4" />
                </div>
              </div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold tabular-nums">
                {stat.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SMS Campaign Stats */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <ChatBubbleLeftRightIcon aria-hidden="true" className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">SMS Campaigns</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {smsStatCards.map((stat) => (
            <div
              key={stat.name}
              className={`rounded-xl border p-3 sm:p-4 backdrop-blur-sm transition-transform motion-reduce:transition-none hover:scale-[1.02] ${stat.color}`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <p className="text-xs sm:text-sm font-medium text-gray-400 truncate">
                  {stat.name}
                </p>
                <div className={`rounded-full p-1.5 sm:p-2 shrink-0 ${stat.iconBg}`}>
                  <stat.icon aria-hidden="true" className="h-4 w-4" />
                </div>
              </div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold tabular-nums">
                {stat.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
