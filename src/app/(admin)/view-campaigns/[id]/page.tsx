import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CampaignSender from "@/components/admin/campaigns/CampaignSender";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { prisma } from "@/lib/db/prisma";
import { renderCampaignEmail } from "@/lib/email/emailRenderer";

type Params = Promise<{ id: string }>;

const CampaignPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  const cookieStore = await cookies();
  const user = await getCurrentUser(cookieStore.get("token")?.value);
  if (!user) {
    redirect("/login");
  }

  const campaign = await prisma.campaign.findUnique({
    where: { id },
  });

  if (!campaign) {
    return <div className="text-center text-red-500">Campaign not found.</div>;
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
    <div className="py-10 px-5 flex flex-col items-center min-h-screen font-sans">
      <h1 className="mt-2 w-full py-10 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl text-center">
        Campaign Management
      </h1>

      {/* Campaign Sender Component */}
      {!campaign.sent && (
        <div className="w-full max-w-5xl mb-10">
          <CampaignSender campaignId={campaign.id} campaignTitle={campaign.title} />
        </div>
      )}

      {campaign.sent && (
        <div className="w-full max-w-5xl mb-10 space-y-6">
          <div className="bg-green-600 rounded-lg p-6 text-center">
            <p className="text-2xl font-bold text-white">
              ✓ Campaign Completed!
            </p>
            <p className="text-sm text-green-100 mt-2">
              Sent on {campaign.sentAt?.toLocaleDateString("en-US", {
                dateStyle: "full",
              })}
            </p>
          </div>

          {/* Campaign Stats */}
          {campaign.totalEmails && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Campaign Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-400">Total</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{campaign.totalEmails}</p>
                </div>

                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-400">Sent</span>
                  </div>
                  <p className="text-2xl font-bold text-green-400">{campaign.sentCount || 0}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {campaign.totalEmails > 0
                      ? ((campaign.sentCount || 0) / campaign.totalEmails * 100).toFixed(1)
                      : 0}%
                  </p>
                </div>

                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-400">Failed</span>
                  </div>
                  <p className="text-2xl font-bold text-red-400">{campaign.failedCount || 0}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {campaign.totalEmails > 0
                      ? ((campaign.failedCount || 0) / campaign.totalEmails * 100).toFixed(1)
                      : 0}%
                  </p>
                </div>

                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-400">Success Rate</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-400">
                    {campaign.totalEmails > 0
                      ? ((campaign.sentCount || 0) / campaign.totalEmails * 100).toFixed(1)
                      : 0}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Email Preview */}
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Email Preview
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
