import { getCampaignsListAction } from "@/app/actions/campaignAction";
import Link from "next/link";
import clsx from "clsx";
import CampaignActionsMenu from "@/components/admin/campaigns/CampaignActionsMenu";
import AdminPageHeader from "@/components/admin/common/AdminPageHeader";
import { PlusIcon } from "@heroicons/react/24/outline";

const CampaignList = async () => {
  const campaigns = await getCampaignsListAction();

  const header = (
    <AdminPageHeader
      title="Campaigns"
      description={
        campaigns.length === 1 ? "1 campaign" : `${campaigns.length} campaigns`
      }
      actions={
        <Link
          href="/create-campaign"
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-primary-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
        >
          <PlusIcon aria-hidden="true" className="size-4" />
          New campaign
        </Link>
      }
    />
  );

  if (campaigns.length === 0) {
    return (
      <div className="max-w-4xl">
        {header}
        <p className="text-gray-400">
          No campaigns available. Start by creating one!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {header}

      {/* List container with a dark background and rounded borders */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-white/10">
          <ul role="list" className="divide-y divide-white/10">
            {campaigns.map((campaign) => (
              <li
                key={campaign.id}
                className="flex items-center justify-between gap-x-6 p-5 hover:bg-gray-800/50 transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-start gap-x-3">
                    {/* Main text now in a light color */}
                    <p className="text-sm/6 font-semibold text-white">
                      {campaign.title}
                    </p>

                    {/* Badge with conditional colors */}
                    <p
                      className={clsx(
                        "mt-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                        campaign.sent === true
                          ? "bg-green-900/50 text-green-300 ring-green-400/20"
                          : "bg-red-900/50 text-red-300 ring-red-400/20"
                      )}
                    >
                      {campaign.sent === true ? "Sent" : "Not Sent"}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-400">
                    <p className="whitespace-nowrap">
                      Created on{" "}
                      {campaign.createdAt.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <svg viewBox="0 0 2 2" aria-hidden="true" className="size-0.5 fill-current">
                      <circle r={1} cx={1} cy={1} />
                    </svg>
                    <p className="truncate">By {campaign.admin.name}</p>
                  </div>
                </div>
                <div className="flex flex-none items-center gap-x-4">
                  {/* Button with dark theme styles */}
                  <Link
                    href={`/view-campaigns/${campaign.id}`} // Link to a detail/preview page
                    className="hidden rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs ring-1 ring-inset ring-white/20 hover:bg-white/20 sm:block"
                  >
                    View campaign
                    <span className="sr-only">, {campaign.id}</span>
                  </Link>
                  {campaign.sent === true ? (
                    ""
                  ) : (
                    <CampaignActionsMenu id={campaign.id} title={campaign.title} />
                  )}
                </div>
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
};

export default CampaignList;
