import clsx from "clsx";

export interface CampaignStat {
  label: string;
  value: number;
  note?: string;
  alert?: boolean;
}

// Neutral number tiles, same treatment as the Contacts stats. Color only
// appears when something needs attention (failed emails).
const CampaignStatTiles = ({ stats }: { stats: CampaignStat[] }) => (
  <dl
    className={clsx(
      "grid gap-2 sm:gap-4",
      stats.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"
    )}
  >
    {stats.map((stat) => (
      <div
        key={stat.label}
        className="rounded-lg border border-white/10 bg-gray-800/50 px-3 py-2.5 sm:px-4"
      >
        <dt className="text-xs text-gray-400">{stat.label}</dt>
        <dd
          className={clsx(
            "mt-0.5 text-lg font-semibold tabular-nums sm:text-2xl",
            stat.alert ? "text-red-400" : "text-white"
          )}
        >
          {stat.value}
          {stat.note && (
            <span className="ml-1.5 text-xs font-normal text-gray-400">
              {stat.note}
            </span>
          )}
        </dd>
      </div>
    ))}
  </dl>
);

export const percentOf = (part: number, total: number) =>
  total > 0 ? `${Math.round((part / total) * 100)}%` : undefined;

export default CampaignStatTiles;
