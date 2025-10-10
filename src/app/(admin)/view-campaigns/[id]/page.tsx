import { render } from "@react-email/render";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CampaignEmail from "@/components/admin-components/CampaignEmail";
import CampaignSender from "@/components/admin-components/CampaignSender";
import { getCurrentUser } from "@/libs/getCurrentUser";
import { prisma } from "@/libs/prisma";

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

  const emailProps = {
    subject: campaign.subject,
    title: campaign.title,
    content: campaign.content,
    imageUrl: campaign.imageUrl || undefined,
  };

  const emailHtmlString = await render(<CampaignEmail {...emailProps} />);

  return (
    <div className="py-10 px-5 flex flex-col items-center min-h-screen font-sans">
      <h1 className="mt-2 w-full py-10 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl text-center">
        Campaign Management
      </h1>

      {/* Campaign Sender Component */}
      <div className="w-full max-w-5xl mb-10">
        <CampaignSender campaignId={campaign.id} campaignTitle={campaign.title} />
      </div>

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
