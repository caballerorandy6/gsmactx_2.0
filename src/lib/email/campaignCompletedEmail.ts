import { escapeHtml } from "@/lib/utils/escapeHtml";

export interface CampaignCompletedEmailInput {
  adminName: string;
  campaignTitle: string;
  campaignUrl: string;
  totalSent: number;
  totalFailed: number;
  completedAt: Date;
}

const BUSINESS_TIME_ZONE = "America/Chicago";

const formatFinishedAt = (date: Date): string => {
  const day = date.toLocaleDateString("en-US", {
    timeZone: BUSINESS_TIME_ZONE,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const time = date.toLocaleTimeString("en-US", {
    timeZone: BUSINESS_TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
  return `${day} at ${time}`;
};

const detailRow = (label: string, value: string, valueColor = "#12202e") => `
  <tr>
    <td style="padding: 8px 0; width: 96px; vertical-align: top; color: #5b6b7b; font-size: 14px;">${label}</td>
    <td style="padding: 8px 0; vertical-align: top; color: ${valueColor}; font-size: 15px;">${value}</td>
  </tr>`;

/**
 * Admin notification sent once every email of a campaign has been processed.
 * Same frame as the booking emails: brand-blue header, label/value table.
 */
export function buildCampaignCompletedEmail({
  adminName,
  campaignTitle,
  campaignUrl,
  totalSent,
  totalFailed,
  completedAt,
}: CampaignCompletedEmailInput): { subject: string; html: string } {
  const safeName = escapeHtml(adminName);
  const safeTitle = escapeHtml(campaignTitle);
  const safeUrl = escapeHtml(campaignUrl);

  const rows = [
    detailRow("Campaign", safeTitle),
    detailRow("Delivered", `${totalSent} ${totalSent === 1 ? "email" : "emails"}`),
    totalFailed > 0
      ? detailRow(
          "Failed",
          `${totalFailed} (invalid or unreachable addresses)`,
          "#b42318"
        )
      : "",
    detailRow("Finished", formatFinishedAt(completedAt)),
  ].join("");

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; color: #12202e;">
      <div style="background: #005898; padding: 28px 32px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; line-height: 1.3;">Campaign sent</h1>
      </div>
      <div style="padding: 32px; background: #f6f8fa;">
        <p style="font-size: 16px; line-height: 1.5; margin: 0 0 12px;">Hi ${safeName},</p>
        <p style="font-size: 16px; line-height: 1.5; margin: 0 0 24px;">Every email in this campaign has been processed.</p>

        <div style="background: #ffffff; border-radius: 8px; padding: 16px 20px; border: 1px solid #dbe5ef;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
            ${rows}
          </table>
        </div>

        <a href="${safeUrl}"
           style="display: inline-block; background: #005898; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 24px; font-weight: bold;">
          View campaign report
        </a>

        <p style="margin: 32px 0 0; padding-top: 20px; border-top: 1px solid #dbe5ef; font-size: 13px; line-height: 1.6; color: #5b6b7b;">
          Automatic notice from the GSM A/C admin dashboard.
        </p>
      </div>
    </div>
  `;

  return { subject: `Campaign sent: ${campaignTitle}`, html };
}
