import { render } from "@react-email/render";
import CampaignEmail from "@/components/admin/campaigns/CampaignEmail";
import { CampaignEmailProps } from "@/lib/interfaces";

export async function renderCampaignEmail(
  props: CampaignEmailProps
): Promise<string> {
  return await render(<CampaignEmail {...props} />);
}
