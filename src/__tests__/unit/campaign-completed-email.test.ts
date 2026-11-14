import { describe, it, expect } from "vitest";
import { buildCampaignCompletedEmail } from "@/lib/email/campaignCompletedEmail";

const base = {
  adminName: "Gustavo",
  campaignTitle: "Fall Furnace Tune-Up",
  campaignUrl: "https://www.gsmactx.com/view-campaigns/abc123",
  totalSent: 98,
  totalFailed: 0,
  // 2026-11-14 05:09 UTC = Nov 13, 11:09 PM in Houston (CST)
  completedAt: new Date("2026-11-14T05:09:00Z"),
};

describe("buildCampaignCompletedEmail", () => {
  it("uses a plain subject without emoji", () => {
    const { subject } = buildCampaignCompletedEmail(base);
    expect(subject).toBe("Campaign sent: Fall Furnace Tune-Up");
    expect(subject).not.toMatch(/\p{Extended_Pictographic}/u);
  });

  it("formats the finish time in Houston time, not server time", () => {
    const { html } = buildCampaignCompletedEmail(base);
    expect(html).toContain("Friday, November 13, 2026 at 11:09 PM CST");
  });

  it("escapes the admin name and campaign title", () => {
    const { html } = buildCampaignCompletedEmail({
      ...base,
      adminName: "<b>x</b>",
      campaignTitle: `Deal "50% off" <script>`,
    });
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<b>x</b>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("links to the campaign report", () => {
    const { html } = buildCampaignCompletedEmail(base);
    expect(html).toContain('href="https://www.gsmactx.com/view-campaigns/abc123"');
  });

  it("only shows the failed row when something failed", () => {
    expect(buildCampaignCompletedEmail(base).html).not.toContain("Failed");
    const { html } = buildCampaignCompletedEmail({ ...base, totalFailed: 2 });
    expect(html).toContain("Failed");
    expect(html).toContain("invalid or unreachable addresses");
  });

  it("has no emoji or hype copy", () => {
    const { html } = buildCampaignCompletedEmail(base);
    expect(html).not.toMatch(/\p{Extended_Pictographic}/u);
    expect(html).not.toContain("Great news");
  });
});
