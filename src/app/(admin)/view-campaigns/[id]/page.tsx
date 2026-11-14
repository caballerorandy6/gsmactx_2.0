import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import CampaignSender from "@/components/admin/campaigns/CampaignSender";
import CampaignStatTiles, {
  percentOf,
} from "@/components/admin/campaigns/CampaignStatTiles";
import AdminPageHeader from "@/components/admin/common/AdminPageHeader";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { prisma } from "@/lib/db/prisma";
import { renderCampaignEmail } from "@/lib/email/emailRenderer";

type Params = Promise<{ id: string }>;

export const metadata: Metadata = {
  title: "Campaign Details - GSM A/C Admin",
  description: "View and send campaign for GSM A/C & General Contractor Inc",
};

const CampaignPage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const cookieStore = await cookies();

  // Parallel fetch: user auth + campaign data
  const [user, campaign] = await Promise.all([
    getCurrentUser(cookieStore.get("token")?.value),
    prisma.campaign.findUnique({ where: { id } }),
  ]);

  if (!user) {
    redirect("/login");
  }

  if (!campaign) {
    notFound();
  }

  // Generate preview email HTML
  const emailHtmlString = await renderCampaignEmail({
    subject: campaign.subject,
    title: campaign.title,
    content: campaign.content,
    imageUrl: campaign.imageUrl || undefined,
    recipientEmail: "preview@example.com",
    unsubscribeUrl: "#",
  });

  return (
    <div className="max-w-5xl">
      <AdminPageHeader
        title={campaign.title}
        description={`Subject: ${campaign.subject}`}
        back={{ href: "/view-campaigns", label: "All campaigns" }}
      />

      {/* Campaign Sender Component */}
      {!campaign.sent && (
        <div className="w-full mb-10">
          <CampaignSender campaignId={campaign.id} campaignTitle={campaign.title} />
        </div>
      )}

      {campaign.sent && (
        <section aria-labelledby="results-heading" className="mb-10 space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 id="results-heading" className="text-lg font-semibold text-white">
              Results
            </h2>
            <p className="flex items-center gap-1.5 text-sm text-gray-300">
              <CheckCircleIcon aria-hidden="true" className="size-4 text-green-400" />
              Sent
              {campaign.sentAt &&
                ` ${campaign.sentAt.toLocaleDateString("en-US", {
                  dateStyle: "long",
                  timeZone: "America/Chicago",
                })}`}
            </p>
          </div>

          {campaign.totalEmails ? (
            <CampaignStatTiles
              stats={[
                { label: "Recipients", value: campaign.totalEmails },
                {
                  label: "Delivered",
                  value: campaign.sentCount ?? 0,
                  note: percentOf(campaign.sentCount ?? 0, campaign.totalEmails),
                },
                {
                  label: "Failed",
                  value: campaign.failedCount ?? 0,
                  note: percentOf(campaign.failedCount ?? 0, campaign.totalEmails),
                  alert: (campaign.failedCount ?? 0) > 0,
                },
              ]}
            />
          ) : null}
        </section>
      )}

      {/* Email Preview */}
      <div className="w-full">
        <h2 className="text-lg font-semibold text-white mb-4">
          Email preview
        </h2>
        <iframe
          className="w-full h-[700px] border border-white/10 rounded-lg shadow-2xl"
          srcDoc={emailHtmlString}
          title={`Preview of ${campaign.title}`}
        />
      </div>
    </div>
  );
};

export default CampaignPage;
