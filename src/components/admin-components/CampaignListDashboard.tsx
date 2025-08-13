import CampaignListItem from "./CampaignListItem";
import { Campaign } from "@/libs/interfaces";

interface CampaignsListProps {
  campaigns: Campaign[];
  totalCount: number;
}

const CampaignsListDashboard = ({
  campaigns,
  totalCount,
}: CampaignsListProps) => {
  return (
    <main className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Campaign Management
        </h1>
        <p className="text-gray-400">
          Showing {campaigns.length} of {totalCount} campaigns
        </p>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
        {campaigns.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            No campaigns found for the selected filter.
          </div>
        ) : (
          <ul role="list" className="divide-y divide-white/10">
            {campaigns.map((campaign) => (
              <CampaignListItem key={campaign.id} campaign={campaign} />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default CampaignsListDashboard;
