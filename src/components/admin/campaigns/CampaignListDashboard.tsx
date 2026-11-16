import CampaignListItem from "./CampaignListItem";
import { Campaign } from "@/lib/interfaces";

interface CampaignsListProps {
  campaigns: Campaign[];
}

// The dashboard section supplies the heading and filters; this is just the list.
const CampaignsListDashboard = ({ campaigns }: CampaignsListProps) => {
  return (
    <div>
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
        {campaigns.length === 0 ? (
          <div className="p-6 sm:p-8 text-center text-gray-400 text-sm sm:text-base">
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
    </div>
  );
};

export default CampaignsListDashboard;
