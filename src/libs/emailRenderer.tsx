import { render } from "@react-email/render";
import CampaignEmail from "@/components/admin-components/CampaignEmail";
import { CampaignEmailProps } from "@/libs/interfaces";

export async function renderCampaignEmail(
  props: CampaignEmailProps
): Promise<string> {
  return await render(<CampaignEmail {...props} />);
}
