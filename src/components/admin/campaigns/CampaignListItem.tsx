import Link from "next/link";
import clsx from "clsx";
import { Campaign } from "@/lib/interfaces";

const CampaignListItem = ({ campaign }: { campaign: Campaign }) => {
  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-x-6 p-4 sm:p-6 hover:bg-gray-800/50 transition-colors motion-reduce:transition-none">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start gap-2 sm:gap-x-3">
          <p className="text-base sm:text-lg font-semibold text-white">{campaign.title}</p>
          <span
            className={clsx(
              "mt-1 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
              campaign.sent === true
                ? "bg-green-900/50 text-green-300 ring-green-400/20"
                : "bg-red-900/50 text-red-300 ring-red-400/20"
            )}
          >
            {campaign.sent === true ? "Sent" : "Not Sent"}
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-300 line-clamp-2">
          {campaign.subject}
        </p>

        <div className="mt-3 flex items-center gap-x-2 text-xs text-gray-400">
          <span className="whitespace-nowrap">
            Created on{" "}
            {campaign.createdAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <svg viewBox="0 0 2 2" className="size-0.5 fill-current">
            <circle r={1} cx={1} cy={1} />
          </svg>
          <span className="truncate">By {campaign.admin.name}</span>
        </div>
      </div>

      <div className="flex sm:flex-none items-center">
        <Link
          href={`/view-campaigns/${campaign.id}`}
          className="w-full sm:w-auto text-center rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-inset ring-white/20 hover:bg-white/20 transition-colors motion-reduce:transition-none"
        >
          View Details
          <span className="sr-only">, {campaign.title}</span>
        </Link>
      </div>
    </li>
  );
};

export default CampaignListItem;
