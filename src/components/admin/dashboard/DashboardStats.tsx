import Link from "next/link";
import clsx from "clsx";

export interface DashboardStatsData {
  totalSubscribers: number;
  activeSubscribers: number;
  totalCampaigns: number;
  sentCampaigns: number;
  notSentCampaigns: number;
  emailsSent: number;
  emailsFailed: number;
  totalSMSCampaigns: number;
  sentSMSCampaigns: number;
  smsSent: number;
  smsFailed: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  todayAppointments: number;
  weekAppointments: number;
}

const fmt = (n: number) => n.toLocaleString("en-US");

/** One strip of the four numbers that drive the day, not a grid of cards. */
export const AppointmentSummary = ({ stats }: { stats: DashboardStatsData }) => {
  const items = [
    { label: "Today", value: stats.todayAppointments },
    { label: "This week", value: stats.weekAppointments },
    {
      label: "Need confirmation",
      value: stats.pendingAppointments,
      attention: stats.pendingAppointments > 0,
    },
    { label: "Confirmed", value: stats.confirmedAppointments },
  ];

  return (
    <dl className="grid grid-cols-2 overflow-hidden rounded-lg border border-white/10 bg-gray-900/60 lg:grid-cols-4">
      {items.map((item, i) => (
        <div
          key={item.label}
          className={clsx(
            "px-4 py-4 sm:px-5",
            i % 2 === 1 && "border-l border-white/10",
            i >= 2 && "border-t border-white/10 lg:border-t-0",
            i === 2 && "lg:border-l"
          )}
        >
          <dt
            className={clsx(
              "flex items-center gap-1.5 text-sm",
              item.attention ? "text-yellow-300" : "text-gray-400"
            )}
          >
            {item.attention && (
              <span aria-hidden="true" className="size-1.5 rounded-full bg-yellow-400" />
            )}
            {item.label}
          </dt>
          <dd className="mt-1 text-2xl font-semibold tabular-nums text-white sm:text-3xl">
            {fmt(item.value)}
          </dd>
        </div>
      ))}
    </dl>
  );
};

interface Row {
  label: string;
  value: string;
  alert?: boolean;
}

const MetricList = ({
  title,
  href,
  rows,
}: {
  title: string;
  href?: string;
  rows: Row[];
}) => (
  <div>
    <div className="flex items-center justify-between gap-4">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      {href && (
      <Link
        href={href}
        className="rounded text-xs font-medium text-primary-300 hover:text-primary-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
      >
        Manage
      </Link>
      )}
    </div>
    <dl className="mt-2 divide-y divide-white/5">
      {rows.map((row) => (
        <div key={row.label} className="flex items-baseline justify-between gap-4 py-2">
          <dt className="text-sm text-gray-400">{row.label}</dt>
          <dd
            className={clsx(
              "text-sm font-medium tabular-nums",
              row.alert ? "text-red-400" : "text-white"
            )}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  </div>
);

/** Email and SMS outreach numbers as compact label/value lists. */
export const OutreachStats = ({ stats }: { stats: DashboardStatsData }) => (
  <section
    aria-labelledby="outreach-heading"
    className="rounded-lg border border-white/10 bg-gray-900/60 px-4 py-4 sm:px-5"
  >
    <h2 id="outreach-heading" className="sr-only">
      Outreach
    </h2>
    <div className="space-y-6">
      <MetricList
        title="Email"
        href="/view-campaigns"
        rows={[
          {
            label: "Subscribers",
            value: `${fmt(stats.activeSubscribers)} active of ${fmt(stats.totalSubscribers)}`,
          },
          {
            label: "Campaigns",
            value: `${fmt(stats.sentCampaigns)} sent · ${fmt(stats.notSentCampaigns)} draft`,
          },
          { label: "Emails delivered", value: fmt(stats.emailsSent) },
          {
            label: "Emails failed",
            value: fmt(stats.emailsFailed),
            alert: stats.emailsFailed > 0,
          },
        ]}
      />
      <MetricList
        title="SMS"
        rows={[
          {
            label: "Campaigns",
            value: `${fmt(stats.sentSMSCampaigns)} sent of ${fmt(stats.totalSMSCampaigns)}`,
          },
          { label: "Messages delivered", value: fmt(stats.smsSent) },
          {
            label: "Messages failed",
            value: fmt(stats.smsFailed),
            alert: stats.smsFailed > 0,
          },
        ]}
      />
    </div>
  </section>
);
